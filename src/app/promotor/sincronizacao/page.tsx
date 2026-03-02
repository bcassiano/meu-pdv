"use client";

import React from "react";

export default function PromotorSyncPage() {
    return (
        <div className="bg-[#f8f9fc] text-[#1e293b] font-display min-h-screen flex flex-col antialiased">
            <div className="bg-[#fffbeb] border-b border-[#f59e0b]/20 px-4 py-3 flex items-center justify-between gap-4 sticky top-0 z-10">
                <div className="flex items-center gap-3 text-amber-800">
                    <span className="material-symbols-outlined text-amber-600">cloud_off</span>
                    <span className="font-medium text-sm sm:text-base">Sincronização Pausada: Conexão Instável</span>
                </div>
                <div className="text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-1 rounded">
                    5 Itens Não Sincronizados
                </div>
            </div>

            <header className="bg-white border-b border-[#e2e8f0] px-4 py-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <a href="/promotor/agenda" className="text-slate-500 hover:text-[#0d59f2] transition-colors">
                            <span className="material-symbols-outlined">arrow_back</span>
                        </a>
                        <div>
                            <h1 className="text-xl font-bold text-[#1e293b] leading-tight">Fila de Sincronização</h1>
                            <p className="text-sm text-slate-500">Gerenciar uploads de dados pendentes</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 font-medium hidden sm:block">Última tentativa: 2 min atrás</span>
                        <button className="bg-[#0d59f2] hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded shadow-sm flex items-center gap-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#0d59f2]">
                            <span className="material-symbols-outlined text-[18px]">refresh</span>
                            <span>Tentar Tudo Agora</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full pb-24">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white p-4 rounded border border-[#e2e8f0] shadow-sm flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">TOTAL PENDENTE</span>
                        <span className="text-2xl font-bold text-[#1e293b] mt-1">5</span>
                    </div>
                    <div className="bg-white p-4 rounded border border-[#e2e8f0] shadow-sm flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">FALHA</span>
                        <span className="text-2xl font-bold text-red-600 mt-1">2</span>
                    </div>
                    <div className="bg-white p-4 rounded border border-[#e2e8f0] shadow-sm flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">NA FILA</span>
                        <span className="text-2xl font-bold text-amber-600 mt-1">3</span>
                    </div>
                    <div className="bg-white p-4 rounded border border-[#e2e8f0] shadow-sm flex flex-col">
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">TAMANHO EST. DOS DADOS</span>
                        <span className="text-2xl font-bold text-blue-600 mt-1">~1.2 MB</span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                        <input className="w-full pl-10 pr-4 py-2 border border-[#e2e8f0] rounded text-sm focus:border-[#0d59f2] focus:ring-1 focus:ring-[#0d59f2] outline-none" placeholder="Pesquisar por SKU ou Loja..." type="text" />
                    </div>
                    <select className="px-3 py-2 border border-[#e2e8f0] rounded text-sm bg-white focus:border-[#0d59f2] outline-none">
                        <option>Todos os Status</option>
                        <option>Falha</option>
                        <option>Pendente</option>
                    </select>
                </div>

                <div className="bg-white rounded border border-[#e2e8f0] shadow-sm overflow-hidden text-slate-700">
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-4 py-3 bg-slate-50 border-b border-[#e2e8f0] text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div className="col-span-4">TIPO DE DADO / REFERÊNCIA</div>
                        <div className="col-span-3">DATA/HORA</div>
                        <div className="col-span-2">STATUS</div>
                        <div className="col-span-3 text-right">AÇÕES</div>
                    </div>
                    <ul className="divide-y divide-[#e2e8f0]">

                        {/* Task Item 1 - Fails */}
                        <li className="group hover:bg-slate-50 transition-colors">
                            <div className="p-4 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center">
                                <div className="col-span-1 sm:col-span-4 flex items-center gap-3">
                                    <div className="bg-blue-100 text-[#0d59f2] p-2 rounded shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">sell</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-[#1e293b]">Atualização de Preço</h3>
                                        <p className="text-xs text-slate-500">SKU: 1234-8859 • Loja #402</p>
                                    </div>
                                </div>
                                <div className="col-span-1 sm:col-span-3 text-sm text-slate-500 flex items-center gap-1 sm:block">
                                    <span className="material-symbols-outlined text-[16px] sm:hidden">schedule</span>
                                    24 Out, 10:30
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 border border-red-200">
                                        <span className="size-1.5 rounded-full bg-red-600"></span>
                                        Falha
                                    </span>
                                </div>
                                <div className="col-span-1 sm:col-span-3 flex justify-end gap-2 mt-2 sm:mt-0">
                                    <button className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                    <button className="text-[#0d59f2] hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
                                        Tentar Novamente
                                    </button>
                                </div>
                            </div>
                            <div className="px-4 pb-3 sm:px-14 sm:pb-3">
                                <p className="text-xs text-red-600 bg-red-50 p-2 rounded border border-red-100 flex items-start gap-2">
                                    <span className="material-symbols-outlined text-[16px] mt-0.5">error</span>
                                    tempo esgotado: conexão abortada
                                </p>
                            </div>
                        </li>

                        {/* Task Item 2 - Pending */}
                        <li className="group hover:bg-slate-50 transition-colors">
                            <div className="p-4 sm:px-4 sm:py-3 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-start sm:items-center">
                                <div className="col-span-1 sm:col-span-4 flex items-center gap-3">
                                    <div className="bg-amber-100 text-amber-700 p-2 rounded shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-sm text-[#1e293b]">Relatório de Ruptura</h3>
                                        <p className="text-xs text-slate-500">Loja A • 12 Itens</p>
                                    </div>
                                </div>
                                <div className="col-span-1 sm:col-span-3 text-sm text-slate-500 flex items-center gap-1 sm:block">
                                    <span className="material-symbols-outlined text-[16px] sm:hidden">schedule</span>
                                    24 Out, 10:45
                                </div>
                                <div className="col-span-1 sm:col-span-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                                        <span className="size-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                                        Pendente
                                    </span>
                                </div>
                                <div className="col-span-1 sm:col-span-3 flex justify-end gap-2 mt-2 sm:mt-0">
                                    <button className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-red-50 transition-colors" title="Delete">
                                        <span className="material-symbols-outlined text-[20px]">delete</span>
                                    </button>
                                    <button className="text-[#0d59f2] hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100">
                                        Tentar Novamente
                                    </button>
                                </div>
                            </div>
                        </li>

                    </ul>
                </div>

                <div className="sm:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#e2e8f0] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button className="w-full bg-[#0d59f2] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded shadow-lg flex justify-center items-center gap-2">
                        <span className="material-symbols-outlined">refresh</span>
                        Tentar Tudo Agora (5)
                    </button>
                </div>
            </main>
        </div>
    );
}
