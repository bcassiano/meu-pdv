"use server";

import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "db.json");

export async function autenticarUsuario(login: string, senha: string) {
    try {
        // Garantir delay para UX (e segurança básica contra brute force simples)
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (!fs.existsSync(dbPath)) {
            return { success: false, message: "Base de dados não encontrada." };
        }

        const raw = fs.readFileSync(dbPath, "utf-8");
        if (!raw) return { success: false, message: "Erro ao ler base de dados." };

        const data = JSON.parse(raw);
        const usuarios = data.usuarios || [];

        // Busca o usuário pelo login exato e senha
        const usuario = usuarios.find((u: any) =>
            u.login === login && u.senha === senha
        );

        if (usuario) {
            if (!usuario.ativo) {
                return { success: false, message: "Este usuário está inativo no sistema." };
            }

            // Retorna apenas dados não sensíveis
            return {
                success: true,
                user: {
                    id: usuario.id,
                    nome: usuario.nome,
                    tipo: usuario.tipo
                }
            };
        }

        return { success: false, message: "Usuário ou senha incorretos." };

    } catch (error) {
        console.error("Erro na autenticação:", error);
        return { success: false, message: "Erro interno no servidor de autenticação." };
    }
}
