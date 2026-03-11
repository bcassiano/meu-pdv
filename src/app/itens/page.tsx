import React from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientItens from "./ClientItens";

export default function ItensPage(): JSX.Element {
    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                <Header
                    title="Gestão de Itens"
                    icon="inventory_2"
                    navigation={[
                        { label: "Novo Item", href: "/itens/novo", icon: "add_box" },
                        { label: "Importação", href: "/pdv/importacao", icon: "cloud_upload" },
                        { label: "Listagem", href: "/itens", active: true, icon: "format_list_bulleted" },
                    ]}
                />

                <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 lg:p-10 pb-24 scroll-smooth">
                    <div className="max-w-[1400px] mx-auto space-y-8">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Catálogo de <span className="text-primary italic">SKUs e Itens</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 font-medium tracking-tight">
                                    Gerencie os produtos ativos, configurações de caixa e unidades de medida.
                                </p>
                            </div>
                        </div>

                        <ClientItens />
                    </div>
                </div>
            </main>
        </div>
    );
}
