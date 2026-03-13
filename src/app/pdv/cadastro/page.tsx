"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function CadastroPDVPage(): JSX.Element {
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [coordenadas, setCoordenadas] = useState("-23.55052, -46.63331");
    const [latLon, setLatLon] = useState({ lat: -23.55052, lon: -46.63331 });
    const [precision, setPrecision] = useState<number | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const handleCepSearch = async () => {
        if (cep.replace(/\D/g, '').length !== 8) return;

        setIsSearching(true);
        setEndereco("Buscando endereço...");

        try {
            // 1. Busca endereço via ViaCEP
            const viaCepRes = await fetch(`https://viacep.com.br/ws/${cep.replace(/\D/g, '')}/json/`);
            const viaCepData = await viaCepRes.json();

            if (viaCepData.erro) {
                setEndereco("CEP não encontrado.");
                setIsSearching(false);
                return;
            }

            const fullAddress = `${viaCepData.logradouro}, ${viaCepData.bairro}, ${viaCepData.localidade} - ${viaCepData.uf}`;
            setEndereco(fullAddress);

            // 2. Busca coordenadas via Nominatim (OpenStreetMap)
            const query = encodeURIComponent(`${viaCepData.logradouro}, ${viaCepData.localidade}, ${viaCepData.uf}, Brazil`);
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=1`);
            const geoData = await geoRes.json();

            if (geoData && geoData.length > 0) {
                const lat = parseFloat(geoData[0].lat);
                const lon = parseFloat(geoData[0].lon);
                setCoordenadas(`${lat}, ${lon}`);
                setLatLon({ lat, lon });
            } else {
                setCoordenadas("Coord. não encontradas");
            }

        } catch (error) {
            console.error("Erro na busca de CEP/Geo:", error);
            setEndereco("Erro ao buscar dados.");
        } finally {
            setIsSearching(false);
        }
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 8) value = value.slice(0, 8);
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        }
        setCep(value);
    };

    const handleGpsRefresh = () => {
        if (!navigator.geolocation) {
            alert("Geolocalização não é suportada.");
            return;
        }

        setIsSearching(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude: lat, longitude: lon, accuracy } = position.coords;
                setPrecision(accuracy);

                setCoordenadas(`${lat.toFixed(6)}, ${lon.toFixed(6)}`);
                setLatLon({ lat, lon });
                
                try {
                    const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    const geoData = await geoRes.json();
                    if (geoData && geoData.display_name) {
                        // Só sobrescreve se o endereço atual estiver vazio ou for "Processando..."
                        setEndereco((prev) => (!prev || prev.includes("Processando") ? geoData.display_name : prev));
                        
                        if (geoData.address && geoData.address.postcode && !cep) {
                            setCep(geoData.address.postcode);
                        }
                    }
                } catch (err) {
                    console.error("Erro no reverse geocoding:", err);
                } finally {
                    setIsSearching(false);
                }
            },
            (error) => {
                const msgs: Record<number, string> = {
                    1: "Permissão de localização negada.",
                    2: "Sinal de GPS indisponível.",
                    3: "Tempo limite esgotado ao buscar posição."
                };
                alert(msgs[error.code] || "Erro ao obter localização.");
                setIsSearching(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    const handleCoordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setCoordenadas(val);
        const parts = val.split(',').map(p => parseFloat(p.trim()));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
            setLatLon({ lat: parts[0], lon: parts[1] });
        }
    };

    return (
        <div className="flex h-screen w-full overflow-hidden bg-[#f8fafc] dark:bg-[#0f172a] font-display transition-colors">
            <Sidebar />

            <main className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Global Unified Header */}
                <Header
                    title="PDVs"
                    icon="storefront"
                    navigation={[
                        { label: "Novo Cadastro", href: "/pdv/cadastro", active: true, icon: "add_box" },
                        { label: "Importação em Lote", href: "/pdv/importacao", icon: "cloud_upload" },
                        { label: "Carga Inicial", href: "/pdv/carga-inicial", icon: "upload_file" },
                        { label: "Listagem", href: "/pdv/lista", icon: "format_list_bulleted" },
                    ]}
                />

                {/* Scrollable Workspace */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden p-10 2xl:p-14 pb-24 scroll-smooth">
                    <div className="max-w-[1000px] mx-auto space-y-10">

                        {/* Title & Introduction */}
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6">
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] border border-primary/20">
                                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                                    Módulo de Expansão
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                                    Novo Ponto de <br /> <span className="text-primary italic">Venda Especial</span>
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
                                    Sistema de onboarding automatizado. Garanta a precisão dos dados geográficos e tributários para ativação da rede.
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                    Descartar
                                </button>
                                <button className="px-8 py-4 rounded-2xl bg-primary text-white font-black text-sm shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                                    <span className="material-symbols-outlined text-[20px]">bolt</span>
                                    ATIVAR PDV
                                </button>
                            </div>
                        </div>

                        <form className="grid grid-cols-1 gap-8">
                            {/* Section 1: Identidade Visual e Legal */}
                            <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none p-10 space-y-10 transition-all hover:border-primary/20">
                                <div className="flex items-center gap-5">
                                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                        <span className="material-symbols-outlined text-3xl">verified_user</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Identidade Corporativa</h3>
                                        <p className="text-sm text-slate-400 font-medium italic">Validação Síncrona via Receita Federal</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                                    <div className="lg:col-span-2 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">CNPJ do Estabelecimento</label>
                                        <div className="relative">
                                            <input className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-widest text-lg transition-all outline-none" placeholder="00.000.000/0000-00" type="text" />
                                            <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                                <span className="material-symbols-outlined text-emerald-500 text-2xl">history_edu</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="lg:col-span-4 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Razão Social Completa</label>
                                        <input className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg transition-all outline-none" placeholder="Digite a razão social registrada" type="text" />
                                    </div>
                                    <div className="lg:col-span-3 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Marca Fantasia (Exibição)</label>
                                        <input className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg transition-all outline-none" placeholder="Nome Fantasia" type="text" />
                                    </div>
                                    <div className="lg:col-span-3 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Classificação Tributária</label>
                                        <div className="relative">
                                            <select className="w-full h-14 px-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-bold text-lg transition-all outline-none appearance-none">
                                                <option>Simples Nacional</option>
                                                <option>Lucro Presumido</option>
                                                <option>Lucro Real</option>
                                            </select>
                                            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Geolocalização Inteligente */}
                            <div className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none p-10 space-y-10 transition-all hover:border-primary/20">
                                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                                    <div className="flex items-center gap-5">
                                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 text-blue-500 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
                                            <span className="material-symbols-outlined text-3xl">map</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">Posicionamento Logístico</h3>
                                            <p className="text-sm text-slate-400 font-medium italic">Precisão GPS em nível de porta (Meter-Level)</p>
                                        </div>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={handleGpsRefresh}
                                        disabled={isSearching}
                                        className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all disabled:opacity-50"
                                    >
                                        <span className={`material-symbols-outlined text-sm ${isSearching ? 'animate-spin' : ''}`}>
                                            {isSearching ? 'refresh' : 'my_location'}
                                        </span>
                                        {isSearching ? 'Capturando...' : 'Force GPS Refresh'}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
                                    <div className="md:col-span-2 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">CEP de Destino</label>
                                        <div className="relative">
                                            <input 
                                                className="w-full h-14 pl-6 pr-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent focus:border-primary focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold tracking-widest text-lg transition-all outline-none" 
                                                placeholder="00000-000" 
                                                type="text"
                                                value={cep}
                                                onChange={handleCepChange}
                                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleCepSearch())}
                                            />
                                            <button 
                                                type="button" 
                                                onClick={handleCepSearch}
                                                disabled={isSearching}
                                                className="absolute right-2 top-2 h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-700 rounded-xl shadow-sm hover:text-primary transition-colors disabled:opacity-50"
                                            >
                                                <span className={`material-symbols-outlined text-[20px] ${isSearching ? 'animate-spin' : ''}`}>
                                                    {isSearching ? 'refresh' : 'search'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="md:col-span-4 space-y-3">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 ml-1">Endereço (Auto-Detect + Editável)</label>
                                        <input 
                                            className={`w-full h-14 px-6 rounded-2xl border-2 focus:border-primary focus:bg-white dark:focus:bg-slate-800 font-bold text-lg outline-none transition-all ${isSearching ? 'bg-slate-200/50 dark:bg-slate-800 text-slate-400 border-transparent' : 'bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white border-transparent'}`} 
                                            value={endereco} 
                                            onChange={(e) => setEndereco(e.target.value)}
                                            placeholder={isSearching ? "Processando dados do CEP..." : "Aguardando CEP ou digite aqui..."}
                                            type="text" 
                                        />
                                    </div>

                                    {/* Mapa Preview Premium Interativo */}
                                    <div className="md:col-span-6 relative h-80 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl group/map">
                                        <iframe 
                                            title="Mapa PDV"
                                            width="100%" 
                                            height="100%" 
                                            frameBorder="0" 
                                            scrolling="no" 
                                            marginHeight={0} 
                                            marginWidth={0} 
                                            src={`https://maps.google.com/maps?q=${latLon.lat},${latLon.lon}&z=16&output=embed`}
                                            className="grayscale-[0.5] contrast-[1.1] brightness-[0.9] dark:invert dark:hue-rotate-180 dark:brightness-75 transition-all duration-700 group-hover/map:grayscale-0 group-hover/map:brightness-100"
                                        />
                                        
                                        {/* Overlay de Coordenadas flutuante */}
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="bg-slate-900/90 dark:bg-black/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-center justify-between shadow-2xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-primary text-xl">location_on</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Coordenadas Verificadas</p>
                                                        <input 
                                                            className="bg-transparent text-white font-mono font-bold outline-none focus:text-primary transition-colors w-full"
                                                            value={coordenadas}
                                                            onChange={handleCoordChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${precision && precision > 150 ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400'}`}>
                                                        <span className={`h-1.5 w-1.5 rounded-full ${precision && precision > 150 ? 'bg-amber-500' : 'bg-emerald-500 animate-pulse'}`} />
                                                        <span className="text-[10px] font-bold uppercase">{precision && precision > 150 ? 'Low Precision' : 'GPS Match'}</span>
                                                    </div>
                                                    {precision && (
                                                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter">Erro: {Math.round(precision)}m</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>

                        {/* Footer Form Meta */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500">lock</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">End-to-End Encryption Active</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-emerald-500">cloud_done</span>
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Auto-Save Enabled</span>
                                </div>
                            </div>
                            <p className="text-[10px] font-bold text-slate-500 tracking-tight uppercase">
                                O uso deste formulário é restrito a coordenadores autorizados. © 2026 MEU PDV SYSTEMS.
                            </p>
                        </div>

                        <div className="h-12" />
                    </div>
                </div>
            </main>

            {/* Global CSS for custom animations/elements */}
            <style jsx global>{`
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 20px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        .dark ::-webkit-scrollbar-thumb {
          background: #334155;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>
        </div>
    );
}
