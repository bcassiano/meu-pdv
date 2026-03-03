"use client";

import React, { useState } from "react";
import { useTranslation } from "@/locales/useTranslation";

export default function ClientCargaInicial(): JSX.Element {
    const { t } = useTranslation();
    const [isDragging, setIsDragging] = useState(false);

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
    };

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
            {/* Page Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                        {t('cargaInicial.title')}
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        {t('cargaInicial.subtitle')}
                    </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                    <span aria-hidden="true" className="material-symbols-outlined text-lg">download</span>
                    {t('cargaInicial.downloadBase')}
                </button>
            </header>

            {/* Step 1: Upload */}
            <section className="bg-white dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800 p-8">
                <div className="max-w-3xl mx-auto">
                    <div
                        role="button"
                        tabIndex={0}
                        aria-label={t('cargaInicial.step1.ariaLabel')}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') e.preventDefault(); }}
                        className={`relative group cursor-pointer flex flex-col items-center justify-center border-2 border-dashed ${isDragging ? 'border-primary bg-primary/10' : 'border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20'} rounded-xl py-12 px-6 group-hover:border-primary/50 group-hover:bg-primary/5 dark:group-hover:bg-primary/5 transition-all outline-none focus:ring-2 focus:ring-primary`}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform ${isDragging ? 'bg-primary text-white scale-110' : 'bg-primary/10 text-primary group-hover:scale-110'}`}>
                            <span aria-hidden="true" className="material-symbols-outlined text-4xl">cloud_upload</span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {isDragging ? t('cargaInicial.step1.dropNow') : t('cargaInicial.step1.dragDrop')}
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-center mt-2 text-sm font-medium">
                            {t('cargaInicial.step1.orClick')} <span className="text-primary font-bold">{t('cargaInicial.step1.fromComputer')}</span>
                        </p>
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-bold uppercase tracking-wider mt-4">
                            {t('cargaInicial.step1.supportText')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Step 2: Validation Summary */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Resumo da carga">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-slate-500 text-sm font-medium uppercase tracking-wider">{t('cargaInicial.step2.totalPdvs')}</span>
                        <span aria-hidden="true" className="material-symbols-outlined text-slate-400">list_alt</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">154</p>
                    <p className="text-xs text-slate-500 mt-2">Total de registros no arquivo</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm border-l-4 border-l-green-500">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-green-600 dark:text-green-400 text-sm font-medium uppercase tracking-wider">{t('cargaInicial.step2.new')}</span>
                        <span aria-hidden="true" className="material-symbols-outlined text-green-500">check_circle</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">148</p>
                    <p className="text-xs text-slate-500 mt-2">Prontos para importação imediata</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm border-l-4 border-l-red-500">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-red-600 dark:text-red-400 text-sm font-medium uppercase tracking-wider">{t('cargaInicial.step2.errors')}</span>
                        <span aria-hidden="true" className="material-symbols-outlined text-red-500">error</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 dark:text-white">6</p>
                    <p className="text-xs text-slate-500 mt-2">Registros precisam de correção</p>
                </div>
            </section>

            {/* Step 3: Error List & Data Preview */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Preview Table */}
                <section className="lg:col-span-8 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">{t('cargaInicial.step3.title')}</h2>
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Exibindo os primeiros 5 registros</span>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                        <table className="w-full text-left text-sm border-collapse">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-bold uppercase tracking-wider text-xs">
                                <tr>
                                    <th className="px-6 py-4 w-12 text-center" aria-label="Status do registro">St</th>
                                    <th className="px-6 py-4">{t('cargaInicial.step3.columns.name')}</th>
                                    <th className="px-6 py-4">{t('cargaInicial.step3.columns.cnpj')}</th>
                                    <th className="px-6 py-4">{t('cargaInicial.step3.columns.city')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {/* Row 1 */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 text-center">
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" aria-label="Válido" title="Válido"></span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Loja Centro SP</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">12.345.678/0001-90</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">São Paulo / SP</td>
                                </tr>
                                {/* Row 2 - Error */}
                                <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors bg-red-50/20 dark:bg-red-900/5">
                                    <td className="px-6 py-4 text-center">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" aria-label="Inválido" title="Inválido"></span>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">Loja Barra RJ</td>
                                    <td className="px-6 py-4 text-red-600 dark:text-red-400 font-black tracking-widest text-xs uppercase bg-red-100 dark:bg-red-900/30 px-2 py-1 inline-block rounded-md mt-2">INVÁLIDO</td>
                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">Rio de Janeiro / RJ</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* Quality Check sidebar */}
                <aside className="lg:col-span-4 flex flex-col gap-4">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span aria-hidden="true" className="material-symbols-outlined text-amber-500">warning</span>
                        {t('cargaInicial.qualityCheck.title')}
                    </h2>

                    <div className="flex flex-col gap-3" role="status" aria-live="polite">
                        {/* Error item */}
                        <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-xl flex gap-3 shadow-sm transition-all hover:shadow-md cursor-pointer">
                            <span aria-hidden="true" className="material-symbols-outlined text-red-500">report</span>
                            <div className="flex-1">
                                <p className="text-sm font-black text-red-800 dark:text-red-300">CNPJ Inválido (Linha 12)</p>
                                <p className="text-xs text-red-600 dark:text-red-400 mt-1 font-medium">O formato não segue o padrão nacional. Verifique pontos e traços.</p>
                            </div>
                        </div>

                        {/* Error item */}
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-xl flex gap-3 shadow-sm transition-all hover:shadow-md cursor-pointer">
                            <span aria-hidden="true" className="material-symbols-outlined text-amber-500">warning</span>
                            <div className="flex-1">
                                <p className="text-sm font-black text-amber-800 dark:text-amber-300">Endereço Incompleto (Linha 45)</p>
                                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1 font-medium">O campo &apos;Número&apos; está vazio. Este campo é obrigatório.</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Action Footer */}
            <footer className="flex items-center justify-end gap-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                <button className="px-6 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:ring-2 focus:ring-slate-400 outline-none">
                    {t('cargaInicial.actions.cancel')}
                </button>
                <button className="px-8 py-2.5 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2 outline-none">
                    <span aria-hidden="true" className="material-symbols-outlined text-lg">rocket_launch</span>
                    {t('cargaInicial.actions.finish')}
                </button>
            </footer>
        </div>
    );
}
