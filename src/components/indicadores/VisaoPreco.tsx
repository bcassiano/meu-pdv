import React from 'react';

export function VisaoPreco() {
    return (
        <div className="space-y-6">
            {/* Header com Ações e Sync bar */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="material-symbols-outlined text-primary text-xl">analytics</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Posicionamento de Preços</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Análise competitiva e monitoramento de mercado em tempo real</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">filter_list</span>
                        Filtros Avançados
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/25 transition-colors">
                        <span className="material-symbols-outlined text-[20px]">download</span>
                        Exportar Relatório
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Card 1 */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-primary">payments</span>
                    </div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-2 bg-blue-50 dark:bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +1.2%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 relative z-10">Preço Médio Global</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white relative z-10">R$ 45,90</h3>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-orange-500">leaderboard</span>
                    </div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-2 bg-orange-50 dark:bg-orange-500/10 rounded-lg text-orange-500">
                            <span className="material-symbols-outlined">leaderboard</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400 px-2 py-1 rounded">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            +0.5%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 relative z-10">Gap Médio vs Líder</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white relative z-10">-5.2%</h3>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-purple-500">inventory_2</span>
                    </div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-2 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-500">
                            <span className="material-symbols-outlined">inventory_2</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2 py-1 rounded">
                            0%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 relative z-10">Produtos Monitorados</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white relative z-10">1.250</h3>
                </div>

                {/* Card 4 */}
                 <div className="bg-white dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-red-500">notification_important</span>
                    </div>
                    <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-red-500">
                            <span className="material-symbols-outlined">notification_important</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                            +2 Novos
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1 relative z-10">Alertas Ativos</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white relative z-10">34</h3>
                </div>
            </div>

            {/* Main Content Area: Charts & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Preço Médio por Rede</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Comparativo últimos 30 dias</p>
                        </div>
                        <select className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm rounded-lg focus:ring-primary h-9 px-3">
                            <option>Categorias Principais</option>
                            <option>Eletrodomésticos</option>
                            <option>Eletrônicos</option>
                        </select>
                    </div>
                    
                    {/* Simulated Chart Container */}
                    <div className="h-64 w-full flex items-end justify-between gap-4 px-2">
                        {/* Bar Group 1 */}
                        <div className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                            <div className="w-full flex items-end justify-center gap-1 h-48 relative">
                                <div className="w-4 md:w-6 lg:w-8 bg-primary rounded-t-sm h-[70%] group-hover:opacity-80 transition-opacity relative group/bar">
                                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">R$ 42,00</div>
                                </div>
                                <div className="w-4 md:w-6 lg:w-8 bg-slate-300 dark:bg-slate-700 rounded-t-sm h-[65%]"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center truncate w-full">Minha Loja</span>
                        </div>
                        {/* Bar Group 2 */}
                        <div className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                            <div className="w-full flex items-end justify-center gap-1 h-48 relative">
                                <div className="w-4 md:w-6 lg:w-8 bg-primary/40 dark:bg-primary/20 rounded-t-sm h-[85%] group-hover:opacity-80 transition-opacity"></div>
                                <div className="w-4 md:w-6 lg:w-8 bg-slate-300 dark:bg-slate-700 rounded-t-sm h-[78%]"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center truncate w-full">Concorrente A</span>
                        </div>
                        {/* Bar Group 3 */}
                        <div className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                            <div className="w-full flex items-end justify-center gap-1 h-48 relative">
                                <div className="w-4 md:w-6 lg:w-8 bg-primary/40 dark:bg-primary/20 rounded-t-sm h-[60%] group-hover:opacity-80 transition-opacity"></div>
                                <div className="w-4 md:w-6 lg:w-8 bg-slate-300 dark:bg-slate-700 rounded-t-sm h-[55%]"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center truncate w-full">Concorrente B</span>
                        </div>
                        {/* Bar Group 4 */}
                         <div className="flex flex-col items-center gap-2 w-full group cursor-pointer">
                            <div className="w-full flex items-end justify-center gap-1 h-48 relative">
                                <div className="w-4 md:w-6 lg:w-8 bg-primary/40 dark:bg-primary/20 rounded-t-sm h-[95%] group-hover:opacity-80 transition-opacity"></div>
                                <div className="w-4 md:w-6 lg:w-8 bg-slate-300 dark:bg-slate-700 rounded-t-sm h-[88%]"></div>
                            </div>
                            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 text-center truncate w-full">Líder Mkt.</span>
                        </div>
                    </div>
                </div>

                {/* Alerts List */}
                <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col h-full overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="material-symbols-outlined text-red-500">warning</span>
                            Alertas Críticos
                        </h3>
                        <a href="#" className="text-xs font-bold text-primary hover:text-blue-400">Ver todos</a>
                    </div>
                    
                    <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1">
                        <div className="p-3 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 flex gap-3 items-start">
                            <div className="size-2 mt-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Smart TV 55&quot; 4K UHD</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Preço <strong className="text-red-500 dark:text-red-400">15% acima</strong> da concorrência (Líder).</p>
                            </div>
                        </div>
                        
                        <div className="p-3 rounded-lg border border-orange-100 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 flex gap-3 items-start">
                             <div className="size-2 mt-1.5 rounded-full bg-orange-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Smartphone Galaxy S23</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Margem reduzida para <strong className="text-orange-500 dark:text-orange-400">2.5%</strong>.</p>
                            </div>
                        </div>

                        <div className="p-3 rounded-lg border border-red-100 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 flex gap-3 items-start">
                             <div className="size-2 mt-1.5 rounded-full bg-red-500 flex-shrink-0"></div>
                            <div>
                                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Notebook Gamer Dell G15</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Perda de Buy Box no Marketplace A.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Price Table Section */}
            <div className="bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Gap de Preço por Produto</h3>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Filtrar produtos..." className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-lg px-3 py-2 focus:ring-primary h-9 w-full md:w-64" />
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm min-w-[800px]">
                        <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-bold uppercase text-xs border-b border-slate-200 dark:border-slate-800 tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Produto</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4 text-right">Nosso Preço</th>
                                <th className="px-6 py-4 text-right">Menor Preço Conc.</th>
                                <th className="px-6 py-4 text-right">Gap (%)</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">iPhone 14 Pro 256GB</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Smartphones</td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">R$ 8.299,00</td>
                                <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400">R$ 7.999,00</td>
                                <td className="px-6 py-4 text-right font-bold text-red-500">+3.75%</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                                        Perdendo
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-primary hover:text-blue-400 font-semibold text-sm transition-colors">Ajustar</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Console PlayStation 5</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Games</td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">R$ 3.899,00</td>
                                <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400">R$ 3.999,00</td>
                                <td className="px-6 py-4 text-right font-bold text-emerald-500">-2.50%</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                        Ganhando
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-200 font-semibold text-sm transition-colors">Detalhes</button>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">Monitor Gamer LG 27&quot;</td>
                                <td className="px-6 py-4 text-slate-500 dark:text-slate-400">Informática</td>
                                <td className="px-6 py-4 text-right font-medium text-slate-900 dark:text-white">R$ 1.450,00</td>
                                <td className="px-6 py-4 text-right text-slate-500 dark:text-slate-400">R$ 1.445,00</td>
                                <td className="px-6 py-4 text-right font-bold text-orange-500">+0.35%</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400">
                                        Neutro
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-slate-400 hover:text-slate-200 font-semibold text-sm transition-colors">Detalhes</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/50 text-sm">
                    <p className="text-slate-500">Mostrando <span className="font-bold text-slate-700 dark:text-slate-300">1</span> a <span className="font-bold text-slate-700 dark:text-slate-300">3</span> de <span className="font-bold text-slate-700 dark:text-slate-300">48</span> produtos.</p>
                    <div className="flex gap-2">
                         <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 text-slate-600 dark:text-slate-300" disabled>Anterior</button>
                         <button className="px-3 py-1 bg-primary text-white rounded-lg font-bold">1</button>
                         <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">2</button>
                         <button className="px-3 py-1 border border-slate-200 dark:border-slate-700 rounded-lg font-medium hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">Próximo</button>
                    </div>
                </div>
            </div>
            
            <div className="h-6"></div>
        </div>
    );
}
