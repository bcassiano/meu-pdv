"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ActionResponse, Usuario, UsuarioTipo } from "@/types/usuario";
import { Profile } from "@/types/profile";
import { salvarUsuario as registerUser } from "./actions";
import { useTranslation } from "@/locales/useTranslation";
import { useRouter } from "next/navigation";

export default function NovoUsuarioPage(): JSX.Element {
    const { t } = useTranslation();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [availableProfiles, setAvailableProfiles] = useState<string[]>([]);
    const [formData, setFormData] = useState<Omit<Usuario, "id" | "createdAt">>({
        nome: "",
        login: "",
        email: "",
        senha: "",
        push: "",
        version: "",
        imei: "",
        idioma: "pt",
        tipo: "", 
        equipe: "",
        ativo: true
    });

    useEffect(() => {
        const fetchProfiles = async () => {
            try {
                const response = await fetch('/api/usuarios/permissoes');
                const data = await response.json();
                if (data.success && data.profiles) {
                    const profileNames = data.profiles.map((p: Profile) => p.id);
                    setAvailableProfiles(profileNames);
                    
                    // Se houver perfis, seta o primeiro como default se o tipo estiver vazio
                    if (profileNames.length > 0) {
                        setFormData(prev => ({ ...prev, tipo: profileNames[0] }));
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar perfis para cadastro:", error);
                // Fallback básico se a API falhar
                setAvailableProfiles(["promotor", "coordenador", "supervisor", "adm"]);
            }
        };
        fetchProfiles();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const response = await registerUser(formData);
            if (response.success) {
                alert(response.message);
                router.push("/usuarios"); // Redirecionar para a lista de usuários
            } else {
                setError(response.message || t('usuariosNovo.form.saveError'));
            }
        } catch (err) {
            console.error("Erro no forms:", err);
            setError(t('usuariosNovo.form.networkError'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Top Header Bar */}
                <Header
                    title={t('usuariosNovo.headerTitle')}
                    icon="group"
                    navigation={[
                        { label: t('usuariosNovo.headerNav.userList'), href: "/usuarios", icon: "list" },
                        { label: t('usuariosNovo.headerNav.profilePermissions'), href: "/usuarios/permissoes", icon: "shield_person" },
                        { label: t('usuariosNovo.headerNav.newAccount'), href: "/usuarios/novo", active: true, icon: "person_add" },
                    ]}
                />

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto p-10 2xl:p-14 pb-24">
                    <div className="max-w-[1000px] mx-auto space-y-10">

                        {/* Page Header Area */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                            <div className="space-y-3">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    {t('usuariosNovo.adminModule')}
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">{t('usuariosNovo.title')}</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium max-w-xl">{t('usuariosNovo.subtitle')}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button type="button" onClick={() => router.back()} className="px-6 py-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-3">
                                    {t('usuariosNovo.cancelButton')}
                                </button>
                                <button type="button" onClick={handleSubmit} disabled={isLoading} className="px-8 py-4 bg-primary hover:bg-blue-600 text-white text-sm font-black rounded-2xl shadow-xl shadow-primary/30 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[20px]">save</span>
                                    {isLoading ? t('usuariosNovo.form.saving') : t('usuariosNovo.saveButton')}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div role="alert" aria-live="assertive" className="mb-8 p-4 bg-red-50 dark:bg-red-500/10 border-l-4 border-red-500 text-red-700 dark:text-red-400 font-medium rounded-r-xl flex items-center gap-3">
                                <span className="material-symbols-outlined text-xl">error</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Section: Informações de Acesso */}
                            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <span className="material-symbols-outlined text-primary">key</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('usuariosNovo.form.accessInfoTitle')}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="nome">{t('usuariosNovo.form.nameLabel')}</label>
                                        <div className="relative group">
                                            <span aria-hidden="true" className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">person</span>
                                            <input value={formData.nome} onChange={handleChange} className="pl-11 bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="nome" name="nome" placeholder={t('usuariosNovo.form.namePlaceholder')} type="text" autoComplete="name" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="login">{t('usuariosNovo.form.loginLabel')}</label>
                                        <div className="relative group">
                                            <span aria-hidden="true" className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">alternate_email</span>
                                            <input value={formData.login} onChange={handleChange} className="pl-11 bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="login" name="login" placeholder={t('usuariosNovo.form.loginPlaceholder')} type="text" autoComplete="username" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">{t('usuariosNovo.form.emailLabel')}</label>
                                        <div className="relative group">
                                            <span aria-hidden="true" className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">mail</span>
                                            <input value={formData.email} onChange={handleChange} className="pl-11 bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="email" name="email" placeholder={t('usuariosNovo.form.emailPlaceholder')} type="email" autoComplete="email" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="senha">{t('usuariosNovo.form.passwordLabel')}</label>
                                        <div className="relative group">
                                            <span aria-hidden="true" className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">lock</span>
                                            <input value={formData.senha} onChange={handleChange} className="pl-11 w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white pr-10" id="senha" name="senha" type={showPassword ? "text" : "password"} autoComplete="new-password" required />
                                            <button type="button" aria-pressed={showPassword} aria-label={t('usuariosNovo.form.togglePasswordVisibility')} className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer text-[20px] focus:outline-none focus:text-primary transition-colors hover:text-primary" onClick={() => setShowPassword(!showPassword)}>{showPassword ? "visibility_off" : "visibility"}</button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Section: Informações do Dispositivo */}
                            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <span className="material-symbols-outlined text-primary">smartphone</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('usuariosNovo.form.deviceInfoTitle')}</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="push">{t('usuariosNovo.form.pushAliasLabel')}</label>
                                        <input value={formData.push} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="push" name="push" placeholder={t('usuariosNovo.form.pushAliasPlaceholder')} type="text" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="version">{t('usuariosNovo.form.appVersionLabel')}</label>
                                        <input value={formData.version} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="version" name="version" placeholder={t('usuariosNovo.form.appVersionPlaceholder')} type="text" />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="imei">{t('usuariosNovo.form.imeiLabel')}</label>
                                        <input value={formData.imei} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="imei" name="imei" placeholder={t('usuariosNovo.form.imeiPlaceholder')} type="text" />
                                    </div>
                                </div>
                            </section>

                            {/* Section: Preferências e Vínculos + Status */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <section className="lg:col-span-2 bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <span className="material-symbols-outlined text-primary">hub</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('usuariosNovo.form.preferencesTitle')}</h3>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="idioma">{t('usuariosNovo.form.languageLabel')}</label>
                                            <select value={formData.idioma} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white" id="idioma" name="idioma">
                                                <option value="pt">{t('usuariosNovo.form.languageOptionPt')}</option>
                                                <option value="en">{t('usuariosNovo.form.languageOptionEn')}</option>
                                                <option value="es">{t('usuariosNovo.form.languageOptionEs')}</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="tipo">{t('usuariosNovo.form.userTypeLabel')}</label>
                                            <select value={formData.tipo} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white" id="tipo" name="tipo">
                                                <option disabled value="">{t('usuariosNovo.form.userTypePlaceholder')}</option>
                                                {availableProfiles.map(profile => (
                                                    <option key={profile} value={profile.toLowerCase()}>
                                                        {profile}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1.5 md:col-span-2">
                                            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="equipe">{t('usuariosNovo.form.teamLabel')}</label>
                                            <select value={formData.equipe} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white" id="equipe" name="equipe">
                                                <option disabled value="">{t('usuariosNovo.form.teamPlaceholder')}</option>
                                                <option value="eq1">{t('usuariosNovo.form.teamOptionAlpha')}</option>
                                                <option value="eq2">{t('usuariosNovo.form.teamOptionBeta')}</option>
                                                <option value="eq3">{t('usuariosNovo.form.teamOptionGamma')}</option>
                                            </select>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                    <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                        <span className="material-symbols-outlined text-primary">toggle_on</span>
                                        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{t('usuariosNovo.form.accountStatusTitle')}</h3>
                                    </div>
                                    <div className="flex flex-col items-center justify-center py-4">
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">{t('usuariosNovo.form.accountStatusDescription')}</p>
                                        <label className="inline-flex items-center cursor-pointer">
                                            <input id="ativo" name="ativo" type="checkbox" checked={formData.ativo} onChange={handleChange} className="sr-only peer" />
                                            <span className="mr-3 text-sm font-bold text-slate-700 dark:text-slate-300 peer-checked:text-slate-400">{t('usuariosNovo.form.inactive')}</span>
                                            <div className="relative w-14 h-7 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 peer-focus:ring-offset-2 dark:peer-focus:ring-offset-[#1e293b] peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-primary"></div>
                                            <span className="ml-3 text-sm font-bold text-slate-400 peer-checked:text-primary">{t('usuariosNovo.form.active')}</span>
                                        </label>
                                    </div>
                                </section>
                            </div>
                        </form>

                        <footer className="mt-10 border-t border-slate-200 dark:border-slate-800 pt-8 flex justify-end gap-4">
                            <button type="button" onClick={() => setFormData({
                                nome: "", login: "", email: "", senha: "", push: "", version: "", imei: "", idioma: "pt", tipo: "promotor", equipe: "", ativo: true
                            })} disabled={isLoading} className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50">
                                {t('usuariosNovo.clearFormButton')}
                            </button>
                            <div className="flex gap-3">
                                <button type="button" onClick={() => router.back()} disabled={isLoading} className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
                                    {t('usuariosNovo.cancelButton')}
                                </button>
                                <button type="submit" onClick={handleSubmit} disabled={isLoading} className="px-10 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isLoading ? (
                                        <>
                                            <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                            {t('usuariosNovo.form.saving')}
                                        </>
                                    ) : (
                                        t('usuariosNovo.submitButton')
                                    )}
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            </main>
        </div>
    );
}
