"use client";

import React, { useState } from "react";

export default function LogonPage() {
    const [cpf, setCpf] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulação de login
        console.log("Login com CPF:", cpf);
    };

    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-[#eef0f6] text-slate-900 transition-colors duration-500 overflow-hidden relative">
            {/* Background Layers */}
            <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-white/40 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#0d59f2]/10 to-transparent pointer-events-none" />

            {/* Barra de Status Offline/Online */}
            <div className="absolute top-8 right-8 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur border border-slate-100 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Sistema Online</span>
            </div>

            <div className="w-full max-w-[420px] z-10">
                <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 overflow-hidden transform transition-all duration-500">
                    {/* Header */}
                    <div className="p-10 pb-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="h-16 w-16 flex items-center justify-center rounded-2xl bg-[#0d59f2] text-white shadow-lg shadow-blue-500/30">
                                <span className="material-symbols-outlined text-[32px]">badge</span>
                            </div>
                        </div>
                        <h1 className="text-3xl font-black tracking-tighter text-slate-900 mb-1">
                            MEU <span className="text-[#0d59f2]">PDV</span>
                        </h1>
                        <p className="text-[13px] font-bold text-slate-500">
                            Célula de Atendimento
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="p-10 pt-0 space-y-6">
                        <div className="space-y-3">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-widest" htmlFor="cpf">
                                Identificação do Promotor
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    id="cpf"
                                    type="tel"
                                    placeholder="000.000.000-00"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                    className="w-full h-14 rounded-xl border border-slate-200 bg-slate-50/50 px-5 text-lg font-bold text-slate-600 placeholder:text-slate-300 focus:border-[#0d59f2] focus:bg-white focus:ring-4 focus:ring-[#0d59f2]/10 outline-none transition-all"
                                />
                                <div className="absolute right-4 text-slate-400">
                                    <span className="material-symbols-outlined text-[20px]">person</span>
                                </div>
                            </div>
                            <p className="text-[11px] text-slate-400 italic">
                                Sincronização biométrica configurada para este dispositivo.
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-14 rounded-xl bg-[#0d59f2] hover:bg-blue-700 text-white font-black tracking-wide shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                        >
                            ENTRAR NO SISTEMA
                            <span className="material-symbols-outlined text-[20px] animate-bounce-x">arrow_forward</span>
                        </button>

                        <div className="relative pt-6 pb-2">
                            <div className="absolute inset-0 flex items-center pb-2">
                                <div className="w-full border-t border-slate-100"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold text-slate-300">
                                <span className="bg-white px-4">Suporte Master</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-100 text-sm font-bold text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">help</span>
                                Dúvidas
                            </div>
                            <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-slate-100 text-sm font-bold text-slate-500 cursor-pointer hover:bg-slate-50 transition-colors">
                                <span className="material-symbols-outlined text-[18px]">wifi_off</span>
                                Offline
                            </div>
                        </div>
                    </form>

                    {/* Footer stable info */}
                    <div className="bg-white p-6 px-10 border-t border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">v3.4.0 Final Cluster</span>
                        </div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">MD5 Verified</span>
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
