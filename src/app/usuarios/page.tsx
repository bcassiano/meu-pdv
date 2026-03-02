"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function GestaoUsuariosPage() {
    const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

    // Dados mockados baseados no protótipo original
    const users = [
        { id: 1, name: "João Silva", email: "joao.silva@empresa.com", initials: "JS", role: "Gerente", roleColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", team: "Vendas Norte", teamIcon: "store", status: "Ativo", statusColor: "bg-emerald-500 text-emerald-400" },
        { id: 2, name: "Maria Oliveira", email: "maria.oliveira@empresa.com", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAhRW7t-_7mS-Uzw5zWBGIPmJi0Xsxr8hdaIZclWzRFY7Qhk1byvnp_EO2KDQyaQ8oydQKmVipiPzyxWxVM2AL3PmhPF_lcyGBH_ltxMTFpOxqlEQuxnt_NVwHJriDFPOHnpUxF2ZP-b7FTUR09_kzbUDZCUluL4h3KynVdAGGwz-Qf2qu77C3GvhvZ59rs2HYsFJpSTe9tUzCm-xXrykcTMFpm9YEczSvUBABR1CtPPSbaD0Gl6N76B2tDsy3v4LX_Nj_jdL1qUcg", role: "Coordenador", roleColor: "text-purple-400 bg-purple-500/10 border-purple-500/20", team: "Operações Sul", teamIcon: "hub", status: "Ativo", statusColor: "bg-emerald-500 text-emerald-400" },
        { id: 3, name: "Carlos Santos", email: "carlos.santos@empresa.com", initials: "CS", role: "Promotor", roleColor: "text-slate-300 bg-slate-700 border-slate-600", team: "PDV Centro", teamIcon: "storefront", status: "Inativo", statusColor: "bg-red-500 text-red-400" },
        { id: 4, name: "Roberto Alves", email: "roberto.alves@empresa.com", avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBlWLamTGp9T-dN9b709ZHU2k_ud4_roOiENI7LeCmCKeg51s7YrDsnR15Z5lgtrggUvzH8A3ni8Fp6msYVWtvgAbo1zrISsuTv_l-A5AJNvK3Kx2ABdQTdh1eNj-5HEAcXT-0hyS8J7Tf54bGe3G_AH0Sb0l4SVKK_i6RydPOOSEOpXP2E6J5o67s9K8L4_t0u4zKj7RBofQ8lWYOFFSq0bVE4-xE1pYu_B49Xfx3ktaX91ME85DfPEk-ZRHp3O85rjYbMkFTRwQc", role: "Promotor", roleColor: "text-slate-300 bg-slate-700 border-slate-600", team: "PDV Shopping", teamIcon: "storefront", status: "Ativo", statusColor: "bg-emerald-500 text-emerald-400" },
        { id: 5, name: "Ana Lima", email: "ana.lima@empresa.com", initials: "AL", role: "Coordenador", roleColor: "text-purple-400 bg-purple-500/10 border-purple-500/20", team: "Operações SP", teamIcon: "hub", status: "Pendente", statusColor: "bg-yellow-500 text-yellow-400" },
    ];

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedUsers(users.map(u => u.id));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleSelectOne = (id: number) => {
        setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-display transition-colors">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Top Header Bar */}
                <header className="h-20 flex items-center justify-between px-10 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:text-primary hover:bg-primary/10 transition-colors xl:hidden">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-400">
                            <span className="hover:text-primary cursor-pointer transition-colors">Sistema</span>
                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                            <span className="text-slate-900 dark:text-white">Lista de Usuários</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <button className="relative h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary hover:border-primary/50 transition-all">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2.5 right-2.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-slate-800" />
                        </button>
                        <button className="h-11 w-11 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary hover:border-primary/50 transition-all">
                            <span className="material-symbols-outlined">help</span>
                        </button>
                    </div>
                </header>

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto p-10 2xl:p-14 pb-24">
                    <div className="max-w-[1400px] mx-auto space-y-10">

                        {/* Page Header Area */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    Módulo Operacional
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">Gestão de Usuários</h2>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-xl">Centralize os acessos, gerencie perfis, permissões e associe colaboradores a equipes estratégicas.</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[20px]">file_download</span>
                                    Exportar CSV
                                </button>
                                <button className="px-8 py-4 bg-primary hover:bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[22px]">add</span>
                                    NOVO USUÁRIO
                                </button>
                            </div>
                        </div>

                        {/* KPI Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { title: "Total de Usuários", value: "1,245", trend: "+5%", trendColor: "text-emerald-500 bg-emerald-500/10", icon: "group", iconColor: "text-blue-500 bg-blue-500/10" },
                                { title: "Usuários Ativos", value: "1,100", trend: "+2%", trendColor: "text-emerald-500 bg-emerald-500/10", icon: "check_circle", iconColor: "text-emerald-500 bg-emerald-500/10" },
                                { title: "Administradores", value: "45", trend: "0%", trendColor: "text-slate-500 bg-slate-500/10", icon: "admin_panel_settings", iconColor: "text-purple-500 bg-purple-500/10" },
                                { title: "Inativos", value: "145", trend: "-1%", trendColor: "text-orange-500 bg-orange-500/10", icon: "block", iconColor: "text-orange-500 bg-orange-500/10" }
                            ].map((kpi, index) => (
                                <div key={index} className="bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-xl shadow-slate-200/40 dark:shadow-none hover:border-primary/20 transition-all group">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${kpi.iconColor} group-hover:scale-110 transition-transform`}>
                                            <span className="material-symbols-outlined text-2xl">{kpi.icon}</span>
                                        </div>
                                        <span className={`text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-lg ${kpi.trendColor}`}>
                                            {kpi.trend}
                                        </span>
                                    </div>
                                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">{kpi.title}</h3>
                                    <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{kpi.value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Smart Filters Toolbar */}
                        <div className="bg-white dark:bg-[#1e293b] p-3 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col xl:flex-row gap-3">
                            <div className="relative flex-1 group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                                <input
                                    type="text"
                                    placeholder="Buscar por nome, e-mail ou ID de matrícula..."
                                    className="w-full h-14 bg-slate-50 dark:bg-black/20 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white text-base font-medium rounded-xl pl-12 pr-4 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative min-w-[220px]">
                                    <select className="w-full h-14 appearance-none bg-slate-50 dark:bg-black/20 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-5 pr-12 cursor-pointer outline-none transition-all">
                                        <option>Todos os Perfis</option>
                                        <option>Administrador</option>
                                        <option>Gerente</option>
                                        <option>Coordenador</option>
                                        <option>Promotor</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_content</span>
                                </div>
                                <div className="relative min-w-[200px]">
                                    <select className="w-full h-14 appearance-none bg-slate-50 dark:bg-black/20 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-5 pr-12 cursor-pointer outline-none transition-all">
                                        <option>Status: Todos</option>
                                        <option>Ativo</option>
                                        <option>Inativo</option>
                                        <option>Pendente</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">filter_list</span>
                                </div>
                                <button className="h-14 w-14 flex flex-shrink-0 flex-grow-0 items-center justify-center bg-slate-50 hover:bg-red-50 dark:bg-black/20 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-xl transition-colors border-2 border-transparent group" title="Limpar Filtros">
                                    <span className="material-symbols-outlined group-hover:scale-110 transition-transform">filter_alt_off</span>
                                </button>
                            </div>
                        </div>

                        {/* Modern Data Table */}
                        <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="bg-slate-50/80 dark:bg-black/20 border-b border-slate-200 dark:border-white/5">
                                            <th className="px-8 py-5 w-16">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedUsers.length === users.length}
                                                    onChange={handleSelectAll}
                                                    className="h-5 w-5 rounded-md border-slate-300 dark:border-slate-600 outline-none text-primary focus:ring-primary bg-white dark:bg-slate-800 cursor-pointer"
                                                />
                                            </th>
                                            <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Usuário & Contato</th>
                                            <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Perfil de Acesso</th>
                                            <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Alocação Geográfica</th>
                                            <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
                                            <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em] text-right">Ações Rápidas</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                        {users.map((user) => (
                                            <tr key={user.id} className="group hover:bg-primary/5 dark:hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => handleSelectOne(user.id)}>
                                                <td className="px-8 py-4" onClick={(e) => e.stopPropagation()}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedUsers.includes(user.id)}
                                                        onChange={() => handleSelectOne(user.id)}
                                                        className="h-5 w-5 rounded-md border-slate-300 dark:border-slate-600 outline-none text-primary focus:ring-primary bg-white dark:bg-slate-800 cursor-pointer transition-all"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        {user.avatar ? (
                                                            <img src={user.avatar} alt={`Avatar de ${user.name}`} className="h-12 w-12 rounded-full object-cover shadow-sm bg-slate-100 dark:bg-slate-800" />
                                                        ) : (
                                                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-black text-sm shadow-sm">
                                                                {user.initials}
                                                            </div>
                                                        )}
                                                        <div className="flex flex-col">
                                                            <p className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{user.name}</p>
                                                            <p className="text-xs font-medium text-slate-500 font-mono tracking-tight mt-0.5">{user.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border ${user.roleColor} shadow-inner`}>
                                                        {user.role}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300 font-medium bg-slate-50 dark:bg-white/5 w-max px-3 py-1.5 rounded-lg border border-slate-100 dark:border-transparent">
                                                        <span className="material-symbols-outlined text-[20px] text-slate-400">{user.teamIcon}</span>
                                                        {user.team}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="relative flex h-3 w-3 items-center justify-center">
                                                            {user.status === "Ativo" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                                                            <div className={`h-2.5 w-2.5 rounded-full ${user.statusColor.split(' ')[0]}`} />
                                                        </div>
                                                        <span className={`text-sm font-bold uppercase tracking-wider ${user.statusColor.split(' ')[1]}`}>{user.status}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                        <button className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-400 hover:text-primary hover:border-primary border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" title="Editar Usuário">
                                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                                        </button>
                                                        <button className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-400 hover:text-orange-500 hover:border-orange-500 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" title="Resetar Senha">
                                                            <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                                                        </button>
                                                        <button className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" title="Desativar Conta">
                                                            <span className="material-symbols-outlined text-[20px]">person_off</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Enhanced Pagination Controls */}
                            <div className="px-8 py-6 bg-slate-50/50 dark:bg-black/20 border-t border-slate-200 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    Apresentando <span className="font-black text-slate-900 dark:text-white">1</span> a <span className="font-black text-slate-900 dark:text-white">5</span> de <span className="font-black text-slate-900 dark:text-white">1,245</span> registros validados
                                </p>
                                <div className="flex items-center gap-2">
                                    <button className="h-10 px-4 text-sm font-bold flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary hover:text-primary bg-white dark:bg-slate-800 shadow-sm transition-all">
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span> Anterior
                                    </button>
                                    <div className="flex gap-1">
                                        <button className="h-10 w-10 text-sm font-black rounded-xl border border-primary bg-primary text-white shadow-lg shadow-primary/30">1</button>
                                        <button className="h-10 w-10 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 hover:border-primary hover:text-primary transition-colors">2</button>
                                        <button className="h-10 w-10 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 hover:border-primary hover:text-primary transition-colors">3</button>
                                        <span className="flex items-center justify-center w-8 text-slate-400">...</span>
                                        <button className="h-10 w-10 text-sm font-bold rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 hover:border-primary hover:text-primary transition-colors">42</button>
                                    </div>
                                    <button className="h-10 px-4 text-sm font-bold flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-400 hover:border-primary hover:text-primary bg-white dark:bg-slate-800 shadow-sm transition-all">
                                        Próximo <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>

            {/* Global styling additions specifically for RBAC layout */}
            <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 20px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        .dark ::-webkit-scrollbar-thumb { background: #334155; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
        </div>
    );
}
