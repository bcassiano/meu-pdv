import React, { useState } from 'react';
import { UsuarioVisual } from '@/types/usuario';
import { resetSenhaUsuarioAction } from './novo/actions';

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: UsuarioVisual | null;
    onSuccess: () => void;
}

export default function ResetPasswordModal({ isOpen, onClose, user, onSuccess }: ResetPasswordModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    if (!isOpen || !user) return null;

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const res = await resetSenhaUsuarioAction(user.id);
            if (res.success) {
                onSuccess();
                onClose();
            } else {
                alert(res.message);
            }
        } catch (error) {
            console.error("Erro ao resetar senha", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-md shadow-2xl p-8 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full bg-orange-50 dark:bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-4xl">lock_reset</span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2">
                    Resetar Senha
                </h2>

                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">
                    Tem certeza que deseja resetar a senha de <span className="font-bold text-slate-700 dark:text-slate-300">{user.name}</span>?
                    <br /><br />
                    A nova senha provisória será <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-primary">Mudar123@</code>. Esta ação não poderá ser desfeita e o usuário precisará da nova senha para acessar.
                </p>

                <div className="flex items-center gap-3 w-full">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        disabled={isLoading}
                        className="flex-1 px-6 py-4 rounded-xl font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? <span className="material-symbols-outlined animate-spin">refresh</span> : 'Confirmar Reset'}
                    </button>
                </div>
            </div>
        </div>
    );
}
