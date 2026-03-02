"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { salvarUsuario } from "./actions";

export default function NovoUsuarioPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
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

        setIsLoading(true);
        try {
            const response = await salvarUsuario(formData);
            if (response.success) {
                alert(response.message);
                // Opcional: Redirecionar para /usuarios ou limpar form
                window.location.reload();
            } else {
                alert(response.message || "Falha ao salvar usuário");
            }
        } catch (error) {
            console.error("Erro no forms:", error);
            alert("Falha de rede ao tentar criar o usuário.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
            <Sidebar />

            <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-[#101622]">
                <header className="bg-white dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                            <a className="hover:text-primary transition-colors" href="/usuarios">Gestão de Usuários</a>
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                            <span className="text-slate-900 dark:text-slate-100">Novo Usuário</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                <span className="material-symbols-outlined">notifications</span>
                            </button>
                            <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                                <span className="material-symbols-outlined">help</span>
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">Cadastro de Usuário</h2>
                            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Insira as informações básicas para criar uma nova conta no sistema.</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={() => window.history.back()} className="px-5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                Cancelar
                            </button>
                            <button type="button" onClick={handleSubmit} className="px-5 py-2 text-sm font-semibold text-white bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">save</span>
                                Salvar Cadastro
                            </button>
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-5xl mx-auto">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section: Informações de Acesso */}
                        <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="material-symbols-outlined text-primary">key</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Informações de Acesso</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="nome">Nome Completo</label>
                                    <input value={formData.nome} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="nome" placeholder="Ex: João Silva" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="login">Login</label>
                                    <input value={formData.login} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="login" placeholder="usuario.exemplo" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">E-mail Corporativo</label>
                                    <input value={formData.email} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="email" placeholder="nome@empresa.com.br" type="email" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="senha">Senha Provisória</label>
                                    <div className="relative">
                                        <input value={formData.senha} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white pr-10" id="senha" type="password" />
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer text-[20px]">visibility</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Informações do Dispositivo */}
                        <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                <span className="material-symbols-outlined text-primary">smartphone</span>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Informações do Dispositivo</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="push">Smartpush Alias</label>
                                    <input value={formData.push} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="push" placeholder="ID Push" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="version">Versão App Mobile</label>
                                    <input value={formData.version} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="version" placeholder="Ex: 2.1.4" type="text" />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="imei">IMEI do Aparelho</label>
                                    <input value={formData.imei} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600" id="imei" placeholder="000000-00-000000-0" type="text" />
                                </div>
                            </div>
                        </section>

                        {/* Section: Preferências e Vínculos + Status */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <section className="lg:col-span-2 bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <span className="material-symbols-outlined text-primary">hub</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Preferências e Vínculos</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="idioma">Idioma</label>
                                        <select value={formData.idioma} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white" id="idioma">
                                            <option value="pt">Português (Brasil)</option>
                                            <option value="en">English (US)</option>
                                            <option value="es">Español</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="tipo">Tipo de Pessoa</label>
                                        <select value={formData.tipo} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white" id="tipo">
                                            <option disabled value="">Selecione o cargo</option>
                                            <option value="promotor">Promotor</option>
                                            <option value="coordenador">Coordenador</option>
                                            <option value="supervisor">Supervisor</option>
                                            <option value="adm">Administrador</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col gap-1.5 md:col-span-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="equipe">Equipe Vinculada</label>
                                        <select value={formData.equipe} onChange={handleChange} className="bg-slate-50 dark:bg-slate-900/60 border border-slate-300 dark:border-slate-700 rounded text-sm px-4 py-2 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none text-slate-900 dark:text-white" id="equipe">
                                            <option disabled value="">Selecione uma equipe para o usuário</option>
                                            <option value="eq1">Equipe Alpha - Operações</option>
                                            <option value="eq2">Equipe Beta - Logística</option>
                                            <option value="eq3">Equipe Gamma - Estratégia</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <section className="bg-white dark:bg-slate-900/40 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                                <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                                    <span className="material-symbols-outlined text-primary">toggle_on</span>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Status da Conta</h3>
                                </div>
                                <div className="flex flex-col items-center justify-center py-4">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 text-center">Usuário terá acesso imediato após a criação se definido como Ativo.</p>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input id="ativo" type="checkbox" checked={formData.ativo} onChange={handleChange} className="sr-only peer" />
                                        <span className="mr-3 text-sm font-bold text-slate-700 dark:text-slate-300 peer-checked:text-slate-400">Inativo</span>
                                        <div className="relative w-14 h-7 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[3px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-[22px] after:w-[22px] after:transition-all peer-checked:bg-primary"></div>
                                        <span className="ml-3 text-sm font-bold text-slate-400 peer-checked:text-primary">Ativo</span>
                                    </label>
                                </div>
                            </section>
                        </div>
                    </form>
                </div>

                <footer className="mt-8 border-t border-slate-200 dark:border-slate-800 p-8 flex justify-end gap-4 bg-white/50 dark:bg-slate-900/20">
                    <button type="button" onClick={() => window.location.reload()} disabled={isLoading} className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-50">
                        Limpar Formulário
                    </button>
                    <div className="flex gap-3">
                        <button type="button" onClick={() => window.history.back()} disabled={isLoading} className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors disabled:opacity-50">
                            Cancelar
                        </button>
                        <button type="button" onClick={handleSubmit} disabled={isLoading} className="px-10 py-2.5 text-sm font-bold text-white bg-primary rounded-lg hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <>
                                    <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                    Salvando...
                                </>
                            ) : (
                                "Salvar e Concluir"
                            )}
                        </button>
                    </div>
                </footer>
            </main>
        </div>
    );
}
