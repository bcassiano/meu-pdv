import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientImportacaoUsuarios from "./ClientImportacaoUsuarios";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Importação de Usuários | Slate",
    description: "Faça o upload da planilha mestre para cadastrar usuários globalmente no Slate Admin.",
};

export default function UsuariosImportacaoPage(): JSX.Element {
    return (
        <div className="flex xl:h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Usuários e Acessos"
                    icon="group"
                    navigation={[
                        { label: "Lista de Usuários", href: "/usuarios", icon: "list" },
                        { label: "Permissões de Perfil", href: "/usuarios/permissoes", icon: "shield_person" },
                        { label: "Nova Conta", href: "/usuarios/novo", icon: "person_add" },
                        { label: "Importação em Lote", href: "/usuarios/importacao", active: true, icon: "upload_file" },
                    ]}
                />

                <ClientImportacaoUsuarios />
            </main>
        </div>
    );
}
