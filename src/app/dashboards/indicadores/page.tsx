"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
// Componentes UI de análise isolados
import { VisaoRuptura } from "@/components/indicadores/VisaoRuptura";
import { VisaoPreco } from "@/components/indicadores/VisaoPreco";

type TabType = 'ruptura' | 'estoque' | 'preco';

export default function IndicadoresHubPage(): JSX.Element {
    const [activeTab, setActiveTab] = useState<TabType>('ruptura');

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Global Unified Header */}
                <Header
                    title="Indicadores PDV"
                    icon="monitoring"
                    navigation={[
                        { label: "Overview", href: "/dashboards", active: false },
                        { label: "Indicadores", href: "/dashboards/indicadores", active: true, icon: "analytics" }
                    ]}
                />

                {/* Sub-Header Tabs (Glassmorphism inspired by Stitch structure) */}
                <div className="px-8 mt-6">
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                        <div className="flex gap-8">
                            <button 
                                onClick={() => setActiveTab('ruptura')}
                                className={`pb-4 flex items-center gap-2 font-semibold transition-all border-b-2 relative ${
                                    activeTab === 'ruptura' 
                                        ? "border-primary text-primary" 
                                        : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                Visão Rupturas
                                {activeTab === 'ruptura' && (
                                    <span className="absolute -top-1 -right-3 flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                    </span>
                                )}
                            </button>
                            <button 
                                onClick={() => setActiveTab('estoque')}
                                className={`pb-4 flex items-center gap-2 font-semibold transition-all border-b-2 ${
                                    activeTab === 'estoque' 
                                        ? "border-emerald-500 text-emerald-500" 
                                        : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">warehouse</span>
                                Estoque (Em Breve)
                            </button>
                            <button 
                                onClick={() => setActiveTab('preco')}
                                className={`pb-4 flex items-center gap-2 font-semibold transition-all border-b-2 ${
                                    activeTab === 'preco' 
                                        ? "border-amber-500 text-amber-500" 
                                        : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                }`}
                            >
                                <span className="material-symbols-outlined text-[20px]">sell</span>
                                Gestão de Preços
                            </button>
                        </div>

                        {/* Ações Rápidas do Hub */}
                        <div className="flex items-center gap-3 pb-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm">
                                <span className="material-symbols-outlined text-lg">picture_as_pdf</span>
                                Relatório PDF
                            </button>
                            {activeTab === 'ruptura' && (
                                <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg text-sm font-semibold transition-all shadow-sm group hover:scale-105">
                                    <span className="material-symbols-outlined text-lg group-hover:animate-spin">filter_alt</span>
                                    Filtros Avançados
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-8 scroll-smooth section-content">
                    {activeTab === 'ruptura' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <VisaoRuptura />
                        </div>
                    )}
                    
                    {activeTab === 'estoque' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out h-[60vh] flex flex-col items-center justify-center text-slate-400">
                             <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-4xl text-emerald-500/50">warehouse</span>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Módulo em Desenvolvimento</h2>
                            <p>A visão aprofundada de estoque chegará nas próximas atualizações.</p>
                        </div>
                    )}

                    {activeTab === 'preco' && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
                            <VisaoPreco />
                        </div>
                    )}
                </div>
            </main>

        </div>
    );
}
