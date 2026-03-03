import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientCargaInicial from "./ClientCargaInicial";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Carga Inicial | PDVs",
    description: "Faça o upload da planilha mestre para estruturar a hierarquia de PDVs da rede no Slate Admin.",
};

export default function PdvCargaInicialPage(): JSX.Element {
    // Renderiza a estrutura básica e o Client Component que conterá a lógica
    return (
        <div className="flex xl:h-screen w-full overflow-hidden bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-100 font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Carga Inicial de Lojas"
                    icon="upload_file"
                    navigation={[
                        { label: "Dashboard", href: "/pdv" },
                        { label: "Novo Cadastro", href: "/pdv/cadastro", icon: "add_box" },
                        { label: "Importação em Lote", href: "/pdv/importacao", icon: "cloud_upload" },
                        { label: "Carga Inicial", href: "/pdv/carga-inicial", active: true, icon: "upload_file" },
                    ]}
                />

                <ClientCargaInicial />
            </main>
        </div>
    );
}
