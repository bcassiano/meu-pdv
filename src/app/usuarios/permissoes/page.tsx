"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ScrollAreaWithArrows } from "@/components/ScrollAreaWithArrows";
import { Profile, ModulePermission, Jurisdiction } from "@/types/profile";

export default function PermissoesPerfilPage(): JSX.Element {
    const [selectedProfile, setSelectedProfile] = useState("Administrador");
    const [activeTab, setActiveTab] = useState("Módulos do Sistema");
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);

    const [profiles, setProfiles] = useState<Profile[]>([
        { 
            id: "Administrador", 
            description: "Acesso total ao sistema", 
            icon: "shield_person", 
            permissions: [], 
            jurisdiction: { geo: true, network: false, region: "Todo o Território Nacional" } 
        },
        { 
            id: "Gerente Regional", 
            description: "Gestão de área e equipe", 
            icon: "manage_accounts", 
            permissions: [], 
            jurisdiction: { geo: true, network: false, region: "Todo o Território Nacional" } 
        },
        { 
            id: "Coordenador", 
            description: "Supervisão operacional", 
            icon: "supervisor_account", 
            permissions: [], 
            jurisdiction: { geo: true, network: false, region: "Todo o Território Nacional" } 
        },
        { 
            id: "Promotor", 
            description: "Registro de visitas", 
            icon: "person", 
            permissions: [], 
            jurisdiction: { geo: true, network: false, region: "Todo o Território Nacional" } 
        },
    ]);

    const initialModules: ModulePermission[] = [
        { name: "Vendas", desc: "Transações e faturamento", icon: "point_of_sale", iconBg: "bg-blue-500/10 text-blue-500", p: { view: true, edit: true, del: false, export: true } },
        { name: "Estoque", desc: "Controle de produtos e SKUs", icon: "inventory_2", iconBg: "bg-purple-500/10 text-purple-500", p: { view: true, edit: true, del: true, export: false } },
        { name: "Usuários", desc: "Gestão de acessos", icon: "group", iconBg: "bg-orange-500/10 text-orange-500", p: { view: true, edit: false, del: false, export: false } },
        { name: "Auditoria", desc: "Logs e registros fiscais", icon: "receipt_long", iconBg: "bg-pink-500/10 text-pink-500", p: { view: true, edit: false, del: false, export: true } },
    ];

    // Carregar dados da API ao montar o componente
    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/usuarios/permissoes');
                const data = await response.json();
                
                if (data.success && data.profiles && data.profiles.length > 0) {
                    setProfiles(data.profiles);
                } else {
                    // Se não houver dados no banco, inicializa com os padrões
                    const defaultProfiles = profiles.map(p => ({
                        ...p,
                        permissions: JSON.parse(JSON.stringify(initialModules))
                    }));
                    setProfiles(defaultProfiles);
                }
            } catch (error) {
                console.error("Erro ao carregar perfis:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfiles();
    }, []);

    const handleToggle = (moduleName: string, permissionKey: keyof ModulePermission['p']) => {
        setProfiles(prev => prev.map(profile => {
            if (profile.id !== selectedProfile) return profile;
            return {
                ...profile,
                permissions: profile.permissions.map(mod => 
                    mod.name === moduleName 
                    ? { ...mod, p: { ...mod.p, [permissionKey]: !mod.p[permissionKey] } }
                    : mod
                )
            };
        }));
    };

    const handleJurisdictionToggle = (key: keyof Jurisdiction) => {
        setProfiles(prev => prev.map(profile => {
            if (profile.id !== selectedProfile) return profile;
            return {
                ...profile,
                jurisdiction: { 
                    ...profile.jurisdiction, 
                    [key]: !profile.jurisdiction[key as 'geo' | 'network'] 
                }
            };
        }));
    };

    const handleRegionChange = (region: string) => {
        setProfiles(prev => prev.map(profile => {
            if (profile.id !== selectedProfile) return profile;
            return {
                ...profile,
                jurisdiction: { ...profile.jurisdiction, region }
            };
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/usuarios/permissoes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profiles })
            });
            
            if (response.ok) {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
                // Também atualiza cache local para redundância
                localStorage.setItem("pdv_profiles_data", JSON.stringify(profiles));
            }
        } catch (error) {
            console.error("Erro ao salvar perfis:", error);
            alert("Erro ao sincronizar com o servidor. Verifique sua conexão.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeleteProfile = async () => {
        if (confirm(`Tem certeza que deseja excluir o perfil ${selectedProfile}?`)) {
            const newProfiles = profiles.filter(p => p.id !== selectedProfile);
            setProfiles(newProfiles);
            if (newProfiles.length > 0) setSelectedProfile(newProfiles[0].id);
            
            // Sincroniza exclusão
            try {
                await fetch('/api/usuarios/permissoes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profiles: newProfiles })
                });
            } catch (e) {
                console.error("Erro ao sincronizar exclusão:", e);
            }
        }
    };

    const handleCreateProfile = async () => {
        const name = prompt("Nome do novo perfil:");
        if (name && name.trim()) {
            const trimmedName = name.trim();
            
            if (profiles.some(p => p.id.toLowerCase() === trimmedName.toLowerCase())) {
                alert("Este perfil já existe.");
                return;
            }

            const newProfile: Profile = { 
                id: trimmedName, 
                description: "Personalizado", 
                icon: "person",
                permissions: JSON.parse(JSON.stringify(initialModules)),
                jurisdiction: { geo: true, network: false, region: "Todo o Território Nacional" }
            };

            // Atualização segura usando prev state
            setProfiles(prev => {
                const updated = [...prev, newProfile];
                
                // Persistência em background
                fetch('/api/usuarios/permissoes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ profiles: updated })
                }).catch(err => console.error("Erro ao sincronizar novo perfil:", err));
                
                localStorage.setItem("pdv_profiles_data", JSON.stringify(updated));
                return updated;
            });

            setSelectedProfile(trimmedName);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
        }
    };

    const ToggleSwitch = ({ checked, onChange, disabled = false }: { checked: boolean, onChange?: () => void, disabled?: boolean }) => (
        <div 
            onClick={() => !disabled && onChange?.()}
            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-[#1152d4]' : 'bg-slate-300 dark:bg-slate-700'} ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}`}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-1'}`}
            />
        </div>
    );

    const activeProfileData = profiles.find(p => p.id === selectedProfile);
    const currentJuris = activeProfileData?.jurisdiction || { geo: true, network: false, region: "Todo o Território Nacional" };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-white dark:bg-[#101622]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 border-4 border-[#1152d4] border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-500 font-bold animate-pulse">Sincronizando Permissões...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full overflow-hidden bg-white dark:bg-[#101622] text-slate-900 dark:text-white font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
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
                    {/* Perfil Selection Sidebar */}
                    <aside className="w-full lg:w-80 border-r border-slate-200 dark:border-[#232f48] bg-slate-50 dark:bg-[#111722] flex flex-col shrink-0 h-full overflow-y-auto transition-colors scrollbar-thin">
                        <div className="p-6 border-b border-slate-200 dark:border-[#232f48]">
                            <h1 className="text-slate-900 dark:text-white text-xl font-bold leading-tight mb-1 transition-colors">Perfis de Acesso</h1>
                            <p className="text-slate-500 dark:text-[#92a4c9] text-sm transition-colors">Selecione um perfil para editar</p>
                        </div>
                        <div className="flex flex-col p-4 gap-2">
                            {profiles.map((profile) => {
                                const isActive = selectedProfile === profile.id;
                                return (
                                    <button
                                        key={profile.id}
                                        onClick={() => setSelectedProfile(profile.id)}
                                        className={isActive
                                            ? "flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1152d4] text-white shadow-lg shadow-[#1152d4]/20 transition-all hover:scale-[1.02]"
                                            : "group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-[#232f48] text-slate-600 dark:text-slate-300 transition-all"}
                                    >
                                        <span className={`material-symbols-outlined ${isActive ? '' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-white'}`}>{profile.icon}</span>
                                        <div className="flex flex-col items-start text-left">
                                            <span className="text-sm font-semibold transition-colors">{profile.id}</span>
                                            <span className={`text-xs transition-colors ${isActive ? 'opacity-80' : 'text-slate-500 dark:text-slate-500'}`}>{profile.description}</span>
                                        </div>
                                    </button>
                                );
                            })}
                            <button 
                                onClick={handleCreateProfile}
                                className="group flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-200 dark:hover:bg-[#232f48] text-slate-600 dark:text-slate-300 transition-all mt-4 border border-dashed border-slate-300 dark:border-slate-700"
                            >
                                <span className="material-symbols-outlined text-slate-400">add</span>
                                <span className="text-sm font-medium transition-colors">Criar Novo Perfil</span>
                            </button>
                        </div>
                    </aside>

                    {/* Content Section */}
                    <section className="flex-1 flex flex-col h-full bg-white dark:bg-[#1a2332] overflow-hidden relative transition-colors">
                        <div className="p-6 pb-2 shrink-0">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Permissões: {selectedProfile}</h2>
                                        <span className="bg-[#1152d4]/10 text-[#1152d4] text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-[0.2em]">Padrão</span>
                                    </div>
                                    <p className="text-slate-500 dark:text-[#92a4c9] max-w-2xl text-sm transition-colors leading-relaxed">Defina granularmente o que este perfil pode acessar. As alterações são aplicadas imediatamente após salvar.</p>
                                </div>
                                <div className="flex gap-3">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-[#324467] text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-100 dark:hover:bg-[#232f48] transition-all">
                                        <span className="material-symbols-outlined text-[18px]">history</span>
                                        Histórico
                                    </button>
                                    <button 
                                        onClick={handleDeleteProfile}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500 hover:bg-red-200 dark:hover:bg-red-500/20 text-sm font-medium transition-all"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                        Excluir Perfil
                                    </button>
                                </div>
                            </div>
                            
                            <ScrollAreaWithArrows containerClassName="border-b border-slate-200 dark:border-[#324467] mb-6">
                                <div className="flex transition-colors overflow-x-auto scrollbar-none">
                                    {["Módulos do Sistema", "API & Integrações", "Notificações"].map(tab => (
                                        <button 
                                            key={tab}
                                            onClick={() => setActiveTab(tab)} 
                                            className={`px-6 py-3 text-sm font-bold whitespace-nowrap transition-all border-b-2 ${activeTab === tab ? "text-[#1152d4] border-[#1152d4]" : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 border-transparent"}`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </ScrollAreaWithArrows>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 pt-2 pb-24 custom-scrollbar">
                            <div className="rounded-2xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#1a2332] overflow-hidden overflow-x-auto mb-8 shadow-sm">
                                <table className="w-full text-left border-collapse min-w-[600px]">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-[#111722] border-b border-slate-200 dark:border-[#324467] transition-colors">
                                            <th className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-[#92a4c9] w-1/3">Módulo</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Visualizar</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Editar</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Excluir</th>
                                            <th className="p-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-[#92a4c9] text-center w-1/6">Exportar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-[#324467]">
                                        {(activeProfileData?.permissions || initialModules).map((mod, idx) => (
                                            <tr key={`${selectedProfile}-${mod.name}`} className="hover:bg-slate-50 dark:hover:bg-[#232f48]/50 transition-colors group">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`p-2.5 rounded-xl ${mod.iconBg}`}>
                                                            <span className="material-symbols-outlined text-[20px]">{mod.icon}</span>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">{mod.name}</p>
                                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{mod.desc}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex justify-center"><ToggleSwitch checked={mod.p.view} onChange={() => handleToggle(mod.name, 'view')} /></div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex justify-center"><ToggleSwitch checked={mod.p.edit} onChange={() => handleToggle(mod.name, 'edit')} disabled={mod.name === "Auditoria"} /></div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex justify-center"><ToggleSwitch checked={mod.p.del} onChange={() => handleToggle(mod.name, 'del')} disabled={mod.name === "Auditoria" || mod.name === "Usuários"} /></div>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className="flex justify-center"><ToggleSwitch checked={mod.p.export} onChange={() => handleToggle(mod.name, 'export')} /></div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-[#1152d4] animate-pulse"></div>
                                    Restrições por Jurisdição
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#111722] transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Abrangência Geográfica</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Visibilidade regional por estado.</p>
                                            </div>
                                            <ToggleSwitch checked={currentJuris.geo} onChange={() => handleJurisdictionToggle('geo')} />
                                        </div>
                                        <select 
                                            value={currentJuris.region}
                                            onChange={(e) => handleRegionChange(e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-[#1a2332] border border-slate-200 dark:border-[#324467] rounded-xl px-4 py-3 text-sm text-slate-900 dark:text-white font-bold outline-none ring-primary/20 focus:ring-4 transition-all appearance-none cursor-pointer"
                                        >
                                            <option>Todo o Território Nacional</option>
                                            <option>Apenas Região Sul</option>
                                            <option>Apenas Região Sudeste</option>
                                            <option>Personalizado...</option>
                                        </select>
                                    </div>

                                    <div className="p-6 rounded-2xl border border-slate-200 dark:border-[#324467] bg-white dark:bg-[#111722] transition-all hover:shadow-md">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Restrição de Rede</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium italic">Segurança por IP ou VPN.</p>
                                            </div>
                                            <ToggleSwitch checked={currentJuris.network} onChange={() => handleJurisdictionToggle('network')} />
                                        </div>
                                        <input
                                            type="text"
                                            className={`w-full bg-slate-100 dark:bg-[#0f141d] border border-slate-200 dark:border-[#324467] rounded-xl px-4 py-3 text-sm font-medium transition-all outline-none ${currentJuris.network ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-600 cursor-not-allowed'}`}
                                            disabled={!currentJuris.network}
                                            placeholder="Ex: 192.168.0.1/24"
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Footer Action Bar */}
                        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white/80 dark:bg-[#1a2332]/80 backdrop-blur-md border-t border-slate-200 dark:border-[#324467] flex items-center justify-between z-20 transition-all">
                            <div className="hidden md:flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                                <p className="text-[10px] font-black text-slate-500 dark:text-slate-500 uppercase tracking-widest">Sincronizado com Nuvem</p>
                            </div>
                            <div className="flex items-center gap-4 ml-auto">
                                <button onClick={() => window.location.reload()} className="px-6 py-3 rounded-xl text-xs font-black text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#232f48] transition-all uppercase tracking-widest">
                                    Descartar
                                </button>
                                <button 
                                    onClick={handleSave}
                                    disabled={saving}
                                    className={`flex items-center gap-3 px-8 py-3 rounded-xl text-white text-xs font-black shadow-xl transition-all transform active:scale-95 uppercase tracking-widest ${showSuccess ? 'bg-emerald-500 shadow-emerald-500/30' : 'bg-[#1152d4] shadow-[#1152d4]/30 hover:shadow-[#1152d4]/50'} disabled:opacity-50`}
                                >
                                    <span className="material-symbols-outlined text-[18px]">{showSuccess ? 'done_all' : saving ? 'sync' : 'cloud_upload'}</span>
                                    {showSuccess ? 'Sincronizado!' : saving ? 'Sincronizando...' : 'Sincronizar Agora'}
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
