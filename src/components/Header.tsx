"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";

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
    navigation, // Removido array mockado padrão
    showSearch = true,
    searchPlaceholder = "Buscar...",
    onSearchChange,
    userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
}) => {
    return (
        <>
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-[#232f48] bg-white dark:bg-[#1a2332] px-6 lg:px-10 py-3 sticky top-0 z-50 shrink-0 h-20 gap-4 transition-colors duration-500">
                <div className="flex items-center gap-6 min-w-0 flex-1">

                    <div className="flex items-center gap-4 text-white min-w-0 shrink-0">
                        <div className="size-8 text-[#1152d4] shrink-0">
                            <span className="material-symbols-outlined text-[32px]">{icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] truncate">{title}</h2>
                            {breadcrumb && breadcrumb.length > 0 && (
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 truncate hidden sm:flex">
                                    {breadcrumb.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <span className={`truncate ${item.active ? "text-slate-900 dark:text-white" : "hover:text-[#1152d4] cursor-pointer transition-colors"}`}>
                                                {item.label}
                                            </span>
                                            {index < breadcrumb.length - 1 && (
                                                <span className="material-symbols-outlined text-[12px] shrink-0">chevron_right</span>
                                            )}
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Navigation Tabs - Hidden on mobile, scrollable on tablet, full on desktop */}
                    {navigation && navigation.length > 0 && (
                        <nav className="hidden md:flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pl-6">
                            {navigation.map((item, index) => (

                                <a
                                    key={index}
                                    className={`
                                        ${item.active
                                            ? "bg-[#1152d4] text-white shadow-md shadow-[#1152d4]/20"
                                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-[#92a4c9] dark:hover:text-white dark:hover:bg-[#232f48]"
                                        } px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap shrink-0
                                    `}
                                    href={item.href}
                                >
                                    {item.icon && (
                                        <span className={`material-symbols-outlined text-[18px] ${item.active ? 'text-white' : ''}`}>{item.icon}</span>
                                    )}
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="flex justify-end gap-6 items-center shrink-0">
                    {showSearch && (
                        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-slate-200 dark:border-[#324467] bg-slate-50 dark:bg-[#232f48] focus-within:ring-2 focus-within:ring-[#1152d4] transition-colors">
                                <div className="text-slate-400 dark:text-[#92a4c9] flex items-center justify-center pl-3">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input
                                    className="w-full bg-transparent border-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] px-3 text-sm focus:ring-0 outline-none"
                                    placeholder={searchPlaceholder}
                                    onChange={(e) => onSearchChange?.(e.target.value)}
                                />
                            </div>
                        </label>
                    )}

                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <button className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-[#232f48] border border-slate-200 dark:border-[#324467] text-slate-400 dark:text-[#92a4c9] hover:text-slate-900 dark:hover:text-white hover:border-[#1152d4] transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-[#1a2332]" />
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
