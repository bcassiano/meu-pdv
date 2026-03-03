"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CadastroPDVPage(): JSX.Element {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Global Unified Header */}
                <Header
                    title="PDVs"
                    icon="storefront"
                    navigation={[
                        { label: "Dashboard", href: "/pdv" },
                        { label: "Novo Cadastro", href: "/pdv/cadastro", active: true, icon: "add_box" },
                        { label: "Importação em Lote", href: "/pdv/importacao", icon: "cloud_upload" },
                        { label: "Carga Inicial", href: "/pdv/carga-inicial", icon: "upload_file" },
                    ]}
                />

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-10 2xl:p-14 pb-24 scroll-smooth">
                    <div className="max-w-[1000px] mx-auto space-y-10">

                        {/* Title & Introduction */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    Módulo de Expansão
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                    Novo Ponto de <br /> <span className="text-primary italic">Venda Especial</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
                                    Sistema de onboarding automatizado. Garanta a precisão dos dados geográficos e tributários para ativação da rede.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                    Descartar
                                </button>
                                <button className="px-8 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                                    ATIVAR PDV
                                </button>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 gap-8">
                            {/* Section 1: Identidade Visual e Legal */}
                            <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none p-10 space-y-10 transition-all hover:border-primary/20">
                                <div className="flex items-center gap-5">
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Identidade Corporativa</h3>
                                        <p className="text-sm text-slate-400 font-medium italic">Validação Síncrona via Receita Federal</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                                    <div className="lg:col-span-2 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">CNPJ do Estabelecimento</label>
                                        <div className="relative">
                                            <input className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-widest text-lg transition-all outline-none" placeholder="00.000.000/0000-00" type="text" />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-emerald-500 text-2xl">history_edu</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Razão Social Completa</label>
                                        <input className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg transition-all outline-none" placeholder="Digite a razão social registrada" type="text" />
                                    </div>
                                    <div className="lg:col-span-3 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Marca Fantasia (Exibição)</label>
                                        <input className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg transition-all outline-none" placeholder="Nome Fantasia" type="text" />
                                    </div>
                                    <div className="lg:col-span-3 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Classificação Tributária</label>
                                        <div className="relative">
                                            <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg transition-all outline-none appearance-none">
                                                <option>Simples Nacional</option>
                                                <option>Lucro Presumido</option>
                                                <option>Lucro Real</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Geolocalização Inteligente */}
                            <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none p-10 space-y-10 transition-all hover:border-primary/20">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">map</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Posicionamento Logístico</h3>
                                            <p className="text-sm text-slate-400 font-medium italic">Precisão GPS em nível de porta (Meter-Level)</p>
                                        </div>
                                    </div>
                                    <button type="button" className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                                        <span className="material-symbols-outlined text-sm">my_location</span>
                                        Force GPS Refresh
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">CEP de Destino</label>
                                        <div className="relative">
                                            <input className="w-full h-14 pl-6 pr-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-widest text-lg transition-all outline-none" placeholder="00000-000" type="text" />
                                            <button type="button" className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-[20px]">search</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:col-span-4 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Endereço (Auto-Detect)</label>
                                        <input className="w-full h-14 px-6 rounded-2xl bg-slate-200/50 dark:bg-slate-900 border-2 border-transparent text-slate-400 dark:text-slate-600 font-bold text-lg outline-none cursor-not-allowed" value="Processando dados do CEP..." readOnly type="text" />
                                    </div>

                                    {/* Mapa Preview Premium */}
                                    <div className="md:col-span-6 relative h-64 rounded-[2rem] overflow-hidden border border-slate-100 dark:border-white/5 shadow-inner">
                                        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/-46.6333,-23.5505,15,0/1200x600?access_token=pk.placeholder')] bg-cover bg-center grayscale opacity-40 dark:opacity-20" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-4">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary blur-2xl rounded-full scale-150 animate-pulse" />
                                                <span className="material-symbols-outlined text-white text-5xl relative drop-shadow-2xl">location_on</span>
                                            </div>
                                            <div className="text-center group-hover:scale-105 transition-transform">
                                                <p className="text-white font-black uppercase tracking-[0.3em] text-[10px] mb-1">Coordenadas Verificadas</p>
                                                <p className="text-primary font-mono font-bold text-lg">-23.55052, -46.63331</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Footer Form Meta */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500">lock</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">End-to-End Encryption Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500">cloud_done</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Auto-Save Enabled</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 tracking-tight uppercase">
                                O uso deste formulário é restrito a coordenadores autorizados. © 2026 MEU PDV SYSTEMS.
                            </p>
                        </div>

                        <div className="h-12" />
                    </div>
                </div>
            </main>

            {/* Global CSS for custom animations/elements */}
            <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 20px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        .dark ::-webkit-scrollbar-thumb {
          background: #334155;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
}
