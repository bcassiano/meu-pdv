"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

export function ThemeToggle(): JSX.Element {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [themeMessage, setThemeMessage] = useState<string | null>(null);
    const themeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = (): void => {
        let nextTheme = "system";
        let msg = "";

        // Cycle: system -> light -> dark -> system
        if (theme === 'system' || !theme) {
            nextTheme = 'light';
            msg = 'Tema: Claro';
        } else if (theme === 'light') {
            nextTheme = 'dark';
            msg = 'Tema: Escuro';
        } else {
            nextTheme = 'system';
            msg = 'Tema: Sistema';
        }

        setTheme(nextTheme);
        setThemeMessage(msg);

        if (themeTimeoutRef.current) clearTimeout(themeTimeoutRef.current);
        themeTimeoutRef.current = setTimeout(() => {
            setThemeMessage(null);
        }, 2000);
    };

    if (!mounted) {
        return (
            <div className="flex items-center gap-1 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm shrink-0">
                <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-white dark:bg-slate-700 shadow-sm">
                    <span className="material-symbols-outlined text-[18px] text-[#0d59f2] opacity-0">light_mode</span>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center shrink-0 z-50">
            {/* Animating Toast Message */}
            {themeMessage && (
                <div className="absolute right-12 mr-2 whitespace-nowrap animate-in fade-in slide-in-from-right-4 duration-300 px-4 py-2 rounded-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#0d59f2] dark:text-[#3b82f6] shadow-sm pointer-events-none">
                    {themeMessage}
                </div>
            )}

            {/* Toggle Button */}
            <div
                className="flex items-center gap-1 p-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                onClick={toggleTheme}
                title="Alternar Tema"
            >
                <div className="h-8 w-8 rounded-lg flex items-center justify-center transition-all bg-white dark:bg-slate-700 text-[#0d59f2] shadow-sm">
                    <span className="material-symbols-outlined text-[18px]">
                        {theme === 'light' ? 'light_mode' : theme === 'dark' ? 'dark_mode' : 'desktop_windows'}
                    </span>
                </div>
            </div>
        </div>
    );
}
