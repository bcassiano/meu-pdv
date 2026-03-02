"use server";

import fs from "fs";
import path from "path";

// Caminho para o nosso banco de dados fake (db.json na pasta data)
const dbPath = path.join(process.cwd(), "data", "db.json");

export async function salvarUsuario(formData: any) {
    try {
        // Delay simulado para UX realista de requisição de rede
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Let's read the current users
        let data = { usuarios: [] };
        if (fs.existsSync(dbPath)) {
            const raw = fs.readFileSync(dbPath, "utf-8");
            if (raw) data = JSON.parse(raw);
        }

        // Criar o novo usuário com ID, data e dados do forms
        const novoUsuario = {
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            ...formData,
        };

        // Salvar no "banco"
        data.usuarios.push(novoUsuario);
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");

        return { success: true, message: "Usuário cadastrado com sucesso!", data: novoUsuario };

    } catch (error) {
        console.error("Erro ao salvar no db.json:", error);
        return { success: false, message: "Erro interno ao salvar no banco de dados." };
    }
}

export async function getUsuarios() {
    try {
        if (!fs.existsSync(dbPath)) return { success: true, data: [] };

        const raw = fs.readFileSync(dbPath, "utf-8");
        if (!raw) return { success: true, data: [] };

        const json = JSON.parse(raw);
        return { success: true, data: json.usuarios || [] };
    } catch (error) {
        console.error("Erro ao ler db.json:", error);
        return { success: false, message: "Erro ao carregar banco de dados", data: [] };
    }
}
