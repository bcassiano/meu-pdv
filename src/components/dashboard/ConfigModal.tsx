"use client";

import React, { useState } from "react";

interface ConfigModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableCards: { id: string; title: string; checked: boolean }[];
    onToggleCard: (id: string) => void;
    onSave: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ 
    isOpen, onClose, availableCards, onToggleCard, onSave 
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity" 
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/30">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Personalizar Dashboard</h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Configure a visibilidade e filtros globais do seu painel.</p>
                    </div>
                    <button 
                        onClick={onClose}
                        className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-red-500 transition-all hover:rotate-90"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    
                    {/* Section: Dados Básicos */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                <span className="material-symbols-outlined">settings</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Dados básicos e permissões de acesso</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-14">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Título *</label>
                                <input className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none text-slate-900 dark:text-white font-bold" defaultValue="Performance Operacional" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Descrição</label>
                                <input className="w-full h-12 px-5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-800 transition-all outline-none text-slate-900 dark:text-white font-medium" defaultValue="Visão global de métricas de campo" />
                            </div>
                        </div>
                        <div className="flex items-center gap-8 pl-14 pt-2">
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="hidden" defaultChecked />
                                <div className="h-6 w-6 rounded-lg border-2 border-blue-500 flex items-center justify-center transition-all bg-blue-500">
                                    <span className="material-symbols-outlined text-white text-sm">check</span>
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors">Ativo</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="hidden" />
                                <div className="h-6 w-6 rounded-lg border-2 border-slate-300 dark:border-slate-700 flex items-center justify-center transition-all">
                                    <span className="material-symbols-outlined text-white text-sm">check</span>
                                </div>
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-blue-500 transition-colors">Atualizar automaticamente</span>
                            </label>
                        </div>
                    </section>

                    {/* Section: Filtros Gerais */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                                <span className="material-symbols-outlined">filter_list</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Filtros gerais</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pl-14">
                            {["Somente dados do agente logado", "Agente", "Equipe", "Tipo de tarefa", "Local", "Período"].map((filter, i) => (
                                <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" className="hidden" defaultChecked={i === 5} />
                                    <div className={`h-5 w-5 rounded-md border-2 transition-all flex items-center justify-center ${i === 5 ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 dark:border-slate-700'}`}>
                                        <span className="material-symbols-outlined text-white text-[12px] font-black">check</span>
                                    </div>
                                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 transition-colors uppercase tracking-wider">{filter}</span>
                                </label>
                            ))}
                        </div>
                    </section>

                    {/* Section: Definições de Componentes */}
                    <section className="space-y-6 pb-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined">widgets</span>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Definições de componentes</h3>
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] shadow-lg hover:scale-105 transition-all">
                                <span className="material-symbols-outlined text-sm">add</span>
                                Adicionar Componente
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-14">
                            {availableCards.map((card) => (
                                <div 
                                    key={card.id} 
                                    onClick={() => onToggleCard(card.id)}
                                    className={`p-4 rounded-[1.5rem] border-2 cursor-pointer transition-all flex items-center gap-4 group ${card.checked ? 'border-blue-500 bg-blue-500/5' : 'border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10'}`}
                                >
                                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all ${card.checked ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                        <span className="material-symbols-outlined">{card.checked ? 'check' : 'add'}</span>
                                    </div>
                                    <div>
                                        <p className={`text-xs font-black uppercase tracking-[0.05em] transition-colors ${card.checked ? 'text-blue-500' : 'text-slate-500 dark:text-slate-400'}`}>{card.title}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Dashboard Component</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Footer Actions */}
                <div className="p-8 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-end gap-4">
                    <button 
                        onClick={onClose}
                        className="px-8 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-3"
                    >
                        CANCELAR
                    </button>
                    <button 
                        onClick={onSave}
                        className="px-10 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined">save</span>
                        SALVAR ALTERAÇÕES
                    </button>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #cbd5e1;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #334155;
                }
            `}</style>
        </div>
    );
};
