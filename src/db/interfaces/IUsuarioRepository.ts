import { Usuario } from "@/types/usuario";

export interface IUsuarioRepository {
    saveMany(usuarios: Usuario[]): Promise<void>;
    getAll(): Promise<Usuario[]>;
    update(id: string, data: Partial<Usuario>): Promise<void>;
}
