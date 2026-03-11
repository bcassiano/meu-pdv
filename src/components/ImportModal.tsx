"use client";

import React, { useState, useCallback } from "react";
import { 
    X, 
    CloudUpload, 
    FileText, 
    CheckCircle2, 
    AlertCircle, 
    Loader2,
    Database,
    ShieldCheck,
    AlertTriangle
} from "lucide-react";
import type { ItemNormalizado, RelatorioLinha } from "@/lib/importadores/normalizar-itens";

// ── Tipos ─────────────────────────────────────────────────────────────────────

type ImportMode = 'pdv' | 'itens';
type ImportStatus = 'idle' | 'processing' | 'warning' | 'success' | 'error';

interface ResultadoItens {
    totalLinhas: number;
    itensValidos: number;
    itensComAlerta: number;
    qualidadeGeral: number;
    relatorio: RelatorioLinha[];
    itens: ItemNormalizado[];
}

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImportComplete: (data: ItemNormalizado[]) => void;
    mode?: ImportMode;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const TIPO_LABEL: Record<RelatorioLinha['tipo'], string> = {
    UDM_INFERIDA: 'UDM Inferida',
    SUBGRUPO_PROPAGADO: 'Subgrupo Propagado',
    ID_GERADO: 'ID Gerado',
    LINHA_VAZIA: 'Linha Ignorada',
    UDM_PADRONIZADA: 'UDM Padronizada',
};

// ── Componente ────────────────────────────────────────────────────────────────

