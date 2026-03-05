"use server";

import { ActionResponse, Usuario } from "@/types/usuario";
import { DatabaseFactory } from "@/db/factory";

export async function salvarUsuario(formData: Omit<Usuario, "id" | "createdAt">): Promise<ActionResponse<Usuario>> {
    try {
        const repo = DatabaseFactory.getUsuarioRepository();

        const novoUsuario: Usuario = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...formData,
        };

        // Salvar no Firestore
        await repo.saveMany([novoUsuario]);

        return { success: true, message: "Usuário cadastrado com sucesso!", data: novoUsuario };

    } catch (error) {
        console.error("Erro ao salvar no Firestore:", error);
        return { success: false, message: "Erro interno ao salvar no banco de dados." };
    }
}

export async function getUsuarios(): Promise<ActionResponse<Usuario[]>> {
    try {
        const repo = DatabaseFactory.getUsuarioRepository();
        const usuarios = await repo.getAll();

        return { success: true, data: usuarios || [] };
    } catch (error) {
        console.error("Erro ao ler do Firestore:", error);
        return { success: false, message: "Erro ao carregar banco de dados", data: [] };
    }
}
