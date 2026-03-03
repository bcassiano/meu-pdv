import { Metadata } from 'next';
import { useTranslation } from '@/locales/useTranslation';

export const metadata: Metadata = {
    title: 'Meu PDV - Início',
    description: 'Ambiente de navegação rápida do Meu PDV (Desenvolvimento).',
    robots: 'noindex, nofollow',
};

export default function HomePage(): JSX.Element {
    const { t } = useTranslation();

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-slate-50 dark:bg-slate-950">
            <h1 className="text-5xl font-black tracking-tighter mb-4 text-slate-900 dark:text-white">
                <span className="sr-only">Navegação Principal do Sistema </span>
                {t('home.title').split(' ')[0]} <span className="text-primary italic">{t('home.title').split(' ')[1]}</span>
            </h1>
            <p className="text-slate-500 font-medium mb-12">{t('home.subtitle')}</p>

            <nav role="navigation" aria-label={t('home.navAriaLabel')} className="flex flex-col gap-4 w-full max-w-sm">
                <a href="/logon" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    <span className="sr-only">Acessar a </span>{t('home.links.logon')}
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/pdv/cadastro" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    <span className="sr-only">Acessar o </span>{t('home.links.pdvCadastro')}
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/pdv/carga-inicial" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    <span className="sr-only">Acessar a </span>{t('home.links.pdvCargaInicial')}
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/usuarios" className="flex items-center justify-between px-6 py-4 bg-primary border border-primary text-white rounded-2xl font-black shadow-lg shadow-primary/20 hover:-translate-y-1 transition-all group">
                    <span className="sr-only">Acessar a </span>{t('home.links.usuarios')}
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
                <a href="/usuarios/permissoes" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-primary hover:text-primary transition-all group">
                    <span className="sr-only">Acessar as </span>{t('home.links.permissoes')}
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
                <a href="/mobile" className="flex items-center justify-between px-6 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 rounded-2xl font-bold shadow-sm hover:border-orange-500 hover:text-orange-500 transition-all group">
                    <span className="sr-only">Acessar os </span>{t('home.links.mobile')}
                    <span aria-hidden="true" className="material-symbols-outlined text-[20px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">arrow_forward</span>
                </a>
            </nav>
        </main>
    );
}
