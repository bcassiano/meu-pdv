import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientListaPdv from "./ClientListaPdv";

export default function ListaPDVPage(): JSX.Element {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Listagem de PDVs"
                    icon="list_alt"
                    navigation={[
                        { label: "Novo Cadastro", href: "/pdv/cadastro", icon: "add_box" },
                        { label: "Importação em Lote", href: "/pdv/importacao", icon: "cloud_upload" },
                        { label: "Carga Inicial", href: "/pdv/carga-inicial", icon: "upload_file" },
                        { label: "Listagem", href: "/pdv/lista", active: true, icon: "format_list_bulleted" },
                    ]}
                />

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 pb-24 scroll-smooth">
                    <div className="max-w-[1400px] mx-auto space-y-8">
                        {/* Title & Stats Overview */}
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Base de <span className="text-primary italic">PDVs Importados</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                                    Consulte e gerencie a capilaridade da sua rede em tempo real.
                                </p>
                            </div>
                        </div>

                        {/* Client Component with Table */}
                        <ClientListaPdv />
                    </div>
                </div>
            </main>
        </div>
    );
}
