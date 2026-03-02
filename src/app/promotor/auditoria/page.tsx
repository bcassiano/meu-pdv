"use client";

import React from "react";

export default function PromotorAuditoriaPage() {
    return (
        <div className="bg-[#000000] font-display text-white min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
            <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full bg-[#000000] min-h-screen">
                <div className="bg-[#D97706] text-black px-4 py-3 flex items-center justify-center gap-2 border-b border-[#000000] sticky top-0 z-20 font-bold">
                    <span className="material-symbols-outlined text-xl">wifi_off</span>
                    <p className="text-sm">Modo Offline: Alterações salvas localmente. Sincronizará quando online.</p>
                </div>

                <header className="flex items-center justify-between border-b border-[#404040] px-6 py-4 bg-[#000000] sticky top-[48px] z-10">
                    <div className="flex items-center gap-3">
                        <a href="/promotor/agenda" className="text-white hover:text-gray-300 transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </a>
                        <div>
                            <h2 className="text-white text-xl font-bold leading-tight">Auditoria de Loja: 7-Eleven #492</h2>
                            <p className="text-gray-400 text-xs mt-0.5">Última sincronização: 2 horas atrás</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] text-white rounded text-xs font-bold border border-[#404040]">
                            <span className="material-symbols-outlined text-base">check_circle</span>
                            <span>Salvo Localmente</span>
                        </div>
                        <a href="/promotor/sincronizacao" className="flex items-center justify-center bg-white hover:bg-gray-200 text-black px-4 h-10 rounded font-bold text-sm transition-colors border border-white">
                            Sincronizar
                        </a>
                    </div>
                </header>

                <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 pb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-white text-2xl font-bold">Coleta de Bebidas</h1>
                            <p className="text-gray-400 text-sm">Atualize preços e disponibilidade de estoque para a visita atual.</p>
                        </div>
                        <div className="w-full md:w-auto">
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white material-symbols-outlined text-lg">search</span>
                                <input className="w-full md:w-64 pl-10 pr-4 py-2 bg-[#1A1A1A] border border-[#404040] text-white rounded text-sm focus:ring-1 focus:ring-white focus:border-white outline-none placeholder-gray-500" placeholder="Pesquisar produto..." type="text" />
                            </div>
                        </div>
                    </div>

                    {/* Product 1 */}
                    <div className="bg-[#1A1A1A] rounded-lg border border-[#404040] overflow-hidden">
                        <div className="p-4 md:p-6 border-b border-[#404040] bg-[#1A1A1A] flex flex-wrap justify-between items-start gap-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded bg-[#000000] border border-[#404040] flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined text-white text-3xl">local_drink</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Cola Classic 1L</h3>
                                    <p className="text-gray-400 text-sm">SKU: 8839201 • Prateleira A2</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="bg-[#000000] border border-[#404040] text-white text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">No Planograma</span>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-white uppercase tracking-wide">COMPARATIVO DE PREÇO</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#000000] p-4 rounded border border-[#404040] text-center">
                                        <span className="block text-xs font-bold text-gray-400 mb-2">Meu Preço</span>
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">remove</span>
                                            </button>
                                            <span className="text-xl font-bold text-white w-16 text-center">R$1,50</span>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[#000000] p-4 rounded border border-[#404040] text-center relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-bl border-l border-b border-[#404040]"></div>
                                        <span className="block text-xs font-bold text-gray-400 mb-2">Concorrente</span>
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">remove</span>
                                            </button>
                                            <span className="text-xl font-bold text-white w-16 text-center">R$1,45</span>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-white font-medium flex items-center gap-1 mt-2">
                                    <span className="material-symbols-outlined text-sm">trending_down</span>
                                    Preço R$0,05 acima do concorrente
                                </p>
                            </div>

                            <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#404040] pt-6 md:pt-0 md:pl-8">
                                <label className="block text-sm font-bold text-white uppercase tracking-wide">DISPONIBILIDADE EM ESTOQUE</label>
                                <div className="flex gap-2 mb-4">
                                    <button className="flex-1 py-2 px-3 rounded border border-[#404040] bg-[#000000] text-white text-sm font-bold hover:bg-[#1A1A1A] transition-colors">
                                        Em Estoque
                                    </button>
                                    <button className="flex-1 py-2 px-3 rounded bg-white text-black border border-white text-sm font-bold transition-all">
                                        Baixo Estoque
                                    </button>
                                    <button className="flex-1 py-2 px-3 rounded border border-[#404040] bg-[#000000] text-white text-sm font-bold hover:bg-[#1A1A1A] transition-colors">
                                        Falta
                                    </button>
                                </div>
                                <div className="bg-[#000000] p-4 rounded border border-[#404040]">
                                    <label className="block text-xs font-bold text-white mb-3 uppercase tracking-wide">Motivo Baixo Estoque</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input defaultChecked className="w-4 h-4 text-white bg-black border-[#404040] focus:ring-white focus:ring-2 focus:ring-offset-0" name="justification1" type="radio" />
                                            <span className="text-sm text-white font-medium group-hover:text-gray-300 transition-colors">Aguardando Entrega</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input className="w-4 h-4 text-white bg-black border-[#404040] focus:ring-white focus:ring-2 focus:ring-offset-0" name="justification1" type="radio" />
                                            <span className="text-sm text-white font-medium group-hover:text-gray-300 transition-colors">Problema no Espaço em Gôndola</span>
                                        </label>
                                        <label className="flex items-center gap-3 cursor-pointer group">
                                            <input className="w-4 h-4 text-white bg-black border-[#404040] focus:ring-white focus:ring-2 focus:ring-offset-0" name="justification1" type="radio" />
                                            <span className="text-sm text-white font-medium group-hover:text-gray-300 transition-colors">Produtos Danificados</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product 2 */}
                    <div className="bg-[#1A1A1A] rounded-lg border border-[#404040] opacity-60 hover:opacity-100 transition-opacity">
                        <div className="p-4 md:p-6 border-b border-[#404040] bg-[#1A1A1A] flex flex-wrap justify-between items-start gap-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded bg-[#000000] border border-[#404040] flex items-center justify-center shrink-0 overflow-hidden">
                                    <div className="w-full h-full bg-[#333333]"></div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white">Orange Juice Premium</h3>
                                    <p className="text-gray-400 text-sm">SKU: 8839205 • Prateleira A3</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-white uppercase tracking-wide">COMPARATIVO DE PREÇO</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-[#000000] p-4 rounded border border-[#404040] text-center">
                                        <span className="block text-xs font-bold text-gray-400 mb-2">Meu Preço</span>
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">remove</span>
                                            </button>
                                            <span className="text-xl font-bold text-white w-16 text-center">R$2,00</span>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">add</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="bg-[#000000] p-4 rounded border border-[#404040] text-center">
                                        <span className="block text-xs font-bold text-gray-400 mb-2">Concorrente</span>
                                        <div className="flex items-center justify-center gap-3">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">remove</span>
                                            </button>
                                            <span className="text-xl font-bold text-white w-16 text-center">R$2,10</span>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-[#1A1A1A] border border-[#404040] text-white hover:border-white active:bg-white active:text-black transition-colors">
                                                <span className="material-symbols-outlined text-lg">add</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-xs text-white font-medium flex items-center gap-1 mt-2">
                                    <span className="material-symbols-outlined text-sm">trending_up</span>
                                    Preço competitivo
                                </p>
                            </div>

                            <div className="space-y-4 border-t md:border-t-0 md:border-l border-[#404040] pt-6 md:pt-0 md:pl-8">
                                <label className="block text-sm font-bold text-white uppercase tracking-wide">DISPONIBILIDADE EM ESTOQUE</label>
                                <div className="flex gap-2 mb-4">
                                    <button className="flex-1 py-2 px-3 rounded bg-white text-black border border-white text-sm font-bold transition-all">
                                        Em Estoque
                                    </button>
                                    <button className="flex-1 py-2 px-3 rounded border border-[#404040] bg-[#000000] text-white text-sm font-bold hover:bg-[#1A1A1A] transition-colors">
                                        Baixo Estoque
                                    </button>
                                    <button className="flex-1 py-2 px-3 rounded border border-[#404040] bg-[#000000] text-white text-sm font-bold hover:bg-[#1A1A1A] transition-colors">
                                        Falta
                                    </button>
                                </div>
                                <div className="p-4 rounded border border-transparent flex items-center justify-center h-[106px] text-gray-500 text-sm italic">
                                    Selecione Baixo Estoque ou Falta para adicionar detalhes
                                </div>
                            </div>
                        </div>
                    </div>

                </main>

                <div className="fixed bottom-4 right-4 z-50">
                    <button className="bg-white text-black border border-white rounded-full px-6 h-14 shadow-lg shadow-white/10 flex items-center justify-center gap-2 hover:scale-105 transition-transform font-bold" onClick={() => window.location.href = '/promotor/sincronizacao'}>
                        <span className="material-symbols-outlined">save</span>
                        <span className="hidden sm:inline">Salvar Progresso</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
