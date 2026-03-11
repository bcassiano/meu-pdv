"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

// Mock Data baseado no design do usuário
const PONTOS_EXTRAS_MOCK = [
    {
        id: "pe-001",
        dataRealFinal: "10/03/2026",
        fotos: [
            "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&q=80&w=400&h=300",
            "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&h=300",
            "" // Terceira foto vazia para testar o fallback
        ],
        descricao: "IRMAOS MUFFATO S.A (C007096)",
        cidade: "São José dos Campos",
        logradouro: "RUA PATATIVA",
        promotor: "GABRIEL CARTAXO PATRICIO"
    },
    {
        id: "pe-002",
        dataRealFinal: "10/03/2026",
        fotos: [
            "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=400&h=300",
            "https://images.unsplash.com/photo-1588964895597-cfccd6e2b08b?auto=format&fit=crop&q=80&w=400&h=300",
            "https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&q=80&w=400&h=300"
        ],
        descricao: "SENDAS DISTRIBUIDOR S/A (C005105)",
        cidade: "CARAGUATATUBA",
        logradouro: "JOSE HERCULANO",
        promotor: "KAIO AIRTON"
    }
];

export default function PontosExtrasPage(): JSX.Element {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Pontos Extras"
                    icon="stars"
                    navigation={[
                        { label: "Performance Operacional", href: "/dashboards", active: false },
                        { label: "Galeria de Fotos", href: "/dashboards/pontos-extras", active: true, icon: "photo_library" }
                    ]}
                />

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 md:p-8 2xl:p-10 pb-24 scroll-smooth">
                    <div className="max-w-[1600px] mx-auto space-y-6">

                        {/* Title and Back Link */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                Pontos Extras
                            </h1>
                            <div className="flex items-center gap-3">
                                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                                </button>
                                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">sync</span>
                                </button>
                                <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">filter_list</span>
                                </button>
                            </div>
                        </div>

                        {/* Filtros Ativos */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-white/5 p-4 flex items-center gap-4 shadow-sm">
                            <div className="flex items-center gap-2 text-slate-500">
                                <span className="material-symbols-outlined text-lg">filter_list</span>
                                <span className="text-sm font-bold">Filtros Aplicados:</span>
                            </div>
                            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                <span className="text-sm text-slate-700 dark:text-slate-300 font-medium">Dados de: Hoje</span>
                                <button className="text-red-500 hover:text-red-600 flex items-center justify-center ml-1">
                                    <span className="material-symbols-outlined text-sm">cancel</span>
                                </button>
                            </div>
                        </div>

                        {/* Data Table Area */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/5 shadow-xl overflow-hidden flex flex-col">

                            {/* Toolbar */}
                            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50 dark:bg-slate-800/30">
                                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Pontos Extras</h2>
                                <div className="relative w-full sm:w-72">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-lg">search</span>
                                    <input
                                        type="text"
                                        placeholder="Pesquisar"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full h-10 pl-11 pr-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-slate-900 dark:text-white"
                                    />
                                </div>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-white/5 bg-white dark:bg-slate-900">
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                                    Data real final <span className="material-symbols-outlined text-[16px]">unfold_more</span>
                                                </div>
                                            </th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Foto ponto extra 01</th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Foto ponto extra 02</th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center">Foto ponto extra 03</th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                                    Descrição <span className="material-symbols-outlined text-[16px]">unfold_more</span>
                                                </div>
                                            </th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                                    Cidade <span className="material-symbols-outlined text-[16px]">unfold_more</span>
                                                </div>
                                            </th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                                    Logradouro <span className="material-symbols-outlined text-[16px]">unfold_more</span>
                                                </div>
                                            </th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                                                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                                                    Nome <span className="material-symbols-outlined text-[16px]">unfold_more</span>
                                                </div>
                                            </th>
                                            <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 text-right">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {PONTOS_EXTRAS_MOCK.map((item) => (
                                            <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                <td className="py-6 px-6 whitespace-nowrap text-sm font-medium text-slate-700 dark:text-slate-300">
                                                    {item.dataRealFinal}
                                                </td>

                                                {/* Render 3 Photo Slots */}
                                                {[0, 1, 2].map((idx) => (
                                                    <td key={idx} className="py-6 px-6 text-center">
                                                        {item.fotos[idx] ? (
                                                            <a href={`/dashboards/pontos-extras/${item.id}`} className="block relative w-32 h-32 md:w-40 md:h-40 mx-auto rounded-2xl overflow-hidden group/img cursor-pointer border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                                                                <img
                                                                    src={item.fotos[idx]}
                                                                    alt={`Foto ${idx + 1} de ${item.descricao}`}
                                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-110"
                                                                />
                                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex flex-col items-center justify-center backdrop-blur-[2px]">
                                                                    <div className="h-10 w-10 rounded-full bg-white/20 text-white flex items-center justify-center border border-white/40 mb-2">
                                                                        <span className="material-symbols-outlined">zoom_in</span>
                                                                    </div>
                                                                    <span className="text-white text-[10px] font-bold tracking-wider uppercase">Ver Detalhes</span>
                                                                </div>
                                                            </a>
                                                        ) : (
                                                            <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-center">
                                                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-3xl">image</span>
                                                            </div>
                                                        )}
                                                    </td>
                                                ))}

                                                <td className="py-6 px-6 text-sm">
                                                    <div className="max-w-[200px] font-bold text-slate-900 dark:text-white leading-relaxed">
                                                        {item.descricao}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-6 text-sm text-slate-500 dark:text-slate-400 font-medium">
                                                    {item.cidade}
                                                </td>
                                                <td className="py-6 px-6 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                                                    {item.logradouro}
                                                </td>
                                                <td className="py-6 px-6 text-sm">
                                                    <div className="max-w-[150px] font-bold text-slate-700 dark:text-slate-300 break-words leading-tight">
                                                        {item.promotor}
                                                    </div>
                                                </td>
                                                <td className="py-6 px-6 text-right">
                                                    <button className="h-10 w-10 inline-flex items-center justify-center rounded-xl text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors">
                                                        <span className="material-symbols-outlined text-xl">description</span>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer / Pagination */}
                            <div className="px-6 py-4 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg">
                                        <select className="bg-transparent border-none text-sm text-slate-700 dark:text-slate-300 font-medium focus:ring-0 appearance-none outline-none cursor-pointer pr-4">
                                            <option>50/Página</option>
                                            <option>100/Página</option>
                                        </select>
                                        <span className="material-symbols-outlined text-[16px] text-slate-400">expand_more</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                                        </button>
                                        <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-white font-bold text-sm">
                                            1
                                        </button>
                                        <button className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                                        </button>
                                    </div>
                                    <span className="text-sm text-slate-500 font-medium">Total 6</span>
                                    <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary transition-colors ml-4 shadow-sm">
                                        <span className="material-symbols-outlined text-xl">file_download</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Botão Inferior (Voltar) */}
                        <div className="flex justify-end pt-4">
                            <a href="/dashboards" className="px-8 py-3.5 rounded-2xl bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-sm hover:bg-slate-400 dark:hover:bg-slate-600 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-lg">chevron_left</span>
                                VOLTAR
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
