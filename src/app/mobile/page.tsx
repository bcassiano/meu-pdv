import React from 'react';

export default function MobileHubPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 dark:bg-slate-950">
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">Módulos <span className="text-orange-500 italic">Mobile</span></h1>
            <p className="text-slate-500 font-medium mb-12">Portal de Aplicativos Móveis Integrados</p>

            <section className="w-full max-w-5xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <a href="/promotor" className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-orange-500 hover:shadow-lg hover:-translate-y-1 transition-all group flex flex-col items-center text-center">
                        <div className="bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-3xl">storefront</span>
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2">Promotor Connect</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Gestão de Check-in, Coleta de Preços e Rotas</p>
                    </a>

                    {/* Futuros Módulos Podem Ser Adicionados Aqui (ex: Logística, Inventário, etc) */}
                    <div className="bg-slate-100 dark:bg-slate-900/50 p-6 rounded-xl border border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center text-center opacity-60">
                        <div className="bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors">
                            <span className="material-symbols-outlined text-3xl">add</span>
                        </div>
                        <h3 className="font-bold text-slate-500 dark:text-slate-400 mb-2">Novo Módulo</h3>
                        <p className="text-sm text-slate-400 dark:text-slate-500">Em Breve</p>
                    </div>
                </div>
            </section>

            <div className="mt-12">
                <a href="/" className="text-slate-500 hover:text-orange-500 flex items-center gap-2 font-bold transition-colors">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Voltar para Home
                </a>
            </div>
        </main>
    );
}
