"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function PermissoesPerfilPage() {
    const [selectedProfile, setSelectedProfile] = useState("Administrador");

    const profiles = [
        { id: "Administrador", description: "Acesso total ao sistema", icon: "shield_person", active: true },
        { id: "Gerente Regional", description: "Gestão de área e equipe", icon: "manage_accounts", active: false },
        { id: "Coordenador", description: "Supervisão operacional", icon: "supervisor_account", active: false },
        { id: "Promotor", description: "Registro de visitas", icon: "person", active: false },
    ];

    const modules = [
        { name: "Vendas", desc: "Transações e faturamento", icon: "point_of_sale", iconBg: "bg-blue-500/10 text-blue-500 dark:text-blue-400", p: { view: true, edit: true, del: false, export: true } },
        { name: "Estoque", desc: "Controle de produtos e SKUs", icon: "inventory_2", iconBg: "bg-purple-500/10 text-purple-500 dark:text-purple-400", p: { view: true, edit: true, del: true, export: false } },
        { name: "Usuários", desc: "Gestão de acessos", icon: "group", iconBg: "bg-orange-500/10 text-orange-500 dark:text-orange-400", p: { view: true, edit: false, del: false, export: false } },
        { name: "Auditoria", desc: "Logs e registros fiscais", icon: "receipt_long", iconBg: "bg-pink-500/10 text-pink-500 dark:text-pink-400", p: { view: true, edit: false, del: false, export: true } },
    ];

    // Tailwind Peer pattern based Toggle Switch to avoid external CSS
    const ToggleSwitch = ({ checked, disabled = false }: { checked: boolean, disabled?: boolean }) => (
        <div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <input
                type="checkbox"
                defaultChecked={checked}
                disabled={disabled}
                className="peer absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 dark:border-slate-600 checked:right-0 checked:border-[#1152d4] dark:checked:border-[#1152d4] transition-all duration-300 z-10"
            />
            <label className={`block overflow-hidden h-5 rounded-full ${disabled ? 'bg-slate-200 dark:bg-slate-800' : 'bg-slate-300 dark:bg-slate-700 cursor-pointer peer-checked:bg-[#1152d4]'}`}></label>
        </div>
    );

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#101622] text-slate-900 dark:text-white font-display transition-colors">
            {/* Global Application Sidebar (Preserved per requirements) */}
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Navigation (Admin Console Header) */}
                <Header
                    title="Permissões de Perfil"
                    icon="shield_person"
                    searchPlaceholder="Buscar configurações..."
                    navigation={[
                        { label: "Lista de Usuários", href: "/usuarios", icon: "list" },
                        { label: "Permissões de Perfil", href: "/usuarios/permissoes", active: true, icon: "shield_person" },
                    ]}
                />

                <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative">
                    {/* Left Sidebar: Profiles List */}
                    <aside className="w-full lg:w-80 border-r border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#111722] flex flex-col shrink-0 h-full overflow-y-auto transition-colors">
                        <div className="p-6 border-b border-slate-200 dark:border-[#232f48]">
                            <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-1 transition-colors">Perfis de Acesso</h1>
                            <p className="text-slate-500 dark:text-[#92a4c9] text-sm transition-colors">Selecione um perfil para editar</p>
                        </div>
                        <div className="flex flex-col p-4 gap-2">
                            {profiles.map((profile, i) => {
                                const isActive = selectedProfile === profile.id;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedProfile(profile.id)}
                                        className={isActive
                                            ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1152d4] text-white shadow-lg shadow-[#1152d4]/20 transition-all hover:scale-[1.02]"
                                            : "group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-[#232f48] text-slate-600 dark:text-slate-300 transition-all"}
                                    >
                                        <span className={`material-symbols-outlined ${isActive ? '' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-white'}`}>{profile.icon}</span>
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-semibold transition-colors">{profile.id}</span>
                                            <span className={`text-xs transition-colors ${isActive ? 'opacity-80' : 'text-slate-500 dark:text-slate-500'}`}>{profile.description}</span>
                                        </div>
                                    </button>
                                );
                            })}

                            <button className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-[#232f48] text-slate-600 dark:text-slate-300 transition-all mt-4 border border-dashed border-slate-300 dark:border-slate-700">
                                <span className="material-symbols-outlined text-slate-400">add</span>
                                <span className="text-sm font-medium transition-colors">Criar Novo Perfil</span>
                            </button>
                        </div>
                    </aside>

                    {/* Right Content: Permissions Matrix */}
                    <section className="flex-1 flex flex-col h-full bg-white dark:bg-[#1a2332] overflow-hidden relative transition-colors">
                        {/* Header of Section */}
                        <div className="p-6 pb-2 shrink-0">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Permissões: {selectedProfile}</h2>
                                        <span className="bg-[#1152d4]/10 text-[#1152d4] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Padrão</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-[#92a4c9] max-w-2xl text-sm transition-colors">Defina granularmente o que este perfil pode acessar. As alterações são aplicadas imediatamente após salvar.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-[#324467] text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-[#232f48] transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">history</span>
                                        Histórico
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 hover:bg-red-200 dark:hover:bg-red-500/20 text-sm font-medium transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                        Excluir Perfil
                                    </button>
                                </div>
                            </div>

                            {/* Tabs/Filters */}
                            <div className="flex border-b border-slate-200 dark:border-[#324467] transition-colors">
                                <button className="px-6 py-3 text-sm font-medium text-[#1152d4] border-b-2 border-[#1152d4]">Módulos do Sistema</button>
                                <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">API & Integrações</button>
                                <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors">Notificações</button>
                            </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 pt-2 pb-24">
                            {/* Permissions Table */}
                            <div className="rounded-xl border border-slate-200 dark:border-[#324467] overflow-hidden overflow-x-auto mb-8 transition-colors">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-[#111722] border-b border-slate-200 dark:border-[#324467] transition-colors">
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] w-1/3">Módulo</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Visualizar</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Editar</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Excluir</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Exportar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-[#324467] bg-white dark:bg-[#1a2332] transition-colors">
                                        {modules.map((mod, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded ${mod.iconBg}`}>
                                                            <span className="material-symbols-outlined">{mod.icon}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-slate-900 dark:text-white transition-colors">{mod.name}</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 transition-colors">{mod.desc}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <ToggleSwitch checked={mod.p.view} />
                                                </td>
                                                <td className="p-4 text-center">
                                                    <ToggleSwitch checked={mod.p.edit} disabled={!mod.p.edit && mod.name === "Auditoria"} />
                                                </td>
                                                <td className="p-4 text-center">
                                                    <ToggleSwitch checked={mod.p.del} disabled={!mod.p.del && (mod.name === "Auditoria" || mod.name === "Usuários")} />
                                                </td>
                                                <td className="p-4 text-center">
                                                    <ToggleSwitch checked={mod.p.export} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Jurisdiction Restrictions Section */}
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 transition-colors">
                                    <span className="material-symbols-outlined text-[#1152d4]">public</span>
                                    Restrições por Jurisdição
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Card 1 */}
                                    <div className="p-5 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#111722] shadow-sm dark:shadow-none transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">Abrangência Geográfica</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors">Quais estados este perfil pode visualizar.</p>
                                            </div>
                                            <ToggleSwitch checked={true} />
                                        </div>
                                        <select className="w-full bg-slate-50 dark:bg-[#232f48] border border-slate-200 dark:border-[#324467] rounded-lg px-3 py-2 text-sm text-slate-900 dark:text-white focus:ring-[#1152d4] focus:border-[#1152d4] outline-none transition-colors">
                                            <option>Todo o Território Nacional</option>
                                            <option>Apenas Região Sul</option>
                                            <option>Apenas Região Sudeste</option>
                                            <option>Personalizado...</option>
                                        </select>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="p-5 rounded-xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#111722] shadow-sm dark:shadow-none transition-colors">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-semibold text-slate-900 dark:text-white transition-colors">Restrição de Rede</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 transition-colors">Limitar acesso a redes/IPs específicos.</p>
                                            </div>
                                            <ToggleSwitch checked={false} />
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full bg-slate-100 dark:bg-[#1a2332] border border-slate-200 dark:border-[#324467] rounded-lg px-3 py-2 text-sm text-slate-400 dark:text-slate-500 cursor-not-allowed outline-none transition-colors"
                                            disabled
                                            placeholder="Ex: 192.168.0.1/24"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Footer Action Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#1a2332] border-t border-slate-200 dark:border-[#324467] flex items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] transition-colors">
                            <p className="text-xs text-slate-500 dark:text-slate-500 hidden sm:block transition-colors">Última alteração feita por <span className="font-medium text-slate-700 dark:text-slate-300">Roberto Almeida</span> há 2 horas.</p>
                            <div className="flex items-center gap-3 ml-auto">
                                <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#232f48] transition-colors">
                                    Cancelar
                                </button>
                                <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#1152d4] text-white text-sm font-bold shadow-lg shadow-[#1152d4]/30 hover:bg-blue-600 hover:shadow-[#1152d4]/50 transition-all transform active:scale-95">
                                    <span className="material-symbols-outlined text-[20px]">check</span>
                                    SALVAR ALTERAÇÕES
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
