"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { autenticarUsuario } from "./actions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslation } from "@/locales/useTranslation";

export default function LogonPage(): JSX.Element {
    const { t } = useTranslation();
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isShaking, setIsShaking] = useState(false);

    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!cpf.trim() || !senha.trim()) {
            setError("Preencha todos os campos para acessar.");
            setIsShaking(true);
            setTimeout(() => setIsShaking(false), 500);
            return;
        }

        setIsLoggingIn(true);

        try {
            const result = await autenticarUsuario(cpf, senha);

            if (result.success) {
                // Sucesso: Redireciona
                router.push("/pdv/cadastro");
            } else {
                // Falha: Exibe erro e chacoalha o form
                setError(result.message || "Erro na autenticação.");
                setIsShaking(true);
                setTimeout(() => setIsShaking(false), 500);
                setIsLoggingIn(false);
            }
        } catch (err) {
            setError("Falha na conexão com o servidor.");
            setIsLoggingIn(false);
        }
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden relative bg-[#eef0f6] dark:bg-[#101622] text-slate-900 dark:text-slate-100">
            {/* Background Layers */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/40 dark:from-white/5 to-transparent pointer-events-none transition-colors duration-500" />
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0d59f2]/10 dark:from-[#0d59f2]/20 to-transparent pointer-events-none transition-colors duration-500" />

            {/* Tema Switcher e Barra de Status */}
            <div className="absolute top-8 right-8 flex items-center gap-4 z-20">

                <ThemeToggle />

                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-500">
                    <div className="relative flex h-2 w-2 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                    </div>
                    <span className="text-[9px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest whitespace-nowrap">Sistema Online</span>
                </div>
            </div>

            <div className="w-full max-w-[420px] z-10">
                <div className="bg-white dark:bg-[#1a2133] rounded-[2rem] shadow-xl shadow-slate-200/50 dark:shadow-2xl dark:shadow-black/50 border border-transparent dark:border-slate-800/60 overflow-hidden transform transition-all duration-500">
                    {/* Header */}
                    <div className="p-10 pb-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#0d59f2] text-white shadow-lg shadow-blue-500/30">
                                <span className="material-symbols-outlined text-[32px]">badge</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white mb-1">
                            {t('logon.title').split(' ')[0]} <span className="text-[#0d59f2]">{t('logon.title').split(' ')[1]}</span>
                        </h1>
                        <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">
                            {t('logon.subtitle')}
                        </p>
                    </div>

                    {/* Erro de Validação */}
                    {error && (
                        <div role="alert" aria-live="assertive" className="mx-10 mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                            <span className="material-symbols-outlined text-red-500 text-[20px]">error</span>
                            <span className="text-xs font-bold text-red-500">{error}</span>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className={`p-10 ${error ? 'pt-4' : 'pt-0'} space-y-6 ${isShaking ? 'animate-shake' : ''}`}>
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest" htmlFor="cpf">
                                {t('logon.form.cpfLabel')}
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="cpf"
                                    type="text"
                                    placeholder={t('logon.form.cpfPlaceholder')}
                                    required
                                    value={cpf}
                                    onChange={(e) => {
                                        setCpf(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    className="w-full h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#121629] px-5 text-lg font-bold text-slate-600 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-[#0d59f2] focus:bg-white dark:focus:bg-[#121629] focus:ring-4 focus:ring-[#0d59f2]/10 outline-none transition-all"
                                />
                                <div className="absolute right-4 text-slate-400 dark:text-slate-500">
                                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                            </div>
                            <label className="sr-only" htmlFor="senha">{t('logon.form.senhaLabel')}</label>
                            <div className="relative flex items-center">
                                <input
                                    id="senha"
                                    type="password"
                                    placeholder={t('logon.form.senhaPlaceholder')}
                                    required
                                    value={senha}
                                    onChange={(e) => {
                                        setSenha(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    className="w-full h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#121629] px-5 text-lg font-bold text-slate-600 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-[#0d59f2] focus:bg-white dark:focus:bg-[#121629] focus:ring-4 focus:ring-[#0d59f2]/10 outline-none transition-all"
                                />
                                <div className="absolute right-4 text-slate-400 dark:text-slate-500">
                                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">lock</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic pt-1">
                                Sincronização biométrica configurada para este dispositivo.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className={`w-full h-14 rounded-xl bg-[#2968f2] hover:bg-blue-600 text-white font-black tracking-wide shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 ${isLoggingIn ? "opacity-70 cursor-wait" : ""}`}
                        >
                            {isLoggingIn ? (
                                <>
                                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                                    {t('logon.form.authenticating')}
                                </>
                            ) : (
                                <>
                                    {t('logon.form.submitButton')}
                                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] animate-bounce-x">arrow_forward</span>
                                </>
                            )}
                        </button>

                        <div className="relative pt-6 pb-2">
                            <div className="absolute inset-0 flex items-center pb-2">
                                <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-300 dark:text-slate-600">
                                <span className="bg-white dark:bg-[#1a2133] px-4 transition-colors duration-500">Suporte Master</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4" role="navigation" aria-label="Links de Suporte">
                            <button type="button" className="flex w-full items-center justify-center gap-2 h-12 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">help</span>
                                {t('logon.footer.faq')}
                            </button>
                            <button type="button" className="flex w-full items-center justify-center gap-2 h-12 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span aria-hidden="true" className="material-symbols-outlined text-[18px]">wifi_off</span>
                                {t('logon.footer.offline')}
                            </button>
                        </div>
                    </form>

                    {/* Footer stable info */}
                    <div className="bg-white dark:bg-[#1a2133] p-6 px-10 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between transition-colors duration-500">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">v3.4.0 Final Cluster</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">MD5 Verified</span>
                    </div>
                </div>

                <div className="mt-8 px-8 text-center">
                    <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
                        Segurança de Camada 4 Ativa. Ao acessar, você concorda com o monitoramento de geolocalização e as políticas de auditoria em tempo real.
                    </p>
                </div>
            </div>

            <style jsx>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out infinite;
        }
      `}</style>
        </main>
    );
}
