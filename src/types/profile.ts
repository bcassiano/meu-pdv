export interface Permission {
    view: boolean;
    edit: boolean;
    del: boolean;
    export: boolean;
}

export interface ModulePermission {
    name: string;
    desc: string;
    icon: string;
    iconBg: string;
    p: Permission;
}

export interface Jurisdiction {
    geo: boolean;
    network: boolean;
    region: string;
}

export interface Profile {
    id: string; // ID do perfil (ex: Administrador)
    description: string;
    icon: string;
    permissions: ModulePermission[];
    jurisdiction: Jurisdiction;
    updatedAt?: string;
}
