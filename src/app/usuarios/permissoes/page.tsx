"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function PermissoesPerfilPage() {
    const [selectedProfile, setSelectedProfile] = useState("Administrador");

    const profiles = [
        { id: "Administrador", description: "Acesso total ao sistema", icon: "shield_person", active: true },
        { id: "Gerente Regional", description: "Gestão de área e equipe", icon: "manage_accounts", active: false },
        { id: "Coordenador", description: "Supervisão operacional", icon: "supervisor_account", active: false },
        { id: "Promotor", description: "Registro de visitas", icon: "person", active: false },
    ];

    const modules = [
        { name: "Vendas", desc: "Transações e faturamento", icon: "point_of_sale", iconBg: "bg-blue-500/10 text-blue-400", p: { view: true, edit: true, del: false, export: true } },
        { name: "Estoque", desc: "Controle de produtos e SKUs", icon: "inventory_2", iconBg: "bg-purple-500/10 text-purple-400", p: { view: true, edit: true, del: true, export: false } },
        { name: "Usuários", desc: "Gestão de acessos", icon: "group", iconBg: "bg-orange-500/10 text-orange-400", p: { view: true, edit: false, del: false, export: false } },
        { name: "Auditoria", desc: "Logs e registros fiscais", icon: "receipt_long", iconBg: "bg-pink-500/10 text-pink-400", p: { view: true, edit: false, del: false, export: true } },
    ];

    // Tailwind Peer pattern based Toggle Switch to avoid external CSS
    const ToggleSwitch = ({ checked, disabled = false }: { checked: boolean, disabled?: boolean }) => (
        <div className={`relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
            <input
                type="checkbox"
                defaultChecked={checked}
                disabled={disabled}
                className="peer absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-600 checked:right-0 checked:border-[#1152d4] transition-all duration-300 z-10"
            />
            <label className={`block overflow-hidden h-5 rounded-full ${disabled ? 'bg-slate-800' : 'bg-slate-700 cursor-pointer peer-checked:bg-[#1152d4]'}`}></label>
        </div>
    );

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#101622] text-white font-display transition-colors">
            {/* Global Application Sidebar (Preserved per requirements) */}
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Navigation (Admin Console Header) */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#232f48] bg-[#1a2332] px-10 py-3 sticky top-0 z-50 shrink-0">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4 text-white">
                            <div className="size-8 text-[#1152d4]">
                                <span className="material-symbols-outlined text-[32px]">admin_panel_settings</span>
                            </div>
                            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">Admin Console</h2>
                        </div>
                        <nav className="hidden md:flex items-center gap-9">
                            <a className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Dashboard</a>
                            <a className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Usuários</a>
                            <a className="text-[#92a4c9] hover:text-white text-sm font-medium leading-normal transition-colors" href="#">Relatórios</a>
                            <a className="text-white text-sm font-medium leading-normal" href="#">Configurações</a>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-end gap-6">
                        <label className="hidden lg:flex flex-col min-w-40 h-10 max-w-64">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full border border-[#324467] bg-[#232f48] focus-within:ring-2 focus-within:ring-[#1152d4]">
                                <div className="text-[#92a4c9] flex items-center justify-center pl-3">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input className="w-full bg-transparent border-none text-white placeholder:text-[#92a4c9] px-3 text-sm focus:ring-0 outline-none" placeholder="Buscar configurações..." />
                            </div>
                        </label>
                        <div className="relative group">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-[#324467] cursor-pointer" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD4Nxsg2RqjzidiOw2kXR0i0pJ1fZaPTct4hVQK1ILJYQnEmd7zKPPQxiCvrmS58HvLdaAy6QI0noNFpiWubzAKt6knSm5IILje-b8r6M-gzS-oNhPxYUIjIDoEqh9XIwc8nCwCCHI92bFbJFlr2qm0gvteADKVksRAC4Ih9aZBm7KRbJGTKvq6BLgbX4fLz2SQIbtPG_Lgk3bW7p4cBM5XE0U0jhyCIJNg6yf50OQRPV2IZfvZTTDXKssCP7m8jSnk2eHpvVslZkg")' }}></div>
                            <div className="absolute right-0 top-0 size-3 bg-green-500 rounded-full border-2 border-[#1a2332]"></div>
                        </div>
                    </div>
                </header>

                <div className="flex-1 flex flex-col lg:flex-row h-full overflow-hidden relative">
                    {/* Left Sidebar: Profiles List */}
                    <aside className="w-full lg:w-80 border-r border-[#232f48] bg-[#111722] flex flex-col shrink-0 h-full overflow-y-auto">
                        <div className="p-6 border-b border-[#232f48]">
                            <h1 className="text-white text-xl font-bold leading-tight mb-1">Perfis de Acesso</h1>
                            <p className="text-[#92a4c9] text-sm">Selecione um perfil para editar</p>
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
                                            : "group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#232f48] text-slate-300 transition-all"}
                                    >
                                        <span className={`material-symbols-outlined ${isActive ? '' : 'text-slate-500 group-hover:text-white'}`}>{profile.icon}</span>
                                        <div className="flex flex-col items-start">
                                            <span className="text-sm font-semibold">{profile.id}</span>
                                            <span className={`text-xs ${isActive ? 'opacity-80' : 'text-slate-500'}`}>{profile.description}</span>
                                        </div>
                                    </button>
                                );
                            })}

                            <button className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#232f48] text-slate-300 transition-all mt-4 border border-dashed border-slate-700">
                                <span className="material-symbols-outlined text-slate-400">add</span>
                                <span className="text-sm font-medium">Criar Novo Perfil</span>
                            </button>
                        </div>
                    </aside>

                    {/* Right Content: Permissions Matrix */}
                    <section className="flex-1 flex flex-col h-full bg-[#1a2332] overflow-hidden relative">
                        {/* Header of Section */}
                        <div className="p-6 pb-2 shrink-0">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-white">Permissões: {selectedProfile}</h2>
                                        <span className="bg-[#1152d4]/10 text-[#1152d4] text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">Padrão</span>
                                    </div>
                                    <p className="text-[#92a4c9] max-w-2xl text-sm">Defina granularmente o que este perfil pode acessar. As alterações são aplicadas imediatamente após salvar.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#324467] text-slate-300 text-sm font-medium hover:bg-[#232f48] transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">history</span>
                                        Histórico
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm font-medium transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                        Excluir Perfil
                                    </button>
                                </div>
                            </div>

                            {/* Tabs/Filters */}
                            <div className="flex border-b border-[#324467]">
                                <button className="px-6 py-3 text-sm font-medium text-[#1152d4] border-b-2 border-[#1152d4]">Módulos do Sistema</button>
                                <button className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">API & Integrações</button>
                                <button className="px-6 py-3 text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors">Notificações</button>
                            </div>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-1 overflow-y-auto p-6 pt-2 pb-24">
                            {/* Permissions Table */}
                            <div className="rounded-xl border border-[#324467] overflow-hidden overflow-x-auto mb-8">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="bg-[#111722] border-b border-[#324467]">
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[#92a4c9] w-1/3">Módulo</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[#92a4c9] text-center w-1/6">Visualizar</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[#92a4c9] text-center w-1/6">Editar</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[#92a4c9] text-center w-1/6">Excluir</th>
                                            <th className="p-4 text-xs font-semibold uppercase tracking-wider text-[#92a4c9] text-center w-1/6">Exportar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#324467] bg-[#1a2332]">
                                        {modules.map((mod, idx) => (
                                            <tr key={idx} className="hover:bg-[#232f48]/50 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded ${mod.iconBg}`}>
                                                            <span className="material-symbols-outlined">{mod.icon}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-white">{mod.name}</p>
                                                            <p className="text-xs text-slate-400">{mod.desc}</p>
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
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[#1152d4]">public</span>
                                    Restrições por Jurisdição
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Card 1 */}
                                    <div className="p-5 rounded-xl border border-[#324467] bg-[#111722]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-semibold text-white">Abrangência Geográfica</p>
                                                <p className="text-xs text-slate-400 mt-1">Quais estados este perfil pode visualizar.</p>
                                            </div>
                                            <ToggleSwitch checked={true} />
                                        </div>
                                        <select className="w-full bg-[#232f48] border border-[#324467] rounded-lg px-3 py-2 text-sm text-white focus:ring-[#1152d4] focus:border-[#1152d4] outline-none">
                                            <option>Todo o Território Nacional</option>
                                            <option>Apenas Região Sul</option>
                                            <option>Apenas Região Sudeste</option>
                                            <option>Personalizado...</option>
                                        </select>
                                    </div>

                                    {/* Card 2 */}
                                    <div className="p-5 rounded-xl border border-[#324467] bg-[#111722]">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="text-sm font-semibold text-white">Restrição de Rede</p>
                                                <p className="text-xs text-slate-400 mt-1">Limitar acesso a redes/IPs específicos.</p>
                                            </div>
                                            <ToggleSwitch checked={false} />
                                        </div>
                                        <input
                                            type="text"
                                            className="w-full bg-[#1a2332] border border-[#324467] rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed outline-none"
                                            disabled
                                            placeholder="Ex: 192.168.0.1/24"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Footer Action Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-[#1a2332] border-t border-[#324467] flex items-center justify-between z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                            <p className="text-xs text-slate-500 hidden sm:block">Última alteração feita por <span className="font-medium text-slate-300">Roberto Almeida</span> há 2 horas.</p>
                            <div className="flex items-center gap-3 ml-auto">
                                <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-300 hover:bg-[#232f48] transition-colors">
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
