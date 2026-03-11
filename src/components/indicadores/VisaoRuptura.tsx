import React from 'react';

export function VisaoRuptura() {
    return (
        <div className="space-y-6">
            {/* Header com Ações e Sync bar mesclados num visual limpo */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <span className="material-symbols-outlined text-primary text-xl">inventory_2</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Análise de Rupturas de Estoque</h2>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400">Monitore e gerencie produtos indisponíveis nos pontos de venda em tempo real.</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-amber/10 border border-accent-amber/20">
                        <span className="material-symbols-outlined text-amber-500 animate-spin text-sm">sync</span>
                        <span className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase tracking-wider">Sincronizando 85%</span>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-md">
                        <span className="material-symbols-outlined text-xl">add</span>
                        Nova Auditoria
                    </button>
                </div>
            </div>

            {/* Cascade Filters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 p-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">map</span> Regional
                    </label>
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary h-9 px-3">
                        <option>Todas as Regionais</option>
                        <option>Sudeste</option>
                        <option>Sul</option>
                        <option>Nordeste</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">hub</span> Rede
                    </label>
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary h-9 px-3">
                        <option>Todas as Redes</option>
                        <option>Grupo Pão de Açúcar</option>
                        <option>Carrefour</option>
                    </select>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">store</span> Loja
                    </label>
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary h-9 px-3">
                        <option>Todas as Lojas</option>
                        <option>Loja 101 - Pinheiros</option>
                        <option>Loja 204 - Jardins</option>
                    </select>
                </div>
                 <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">category</span> Categoria
                    </label>
                    <select className="w-full bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary h-9 px-3">
                        <option>Limpeza</option>
                        <option>Alimentos</option>
                    </select>
                </div>
                <div className="flex items-end">
                    <button className="w-full h-9 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-lg">filter_list_off</span>
                        Limpar
                    </button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-red-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-red-500">error</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10">Total Rupturas</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 relative z-10">1.284</p>
                    <span className="text-xs text-red-500 font-medium flex items-center gap-0.5 mt-2 relative z-10">
                        <span className="material-symbols-outlined text-sm">trending_up</span> +12% vs ontem
                    </span>
                </div>
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-orange-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-orange-500">store</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10">Lojas c/ Problema</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 relative z-10">42</p>
                    <span className="text-xs text-green-500 font-medium flex items-center gap-0.5 mt-2 relative z-10">
                        <span className="material-symbols-outlined text-sm">trending_down</span> -3% vs ontem
                    </span>
                </div>
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-primary">category</span>
                    </div>
                    <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10">SKUs Afetados</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 relative z-10">156</p>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-0.5 mt-2 relative z-10">
                         <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1"></span> Estável
                    </span>
                </div>
                <div className="bg-white dark:bg-slate-800/50 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-6xl text-emerald-500">payments</span>
                    </div>
                     <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider relative z-10">Valor em Risco</p>
                    <p className="text-3xl font-black text-slate-900 dark:text-white mt-1 relative z-10">R$ 42.5k</p>
                    <span className="text-xs text-red-500 font-medium flex items-center gap-0.5 mt-2 relative z-10">
                        <span className="material-symbols-outlined text-sm">priority_high</span> Crítico
                    </span>
                </div>
            </div>

            {/* Dense Data Table (Auditoria de Rupturas Críticas style) */}
            <div className="bg-white dark:bg-slate-800/40 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">SKU / Produto</th>
                                <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Loja (PDV)</th>
                                <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                                <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Justificativa</th>
                                <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Últ. Atualização</th>
                                <th className="px-4 py-4 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                            {[
                                { sku: "#45821", name: "Arroz Agulhinha 5kg", cat: "Mercearia", store: "Supermercado Alvorada", status: "Ruptura", just: "Atraso Entrega", date: "Hoje 14:15", color: "red" },
                                { sku: "#88231", name: "Detergente Líquido 500ml", cat: "Limpeza", store: "Varejo Central", status: "Estoque Baixo", just: "Demanda Alta", date: "Hoje 11:50", color: "orange" },
                                { sku: "#32190", name: "Leite Condensado 395g", cat: "Doces", store: "Mercado Popular MG", status: "Ruptura", just: "Falha Logística", date: "Ontem 09:12", color: "red" },
                                { sku: "#12765", name: "Café Torrado 500g", cat: "Bebidas", store: "Loja Conveniência Sul", status: "Ruptura", just: "Erro Inventário", date: "Ontem 16:40", color: "red" },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                <span className="text-xs font-mono text-slate-400">{row.sku}</span>
                                                {row.name}
                                            </span>
                                            <span className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{row.cat}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-slate-700 dark:text-slate-300 text-sm">{row.store}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                            row.color === 'red' 
                                            ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
                                            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                        }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${row.color === 'red' ? 'bg-red-500' : 'bg-orange-500'}`}></span>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">{row.just}</td>
                                    <td className="px-4 py-4 text-sm text-slate-500 whitespace-nowrap">{row.date}</td>
                                    <td className="px-4 py-4 text-right">
                                        <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/50 text-sm">
                    <p className="text-slate-500">Mostrando <span className="font-bold text-slate-700 dark:text-slate-300">1</span> a <span className="font-bold text-slate-700 dark:text-slate-300">4</span> de <span className="font-bold text-slate-700 dark:text-slate-300">1.284</span> rup.</p>
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
