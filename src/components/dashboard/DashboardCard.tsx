"use client";

import React from "react";

interface CardProps {
    id?: string;
    title: string;
    value: string;
    trend?: string;
    subtitle?: string;
    icon: string;
    color: string;
    bg: string;
    large?: boolean;
    dark?: boolean;
    children?: React.ReactNode;
}

export const DashboardCard: React.FC<CardProps> = ({ 
    title, value, trend, subtitle, icon, color, bg, large, dark, children 
}) => {
    if (dark) {
        return (
            <div className={`group ${large ? 'xl:col-span-2' : ''} bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] border border-indigo-500/20 shadow-2xl shadow-indigo-900/20 p-8 flex flex-col justify-between hover:border-indigo-500/50 transition-all overflow-hidden relative`}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl group-hover:bg-indigo-500/30 transition-colors pointer-events-none" />
                
                <div className="flex justify-between items-start mb-6 relative z-10">
                    <div className="h-14 w-14 rounded-2xl bg-indigo-500/20 text-indigo-300 flex items-center justify-center shadow-inner border border-indigo-500/30 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-3xl">{icon}</span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 text-white font-bold text-sm backdrop-blur-sm">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        Tempo Real
                    </div>
                </div>
                
                <div className="relative z-10">
                    <h3 className="text-indigo-200 font-bold text-sm tracking-widest uppercase mb-2">{title}</h3>
                    {children ? children : (
                        <div className="flex items-end gap-3">
                            <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
                            {subtitle && <p className="text-indigo-300 font-medium text-sm mt-2">{subtitle}</p>}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className={`group ${large ? 'xl:col-span-2' : ''} bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-none p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all overflow-hidden relative`}>
            <div className={`absolute top-0 ${large ? 'right-0' : 'left-0'} -mt-10 -mr-10 w-40 h-40 ${bg.replace('bg-', 'bg-').split('/')[0]}/5 rounded-full blur-3xl group-hover:bg-opacity-10 transition-colors pointer-events-none`} />
            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className={`h-14 w-14 rounded-2xl ${bg} ${color} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-3xl">{icon}</span>
                </div>
                {trend && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-500 font-bold text-sm">
                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        {trend}
                    </div>
                )}
                {title === "Lojas com pontos extras" && (
                     <div className="h-10 w-10 relative flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <path className="text-slate-100 dark:text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                            <path className="text-orange-500" strokeDasharray="68, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                        </svg>
                    </div>
                )}
            </div>
            <div className="relative z-10">
                <h3 className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-widest uppercase mb-2 truncate" title={title}>{title}</h3>
                <div className="flex items-end gap-3">
                    <p className={`${large ? 'text-5xl' : 'text-4xl'} font-black text-slate-900 dark:text-white tracking-tighter`}>{value}</p>
                    {title === "Atividades Promotores" && <span className="text-slate-400 font-medium mb-1.5">check-ins/mês</span>}
                </div>
                {subtitle && <p className={`${color} font-medium text-sm mt-2`}>{subtitle}</p>}
                {trend && title === "Pontos Extras" && (
                    <div className="flex items-center gap-1.5 mt-2 text-amber-500 font-bold text-sm">
                        <span className="material-symbols-outlined text-[16px]">trending_up</span>
                        {trend} vs mês ref.
                    </div>
                )}
            </div>
            {children}
        </div>
    );
};
