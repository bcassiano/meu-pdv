"use client";

import React from "react";

export default function PromotorAgendaPage() {
    return (
        <div className="bg-[#f5f6f8] dark:bg-[#101622] font-display text-slate-900 dark:text-slate-100 antialiased selection:bg-[#0d59f2]/20">
            <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
                <div className="bg-amber-600 text-white px-4 py-3 flex items-center justify-center gap-2 font-medium text-sm w-full shadow-sm">
                    <span className="material-symbols-outlined text-[20px]">cloud_off</span>
                    <span>3 registros pendentes - Conexão instável</span>
                </div>

                <div className="layout-container flex h-full grow flex-col">
                    <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex items-center justify-between h-16">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 bg-[#0d59f2]/10 rounded flex items-center justify-center text-[#0d59f2]">
                                        <span className="material-symbols-outlined">dataset</span>
                                    </div>
                                    <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Promotor Connect</h1>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="hidden md:flex items-center gap-2">
                                        <button className="group relative flex h-10 items-center justify-center rounded px-4 bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-sm font-bold cursor-not-allowed" disabled>
                                            <span className="mr-2">Minha Performance</span>
                                            <span className="bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider font-semibold">EM BREVE</span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="flex h-10 items-center justify-center rounded px-4 bg-[#0d59f2] text-white text-sm font-bold hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#0d59f2]">
                                            Sincronizar Agora
                                        </button>
                                        <button aria-label="Status de Sincronização" className="flex h-10 w-10 items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            <span className="material-symbols-outlined">sync_problem</span>
                                        </button>
                                    </div>
                                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                                    <div className="bg-slate-200 dark:bg-slate-700 bg-center bg-no-repeat bg-cover rounded-full size-10 hidden sm:block" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBY8wtRZkUr-kS4_K1KM9iHjt3qWqeq3ca3S_G5NlwJJ14knr3r1GUmnyR6l8sy9N7sVimR6AMfsgyDNzoSxNSuIxUkt_DoKDXkD03bvUxQQ_X7VOYlKuoLNagBLXaDsTaTvA5Xg_BS7fDet6slieHWbqnkibgUPJLjhet9v_DuauiSaECdQXjjtxp58LnDI_pVEaXLLOlBvc1uIZA7jKOOi0YaQCnGszU4Y4J3j7dBcvUa7AfcK2bJ3tZ71syeUklJ_Nily9YoECw')" }}>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 w-full flex justify-center py-6 sm:py-10 px-4 sm:px-6 mb-20 sm:mb-0">
                        <div className="w-full max-w-[960px] flex flex-col gap-6">
                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                                <div>
                                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Rota de Hoje</h2>
                                    <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">24 de Outubro de 2023</p>
                                </div>
                                <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded text-sm font-semibold text-slate-700 dark:text-slate-300">
                                    5 Lojas Atribuídas
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {/* Store Card 1 */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-5 shadow-sm hover:border-[#0d59f2]/50 transition-colors group">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 group-hover:bg-[#0d59f2]/10 group-hover:text-[#0d59f2] transition-colors">
                                                <span className="material-symbols-outlined text-[24px]">storefront</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Walmart Supercenter #324</h3>
                                                <div className="flex items-center gap-1 mt-1 text-slate-500 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                    <p className="text-sm font-medium">8500 Washington Blvd, Roseville, CA</p>
                                                </div>
                                            </div>
                                        </div>
                                        <a href="/promotor/auditoria" className="w-full sm:w-auto h-12 sm:h-10 mt-3 sm:mt-0 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 flex items-center justify-center text-center">
                                            Check-in
                                        </a>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">PRONTO PARA VISITA</span>
                                    </div>
                                </div>

                                {/* Store Card 2 */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-5 shadow-sm hover:border-[#0d59f2]/50 transition-colors group">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 group-hover:bg-[#0d59f2]/10 group-hover:text-[#0d59f2] transition-colors">
                                                <span className="material-symbols-outlined text-[24px]">storefront</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Target #1044</h3>
                                                <div className="flex items-center gap-1 mt-1 text-slate-500 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                    <p className="text-sm font-medium">1901 Douglas Blvd, Roseville, CA</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full sm:w-auto h-12 sm:h-10 mt-3 sm:mt-0 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
                                            Check-in
                                        </button>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">AGENDADO PARA 10:00</span>
                                    </div>
                                </div>

                                {/* Store Card 3 */}
                                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-5 shadow-sm hover:border-[#0d59f2]/50 transition-colors group">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 group-hover:bg-[#0d59f2]/10 group-hover:text-[#0d59f2] transition-colors">
                                                <span className="material-symbols-outlined text-[24px]">storefront</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Safeway #2811</h3>
                                                <div className="flex items-center gap-1 mt-1 text-slate-500 dark:text-slate-400">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                    <p className="text-sm font-medium">989 Sunrise Ave, Roseville, CA</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full sm:w-auto h-12 sm:h-10 mt-3 sm:mt-0 px-6 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded font-bold text-sm hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-slate-900">
                                            Check-in
                                        </button>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                                        <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">AGENDADO PARA 13:00</span>
                                    </div>
                                </div>

                                {/* Store Card 4 (Visited) */}
                                <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 sm:p-5 opacity-75">
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                                <span className="material-symbols-outlined text-[24px]">check_circle</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 leading-tight line-through">Costco Wholesale #481</h3>
                                                <div className="flex items-center gap-1 mt-1 text-slate-400 dark:text-slate-500">
                                                    <span className="material-symbols-outlined text-[16px]">location_on</span>
                                                    <p className="text-sm font-medium">6750 Stanford Ranch Rd, Roseville, CA</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full sm:w-auto mt-3 sm:mt-0 px-4 py-2 bg-transparent text-slate-500 dark:text-slate-400 font-bold text-sm text-center border border-slate-300 dark:border-slate-600 rounded cursor-not-allowed">
                                            Visitado
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-xs text-slate-400">history</span>
                                        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">CONCLUÍDO ÀS 08:45</span>
                                    </div>
                                </div>

                                {/* AI Route Suggestion Card */}
                                <div className="relative bg-slate-50/50 dark:bg-slate-900/30 border border-dashed border-slate-300 dark:border-slate-700 rounded-lg p-4 sm:p-5 opacity-60 pointer-events-none select-none overflow-hidden">
                                    <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-[1px] z-10"></div>
                                    <div className="absolute inset-0 flex items-center justify-center z-20">
                                        <div className="bg-slate-200 dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-300 dark:border-slate-700 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-sm text-slate-500">smart_toy</span>
                                            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Sugestões de Rota (IA) - EM BREVE</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between blur-[2px]">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-indigo-50 dark:bg-slate-800 text-indigo-400 dark:text-indigo-300">
                                                <span className="material-symbols-outlined text-[24px]">lightbulb</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <h3 className="text-lg font-bold text-slate-400 dark:text-slate-500 leading-tight">Oportunidade de Rota Otimizada</h3>
                                                <div className="flex items-center gap-1 mt-1 text-slate-400 dark:text-slate-600">
                                                    <span className="material-symbols-outlined text-[16px]">alt_route</span>
                                                    <p className="text-sm font-medium">Economia estimada de 15 min</p>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="w-full sm:w-auto h-12 sm:h-10 mt-3 sm:mt-0 px-6 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 rounded font-bold text-sm">
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="fixed bottom-20 right-6 sm:hidden z-30">
                                <button className="bg-[#0d59f2] text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0d59f2]">
                                    <span className="material-symbols-outlined text-[28px]">add</span>
                                </button>
                            </div>
                        </div>
                    </main>

                    {/* Bottom Navigation for Mobile */}
                    <nav className="fixed bottom-0 w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex justify-around py-2 sm:hidden z-20 pb-safe">
                        <button className="flex flex-col items-center gap-1 p-2 text-[#0d59f2]">
                            <span className="material-symbols-outlined">calendar_today</span>
                            <span className="text-xs font-medium">Agenda</span>
                        </button>
                        <a href="/promotor/sincronizacao" className="relative flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                            <div className="absolute top-1 right-2 w-2.5 h-2.5 bg-amber-500 border border-white dark:border-slate-900 rounded-full"></div>
                            <span className="material-symbols-outlined">sync</span>
                            <span className="text-xs font-medium">Sync (3)</span>
                        </a>
                        <button className="flex flex-col items-center gap-1 p-2 text-slate-400 dark:text-slate-500 hover:text-slate-600">
                            <span className="material-symbols-outlined">settings</span>
                            <span className="text-xs font-medium">Ajustes</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}
