"use client";

import React, { useState } from "react";
import { 
    Search, 
    Edit2, 
    MoreHorizontal, 
    Package, 
    Tag, 
    Layers,
    ChevronLeft,
    ChevronRight,
    Filter,
    Loader2,
} from "lucide-react";
import { useEffect } from "react";
import ImportModal from "@/components/ImportModal";
import type { ItemNormalizado } from "@/lib/importadores/normalizar-itens";

// ClientItens agora usa ItemNormalizado diretamente do motor de normalização.

const ClientItens: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);
    const [items, setItems] = useState<ItemNormalizado[]>([]);
    const [isPendingImport, setIsPendingImport] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const loadItems = async () => {
        try {
            const response = await fetch('/api/itens');
            const data = await response.json();
            if (data.success) {
                setItems(data.itens);
                setIsPendingImport(false);
            }
        } catch (error) {
            console.error('Erro ao carregar itens:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const handleImportComplete = (data: ItemNormalizado[]) => {
        setItems(data);
        setIsPendingImport(data.length > 0);
    };

    const handleCancelImport = () => {
        loadItems();
    };

    const handleFinalizeImport = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/itens/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ itens: items }),
            });

            if (!response.ok) throw new Error('Falha ao salvar itens');

            const result = await response.json();
            alert(result.message || 'Importação finalizada com sucesso!');
            
            await loadItems();
        } catch (error) {
            console.error('Erro ao finalizar importação:', error);
            alert('Erro ao salvar os itens no banco de dados. Verifique a conexão e tente novamente.');
        } finally {
            setIsSaving(false);
        }
    };

    const filteredItems = items.filter(item =>
        (item.descricao?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
        (item.idNormalizado?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <ImportModal
                isOpen={isImportModalOpen}
                onClose={() => setIsImportModalOpen(false)}
                onImportComplete={handleImportComplete}
                mode="itens"
            />

            {/* Header com Barra de Busca */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white dark:bg-[#1a2332] p-4 rounded-2xl border border-slate-200 dark:border-[#232f48] shadow-sm transition-colors duration-500">
                <div className="relative w-full sm:max-w-md">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        placeholder="Pesquisar por descrição ou ID..."
                        className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-[#232f48] border-none text-sm focus:ring-2 focus:ring-primary/50 dark:text-white transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Barra de Ações Pendentes (Mockup) */}
                    {isPendingImport ? (
                        <div className="flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                            <button 
                                onClick={handleCancelImport}
                                className="px-4 py-3 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors"
                            >
                                Cancelar Lote
                            </button>
                            <button
                                onClick={handleFinalizeImport}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1152d4] text-white transition-all hover:scale-105 shadow-lg shadow-[#1152d4]/20 active:scale-95 disabled:opacity-50 disabled:grayscale"
                            >
                                {isSaving ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <span className="material-symbols-outlined text-[20px]">verified</span>
                                )}
                                <span className="text-sm font-bold">Finalizar Importação</span>
                            </button>
                        </div>
                    ) : (
                        <>
                            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#232f48] text-slate-600 dark:text-[#92a4c9] hover:bg-slate-100 dark:hover:bg-[#324467] transition-all text-sm font-bold">
                                <Filter size={18} /> Filtros
                            </button>
                            <div className="h-8 w-px bg-slate-200 dark:bg-[#232f48] mx-2 hidden sm:block" />
                            <button
                                onClick={() => setIsImportModalOpen(true)}
                                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1152d4] text-white transition-all hover:scale-105 shadow-lg shadow-[#1152d4]/20 active:scale-95 group"
                            >
                                <span className="material-symbols-outlined text-[20px] group-hover:rotate-12 transition-transform">cloud_upload</span>
                                <span className="text-xs font-black uppercase tracking-widest">Importar</span>
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Estado de Carregamento */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center p-20 gap-4">
                    <Loader2 className="animate-spin text-primary" size={40} />
                    <p className="text-sm font-bold text-slate-400">Carregando catálogo...</p>
                </div>
            )}

            {/* Estado vazio */}
            {!isLoading && items.length === 0 && (
                <div className="bg-white dark:bg-[#1a2332] rounded-3xl border border-dashed border-slate-200 dark:border-[#232f48] p-16 flex flex-col items-center justify-center gap-4 transition-colors duration-500">
                    <div className="size-20 rounded-full bg-slate-50 dark:bg-[#232f48] flex items-center justify-center text-slate-300 dark:text-[#2d3a54]">
                        <Package size={40} />
                    </div>
                    <div className="text-center">
                        <p className="font-bold text-slate-700 dark:text-slate-300">Nenhum item carregado</p>
                        <p className="text-sm text-slate-400 mt-1">Use o botão <strong>Importar</strong> para carregar o catálogo CSV</p>
                    </div>
                </div>
            )}

            {/* Tabela */}
            {!isLoading && items.length > 0 && (
                <div className="bg-white dark:bg-[#1a2332] rounded-3xl border border-slate-200 dark:border-[#232f48] shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-colors duration-500">
                    <div className="overflow-x-auto overflow-y-hidden">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-[#232f48]">
                                    {[
                                        { icon: <Package size={14} className="text-primary"/>, label: 'Descrição do Produto' },
                                        { icon: <Tag size={14}/>, label: 'Identificador' },
                                        { icon: <Layers size={14}/>, label: 'Subgrupo' },
                                        { icon: null, label: 'UDM Preço' },
                                        { icon: null, label: 'UDM Estoque' },
                                        { icon: null, label: 'Ações' },
                                    ].map(col => (
                                        <th key={col.label} className="px-6 py-5">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                                {col.icon}{col.label}
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-[#232f48]/30">
                                {filteredItems.map((item, idx) => (
                                    <tr key={`${item.idNormalizado}-${idx}`} className="group hover:bg-slate-50/80 dark:hover:bg-[#232f48]/20 transition-all duration-300">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors italic">
                                                    {item.descricao}
                                                </span>
                                                {item.alertas.length > 0 && (
                                                    <span className="text-[10px] text-amber-500 font-medium">
                                                        ⚠ {item.alertas.join(' · ')}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-[#232f48] text-slate-600 dark:text-[#92a4c9] text-xs font-mono font-bold border border-slate-200 dark:border-transparent">
                                                {item.idNormalizado}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600 dark:text-[#92a4c9]">{item.subgrupo}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600 dark:text-[#92a4c9]">{item.udmPreco}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-medium text-slate-600 dark:text-[#92a4c9]">{item.udmEstoque}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                                <button className="p-2 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#324467] text-slate-400 hover:text-primary hover:border-primary transition-all shadow-sm">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button className="p-2 rounded-xl bg-white dark:bg-[#1a2332] border border-slate-200 dark:border-[#324467] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm">
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer / Paginação */}
                    <div className="px-6 py-5 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-[#232f48] flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 tracking-tight">
                            Exibindo <span className="text-slate-700 dark:text-slate-200">{filteredItems.length}</span> de <span className="text-slate-700 dark:text-slate-200">{items.length}</span> itens no catálogo
                        </span>
                        <div className="flex items-center gap-2">
                            <button disabled className="p-2 rounded-xl border border-slate-200 dark:border-[#324467] text-slate-300 dark:text-slate-700 cursor-not-allowed">
                                <ChevronLeft size={20} />
                            </button>
                            <span className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-white text-xs font-black shadow-lg shadow-primary/20">1</span>
                            <button disabled className="p-2 rounded-xl border border-slate-200 dark:border-[#324467] text-slate-300 dark:text-slate-700 cursor-not-allowed">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientItens;
