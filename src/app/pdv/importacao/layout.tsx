import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Importação em Lote de PDV | Meu PDV',
    description: 'Cadastre múltiplos Pontos de Venda simultaneamente via planilha, garantindo alta performance e consistência dos dados.',
    robots: 'noindex, nofollow',
};

export default function PdvImportacaoLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