const ImportModal: React.FC<ImportModalProps> = ({ isOpen, onClose, onImportComplete, mode = 'pdv' }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<ImportStatus>('idle');
    const [progress, setProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [resultado, setResultado] = useState<ResultadoItens | null>(null);

    const titulo = mode === 'itens' ? 'Importar Catálogo de Itens' : 'Importar PDVs';

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const processarArquivo = async (selectedFile: File) => {
        if (!selectedFile.name.endsWith('.csv')) {
            setStatus('error');
            setErrorMsg("Apenas arquivos .CSV são suportados.");
            return;
        }

        setFile(selectedFile);
        setStatus('processing');
        setProgress(30);

        const endpoint = mode === 'itens' ? '/api/itens/import' : '/api/pdv/import';
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setProgress(60);
            const res = await fetch(endpoint, { method: 'POST', body: formData });
            const json = await res.json();
            setProgress(100);

            if (!res.ok) {
                setStatus('error');
                setErrorMsg(json.message || json.error || 'Erro ao processar o arquivo.');
                return;
            }

            if (mode === 'itens') {
                setResultado(json);
                const temAlertas = json.itensComAlerta > 0;
                setTimeout(() => setStatus(temAlertas ? 'warning' : 'success'), 600);
            } else {
                setTimeout(() => setStatus('success'), 600);
                onImportComplete(json.validRows ?? []);
            }
        } catch {
            setStatus('error');
            setErrorMsg('Falha de conexão ao enviar o arquivo.');
        }
    };

    const confirmarImportacao = () => {
        if (!resultado) return;
        setStatus('success');
        onImportComplete(resultado.itens);
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) processarArquivo(dropped);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mode]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) processarArquivo(selected);
    };

    const resetar = () => {
        setStatus('idle');
        setFile(null);
        setResultado(null);
        setErrorMsg('');
        setProgress(0);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1a2332] w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border border-slate-200 dark:border-[#232f48] animate-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-8 border-b border-slate-100 dark:border-[#232f48] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                            <CloudUpload size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">{titulo}</h3>
                            <p className="text-xs text-slate-500 dark:text-[#92a4c9] font-medium uppercase tracking-widest mt-0.5">Módulo de Itens</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#232f48] text-slate-400 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">

                    {/* Zona de Drop */}
                    {status === 'idle' && (
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
                                isDragging
                                    ? 'border-primary bg-primary/5 scale-[0.99]'
                                    : 'border-slate-200 dark:border-[#232f48] hover:border-slate-300 dark:hover:border-[#324467]'
                            }`}
                        >
                            <input type="file" accept=".csv" onChange={handleFileSelect} className="absolute inset-0 opacity-0 cursor-pointer" />
                            <div className="size-20 rounded-full bg-slate-50 dark:bg-[#232f48] flex items-center justify-center text-slate-300 dark:text-[#2d3a54]">
                                <FileText size={40} />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">Arraste seu arquivo CSV aqui</p>
                                <p className="text-xs text-slate-400 mt-1">ou clique para procurar no computador</p>
                                {mode === 'itens' && (
                                    <p className="text-[10px] text-primary/70 mt-2 font-medium">
                                        Formato esperado: ID SUBGRUPO DE ITENS · ID ITEM · DESCRIÇÃO ITEM · UDM Preço · UDM estoque
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Processando */}
                    {status === 'processing' && (
                        <div className="py-12 flex flex-col items-center justify-center gap-6">
                            <div className="relative size-24">
                                <svg className="size-full -rotate-90">
                                    <circle cx="48" cy="48" r="40" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-[#232f48] stroke-current" />
                                    <circle
                                        cx="48" cy="48" r="40" strokeWidth="8" fill="transparent"
                                        strokeDasharray={251.2}
                                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                                        className="text-primary stroke-current transition-all duration-500"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center text-primary font-black">{progress}%</div>
                            </div>
                            <div className="text-center space-y-2">
                                <h4 className="font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                                    <Loader2 className="animate-spin" size={18} /> Processando e Normalizando...
                                </h4>
                                <p className="text-xs text-slate-500 font-medium italic">{file?.name}</p>
                            </div>
                        </div>
                    )}

                    {/* Warning — com alertas mas prosseguível */}
                    {status === 'warning' && resultado && (
                        <div className="flex flex-col gap-5 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex items-center gap-4">
                                <div className="size-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shrink-0">
                                    <AlertTriangle size={28} strokeWidth={1.5} />
                                </div>
                                <div>
                                    <h4 className="text-lg font-black text-slate-900 dark:text-white">Normalização concluída com alertas</h4>
                                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                                        {resultado.itensComAlerta} item(ns) foram ajustados automaticamente
                                    </p>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                {[
                                    { label: 'Total de Linhas', val: resultado.totalLinhas, icon: <Database size={12}/> },
                                    { label: 'Itens Válidos', val: resultado.itensValidos, icon: <CheckCircle2 size={12} className="text-emerald-500"/> },
                                    { label: 'Qualidade Geral', val: `${resultado.qualidadeGeral}%`, icon: <ShieldCheck size={12} className={resultado.qualidadeGeral < 70 ? 'text-rose-500' : resultado.qualidadeGeral < 90 ? 'text-amber-500' : 'text-emerald-500'}/> },
                                ].map(s => (
                                    <div key={s.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#232f48] border border-slate-100 dark:border-transparent">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400 mb-1">{s.icon}{s.label}</div>
                                        <span className="text-xl font-black text-slate-800 dark:text-white">{s.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Painel de alertas */}
                            <div className="max-h-48 overflow-y-auto rounded-2xl border border-amber-100 dark:border-amber-900/20 bg-amber-50 dark:bg-amber-900/10 p-4 space-y-2">
                                <p className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 tracking-widest mb-3">Relatório de Ajustes</p>
                                {resultado.relatorio.slice(0, 50).map((r, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs">
                                        <span className="shrink-0 px-1.5 py-0.5 rounded-md bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                                            {TIPO_LABEL[r.tipo]}
                                        </span>
                                        <span className="text-amber-700 dark:text-amber-400/80">
                                            <span className="font-bold">Ln {r.linha}:</span> {r.descricao}
                                        </span>
                                    </div>
                                ))}
                                {resultado.relatorio.length > 50 && (
                                    <p className="text-[10px] text-amber-600/60 text-center pt-1">
                                        +{resultado.relatorio.length - 50} ocorrências adicionais
                                    </p>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Sucesso */}
                    {status === 'success' && resultado && (
                        <div className="py-8 flex flex-col items-center justify-center gap-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="size-24 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-500/10 border border-emerald-500/20">
                                <CheckCircle2 size={48} strokeWidth={1.5} />
                            </div>
                            <div className="text-center space-y-2">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Importação Concluída!</h4>
                                <p className="text-sm text-slate-500 font-medium">O catálogo foi normalizado e atualizado.</p>
                            </div>
                            <div className="w-full grid grid-cols-3 gap-4">
                                {[
                                    { label: 'Total Linhas', val: resultado.totalLinhas, icon: <Database size={12}/> },
                                    { label: 'Itens Importados', val: resultado.itensValidos, icon: <CheckCircle2 size={12} className="text-emerald-500"/> },
                                    { label: 'Qualidade', val: `${resultado.qualidadeGeral}%`, icon: <ShieldCheck size={12} className={resultado.qualidadeGeral < 70 ? 'text-rose-500' : 'text-emerald-500'}/> },
                                ].map(s => (
                                    <div key={s.label} className="p-4 rounded-2xl bg-slate-50 dark:bg-[#232f48] border border-slate-100 dark:border-transparent">
                                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-slate-400 mb-1">{s.icon}{s.label}</div>
                                        <span className="text-xl font-black text-slate-800 dark:text-white">{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Erro */}
                    {status === 'error' && (
                        <div className="py-8 flex flex-col items-center justify-center gap-6 animate-in shake duration-500">
                            <div className="size-24 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20">
                                <AlertCircle size={48} strokeWidth={1.5} />
                            </div>
                            <div className="text-center space-y-2">
                                <h4 className="text-2xl font-black text-slate-900 dark:text-white">Ops, algo deu errado.</h4>
                                <p className="text-sm text-rose-500/80 font-medium max-w-[320px]">{errorMsg}</p>
                            </div>
                            <button onClick={resetar} className="px-8 py-3 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">
                                Tentar Novamente
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-slate-50 dark:bg-[#151d2a] flex justify-end gap-3 border-t border-slate-100 dark:border-[#232f48]">
                    <button onClick={onClose} className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                        Cancelar
                    </button>

                    {status === 'warning' && (
                        <button
                            onClick={confirmarImportacao}
                            className="px-8 py-3 rounded-2xl bg-amber-500 text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-amber-500/30 hover:scale-105 transition-all"
                        >
                            Prosseguir com {resultado?.itensValidos} itens
                        </button>
                    )}

                    {status === 'success' && (
                        <button onClick={onClose} className="px-8 py-3 rounded-2xl bg-primary text-white text-xs font-black uppercase tracking-widest shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                            Ver Catálogo
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImportModal;
