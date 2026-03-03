"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Image from "next/image";
import { getUsuarios } from "./novo/actions";
import { ActionResponse, Usuario, UsuarioVisual } from "@/types/usuario";
import { useTranslation } from "@/locales/useTranslation";

export default function GestaoUsuariosPage(): JSX.Element {
    const { t } = useTranslation();
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const [users, setUsers] = useState<UsuarioVisual[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const response: ActionResponse<Usuario[]> = await getUsuarios();
                if (response.success && response.data) {
                    // Mapeia os dados do json local para o formato da UI
                    const formattedUsers: UsuarioVisual[] = response.data.map((u: Usuario) => {
                        // Lógica visual baseada no tipo e status digitado
                        const isAtivo = u.ativo;

                        let roleName = "Indefinido";
                        let roleColor = "text-slate-500 bg-slate-500/10 border-slate-500/20";
                        if (u.tipo === "promotor") { roleName = "Promotor"; roleColor = "text-amber-500 bg-amber-500/10 border-amber-500/20"; }
                        if (u.tipo === "coordenador") { roleName = "Coordenador"; roleColor = "text-purple-400 bg-purple-500/10 border-purple-500/20"; }
                        if (u.tipo === "supervisor") { roleName = "Supervisor"; roleColor = "text-blue-400 bg-blue-500/10 border-blue-500/20"; }
                        if (u.tipo === "adm") { roleName = "Administrador"; roleColor = "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"; }

                        let teamDisplay = "Sem Equipe";
                        if (u.equipe === "eq1") teamDisplay = "Alpha - Operações";
                        if (u.equipe === "eq2") teamDisplay = "Beta - Logística";
                        if (u.equipe === "eq3") teamDisplay = "Gamma - Estratégia";

                        return {
                            id: u.id,
                            name: u.nome || "Usuário Vazio",
                            email: u.email || "Sem e-mail",
                            initials: (u.nome || "UU").substring(0, 2).toUpperCase(),
                            role: roleName,
                            roleColor: roleColor,
                            team: teamDisplay,
                            teamIcon: "hub",
                            status: isAtivo ? "Ativo" : "Inativo",
                            statusColor: isAtivo ? "bg-emerald-500 text-emerald-400" : "bg-slate-500 text-slate-400",
                            avatar: u.avatar
                        };
                    });
                    setUsers(formattedUsers);
                }
            } catch (error) {
                console.error("Falha ao carregar usuários:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsuarios();
    }, []);

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) setSelectedUsers(users.map(u => u.id));
        else setSelectedUsers([]);
    };

    const handleSelectOne = (id: string) => {
        setSelectedUsers(prev => prev.includes(id) ? prev.filter(uid => uid !== id) : [...prev, id]);
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-display transition-colors">
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Top Header Bar */}
                <Header
                    title="Usuários e Acessos"
                    icon="group"
                    navigation={[
                        { label: "Lista de Usuários", href: "/usuarios", active: true, icon: "list" },
                        { label: "Permissões de Perfil", href: "/usuarios/permissoes", icon: "shield_person" },
                    ]}
                />

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
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t('usuarios.title')}</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-xl">{t('usuarios.subtitle')}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button type="button" className="px-6 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-3">
                                    <span aria-hidden="true" className="material-symbols-outlined text-[20px]">file_download</span>
                                    {t('usuarios.actions.export')}
                                </button>
                                <a href="/usuarios/novo" className="px-8 py-4 bg-primary hover:bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3">
                                    <span aria-hidden="true" className="material-symbols-outlined text-[22px]">add</span>
                                    {t('usuarios.actions.new')}
                                </a>
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
                                <span aria-hidden="true" className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
                                <input
                                    aria-label={t('usuarios.filters.searchAria')}
                                    type="text"
                                    placeholder={t('usuarios.filters.searchPlaceholder')}
                                    className="w-full h-14 bg-slate-50 dark:bg-black/20 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white text-base font-medium rounded-xl pl-12 pr-4 outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <div className="relative min-w-[220px]">
                                    <select aria-label="Filtrar grid por tipo de Perfil de Acesso" className="w-full h-14 appearance-none bg-slate-50 dark:bg-black/20 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-5 pr-12 cursor-pointer outline-none transition-all">
                                        <option>Todos os Perfis</option>
                                        <option>Administrador</option>
                                        <option>Gerente</option>
                                        <option>Coordenador</option>
                                        <option>Promotor</option>
                                    </select>
                                    <span aria-hidden="true" className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_content</span>
                                </div>
                                <div className="relative min-w-[200px]">
                                    <select aria-label="Filtrar grid pelo status do Usuário" className="w-full h-14 appearance-none bg-slate-50 dark:bg-black/20 border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary text-slate-700 dark:text-slate-200 text-sm font-bold rounded-xl pl-5 pr-12 cursor-pointer outline-none transition-all">
                                        <option>Status: Todos</option>
                                        <option>Ativo</option>
                                        <option>Inativo</option>
                                        <option>Pendente</option>
                                    </select>
                                    <span aria-hidden="true" className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">filter_list</span>
                                </div>
                                <button type="button" aria-label="Limpar Filtros Analíticos" className="h-14 w-14 flex flex-shrink-0 flex-grow-0 items-center justify-center bg-slate-50 hover:bg-red-50 dark:bg-black/20 dark:hover:bg-red-500/10 text-slate-400 hover:text-red-500 rounded-xl transition-colors border-2 border-transparent group" title="Limpar Filtros">
                                    <span aria-hidden="true" className="material-symbols-outlined group-hover:scale-110 transition-transform">filter_alt_off</span>
                                </button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center p-20 gap-4 text-slate-400">
                                <span className="material-symbols-outlined text-4xl animate-spin text-primary">refresh</span>
                                <p className="font-medium animate-pulse">Sincronizando usuários...</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/5 rounded-[2rem] shadow-sm">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-700 mb-4">group_off</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nenhum usuário cadastrado</h3>
                                <p className="text-slate-500 dark:text-slate-400 mb-6">Comece adicionando seu primeiro colaborador ao sistema.</p>
                                <a href="/usuarios/novo" className="px-6 py-3 bg-primary hover:bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-primary/20 transition-all">
                                    Criar Usuário
                                </a>
                            </div>
                        ) : (
                            <div className="bg-white dark:bg-[#1e293b] border border-slate-200 dark:border-white/5 rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/40 dark:shadow-none">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left border-collapse whitespace-nowrap">
                                        <thead>
                                            <tr className="bg-slate-50/80 dark:bg-black/20 border-b border-slate-200 dark:border-white/5">
                                                <th className="px-8 py-5 w-16">
                                                    <input
                                                        aria-label="Selecionar todos os usuários"
                                                        type="checkbox"
                                                        checked={selectedUsers.length === users.length && users.length > 0}
                                                        onChange={handleSelectAll}
                                                        className="h-5 w-5 rounded-md border-slate-300 dark:border-slate-600 outline-none text-primary focus:ring-primary focus:ring-2 focus:ring-offset-1 bg-white dark:bg-slate-800 cursor-pointer transition-all"
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Usuário & Contato</th>
                                                <th scope="col" className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Perfil de Acesso</th>
                                                <th scope="col" className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Alocação Geográfica</th>
                                                <th scope="col" className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
                                                <th scope="col" className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-[0.15em] text-right">Ações Rápidas</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                                            {users.map((user) => (
                                                <tr key={user.id} className="group hover:bg-primary/5 dark:hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => handleSelectOne(user.id)}>
                                                    <td className="px-8 py-4" onClick={(e) => e.stopPropagation()}>
                                                        <input
                                                            aria-label={`Selecionar o usuário ${user.name}`}
                                                            type="checkbox"
                                                            checked={selectedUsers.includes(user.id)}
                                                            onChange={() => handleSelectOne(user.id)}
                                                            className="h-5 w-5 rounded-md border-slate-300 dark:border-slate-600 outline-none text-primary focus:ring-primary focus:ring-2 focus:ring-offset-1 bg-white dark:bg-slate-800 cursor-pointer transition-all"
                                                        />
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-4">
                                                            {user.avatar ? (
                                                                <Image src={user.avatar} alt={`Avatar de ${user.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover shadow-sm bg-slate-100 dark:bg-slate-800" />
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
                                                            <button aria-label="Editar Usuário" className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-400 hover:text-primary hover:border-primary border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" title="Editar Usuário">
                                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                                            </button>
                                                            <button aria-label="Disparar reset de senha para o usuário" className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-400 hover:text-orange-500 hover:border-orange-500 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" title="Resetar Senha">
                                                                <span className="material-symbols-outlined text-[20px]">lock_reset</span>
                                                            </button>
                                                            <button aria-label="Desativar Conta de Usuário" className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5" title="Desativar Conta">
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
                                        Apresentando <span className="font-black text-slate-900 dark:text-white">1</span> a <span className="font-black text-slate-900 dark:text-white">{users.length}</span> de <span className="font-black text-slate-900 dark:text-white">{users.length}</span> registros validados
                                    </p>
                                    {/* Pagination Controls (Mocked for layout) */}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </main >

            {/* Global styling additions specifically for RBAC layout */}
            < style jsx global > {`
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
      `}</style >
        </div >
    );
}
