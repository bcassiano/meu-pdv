"use client";

import React from "react";

interface HeaderProps {
    title?: string;
    icon?: string;
    breadcrumb?: { label: string; href?: string; active?: boolean }[];
    navigation?: { label: string; href: string; active?: boolean; icon?: string }[];
    showSearch?: boolean;
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;
    userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({
    title = "Admin Console",
    icon = "admin_panel_settings",
    breadcrumb,
    navigation = [
        { label: "Dashboard", href: "#", icon: "dashboard" },
        { label: "Usuários", href: "/usuarios", active: true, icon: "group" },
        { label: "Relatórios", href: "#", icon: "assessment" },
        { label: "Configurações", href: "/usuarios/permissoes", icon: "settings" },
    ],
    showSearch = true,
    searchPlaceholder = "Buscar...",
    onSearchChange,
    userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
}) => {
    return (
        <>
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#232f48] bg-[#1a2332] px-10 py-3 sticky top-0 z-50 shrink-0 h-20">
                <div className="flex items-center gap-8">
                    {/* Mobile Menu Toggle (Preserving functionality from usuarios page) */}
                    <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors xl:hidden">
                        <span className="material-symbols-outlined">menu</span>
                    </button>

                    <div className="flex items-center gap-4 text-white">
                        <div className="size-8 text-[#1152d4]">
                            <span className="material-symbols-outlined text-[32px]">{icon}</span>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">{title}</h2>
                            {breadcrumb && (
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                    {breadcrumb.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <span className={item.active ? "text-white" : "hover:text-primary cursor-pointer transition-colors"}>
                                                {item.label}
                                            </span>
                                            {index < breadcrumb.length - 1 && (
                                                <span className="material-symbols-outlined text-[12px]">chevron_right</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {navigation && (
                        <nav className="hidden md:flex items-center gap-9">
                            {navigation.map((item, index) => (
                                <a
                                    key={index}
                                    className={`${item.active ? "text-white" : "text-[#92a4c9] hover:text-white"
                                        } text-sm font-medium leading-normal transition-colors flex items-center gap-2`}
                                    href={item.href}
                                >
                                    {item.icon && (
                                        <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                                    )}
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="flex flex-1 justify-end gap-6 items-center">
                    {showSearch && (
                        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#324467] bg-[#232f48] focus-within:ring-2 focus-within:ring-[#1152d4]">
                                <div className="text-[#92a4c9] flex items-center justify-center pl-3">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input
                                    className="w-full bg-transparent border-none text-white placeholder:text-[#92a4c9] px-3 text-sm focus:ring-0 outline-none"
                                    placeholder={searchPlaceholder}
                                    onChange={(e) => onSearchChange?.(e.target.value)}
                                />
                            </div>
                        </label>
                    )}

                    <div className="flex items-center gap-4">
                        <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-[#232f48] border border-[#324467] text-[#92a4c9] hover:text-white hover:border-[#1152d4] transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-[#1a2332]" />
                        </button>

                        <div className="relative group">
                            <div
                                className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-[#324467] cursor-pointer"
                                style={{ backgroundImage: `url("${userAvatar}")` }}
                            ></div>
                            <div className="absolute right-0 top-0 size-3 bg-green-500 rounded-full border-2 border-[#1a2332]"></div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
