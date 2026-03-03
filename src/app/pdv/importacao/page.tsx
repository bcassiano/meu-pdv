"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/locales/useTranslation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function PdvImportacaoPage(): JSX.Element {
    const { t } = useTranslation();
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [fileStatus, setFileStatus] = useState<"idle" | "uploading" | "error" | "success">("idle");
    const [status, setStatus] = useState<{ message: string, type: string }>({ message: '', type: '' });

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
        // Simulate file upload validation
        setFileStatus("error");
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
                                <button className="flex items-center gap-2 cursor-pointer justify-center rounded-xl h-12 px-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold shadow-sm transition-all">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    <span className="truncate hidden sm:inline">Baixar Modelo Base</span>
                                </button>
                                <button className="flex items-center gap-2 cursor-pointer justify-center rounded-xl h-12 px-8 bg-primary hover:bg-blue-600 text-white text-sm font-black tracking-wide shadow-xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all">
                                    <span className="truncate">Importar Dados</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Left Column: Upload & Mapping */}
                            <div className="lg:col-span-2 flex flex-col gap-8">
                                {/* Upload Area */}
                                <section className="flex flex-col gap-4">
                                    <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-3">
                                        <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-black">1</span>
                                        Upload de Arquivo
                                    </h3>

                                    <div
                                        role="button"
                                        tabIndex={0}
                                        aria-label="Área de upload de planilhas de importação. Arraste arquivos ou aperte Enter para selecionar."
                                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); /* invoke file input.click() */ } }}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                        className={`group relative flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed ${isDragging ? 'border-primary bg-primary/5' : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50'} hover:border-primary/50 hover:bg-blue-50/30 dark:hover:bg-primary/5 px-6 py-16 transition-all cursor-pointer`}
                                    >
                                        <div className={`h-20 w-20 rounded-3xl ${isDragging ? 'bg-primary text-white scale-110 shadow-xl shadow-primary/30' : 'bg-blue-100 dark:bg-slate-800 text-primary'} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                            <span className="material-symbols-outlined text-[40px]">cloud_upload</span>
                                        </div>
                                        <div className="flex flex-col items-center gap-2 text-center">
                                            <p className="text-slate-900 dark:text-white text-xl font-bold">{isDragging ? 'Solte a planilha agora' : 'Arraste e solte sua planilha aqui'}</p>
                                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">ou <span className="text-primary font-black hover:underline cursor-pointer">clique para selecionar</span> do seu computador</p>
                                        </div>
                                        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mt-4">Suporta .CSV e .XLSX até 10MB</p>
                                    </div>
                                </section>

                                {/* Column Mapping */}
                                <section className="flex flex-col gap-4 mt-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-slate-900 dark:text-white text-lg font-bold flex items-center gap-3">
                                            <span className="flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-black">2</span>
                                            Mapeamento de Colunas
                                        </h3>
                                        <span className="text-xs font-black px-3 py-1.5 bg-green-100 dark:bg-emerald-500/10 text-green-700 dark:text-emerald-400 rounded-full flex items-center gap-1.5 border border-green-200 dark:border-emerald-500/20">
                                            <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                            Auto-detectado
                                        </span>
                                    </div>

                                    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-2/5">Coluna do Arquivo</th>
                                                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-2/5 border-l border-slate-200 dark:border-slate-800">Campo do Sistema</th>
                                                    <th className="px-6 py-4 text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest w-1/5 text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                                {/* Map Item 1 */}
                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">title</span>
                                                        </div>
                                                        Nome Fantasia
                                                    </td>
                                                    <td className="px-6 py-3 border-l border-slate-100 dark:border-slate-800 relative">
                                                        <select aria-label="Selecione o campo interno para vincular à coluna Nome Fantasia do arquivo em lote" className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-semibold text-sm transition-all outline-none appearance-none cursor-pointer">
                                                            <option>Nome do PDV</option>
                                                            <option>Razão Social</option>
                                                            <option>CNPJ</option>
                                                        </select>
                                                        <span aria-hidden="true" className="material-symbols-outlined absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center rounded-lg bg-green-50 dark:bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-500/20 shadow-sm">Mapeado</span>
                                                    </td>
                                                </tr>

                                                {/* Map Item 2 */}
                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">badge</span>
                                                        </div>
                                                        CNPJ
                                                    </td>
                                                    <td className="px-6 py-3 border-l border-slate-100 dark:border-slate-800 relative">
                                                        <select aria-label="Selecione o campo interno para vincular à coluna CNPJ do arquivo em lote" className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-semibold text-sm transition-all outline-none appearance-none cursor-pointer" defaultValue="CNPJ">
                                                            <option value="CNPJ">CNPJ</option>
                                                            <option value="IE">Inscrição Estadual</option>
                                                        </select>
                                                        <span aria-hidden="true" className="material-symbols-outlined absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center rounded-lg bg-green-50 dark:bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-500/20 shadow-sm">Mapeado</span>
                                                    </td>
                                                </tr>

                                                {/* Map Item 3 */}
                                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                                                    <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">location_on</span>
                                                        </div>
                                                        Endereço
                                                    </td>
                                                    <td className="px-6 py-3 border-l border-slate-100 dark:border-slate-800 relative">
                                                        <select aria-label="Selecione o campo interno para vincular à coluna Endereço do arquivo em lote" className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-2 focus:ring-primary/20 text-slate-900 dark:text-white font-semibold text-sm transition-all outline-none appearance-none cursor-pointer" defaultValue="End">
                                                            <option value="End">Endereço Completo</option>
                                                            <option value="Log">Logradouro</option>
                                                        </select>
                                                        <span aria-hidden="true" className="material-symbols-outlined absolute right-10 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center rounded-lg bg-green-50 dark:bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-500/20 shadow-sm">Mapeado</span>
                                                    </td>
                                                </tr>

                                                {/* Map Item ERROR */}
                                                <tr className="bg-red-50/50 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group">
                                                    <td className="px-6 py-5 text-sm font-bold text-slate-900 dark:text-slate-200 flex items-center gap-3">
                                                        <div className="h-8 w-8 rounded-lg bg-red-100 dark:bg-red-900/50 flex items-center justify-center text-red-500 transition-colors">
                                                            <span className="material-symbols-outlined text-[18px]">call</span>
                                                        </div>
                                                        Telefone Contato
                                                    </td>
                                                    <td className="px-6 py-3 border-l border-red-100 dark:border-red-900/30 relative">
                                                        <select aria-label="Selecione o campo interno para vincular à coluna Telefone Contato do arquivo em lote" className="w-full h-12 px-4 rounded-xl bg-white dark:bg-slate-900 border-2 border-red-300 dark:border-red-500/50 text-red-900 dark:text-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 font-semibold text-sm transition-all outline-none appearance-none cursor-pointer" defaultValue="">
                                                            <option value="" disabled>Selecione um campo...</option>
                                                            <option value="tel1">Telefone Principal</option>
                                                            <option value="cel">Celular</option>
                                                        </select>
                                                        <span aria-hidden="true" className="material-symbols-outlined absolute right-10 top-1/2 -translate-y-1/2 text-red-400 dark:text-red-500/50 pointer-events-none">expand_more</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center rounded-lg bg-red-50 dark:bg-red-500/10 px-3 py-1.5 text-xs font-bold text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 shadow-sm animate-pulse">Pendente</span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Error Preview */}
                            <div className="lg:col-span-1 flex flex-col gap-6">
                                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
                                    <div className="px-6 py-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/50">
                                        <h3 className="text-slate-900 dark:text-white font-black text-lg flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[18px]">warning</span>
                                            </div>
                                            Check de Qualidade
                                        </h3>
                                        <span className="bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border border-red-200 dark:border-red-500/30">3 erros</span>
                                    </div>

                                    <div role="status" aria-live="polite" className="p-6 flex flex-col gap-4 flex-1 overflow-y-auto max-h-[600px] scroll-smooth">
                                        {/* Error Item: Invalid */}
                                        <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                                            <div className="mt-1 min-w-4 text-red-600 dark:text-red-400">
                                                <span className="material-symbols-outlined text-[24px]">error</span>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-sm font-black text-red-900 dark:text-red-200 tracking-tight">Linha 4</p>
                                                    <span className="text-[10px] uppercase tracking-wider text-red-700 dark:text-red-300 font-bold bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded-md border border-red-200 dark:border-red-500/20">CNPJ Inválido</span>
                                                </div>
                                                <p className="text-sm font-medium text-red-700 dark:text-red-300/80 leading-snug">O valor &apos;123.456.789-00&apos; não corresponde a um formato de CNPJ válido do algoritmo federal.</p>
                                            </div>
                                        </div>

                                        {/* Error Item: Warning */}
                                        <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                                            <div className="mt-1 min-w-4 text-amber-500">
                                                <span className="material-symbols-outlined text-[24px]">warning</span>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-sm font-black text-amber-900 dark:text-amber-200 tracking-tight">Linha 12</p>
                                                    <span className="text-[10px] uppercase tracking-wider text-amber-700 dark:text-amber-300 font-bold bg-amber-100 dark:bg-amber-900/50 px-2 py-1 rounded-md border border-amber-200 dark:border-amber-500/20">Campo Vazio</span>
                                                </div>
                                                <p className="text-sm font-medium text-amber-700 dark:text-amber-300/80 leading-snug">O campo obrigatório &apos;Endereço Local&apos; está em branco, prejudicando o roteiro.</p>
                                            </div>
                                        </div>

                                        {/* Error Item: Duplication */}
                                        <div className="p-5 rounded-2xl border border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-900/10 flex gap-4 items-start shadow-sm hover:shadow-md transition-shadow">
                                            <div className="mt-1 min-w-4 text-red-600 dark:text-red-400">
                                                <span className="material-symbols-outlined text-[24px]">error</span>
                                            </div>
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="flex justify-between items-center w-full">
                                                    <p className="text-sm font-black text-red-900 dark:text-red-200 tracking-tight">Linha 28</p>
                                                    <span className="text-[10px] uppercase tracking-wider text-red-700 dark:text-red-300 font-bold bg-red-100 dark:bg-red-900/50 px-2 py-1 rounded-md border border-red-200 dark:border-red-500/20">Duplicidade</span>
                                                </div>
                                                <p className="text-sm font-medium text-red-700 dark:text-red-300/80 leading-snug">O CNPJ fornecido já está vinculado a outro distribuidor corporativo (Conflito SQL).</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Corrija os erros na planilha e faça o seu re-envio inteligente.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Footer */}
                        <div className="flex items-center justify-end pt-8 mt-4 border-t border-slate-200 dark:border-slate-800 gap-4">
                            <button className="px-6 py-3 text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                                Cancelar Lote
                            </button>
                            <button className="flex items-center gap-2 cursor-not-allowed rounded-xl h-12 px-8 bg-primary hover:bg-blue-600 text-white text-sm font-black tracking-wide shadow-xl shadow-primary/30 transition-all opacity-50" disabled>
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
