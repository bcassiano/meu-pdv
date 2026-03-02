"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { icon: "dashboard", label: "Overview", href: "/" },
        { icon: "storefront", label: "PDVs Ativos", href: "/pdv/cadastro" },
        { icon: "group", label: "Gestão de Equipe", href: "/usuarios" },
        { icon: "analytics", label: "Performance", href: "#" },
        { icon: "shield_person", label: "Permissões de Perfil", href: "/usuarios/permissoes" },
    ];

    return (
        <aside className="w-72 bg-slate-900 flex flex-col justify-between shrink-0 h-full border-r border-white/5 shadow-2xl z-20">
            <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="p-8 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-[#0d59f2] flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="material-symbols-outlined text-white text-2xl">rocket_launch</span>
                        </div>
                        <h1 className="text-white text-xl font-black tracking-wider">MEU <span className="text-[#0d59f2]">PDV</span></h1>
                    </div>
                </div>

                {/* User Profile Hook */}
                <div className="px-6 py-6 border-b border-white/5 mx-2 bg-gradient-to-r from-white/5 to-transparent rounded-2xl mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full border-2 border-[#0d59f2]/50 p-0.5">
                            <div className="h-full w-full rounded-full bg-slate-700 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix')] bg-center bg-cover" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-white text-sm font-bold">Bruno C.</h2>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <p className="text-slate-400 text-[10px] uppercase font-black tracking-widest">Coordenador Região A</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 px-4 space-y-1">
                    {navItems.map((item, i) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={i}
                                href={item.href}
                                className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all group ${isActive
                                    ? "bg-[#0d59f2] text-white shadow-lg shadow-blue-500/20 font-bold"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className={`material-symbols-outlined text-[22px] ${isActive ? "text-white" : "group-hover:text-[#0d59f2] transition-colors"}`}>
                                        {item.icon}
                                    </span>
                                    <span className="text-sm tracking-wide">{item.label}</span>
                                </div>
                                {isActive && <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom Sidebar Action */}
                <div className="p-6">
                    <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white/5 px-4 py-4 text-slate-400 hover:bg-red-500/10 hover:text-red-500 transition-all text-xs font-black tracking-[0.2em] uppercase border border-white/5">
                        <span className="material-symbols-outlined text-[18px]">logout</span>
                        Sair da Estação
                    </button>
                </div>
            </div>
        </aside>
    );
}
