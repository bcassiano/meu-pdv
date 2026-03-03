export type UsuarioTipo = "adm" | "promotor" | "coordenador" | "supervisor";

export interface Usuario {
    id: string;
    createdAt: string;
    nome: string;
    login: string;
    email: string;
    senha?: string;
    push?: string;
    version?: string;
    imei?: string;
    idioma: string;
    tipo: UsuarioTipo;
    equipe: string;
    ativo: boolean;
    avatar?: string;
}

export interface ActionResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}

export interface UsuarioVisual {
    id: string;
    name: string;
    email: string;
    initials: string;
    role: string;
    roleColor: string;
    team: string;
    teamIcon: string;
    status: string;
    statusColor: string;
    avatar?: string;
}
