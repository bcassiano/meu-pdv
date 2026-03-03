import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cadastro de Usuário | Meu PDV',
    description: 'Crie um novo usuário no sistema Meu PDV, definindo perfil, acesso e área de atuação.',
    robots: 'noindex, nofollow',
};

export default function NovoUsuarioLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
