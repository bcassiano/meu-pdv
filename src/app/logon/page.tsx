"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogonPage() {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
    const [systemIsDark, setSystemIsDark] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const router = useRouter();

    useEffect(() => {
        // Checagem inicial do sistema
        if (typeof window !== "undefined") {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            setSystemIsDark(mediaQuery.matches);

            // Listener para mudanças dinâmicas no SO
            const handler = (e: MediaQueryListEvent) => setSystemIsDark(e.matches);
            mediaQuery.addEventListener("change", handler);
            return () => mediaQuery.removeEventListener("change", handler);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);

        // Simulação de login com um pequeno delay para UX premium
        console.log("Login com Usuário:", cpf, "Senha:", senha);

        setTimeout(() => {
            router.push("/pdv/cadastro");
        }, 800);
    };

    // Helper logic for applying the theme class
    const isDark = theme === "dark" || (theme === "system" && systemIsDark);

    return (
        <main className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-hidden relative ${isDark ? "bg-[#101622] text-slate-100" : "bg-[#eef0f6] text-slate-900"} ${isDark ? "dark" : ""}`}>
            {/* Background Layers */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/40 dark:from-white/5 to-transparent pointer-events-none transition-colors duration-500" />
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0d59f2]/10 dark:from-[#0d59f2]/20 to-transparent pointer-events-none transition-colors duration-500" />

            {/* Tema Switcher e Barra de Status */}
            <div className="absolute top-8 right-8 flex items-center gap-4 z-20">
                <div className="flex items-center gap-1 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
                    <button
                        onClick={() => setTheme("light")}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${theme === "light" ? "bg-white dark:bg-slate-700 text-[#0d59f2] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
                        title="Modo Claro"
                    >
                        <span className="material-symbols-outlined text-[18px]">light_mode</span>
                    </button>
                    <button
                        onClick={() => setTheme("dark")}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${theme === "dark" ? "bg-white dark:bg-slate-700 text-[#0d59f2] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
                        title="Modo Escuro"
                    >
                        <span className="material-symbols-outlined text-[18px]">dark_mode</span>
                    </button>
                    <button
                        onClick={() => setTheme("system")}
                        className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all ${theme === "system" ? "bg-white dark:bg-slate-700 text-[#0d59f2] shadow-sm" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"}`}
                        title="Modo Sistema"
                    >
                        <span className="material-symbols-outlined text-[18px]">desktop_windows</span>
                    </button>
                </div>

                <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-500">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                    <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase tracking-widest">Sistema Online</span>
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
                            MEU <span className="text-[#0d59f2]">PDV</span>
                        </h1>
                        <p className="text-[13px] font-bold text-slate-500 dark:text-slate-400">
                            Célula de Atendimento
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="p-10 pt-0 space-y-6">
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest" htmlFor="cpf">
                                Identificação do Promotor
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="cpf"
                                    type="text"
                                    placeholder="Usuário:"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    className="w-full h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#121629] px-5 text-lg font-bold text-slate-600 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-[#0d59f2] focus:bg-white dark:focus:bg-[#121629] focus:ring-4 focus:ring-[#0d59f2]/10 outline-none transition-all"
                                />
                                <div className="absolute right-4 text-slate-400 dark:text-slate-500">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    id="senha"
                                    type="password"
                                    placeholder="Senha:"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    className="w-full h-14 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-[#121629] px-5 text-lg font-bold text-slate-600 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 focus:border-[#0d59f2] focus:bg-white dark:focus:bg-[#121629] focus:ring-4 focus:ring-[#0d59f2]/10 outline-none transition-all"
                                />
                                <div className="absolute right-4 text-slate-400 dark:text-slate-500">
                                    <span className="material-symbols-outlined text-[20px]">lock</span>
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
                                    <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                                    AUTENTICANDO...
                                </>
                            ) : (
                                <>
                                    ENTRAR NO SISTEMA
                                    <span className="material-symbols-outlined text-[20px] animate-bounce-x">arrow_forward</span>
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">help</span>
                                Dúvidas
                            </div>
                            <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-100 dark:border-slate-800 text-sm font-bold text-slate-500 dark:text-slate-400 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">wifi_off</span>
                                Offline
                            </div>
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
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
        </main>
    );
}
