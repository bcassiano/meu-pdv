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

export async function updateUsuarioAction(id: string, payload: Partial<Usuario>): Promise<ActionResponse> {
    try {
        const repo = DatabaseFactory.getUsuarioRepository();
        await repo.update(id, payload);
        return { success: true, message: "Usuário atualizado com sucesso." };
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
        return { success: false, message: "Erro ao atualizar usuário no banco de dados." };
    }
}

export async function toggleStatusUsuarioAction(id: string, currentStatus: boolean): Promise<ActionResponse> {
    try {
        const repo = DatabaseFactory.getUsuarioRepository();
        await repo.update(id, { ativo: !currentStatus });
        return { success: true, message: `Usuário ${!currentStatus ? 'ativado' : 'inativado'} com sucesso.` };
    } catch (error) {
        console.error("Erro ao alterar status do usuário:", error);
        return { success: false, message: "Erro ao alterar status do usuário no banco de dados." };
    }
}

export async function resetSenhaUsuarioAction(id: string): Promise<ActionResponse> {
    try {
        const repo = DatabaseFactory.getUsuarioRepository();
        const novaSenhaProvisoria = "Mudar123@"; // Em um sistema real, enviaríamos um link ou e-mail
        await repo.update(id, { senha: novaSenhaProvisoria });
        return { success: true, message: `Senha resetada para a senha padrão provisória.` };
    } catch (error) {
        console.error("Erro ao resetar senha:", error);
        return { success: false, message: "Erro ao resetar senha do usuário no banco de dados." };
    }
}
