import { NextRequest, NextResponse } from 'next/server';
import { FirestoreItemRepository } from '@/db/repositories/FirestoreItemRepository';

export async function POST(req: NextRequest) {
    try {
        const { itens } = await req.json();

        if (!itens || !Array.isArray(itens)) {
            return NextResponse.json({ error: 'Lista de itens inválida.' }, { status: 400 });
        }

        const repository = new FirestoreItemRepository();
        await repository.saveMany(itens);

        return NextResponse.json({ 
            success: true, 
            message: `${itens.length} itens importados com sucesso.` 
        });
    } catch (error) {
        console.error('Erro na API de salvamento de itens:', error);
        return NextResponse.json({ error: 'Erro interno ao salvar itens.' }, { status: 500 });
    }
}
