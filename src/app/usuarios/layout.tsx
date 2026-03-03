import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestão de Usuários | Meu PDV',
    description: 'Centralize os acessos, gerencie perfis, permissões e associe colaboradores a equipes estratégicas no Meu PDV.',
    robots: 'noindex, nofollow',
};

export default function UsuariosLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
