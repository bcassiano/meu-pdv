import React, { useState, useEffect } from 'react';
import { UsuarioVisual, UsuarioTipo } from '@/types/usuario';
import { updateUsuarioAction } from './novo/actions';

interface EditUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UsuarioVisual | null;
    onSuccess: () => void;
}

export default function EditUserModal({ isOpen, onClose, user, onSuccess }: EditUserModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<{
        nome: string;
        tipo: UsuarioTipo;
        equipe: string;
    }>({
        nome: '',
        tipo: 'promotor',
        equipe: ''
    });

    useEffect(() => {
        if (user) {
            // Mapeia os dados da Grid de volta para os "values" do formulário de forma rudimentar/simples.
            let tipoVal = "promotor";
            if (user.role === "Administrador") tipoVal = "adm";
            if (user.role === "Coordenador") tipoVal = "coordenador";
            if (user.role === "Supervisor") tipoVal = "supervisor";

            let eqVal = "eq1";
            if (user.team.includes("Beta")) eqVal = "eq2";
            if (user.team.includes("Gamma")) eqVal = "eq3";

            setFormData({
                nome: user.name,
                tipo: tipoVal as UsuarioTipo,
                equipe: eqVal
            });
        }
    }, [user]);

    if (!isOpen || !user) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await updateUsuarioAction(user.id, {
                nome: formData.nome,
                tipo: formData.tipo,
                equipe: formData.equipe
            });

            if (res.success) {
                onSuccess();
                onClose();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Erro ao salvar edição", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Editar Usuário</h2>
                        <p className="text-sm font-medium text-slate-500 mt-1">{user.email}</p>
                    </div>
                    <button onClick={onClose} type="button" className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <div className="p-8 overflow-y-auto">
                    <form id="edit-form" onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nome Completo</label>
                            <input
                                type="text"
                                required
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                className="w-full h-12 bg-slate-50 dark:bg-black/20 border-2 border-slate-200 dark:border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-colors text-slate-900 dark:text-white font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Perfil de Acesso</label>
                                <select
                                    className="w-full h-12 bg-slate-50 dark:bg-black/20 border-2 border-slate-200 dark:border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-colors text-slate-900 dark:text-white font-medium appearance-none"
                                    value={formData.tipo}
                                    onChange={(e) => setFormData({ ...formData, tipo: e.target.value as UsuarioTipo })}
                                >
                                    <option value="promotor">Promotor</option>
                                    <option value="supervisor">Supervisor</option>
                                    <option value="coordenador">Coordenador</option>
                                    <option value="adm">Administrador</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Equipe / Região</label>
                                <select
                                    className="w-full h-12 bg-slate-50 dark:bg-black/20 border-2 border-slate-200 dark:border-white/10 rounded-xl px-4 focus:border-primary outline-none transition-colors text-slate-900 dark:text-white font-medium appearance-none"
                                    value={formData.equipe}
                                    onChange={(e) => setFormData({ ...formData, equipe: e.target.value })}
                                >
                                    <option value="eq1">Alpha - Operações</option>
                                    <option value="eq2">Beta - Logística</option>
                                    <option value="eq3">Gamma - Estratégia</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="px-8 py-6 border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        form="edit-form"
                        disabled={isLoading}
                        className="px-8 py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        {isLoading ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Salvar Alterações'}
                    </button>
                </div>
            </div>
        </div>
    );
}
