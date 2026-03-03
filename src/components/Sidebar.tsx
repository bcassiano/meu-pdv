"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar(): JSX.Element {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Persistência local com controle de frame (Double rAF) para garantir a transição CSS inicial
    useEffect(() => {
        const stored = localStorage.getItem('sidebarCollapsed');
        if (stored === 'true') {
            // O duplo requestAnimationFrame garante que o navegador efetivamente *desenhe* a tela
            // com a barra larga (padrão) no primeiro frame visual antes de aplicarmos o encolhimento.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setIsCollapsed(true);
                });
            });
        }
    }, []);

    const toggleSidebar = (): void => {
        setIsCollapsed(prev => {
            const next = !prev;
            localStorage.setItem('sidebarCollapsed', String(next));
            return next;
        });
    };

    const navItems = [
        { icon: "dashboard", label: "Overview", href: "/" },
        { icon: "storefront", label: "PDVs Ativos", href: "/pdv/cadastro" },
        { icon: "analytics", label: "Performance", href: "#" },
        { icon: "shield_person", label: "Permissões de Perfil", href: "/usuarios/permissoes" },
    ];

    return (
        <aside className={`${isCollapsed ? 'w-24' : 'w-72'} bg-slate-900 flex flex-col justify-between shrink-0 h-full border-r border-white/5 shadow-2xl z-20 transition-all duration-300 ease-in-out`}>
            <div className="flex flex-col h-full overflow-hidden">
                {/* Logo Section */}
                <div className={`p-6 pb-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 min-w-10 rounded-xl bg-[#0d59f2] flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
                        </div>
                        {!isCollapsed && <h1 className="text-white text-xl font-black tracking-wider whitespace-nowrap">MEU <span className="text-[#0d59f2]">PDV</span></h1>}
                    </div>
                    {/* Botão de Toggle (transferido do Header) - Se recolhido, fica escondido para economizar espaço ou podemos deixá-lo menor! Mas o usuário quer liberar espaço. */}
                    {!isCollapsed && (
                        <button onClick={toggleSidebar} className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors shrink-0">
                            <span className="material-symbols-outlined">menu_open</span>
                        </button>
                    )}
                </div>

                {isCollapsed && (
                    <div className="flex justify-center mb-6">
                        <button onClick={toggleSidebar} className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                )}

                {/* User Profile Hook */}
                <div className={`px-4 py-4 border-b border-white/5 mx-2 bg-gradient-to-r from-white/5 to-transparent rounded-2xl mb-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-4'}`}>
                    <div className="h-10 w-10 shrink-0 rounded-full border-2 border-[#0d59f2]/50 p-0.5 relative flex items-center justify-center bg-slate-800">
                        {/* Imagem Padrão Avatar */}
                        <div className="h-full w-full rounded-full overflow-hidden bg-slate-700 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')] bg-center bg-cover" />

                        {/* Pulse Online - Agora atrelado firmemente ao canto inferior direito */}
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#1a2332] flex items-center justify-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        </span>
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col min-w-0">
                            <h2 className="text-white text-sm font-bold truncate">Bruno C.</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest truncate">Coordenador Região A</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 space-y-1 overflow-x-hidden">
                    {navItems.map((item, i) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={i}
                                href={item.href}
                                title={isCollapsed ? item.label : ""}
                                className={`flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'} py-3.5 rounded-xl transition-all group ${isActive
                                    ? "bg-[#0d59f2] text-white shadow-lg shadow-blue-500/20 font-bold"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} w-full`}>
                                    <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-white" : "group-hover:text-[#0d59f2] transition-colors"}`}>
                                        {item.icon}
                                    </span>
                                    {!isCollapsed && <span className="text-sm tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>}
                                </div>
                                {!isCollapsed && isActive && <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-white animate-pulse" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Sidebar Action */}
                <div className="p-4">
                    <Link href="/logon" title={isCollapsed ? "Sair" : ""} className={`flex w-full items-center ${isCollapsed ? 'justify-center px-0' : 'justify-center gap-3 px-4'} rounded-2xl bg-white/5 py-4 text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all text-xs font-black tracking-[0.2em] uppercase border border-white/5 overflow-hidden`}>
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        {!isCollapsed && <span>Sair</span>}
                    </Link>
                </div>
            </div>
        </aside>
    );
}
