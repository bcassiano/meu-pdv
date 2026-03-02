export default function HomePage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 dark:bg-slate-950">
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">MEU <span className="text-primary italic">PDV</span></h1>
            <p className="text-slate-500 font-medium mb-12">Navegação Rápida (Ambiente de Desenvolvimento)</p>

            <div className="flex flex-col gap-4 w-full max-w-sm">
                <a href="/logon" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    Tela de Logon
                    <span className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/pdv/cadastro" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    Cadastro de PDV (Admin)
                    <span className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/usuarios" className="flex items-center justify-between px-6 py-4 bg-primary border border-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all group">
                    Gestão de Usuários (RBAC)
                    <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
                <a href="/usuarios/permissoes" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    Permissões de Perfil
                    <span className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/mobile" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-orange-500 hover:text-orange-500 transition-all group">
                    Módulos Mobile
                    <span className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
            </div>
        </main>
    );
}
