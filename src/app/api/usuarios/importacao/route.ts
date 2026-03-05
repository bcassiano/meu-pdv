import { NextResponse } from 'next/server';
import { DatabaseFactory } from '@/db/factory';
import { Usuario } from '@/types/usuario';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { rows } = body;

        if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return NextResponse.json({ success: false, error: 'Nenhum dado válido fornecido para importação.' }, { status: 400 });
        }

        // Converter do formato PreviewRow do Client para o Tipo Usuario da API
        const usuariosParaSalvar: Usuario[] = rows.map((row: any) => {
            const nomeStr = String(row.name || '').trim();
            // A key primária em caso de conflito, pra login padronizado e limpo, sem espaços
            const login = nomeStr.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/g, '') + Math.floor(Math.random() * 1000);

            return {
                id: '', // Se vazio, Firestore gerará um ID ou usaremos o doc(login) que configuramos
                createdAt: new Date().toISOString(),
                nome: nomeStr,
                login: login,
                email: String(row.email || '').trim().toLowerCase(),
                senha: '123', // Senha Default WAPP Legacy ou nova default
                idioma: 'pt',
                tipo: (String(row.role || '').toLowerCase() === 'administrador') ? 'adm' : 'promotor',
                equipe: String(row.team || '').trim(),
                ativo: true,
            } as Usuario; // Forçamos o cast com as regras de tipagem atendidas
        });

        // Grava no Firestore via Repositório Limpo
        const repo = DatabaseFactory.getUsuarioRepository();
        await repo.saveMany(usuariosParaSalvar);

        return NextResponse.json({
            success: true,
            message: `A importação de ${usuariosParaSalvar.length} usuários foi concluída com sucesso.`,
            inserted: usuariosParaSalvar.length
        });
    } catch (error) {
        console.error('Erro ao importar usuários no Firebase:', error);
        return NextResponse.json({ success: false, error: 'Falha interna ao gravar os registros no banco.' }, { status: 500 });
    }
}
