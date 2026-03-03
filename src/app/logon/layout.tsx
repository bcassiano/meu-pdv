import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Autenticação | Meu PDV',
    description: 'Faça login no Meu PDV para acessar a célula de atendimento e ferramentas administrativas.',
    robots: 'noindex, nofollow', // Páginas de login geralmente não devem ser indexadas
};

export default function LogonLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
