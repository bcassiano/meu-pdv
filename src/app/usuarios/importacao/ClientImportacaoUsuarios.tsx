"use client";

import React, { useState, useRef } from "react";
import { useTranslation } from "@/locales/useTranslation";
import Papa from "papaparse";
import { useRouter } from "next/navigation";
import { ScrollAreaWithArrows } from "@/components/ScrollAreaWithArrows";

interface PreviewRow {
    id: number;
    valid: boolean;
    textStatus: string;
    errorDesc?: string;
    name: string;
    email: string;
    role: string;
    team: string;
}

interface ValidationError {
    linha: number;
    tipo: string;
    descricao: string;
    isWarning?: boolean;
}


export default function ClientImportacaoUsuarios(): JSX.Element {
    const { t } = useTranslation();
    const router = useRouter();
    const [isDragging, setIsDragging] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [previewData, setPreviewData] = useState<PreviewRow[]>([]);
    const [totalRows, setTotalRows] = useState(0);
    const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
    const [ignoreErrors, setIgnoreErrors] = useState(false);
    const [validDataToSave, setValidDataToSave] = useState<any[]>([]);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const processFile = (file: File) => {
        setIsUploading(true);
        setDataLoaded(false);
        setValidationErrors([]);
        setIgnoreErrors(false);
        setValidDataToSave([]);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result as string;
            if (!text) return;

            // Pré-processamento: Limpar lixo do CSV WAPP (meta-hashes e FIM)
            const lines = text.split(/\r?\n/);

            // Remove a primeira linha se for metadado que não contém os nomes das colunas esperadas
            // O padrão lixo do wapp começa com TXXXX;YYYY-MM-DD;HH:mm:ss
            if (lines.length > 0 && !lines[0].toLowerCase().includes("pessoa") && !lines[0].toLowerCase().includes("nome")) {
                lines.shift();
            }

            // Remove a última linha se for o marcador de FIM
            if (lines.length > 0 && lines[lines.length - 1].startsWith("FIM;")) {
                lines.pop();
            }

            const cleanedCsv = lines.join('\n');

            // Somente parse do CSV para view visual locally. O backend de importação de usuários poderá ser integrado futuramente usando o formData.
            Papa.parse(cleanedCsv, {
                header: true,
                skipEmptyLines: true,
                transformHeader: (header) => header.replace(/^\uFEFF/, '').trim(),
                complete: (results) => {
                    const rowCount = results.data.length;
                    setTotalRows(rowCount);

                    let errs: ValidationError[] = [];
                    let validData: any[] = [];
                    let allRowsForPreview: PreviewRow[] = [];

                    results.data.forEach((row: any, i: number) => {
                        const linhaObj = i + 2; // header+1
                        const nome = row['Nome'] || row['NOME'] || row['name'] || row['NOME PESSOA'] || '';
                        let email = row['Email'] || row['E-mail'] || row['email'] || row['E-MAIL'] || '';
                        const perfilOuEquipe = row['ID TIPO PESSOA'] || '';

                        let perfil = row['Perfil'] || row['PERFIL'] || row['role'] || '';
                        let equipe = row['Equipe'] || row['EQUIPE'] || row['team'] || '';

                        // Inferência WAPP
                        if (!perfil && perfilOuEquipe) {
                            if (perfilOuEquipe.toUpperCase() === 'ADMINISTRADOR' || perfilOuEquipe.toLowerCase().includes('ti')) {
                                perfil = 'Administrador';
                                equipe = 'Administração';
                            } else {
                                perfil = 'Promotor';
                                equipe = perfilOuEquipe;
                            }
                        }

                        if (!perfil) perfil = 'Promotor';
                        if (!equipe) equipe = 'Padrão';

                        let emailCalculado = String(email).trim();
                        let nomeCalculado = String(nome).trim();

                        let isRowValid = true;
                        let errorDesc = '';

                        if (!nomeCalculado) {
                            isRowValid = false;
                            errorDesc = 'NOME OBRIGATÓRIO';
                            errs.push({ linha: linhaObj, tipo: 'DADOS INVÁLIDOS', descricao: 'A coluna Nome não pode estar vazia.' });
                        }

                        if (isRowValid && !emailCalculado) {
                            emailCalculado = `${nomeCalculado.split(' ')[0].toLowerCase().replace(/[^a-z]/g, '')}.user@gerado.sistema.com`;
                        }

                        allRowsForPreview.push({
                            id: i + 1,
                            valid: isRowValid,
                            textStatus: isRowValid ? 'Válido' : 'Inválido',
                            errorDesc: errorDesc,
                            name: nomeCalculado || 'Sem Nome',
                            email: emailCalculado,
                            role: perfil,
                            team: equipe
                        });

                        if (isRowValid) {
                            validData.push({
                                name: nomeCalculado,
                                email: emailCalculado,
                                role: perfil,
                                team: equipe
                            });
                        }
                    });

                    setValidationErrors(errs);
                    setValidDataToSave(validData);
                    setPreviewData(allRowsForPreview.slice(0, 5));

                    setTimeout(() => {
                        setIsUploading(false);
                        setDataLoaded(true);
                    }, 500);
                }
            });
        };
        reader.readAsText(file);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    const handleAcknowledgeErrors = () => {
        const uniqueErrorLines = new Set(validationErrors.map((e) => e.linha)).size;
        const confirm = window.confirm(`Atenção: A planilha contém ${uniqueErrorLines} registro(s) com erro(s). Deseja ignorá-los e continuar a importação apenas com os ${validDataToSave.length} registros válidos?`);
        if (confirm) {
            setIgnoreErrors(true);
        }
    };

    const handleDownloadBase = () => {
        const csvContent = "data:text/csv;charset=utf-8,NOME,EMAIL,PERFIL,EQUIPE\nMaria Silva,maria@empresa.com,Promotor,Beta\nJoão Souza,joao@empresa.com,Gerente,Alpha";
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "meu_pdv_modelo_usuarios.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleImportData = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/usuarios/importacao', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rows: validDataToSave })
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                alert(result.error || "Erro ao importar dados.");
                setIsSubmitting(false);
                return;
            }

            // Sucesso
            alert(result.message || "Importação concluída com sucesso!");
            router.refresh();
            router.push('/usuarios');
        } catch (error) {
            console.error(error);
            alert("Ocorreu um erro na requisição de importação.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t('usuariosImportacao.title')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {t('usuariosImportacao.subtitle')}
                    </p>
                </div>
                <button onClick={handleDownloadBase} className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                    <span aria-hidden="true" className="material-symbols-outlined text-lg">download</span>
                    {t('usuariosImportacao.downloadBase')}
                </button>
            </header>

            <section className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="max-w-3xl mx-auto">
                    <div
                        role="button"
                        tabIndex={0}
                        aria-label={t('usuariosImportacao.step1.ariaLabel')}
                        onClick={handleButtonClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleButtonClick(); } }}
                        className={`relative group cursor-pointer flex flex-col items-center justify-center border-2 border-dashed ${isDragging ? 'border-primary bg-primary/10' : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20'} rounded-xl py-12 px-6 group-hover:border-primary/50 group-hover:bg-primary/5 dark:group-hover:bg-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            className="hidden"
                        />
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform ${isDragging ? 'bg-primary text-white scale-110' : 'bg-primary/10 text-primary group-hover:scale-110'}`}>
                            {isUploading ? (
                                <span className="material-symbols-outlined text-4xl animate-spin">refresh</span>
                            ) : (
                                <span aria-hidden="true" className="material-symbols-outlined text-4xl">cloud_upload</span>
                            )}
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {isUploading ? "Processando planilha..." : (isDragging ? t('usuariosImportacao.step1.dropNow') : t('usuariosImportacao.step1.dragDrop'))}
                        </h2>
                        {!isUploading && (
                            <p className="text-slate-500 dark:text-slate-400 text-center mt-2 text-sm font-medium">
                                {t('usuariosImportacao.step1.orClick')} <span className="text-primary font-bold">{t('usuariosImportacao.step1.fromComputer')}</span>
                            </p>
                        )}
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mt-4">
                            {t('usuariosImportacao.step1.supportText')}
                        </p>
                    </div>
                </div>
            </section>

            {dataLoaded && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Resumo da carga">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">{t('usuariosImportacao.step2.totalUsers')}</span>
                                <span aria-hidden="true" className="material-symbols-outlined text-slate-400">list_alt</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{totalRows}</p>
                            <p className="text-xs text-slate-500 mt-2">Total de registros estruturais</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm border-l-4 border-l-green-500">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-green-600 dark:text-green-400 text-sm font-medium uppercase tracking-wider">{t('usuariosImportacao.step2.new')}</span>
                                <span aria-hidden="true" className="material-symbols-outlined text-green-500">person_add</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{validDataToSave.length}</p>
                            <p className="text-xs text-slate-500 mt-2">Novas constas prontas</p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm border-l-4 border-l-red-500">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-red-600 dark:text-red-400 text-sm font-medium uppercase tracking-wider">{t('usuariosImportacao.step2.errors')}</span>
                                <span aria-hidden="true" className="material-symbols-outlined text-red-500">error</span>
                            </div>
                            <p className="text-3xl font-bold text-slate-900 dark:text-white">{new Set(validationErrors.map(e => e.linha)).size}</p>
                            <p className="text-xs text-slate-500 mt-2">Registros precisam de correção</p>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <section className="lg:col-span-8 flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('usuariosImportacao.step3.title')}</h2>
                                <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Exibindo os primeiros 5 registros</span>
                            </div>

                            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                <ScrollAreaWithArrows>
                                <table className="w-full text-left text-sm border-collapse">
                                    <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                        <tr>
                                            <th className="px-6 py-4 w-12 text-center" aria-label="Status do registro">St</th>
                                            <th className="px-6 py-4">{t('usuariosImportacao.step3.columns.name')}</th>
                                            <th className="px-6 py-4">{t('usuariosImportacao.step3.columns.email')}</th>
                                            <th className="px-6 py-4">{t('usuariosImportacao.step3.columns.role')} / {t('usuariosImportacao.step3.columns.team')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {previewData.map((row) => (
                                            <tr key={row.id} className={`hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors ${!row.valid ? 'bg-red-50/20 dark:bg-red-900/5' : ''}`}>
                                                <td className="px-6 py-4 text-center">
                                                    <span className={`w-2.5 h-2.5 rounded-full ${row.valid ? 'bg-green-500' : 'bg-red-500'} inline-block`} aria-label={row.textStatus} title={row.textStatus}></span>
                                                </td>
                                                <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                                                    {row.name}
                                                    {!row.valid && (
                                                        <span className="block text-red-600 dark:text-red-400 font-black tracking-widest text-xs uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-md mt-1 w-fit">{row.errorDesc}</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-mono text-xs">{row.email}</td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                    <span className="font-bold">{row.role}</span> &bull; {row.team}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ScrollAreaWithArrows>
                            </div>
                        </section>

                        <aside className="lg:col-span-4 flex flex-col gap-4">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                <span aria-hidden="true" className={`material-symbols-outlined ${validationErrors.length > 0 ? 'text-amber-500' : 'text-green-500'}`}>
                                    {validationErrors.length > 0 ? 'warning' : 'analytics'}
                                </span>
                                {t('usuariosImportacao.qualityCheck.title')}
                            </h2>
                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2" role="status" aria-live="polite">
                                {validationErrors.length === 0 && (
                                    <div className="p-4 bg-green-50 dark:bg-emerald-900/10 border border-green-100 dark:border-emerald-900/30 rounded-xl flex gap-3 shadow-sm">
                                        <span aria-hidden="true" className="material-symbols-outlined text-green-500">check_circle</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-green-800 dark:text-green-300">Estrutura Validada!</p>
                                            <p className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">As colunas exigidas estão presentes e os perfis estão em conformidade.</p>
                                        </div>
                                    </div>
                                )}
                                {validationErrors.slice(0, 50).map((err, idx) => (
                                    <div key={idx} className="p-4 rounded-xl flex gap-3 shadow-sm transition-all hover:shadow-md cursor-pointer bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                        <span aria-hidden="true" className="material-symbols-outlined text-red-500">report</span>
                                        <div className="flex-1">
                                            <p className="text-sm font-black text-red-800 dark:text-red-300">
                                                {err.tipo} (Linha {err.linha})
                                            </p>
                                            <p className="text-xs mt-1 font-medium text-red-600 dark:text-red-400">
                                                {err.descricao}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {validationErrors.length > 50 && (
                                    <p className="text-xs text-center text-slate-500 mt-2 font-medium">+ {validationErrors.length - 50} outros erros listados</p>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            )}

            {dataLoaded && (
                <footer className="flex items-center justify-between gap-4 pt-8 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-150">
                    <div className="flex items-center gap-3">
                        {validationErrors.length > 0 && !ignoreErrors && (
                            <button
                                onClick={handleAcknowledgeErrors}
                                className="text-amber-600 dark:text-amber-500 underline font-bold text-sm hover:text-amber-700 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
                            >
                                <span aria-hidden="true" className="material-symbols-outlined text-sm">warning</span>
                                Ciente. Ignorar os {new Set(validationErrors.map(e => e.linha)).size} erro(s) e habilitar importação.
                            </button>
                        )}
                        {ignoreErrors && (
                            <span className="text-green-600 dark:text-green-500 font-bold text-sm flex items-center gap-1">
                                <span aria-hidden="true" className="material-symbols-outlined text-lg">check_circle</span>
                                Erros ignorados. Importação liberada!
                            </span>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={() => setDataLoaded(false)} disabled={isSubmitting} className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 outline-none">
                            {t('usuariosImportacao.actions.cancel')}
                        </button>
                        <button
                            onClick={handleImportData}
                            disabled={(validationErrors.length > 0 && !ignoreErrors) || isSubmitting || validDataToSave.length === 0}
                            className={`px-8 py-2.5 text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 outline-none ${(validationErrors.length === 0 || ignoreErrors) && validDataToSave.length > 0 && !isSubmitting ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-slate-400 cursor-not-allowed opacity-70'}`}
                        >
                            {isSubmitting ? (
                                <span className="material-symbols-outlined text-lg animate-spin">refresh</span>
                            ) : (
                                <span aria-hidden="true" className="material-symbols-outlined text-lg">rocket_launch</span>
                            )}
                            {isSubmitting ? 'Salvando...' : t('usuariosImportacao.actions.finish')}
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
}
