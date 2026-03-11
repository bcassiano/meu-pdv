"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { ConfigModal } from "@/components/dashboard/ConfigModal";

// Definição dos tipos de card
interface CardData {
    id: string;
    title: string;
    value: string;
    trend?: string;
    subtitle?: string;
    icon: string;
    color: string;
    bg: string;
    large?: boolean;
    dark?: boolean;
    checked: boolean;
}

const INITIAL_CARDS: CardData[] = [
    { id: "atividades", title: "Atividades Promotores", value: "3.492", trend: "+12.5%", icon: "assignment_ind", color: "text-blue-500", bg: "bg-blue-500/10", large: true, checked: true },
    { id: "equipeSP", title: "Equipe São Paulo", value: "145", subtitle: "Promotores Ativos", icon: "group", color: "text-emerald-500", bg: "bg-emerald-500/10", checked: true },
    { id: "equipeVale", title: "Equipe Vale e Litoral", value: "86", subtitle: "Promotores Ativos", icon: "groups", color: "text-teal-500", bg: "bg-teal-500/10", checked: true },
    { id: "ruptura", title: "Ruptura - Estoque - Preço", value: "Monitoramento", subtitle: "98% conformidade", icon: "inventory", color: "text-indigo-500", bg: "bg-indigo-500/10", dark: true, large: true, checked: true },
    { id: "pontosExtras", title: "Pontos Extras", value: "1.204", trend: "+5.2%", icon: "stars", color: "text-amber-500", bg: "bg-amber-500/10", checked: true },
    { id: "lojasPontosExtras", title: "Lojas com pontos extras", value: "482", subtitle: "Cobertura de 68%", icon: "storefront", color: "text-orange-500", bg: "bg-orange-500/10", checked: true },
];

export default function DashboardsPage(): JSX.Element {
    const [isConfigOpen, setIsConfigOpen] = useState(false);
    const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
    const [tempCards, setTempCards] = useState<CardData[]>(INITIAL_CARDS);

    // Carregar preferências do usuário
    useEffect(() => {
        const stored = localStorage.getItem('dashboard_preferences');
        if (stored) {
            try {
                const prefs = JSON.parse(stored);
                const updatedCards = INITIAL_CARDS.map(card => ({
                    ...card,
                    checked: prefs.includes(card.id)
                }));
                setCards(updatedCards);
                setTempCards(updatedCards);
            } catch (e) {
                console.error("Erro ao carregar preferências", e);
            }
        }
    }, []);

    const toggleCardVisibility = (id: string) => {
        setTempCards(prev => prev.map(c => c.id === id ? { ...c, checked: !c.checked } : c));
    };

    const handleSaveConfig = () => {
        setCards(tempCards);
        const activeIds = tempCards.filter(c => c.checked).map(c => c.id);
        localStorage.setItem('dashboard_preferences', JSON.stringify(activeIds));
        setIsConfigOpen(false);
    };

    const handleCancelConfig = () => {
        setTempCards(cards);
        setIsConfigOpen(false);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Global Unified Header */}
                <Header
                    title="Dashboards"
                    icon="dashboard"
                    navigation={[
                        { label: "Overview", href: "/dashboards", active: true, icon: "analytics" }
                    ]}
                />

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-8 md:p-10 2xl:p-14 pb-24 scroll-smooth">
                    <div className="max-w-[1400px] mx-auto space-y-10">
                        {/* Title & Introduction */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    Visão Global
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                    Performance <br /> <span className="text-primary italic">Operacional</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
                                    Acompanhe os principais indicadores de atividades, cobertura de equipes e integridade de merchandising em tempo real.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button 
                                    onClick={() => setIsConfigOpen(true)}
                                    className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-200 font-bold text-sm hover:border-sidebar hover:text-sidebar shadow-sm transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                                >
                                    <span className="material-symbols-outlined text-[20px]">tune</span>
                                    Personalizar
                                </button>
                                <button className="px-8 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                    <span className="material-symbols-outlined text-[20px]">download</span>
                                    Exportar
                                </button>
                            </div>
                        </div>

                        {/* Bento Grid layout for Dashboard Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {cards.filter(card => card.checked).map((card) => {
                                const isPontosExtras = card.id === "pontosExtras";
                                const isRuptura = card.id === "ruptura";
                                const CardComponent = (
                                    <DashboardCard 
                                        key={card.id}
                                        {...card}
                                    >
                                        {isRuptura && (
                                            <div className="grid grid-cols-3 gap-4 mt-6">
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Ruptura</p>
                                                    <p className="text-2xl font-black text-white">4.2%</p>
                                                </div>
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Estoque</p>
                                                    <p className="text-2xl font-black text-white">92%</p>
                                                </div>
                                                <div className="bg-white/5 rounded-xl p-4 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                                                    <p className="text-indigo-300 text-xs font-bold uppercase tracking-wider mb-1">Preço</p>
                                                    <p className="text-2xl font-black text-white">99%</p>
                                                </div>
                                            </div>
                                        )}
                                        {isPontosExtras && (
                                            <div className="absolute inset-x-0 bottom-0 p-8 flex justify-end pointer-events-none">
                                                <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-white/5 flex items-center justify-center pointer-events-auto hover:scale-110 hover:text-amber-500 transition-all">
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </div>
                                            </div>
                                        )}
                                        {isRuptura && (
                                            <div className="absolute inset-x-0 bottom-0 p-8 flex justify-end pointer-events-none">
                                                <div className="h-10 w-10 rounded-full bg-indigo-500/20 shadow-md border border-indigo-500/30 flex items-center justify-center pointer-events-auto hover:scale-110 hover:text-indigo-300 text-indigo-400 transition-all">
                                                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                                </div>
                                            </div>
                                        )}
                                    </DashboardCard>
                                );

                                if (isPontosExtras) {
                                    return (
                                        <a href="/dashboards/pontos-extras" key={card.id} className="block group xl:col-span-1">
                                            {CardComponent}
                                        </a>
                                    );
                                }

                                if (isRuptura) {
                                    return (
                                        <a href="/dashboards/indicadores" key={card.id} className="block group md:col-span-2">
                                            {CardComponent}
                                        </a>
                                    );
                                }

                                return CardComponent;
                            })}
                        </div>

                        {cards.filter(c => c.checked).length === 0 && (
                            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] bg-slate-50/50 dark:bg-slate-900/50 space-y-6">
                                <div className="h-20 w-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-4xl text-slate-400">widgets</span>
                                </div>
                                <div className="text-center">
                                    <p className="text-slate-900 dark:text-white font-black text-xl">Dashboard Vazio</p>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-xs mx-auto mt-2">Clique em &apos;Personalizar&apos; para adicionar componentes ao seu painel.</p>
                                </div>
                                <button 
                                    onClick={() => setIsConfigOpen(true)}
                                    className="px-8 py-3 bg-primary text-white font-black rounded-xl shadow-lg hover:scale-105 transition-all text-sm"
                                >
                                    Personalizar Agora
                                </button>
                            </div>
                        )}

                        <div className="h-12" />
                    </div>
                </div>
            </main>

            {/* Modal de Configuração */}
            <ConfigModal 
                isOpen={isConfigOpen}
                onClose={handleCancelConfig}
                availableCards={tempCards.map(c => ({ id: c.id, title: c.title, checked: c.checked }))}
                onToggleCard={toggleCardVisibility}
                onSave={handleSaveConfig}
            />

        </div>
    );
}
