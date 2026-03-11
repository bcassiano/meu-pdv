import { NextResponse } from 'next/server';
import { FirestoreItemRepository } from '@/db/repositories/FirestoreItemRepository';

export async function GET() {
    try {
        const repository = new FirestoreItemRepository();
        const itens = await repository.getAll();

        return NextResponse.json({ 
            success: true, 
            itens 
        });
    } catch (error) {
        console.error('Erro na API de consulta de itens:', error);
        return NextResponse.json({ error: 'Erro interno ao buscar itens.' }, { status: 500 });
    }
}
