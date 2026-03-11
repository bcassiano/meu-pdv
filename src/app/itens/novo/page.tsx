"use client";

import React from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
    Save, 
    X, 
    Image as ImageIcon,
    FileText,
    Settings2,
    CheckCircle2
} from "lucide-react";

export default function NovoItemPage(): JSX.Element {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Cadastro de Novo Item"
                    icon="add_circle"
                    breadcrumb={[
                        { label: "Gestão de Itens", href: "/itens" },
                        { label: "Novo Cadastro", active: true }
                    ]}
                />

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 pb-32 scroll-smooth">
                    <form className="max-w-[1200px] mx-auto space-y-8">
                        
                        {/* Section Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#232f48] pb-6">
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                                    <span className="size-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
                                        <Settings2 size={20} />
                                    </span>
                                    Configurações do <span className="text-primary italic">SKU</span>
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-[#92a4c9] font-medium">Preencha os dados técnicos para inclusão no catálogo.</p>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                <CheckCircle2 size={12} /> Status: Ativo
                            </div>
                        </div>

                        {/* Form Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                            
                            {/* Image Left Column */}
                            <div className="lg:col-span-3 space-y-4">
                                <div className="aspect-square rounded-3xl bg-white dark:bg-[#1a2332] border-2 border-dashed border-slate-200 dark:border-[#232f48] flex flex-col items-center justify-center p-6 text-center group hover:border-primary transition-all cursor-pointer">
                                    <div className="size-16 rounded-2xl bg-slate-50 dark:bg-[#232f48] text-slate-300 dark:text-[#2d3a54] flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:text-primary transition-all">
                                        <ImageIcon size={32} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-400 dark:text-[#5c72a6] group-hover:text-primary">Carregar Imagem</span>
                                    <p className="text-[10px] text-slate-400 mt-2">JPG, PNG ou WebP (Máx 2MB)</p>
                                </div>
                            </div>

                            {/* Inputs Right Column */}
                            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#92a4c9]">Descrição Completa *</label>
                                    <input 
                                        type="text" 
                                        placeholder="Ex: ARROZ BRANCO FANTASTICO 1KG"
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] focus:ring-2 focus:ring-primary/50 text-sm font-bold dark:text-white outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#92a4c9]">Identificador (SKU) *</label>
                                    <input 
                                        type="text" 
                                        placeholder="0000"
                                        className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] focus:ring-2 focus:ring-primary/50 text-sm font-mono dark:text-white outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#92a4c9]">Subgrupo de Item</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] focus:ring-2 focus:ring-primary/50 text-sm font-bold dark:text-white outline-none transition-all appearance-none cursor-pointer">
                                        <option>Selecione o subgrupo</option>
                                        <option>Fantástico</option>
                                        <option>Concorrente Arroz</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#92a4c9]">Categoria</label>
                                    <select className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] focus:ring-2 focus:ring-primary/50 text-sm font-bold dark:text-white outline-none transition-all appearance-none cursor-pointer">
                                        <option>Selecione a categoria</option>
                                        <option>PA ARROZ</option>
                                        <option>PA FEIJAO</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Technical Details Grid */}
                        <div className="bg-slate-50/50 dark:bg-[#232f48]/20 p-8 rounded-[32px] border border-slate-200 dark:border-[#232f48] space-y-6">
                            <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-widest uppercase flex items-center gap-2">
                                <FileText size={18} className="text-primary" /> Detalhes Logísticos & Fiscais
                            </h3>
                            
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Unid. de Preço</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] text-sm font-bold dark:text-white outline-none" placeholder="Ex: KG" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Unid. de Estoque</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] text-sm font-bold dark:text-white outline-none" placeholder="Ex: FD" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Peso Líquido</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] text-sm font-bold dark:text-white outline-none" placeholder="0.00" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">Cod. NCM</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#232f48] text-sm font-bold dark:text-white outline-none" placeholder="0000.00.00" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Fixed Action Bar */}
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 sm:left-auto sm:right-12 sm:translate-x-0 z-[60]">
                    <div className="bg-slate-900 dark:bg-white p-2 rounded-2xl flex items-center gap-2 shadow-2xl shadow-slate-900/40">
                        <Link 
                            href="/itens"
                            className="px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-white dark:text-slate-500 dark:hover:text-slate-900 transition-colors"
                        >
                            <X size={16} className="inline mr-2 text-rose-500" /> Cancelar
                        </Link>
                        <button className="px-8 py-3 rounded-xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                            <Save size={16} className="inline mr-2" /> Gravar SKU
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
