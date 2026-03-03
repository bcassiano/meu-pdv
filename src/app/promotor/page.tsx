import React from 'react';

export default function PromotorHubPage(): JSX.Element {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 dark:bg-slate-950">
            <div className="flex flex-col items-center mb-12">
                <div className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-3xl">storefront</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-2 text-slate-900 dark:text-white">Promotor Connect</h1>
                <p className="text-slate-500 font-medium text-center">Ferramentas de campo exclusivas para o promotor</p>
            </div>

            <section className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="/promotor/agenda" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
                        <div className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">calendar_today</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2">Agenda Diária</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Rota de Lojas e Check-in</p>
                    </a>

                    <a href="/promotor/auditoria" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
                        <div className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">inventory</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2">Formulário de Coleta</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Preços e Estoque (Dark Mode)</p>
                    </a>

                    <a href="/promotor/sincronizacao" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
                        <div className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">sync</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2">Fila de Sync</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Gestão Offline-First</p>
                    </a>
                </div>
            </section>

            <div className="mt-12">
                <a href="/mobile" className="text-slate-500 hover:text-orange-500 flex items-center gap-2 font-bold transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Voltar para Módulos Mobile
                </a>
            </div>
        </main>
    );
}
