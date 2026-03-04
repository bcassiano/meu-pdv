"use client";

import React, { useEffect, useState } from "react";
import { PdvRecord } from "@/db/interfaces/IPdvRepository";

export default function ClientListaPdv(): JSX.Element {
    const [pdvs, setPdvs] = useState<PdvRecord[]>([]);
    const [filteredPdvs, setFilteredPdvs] = useState<PdvRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const getPdvField = (pdv: any, ...fields: string[]) => {
        for (const f of fields) {
            if (pdv[f] !== undefined && pdv[f] !== null && pdv[f] !== "") return pdv[f];
        }
        return "";
    };

    useEffect(() => {
        async function loadPdvs() {
            try {
                const res = await fetch("/api/pdv/list");
                if (res.ok) {
                    const data = await res.json();
                    setPdvs(data);
                    setFilteredPdvs(data);
                }
            } catch (error) {
                console.error("Erro ao carregar PDVs:", error);
            } finally {
                setLoading(false);
            }
        }
        loadPdvs();
    }, []);

    useEffect(() => {
        const searchTerm = search.toLowerCase();
        const filtered = pdvs.filter(pdv => {
            // Mapeamento defensivo para chaves que podem vir do CSV com caracteres especiais
            const keys = Object.keys(pdv);
            const razaoKey = keys.find(k => k.includes("RAZÃO") || k.includes("RAZAO")) || "razaoSocial";
            const descKey = keys.find(k => k.includes("DESCRIÇÃO") || k.includes("DESCRICAO")) || "nomeFantasia";
            const idKey = keys.find(k => k.includes("ID LOCAL")) || "idLocal";
            const cnpjKey = keys.find(k => k.includes("CNPJ")) || "cnpj";

            const razao = String(pdv[razaoKey] || pdv[descKey] || pdv['razaoSocial'] || "").toLowerCase();
            const cnpj = String(pdv[cnpjKey] || "").toLowerCase();
            const id = String(pdv[idKey] || "").toLowerCase();

            return razao.includes(searchTerm) ||
                cnpj.includes(searchTerm) ||
                id.includes(searchTerm);
        });
        setFilteredPdvs(filtered);
    }, [search, pdvs]);

    if (loading) {
        return (
            <div className="w-full h-64 flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs font-display">Sincronizando com Firestore...</p>
            </div>
        );
    }

    // Helper para exibição segura de campos que podem vir do Legado ou Novos
    const displayField = (pdv: any, type: 'id' | 'nome' | 'razao' | 'cnpj' | 'local') => {
        const keys = Object.keys(pdv);
        switch (type) {
            case 'id':
                return pdv.idLocal || pdv[keys.find(k => k.includes("ID LOCAL")) || ""] || "";
            case 'nome':
                return pdv.nomeFantasia || pdv[keys.find(k => k.includes("DESCRIÇÃO")) || ""] || pdv.razaoSocial || "";
            case 'razao':
                return pdv.razaoSocial || pdv[keys.find(k => k.includes("RAZÃO")) || ""] || "";
            case 'cnpj':
                return pdv.cnpj || pdv[keys.find(k => k.includes("CNPJ")) || ""] || "";
            case 'local':
                return pdv.cidadeUf || (pdv.CIDADE ? `${pdv.CIDADE} / ${pdv.ESTADO || ""}` : "N/A");
            default: return "";
        }
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm">
                <div className="relative w-full md:w-96">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        type="text"
                        placeholder="Buscar por Razão, CNPJ ou ID..."
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-2 border-transparent focus:border-primary outline-none text-sm font-bold transition-all"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                        {filteredPdvs.length} PDVs Encontrados
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50 dark:border-white/5">
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-display">ID Local</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-display">Identificação</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-display">Documento</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-display">Localização</th>
                                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 font-display">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                            {filteredPdvs.map((pdv, idx) => (
                                <tr key={pdv.idLocal || `pdv-${idx}`} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors group">
                                    <td className="px-8 py-6">
                                        <span className="font-mono text-xs font-black text-slate-400 group-hover:text-primary transition-colors">
                                            #{displayField(pdv, 'id')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 dark:text-white truncate max-w-[300px]">
                                                {displayField(pdv, 'nome')}
                                            </span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter truncate max-w-[300px]">
                                                {displayField(pdv, 'razao')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">
                                        {displayField(pdv, 'cnpj')}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                                            <span className="material-symbols-outlined text-sm text-primary/60">location_on</span>
                                            <span className="text-xs font-bold">
                                                {displayField(pdv, 'local')}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        {(() => {
                                            const isActive = getPdvField(pdv, 'ativo', 'ATIVO LOCAL') !== false && getPdvField(pdv, 'ativo', 'ATIVO LOCAL') !== 'NÃO';
                                            return (
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${isActive
                                                    ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 border-transparent'
                                                    }`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                                                    {isActive ? 'Ativo' : 'Offline'}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                </tr>
                            ))}

                            {filteredPdvs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs italic">
                                        Nenhum registro encontrado para a busca.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
