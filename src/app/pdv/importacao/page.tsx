"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/locales/useTranslation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

interface ValidationError {
    linha: number;
    tipo: string;
    descricao: string;
    isWarning?: boolean;
}

export default function PdvImportacaoPage(): JSX.Element {
    const { t } = useTranslation();
    const router = useRouter();

    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileStatus, setFileStatus] = useState<"idle" | "uploading" | "error" | "success">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    const ALLOWED_TYPES = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".csv", ".xlsx"
    ];

    const validateAndSetFile = (selectedFile: File) => {
        setErrorMessage("");
        setFileStatus("idle");
        setValidationErrors([]);
        setSuccessMessage("");

        if (!selectedFile) return;

        // Validar Tamanho
        if (selectedFile.size > MAX_FILE_SIZE) {
            setErrorMessage(`O arquivo é muito grande. O limite máximo é 10MB.`);
            setFileStatus("error");
            return;
        }

        // Validar Tipo
        const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();
        if (!ALLOWED_TYPES.includes(selectedFile.type) && fileExtension !== 'csv' && fileExtension !== 'xlsx') {
            setErrorMessage(`Formato inválido. Apenas arquivos .CSV e .XLSX são suportados.`);
            setFileStatus("error");
            return;
        }

        setFile(selectedFile);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        validateAndSetFile(droppedFile);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            validateAndSetFile(selectedFile);
        }
    };

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleProcessFile = async () => {
        if (!file) {
            setErrorMessage("Por favor, selecione um arquivo primeiro.");
            setFileStatus("error");
            return;
        }

        setFileStatus("uploading");
        setErrorMessage("");
        setValidationErrors([]);
        setSuccessMessage("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/pdv/import", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 422) {
                    setValidationErrors(data.errors || []);
                    setErrorMessage(data.message || "Foram encontrados erros no arquivo.");
                } else {
                    setErrorMessage(data.error || "Ocorreu um erro ao processar o arquivo.");
                }
                setFileStatus("error");
                return;
            }

            setFileStatus("success");
            setValidationErrors(data.warnings || []);
            setSuccessMessage(data.message || `Arquivo processado com sucesso (${data.rowsProcessed} linhas).`);
            setFile(null); // Clear file after success
            if (fileInputRef.current) fileInputRef.current.value = ""; // Reset input

        } catch (error) {
            setErrorMessage("Erro de conexão com o servidor. Tente novamente.");
            setFileStatus("error");
        }
    };

    const cancelUpload = () => {
        setFile(null);
        setFileStatus("idle");
        setErrorMessage("");
        setValidationErrors([]);
        setSuccessMessage("");
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleDownloadTemplate = () => {
        const headers = [
            "ID LOCAL ", "DESCRIÇÃO LOCAL", "RAZÃO SOCIAL LOCAL", "ATIVO LOCAL", "CÓDIGO DO LOCAL NO UMOV.ME",
            "PAÍS", "ESTADO", "CIDADE", "BAIRRO", "TIPO LOGRADOURO", "LOGRADOURO", "NÚMERO LOGRADOURO",
            "COMPLEMENTO LOGRADOURO", "CEP", "DDI TELEFONE CELULAR", "DDD TELEFONE CELULAR", "NÚMERO TELEFONE CELULAR",
            "DDI TELEFONE FIXO", "DDD TELEFONE FIXO", "NUMERO TELEFONE FIXO", "E-MAIL", "OBSERVAÇÃO", "CNPJ",
            "Inscrição estadual", "Vendedor", "AVISO", "Loja Numero", "Regiao", "Segunda-Feira", "Terça-Feira",
            "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado", "TT", "Rota", "Montado", "Lider",
            "Telefone Lider", "Promotor", "Telefone Promotor", "Mix"
        ].join(";");

        const blob = new Blob([`\uFEFF${headers}\n`], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Modelo_Importacao_PDVs.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFinalizeImport = () => {
        if (fileStatus === 'success') {
            alert("Lote de PDVs importado com sucesso na plataforma!");
            router.push("/pdv/lista");
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="PDVs"
                    icon="storefront"
                    navigation={[
                        { label: "Novo Cadastro", href: "/pdv/cadastro", icon: "add_box" },
                        { label: "Importação em Lote", href: "/pdv/importacao", active: true, icon: "cloud_upload" },
                        { label: "Carga Inicial", href: "/pdv/carga-inicial", icon: "upload_file" },
                        { label: "Listagem", href: "/pdv/lista", icon: "format_list_bulleted" },
                    ]}
                />

                <div className="flex-1 overflow-y-auto p-8 lg:p-12 pb-12">
                    <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                        {/* Page Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
                            <div className="flex flex-col gap-2">
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                                    {t('importacao.title')}
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
                                    {t('importacao.subtitle')}
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleDownloadTemplate}
                                    className="flex items-center gap-2 cursor-pointer justify-center rounded-xl h-12 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm transition-all"
                                >
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    <span className="truncate hidden sm:inline">Baixar Modelo Base</span>
                                </button>
                                <button
                                    onClick={handleProcessFile}
                                    disabled={!file || fileStatus === 'uploading' || fileStatus === 'success'}
                                    className={`flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary text-white text-sm font-black tracking-wide shadow-xl shadow-primary/30 transition-all ${!file || fileStatus === 'uploading' || fileStatus === 'success' ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 hover:-translate-y-1 active:translate-y-0 cursor-pointer'}`}
                                >
                                    {fileStatus === 'uploading' ? (
                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    ) : (
                                        <span className="truncate">Importar Dados</span>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Upload */}
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                <section className="flex flex-col gap-4">
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-3">
                                        <span className={`flex items-center justify-center h-7 w-7 rounded-full text-xs font-black ${file ? 'bg-green-100 text-green-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-primary/10 dark:bg-primary/20 text-primary'}`}>
                                            {file ? <span className="material-symbols-outlined text-[14px]">check</span> : '1'}
                                        </span>
                                        Upload de Arquivo
                                    </h3>

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileInput}
                                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                        className="hidden"
                                    />

                                    <div
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Área de upload de planilhas de importação"
                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleUploadClick(); } }}
                                        onClick={handleUploadClick}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`group relative flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : file ? 'border-green-400 dark:border-emerald-600 bg-green-50/50 dark:bg-emerald-900/10' : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'} hover:border-primary/50 hover:bg-blue-50/30 dark:hover:bg-primary/5 px-6 py-16 transition-all cursor-pointer`}
                                    >
                                        <div className={`h-20 w-20 rounded-3xl ${isDragging ? 'bg-primary text-white scale-110 shadow-xl shadow-primary/30' : file ? 'bg-green-100 text-green-600 dark:bg-emerald-800 dark:text-emerald-400' : 'bg-blue-100 dark:bg-slate-800 text-primary'} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            <span className="material-symbols-outlined text-[40px]">
                                                {file ? 'description' : 'cloud_upload'}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            {file ? (
                                                <>
                                                    <p className="text-slate-900 dark:text-white text-xl font-bold">{file.name}</p>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{(file.size / 1024 / 1024).toFixed(2)} MB • <span className="text-primary font-black hover:underline cursor-pointer">Trocar arquivo</span></p>
                                                </>
                                            ) : (
                                                <>
                                                    <p className="text-slate-900 dark:text-white text-xl font-bold">{isDragging ? 'Solte a planilha agora' : 'Arraste e solte sua planilha aqui'}</p>
                                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">ou <span className="text-primary font-black hover:underline cursor-pointer">clique para selecionar</span> do seu computador</p>
                                                </>
                                            )}
                                        </div>
                                        {!file && <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mt-4">Suporta .CSV e .XLSX até 10MB</p>}
                                    </div>

                                    {/* General Error Message */}
                                    {errorMessage && validationErrors.length === 0 && (
                                        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 flex items-center gap-3 text-red-700 dark:text-red-400">
                                            <span className="material-symbols-outlined">error</span>
                                            <span className="text-sm font-semibold">{errorMessage}</span>
                                        </div>
                                    )}
                                </section>
                            </div>

                            {/* Right Column: Error Preview / Status */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col h-[500px] overflow-hidden">
                                    <div className={`px-6 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center ${fileStatus === 'success' ? 'bg-green-50 dark:bg-emerald-900/20' : fileStatus === 'error' && validationErrors.length > 0 ? 'bg-red-50 dark:bg-red-900/10' : 'bg-slate-50 dark:bg-slate-900/50'}`}>
                                        <h3 className="text-slate-900 dark:text-white font-black text-lg flex items-center gap-3">
                                            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${fileStatus === 'success' ? 'bg-green-100 text-green-600 dark:bg-emerald-500/20 dark:text-emerald-400' : fileStatus === 'error' && validationErrors.length > 0 ? 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-500'}`}>
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {fileStatus === 'success' ? 'check_circle' : fileStatus === 'error' && validationErrors.length > 0 ? 'error' : 'warning'}
                                                </span>
                                            </div>
                                            Check de Qualidade
                                        </h3>

                                        {validationErrors.length > 0 && fileStatus === 'error' && (
                                            <span className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-red-200 dark:border-red-500/30">
                                                {validationErrors.length} erro{validationErrors.length > 1 ? 's' : ''}
                                            </span>
                                        )}
                                        {fileStatus === 'success' && (
                                            <span className="bg-green-100 dark:bg-emerald-500/20 text-green-700 dark:text-emerald-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-green-200 dark:border-emerald-500/30">
                                                {validationErrors.length > 0 ? 'Aprovado com Avisos' : 'Aprovado'}
                                            </span>
                                        )}
                                    </div>

                                    <div role="status" aria-live="polite" className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto scroll-smooth">

                                        {fileStatus === 'idle' && (
                                            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                                                <span className="material-symbols-outlined text-[48px] mb-4 opacity-20">fact_check</span>
                                                <p className="text-sm font-semibold">Os erros do lote aparecerão aqui após o envio.</p>
                                            </div>
                                        )}

                                        {fileStatus === 'uploading' && (
                                            <div className="flex flex-col items-center justify-center h-full text-center text-primary">
                                                <div className="h-10 w-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4"></div>
                                                <p className="text-sm font-bold">Analisando planilha...</p>
                                            </div>
                                        )}

                                        {fileStatus === 'success' && (
                                            <div className={`flex flex-col items-center justify-center text-center text-green-600 dark:text-emerald-400 shrink-0 ${validationErrors.length > 0 ? 'py-4' : 'h-full'}`}>
                                                <span className="material-symbols-outlined text-[48px] mb-2">task_alt</span>
                                                <h4 className="text-xl font-bold mb-1">Validação Concluída</h4>
                                                <p className="text-sm font-medium">{successMessage}</p>
                                            </div>
                                        )}

                                        {(fileStatus === 'error' || fileStatus === 'success') && validationErrors.length > 0 && validationErrors.map((err, idx) => (
                                            <div key={idx} className={`p-5 rounded-2xl border ${err.isWarning ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10' : 'border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10'} flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow`}>
                                                <div className={`mt-1 min-w-4 ${err.isWarning ? 'text-amber-500 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                                                    <span className="material-symbols-outlined text-[24px]">
                                                        {err.isWarning ? 'info' : 'error'}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col gap-2 w-full">
                                                    <div className="flex justify-between items-center w-full">
                                                        <p className={`text-sm font-black tracking-tight ${err.isWarning ? 'text-amber-900 dark:text-amber-200' : 'text-red-900 dark:text-red-200'}`}>Linha {err.linha}</p>
                                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border truncate max-w-[120px] ${err.isWarning ? 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/50 border-amber-200 dark:border-amber-500/20' : 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-500/20'}`} title={err.tipo}>
                                                            {err.tipo}
                                                        </span>
                                                    </div>
                                                    <p className={`text-sm font-medium leading-snug ${err.isWarning ? 'text-amber-800 dark:text-amber-100/80' : 'text-red-700 dark:text-red-300/80'}`}>{err.descricao}</p>
                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                    {fileStatus === 'error' && validationErrors.length > 0 && (
                                        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-center flex-shrink-0">
                                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-relaxed">Corrija os erros na planilha e faça o seu re-envio inteligente.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="flex items-center justify-end pt-8 mt-4 border-t border-slate-200 dark:border-slate-800 gap-4">
                            <button
                                onClick={cancelUpload}
                                className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                Cancelar Lote
                            </button>
                            <button
                                onClick={handleFinalizeImport}
                                disabled={fileStatus !== 'success'}
                                className={`flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-primary text-white text-sm font-black tracking-wide shadow-xl shadow-primary/30 transition-all ${fileStatus === 'success' ? 'opacity-100 hover:bg-blue-600 hover:-translate-y-1 active:translate-y-0 cursor-pointer' : 'opacity-50 cursor-not-allowed'}`}
                            >
                                <span className="material-symbols-outlined text-[18px]">verified</span>
                                Finalizar Importação
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
