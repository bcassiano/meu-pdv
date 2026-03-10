"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// O id seria recebido via props params do Next.js App Router, exemplo abaixo:
// export default function DetalhesAuditoriaPage({ params }: { params: { id: string } })

export default function DetalhesAuditoriaPage(): JSX.Element {
    const [selectedTab, setSelectedTab] = useState("all");

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Detalhes da Auditoria"
                    icon="preview"
                    navigation={[
                        { label: "Overview", href: "/dashboards", active: false },
                        { label: "Galeria de Fotos", href: "/dashboards/pontos-extras", active: false },
                        { label: "Detalhes do Ponto Extra", href: "#", active: true, icon: "analytics" }
                    ]}
                />

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 2xl:p-10 pb-24 scroll-smooth">
                    <div className="max-w-[1600px] mx-auto space-y-6">

                        {/* Top Bar with Tags and Actions */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8 mb-6">
                            <div className="flex items-center gap-4">
                                <a href="/dashboards/pontos-extras" className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                </a>
                                <div>
                                    <h1 className="text-2xl font-black text-slate-800 dark:text-white flex items-center gap-3">
                                        Auditoria #9482
                                        <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold ring-1 ring-emerald-500/20">Finalizada</span>
                                    </h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Realizada em 14 de Outubro, 2023 às 14:30</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">print</span>
                                    Imprimir Relatório
                                </button>
                                <button className="px-4 py-2 bg-[#6366f1] text-white rounded-xl font-bold flex items-center gap-2 hover:bg-[#4f46e5] shadow-lg shadow-indigo-500/20 transition-all active:scale-95">
                                    <span className="material-symbols-outlined text-sm">download</span>
                                    Exportar PDF
                                </button>
                            </div>
                        </div>

                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Promotor</p>
                                        <p className="font-bold text-slate-800 dark:text-white text-lg">Carlos Eduardo</p>
                                        <p className="text-slate-400 text-sm mt-1">ID: PRO-8829</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                        <span className="material-symbols-outlined">badge</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Loja / PDV</p>
                                        <p className="font-bold text-slate-800 dark:text-white text-lg">Carrefour Osasco</p>
                                        <p className="text-slate-400 text-sm mt-1">Av. dos Autonomistas, 1542</p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-500">
                                        <span className="material-symbols-outlined">storefront</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">SKUs Coletados</p>
                                        <p className="font-black text-slate-800 dark:text-white text-3xl">42</p>
                                        <p className="text-emerald-500 text-sm mt-1 flex items-center gap-1 font-medium">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span>
                                            100% da meta
                                        </p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                        <span className="material-symbols-outlined">category</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Rupturas</p>
                                        <p className="font-black text-slate-800 dark:text-white text-3xl">3</p>
                                        <p className="text-rose-500 text-sm mt-1 flex items-center gap-1 font-medium">
                                            <span className="material-symbols-outlined text-[16px]">warning</span>
                                            Atenção necessária
                                        </p>
                                    </div>
                                    <div className="h-12 w-12 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
                                        <span className="material-symbols-outlined">inventory_2</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                            {/* Fotografia e Evidências */}
                            <div className="xl:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                                <span className="material-symbols-outlined">photo_library</span>
                                            </div>
                                            <h2 className="text-xl font-bold text-slate-800 dark:text-white">Evidências Fotográficas</h2>
                                        </div>
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setSelectedTab("all")}
                                                className={`px-4 py-2 text-sm font-bold rounded-xl transition-colors ${selectedTab === 'all' ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                                            >
                                                Ver Todas (5)
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {/* Photo 1 */}
                                            <div className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer">
                                                    <img src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=800&q=80" alt="Gondola frontal" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                        <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md self-center mb-auto border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all">
                                                            <span className="material-symbols-outlined">zoom_in</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-slate-800 dark:text-white">Fachada do Corredor Principal</h3>
                                                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg border border-blue-200 dark:border-blue-500/20">Entrada</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 14:32</span>
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">location_on</span> Validação GPS OK</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Photo 2 */}
                                            <div className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer">
                                                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" alt="Azeites" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                        <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md self-center mb-auto border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all">
                                                            <span className="material-symbols-outlined">zoom_in</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-slate-800 dark:text-white">Ponto Extra - Azeites</h3>
                                                        <span className="px-2 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold rounded-lg border border-amber-200 dark:border-amber-500/20">Ilha</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 14:38</span>
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Preço Visível</span>
                                                    </div>
                                                </div>
                                            </div>

                                             {/* Photo 3 */}
                                             <div className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer">
                                                    <img src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=800&q=80" alt="Produtos Variados" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                        <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md self-center mb-auto border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all">
                                                            <span className="material-symbols-outlined">zoom_in</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-slate-800 dark:text-white">Ponta de Gôndola - Ofertas</h3>
                                                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 text-xs font-bold rounded-lg border border-purple-200 dark:border-purple-500/20">Ponta de Gôndola</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 14:45</span>
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">check_circle</span> Limpo e Organizado</span>
                                                    </div>
                                                </div>
                                            </div>

                                             {/* Photo 4 */}
                                             <div className="group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                                                <div className="relative aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800 cursor-pointer">
                                                    <img src="https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=800&q=80" alt="Adega" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                        <button className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md self-center mb-auto border border-white/40 flex items-center justify-center text-white hover:scale-110 hover:bg-white/30 transition-all">
                                                            <span className="material-symbols-outlined">zoom_in</span>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-slate-800 dark:text-white">Adega Secundária</h3>
                                                        <span className="px-2 py-1 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold rounded-lg border border-rose-200 dark:border-rose-500/20">Ruptura</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400">
                                                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 14:50</span>
                                                        <span className="flex items-center gap-1 text-rose-500"><span className="material-symbols-outlined text-[14px]">warning</span> Faltando SKU principal</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="mt-6 flex justify-center">
                                            <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm w-full md:w-auto flex justify-center items-center gap-2">
                                                <span>Carregar mais fotos (1)</span>
                                                <span className="material-symbols-outlined text-sm">expand_more</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Detalhes Laterais (Geolocalização / Tabela SKUs) */}
                            <div className="space-y-6">
                                {/* Geolocalização */}
                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-teal-100 dark:bg-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined">map</span>
                                        </div>
                                        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Geolocalização</h2>
                                    </div>
                                    <div className="p-1">
                                        <div className="h-64 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden relative border border-white dark:border-slate-900">
                                             <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&h=400" alt="Map View" className="w-full h-full object-cover" />
                                            {/* Pino do Mapa Simulando o ponto */}
                                            <div className="absolute top-1/2 left-1/2 -ml-3 -mt-6 text-rose-500 drop-shadow-md pb-6 flex flex-col items-center animate-bounce">
                                                <div className="h-6 w-6 bg-rose-500 text-white rounded-full flex items-center justify-center border-2 border-white text-[10px] font-black pointer-events-none">1</div>
                                                <div className="w-1.5 h-1.5 bg-black/30 rounded-full mt-1 blur-[1px]"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-5 bg-slate-50 dark:bg-slate-800/50">
                                        <div className="flex items-start gap-3">
                                            <span className="material-symbols-outlined text-teal-500 mt-1">my_location</span>
                                            <div>
                                                <p className="font-bold text-slate-800 dark:text-white text-sm">Check-in Válido</p>
                                                <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">A localização do promotor coincidiu com o raio de 150m da loja cadastrada.</p>
                                                <p className="text-xs font-mono text-slate-400 mt-2 bg-slate-200 dark:bg-slate-900 inline-block px-2 py-1 rounded">-23.5329, -46.7925</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* SKUs Coletados Mini Tabela */}
                                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
                                    <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                            <span className="material-symbols-outlined">receipt_long</span>
                                        </div>
                                        <h2 className="text-lg font-bold text-slate-800 dark:text-white">Resumo de SKUs</h2>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs">
                                                <tr>
                                                    <th className="px-5 py-3 font-bold">Produto</th>
                                                    <th className="px-5 py-3 font-bold text-right">Preço</th>
                                                    <th className="px-5 py-3 font-bold text-center">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 text-slate-700 dark:text-slate-300">
                                                <tr>
                                                    <td className="px-5 py-3 font-medium">Café Tradicional 500g</td>
                                                    <td className="px-5 py-3 text-right">R$ 18,90</td>
                                                    <td className="px-5 py-3 text-center"><span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="px-5 py-3 font-medium">Azeite Extra Virgem 500ml</td>
                                                    <td className="px-5 py-3 text-right text-rose-500 font-bold">--</td>
                                                    <td className="px-5 py-3 text-center"><span className="material-symbols-outlined text-rose-500 text-[18px]">cancel</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="px-5 py-3 font-medium">Achocolatado 400g</td>
                                                    <td className="px-5 py-3 text-right">R$ 8,49</td>
                                                    <td className="px-5 py-3 text-center"><span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span></td>
                                                </tr>
                                                <tr>
                                                    <td className="px-5 py-3 font-medium">Feijão Carioca 1kg</td>
                                                    <td className="px-5 py-3 text-right">R$ 7,99</td>
                                                    <td className="px-5 py-3 text-center"><span className="material-symbols-outlined text-emerald-500 text-[18px]">check_circle</span></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                                       <button className="text-[#6366f1] text-sm font-bold hover:underline">Ver todos os 42 SKUs detectados</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
