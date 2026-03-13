import { NextResponse } from 'next/server';
import { DatabaseFactory } from '@/db/factory';
import { Profile } from '@/types/profile';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const repository = DatabaseFactory.getProfileRepository();
        const profiles = await repository.getAll();

        return NextResponse.json({ 
            success: true, 
            profiles 
        });
    } catch (error) {
        console.error('Erro ao buscar perfis:', error);
        return NextResponse.json({ error: 'Erro interno ao buscar perfis.' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { profiles } = await request.json();
        if (!profiles || !Array.isArray(profiles)) {
            return NextResponse.json({ error: 'Dados de perfis inválidos.' }, { status: 400 });
        }

        const repository = DatabaseFactory.getProfileRepository();
        await repository.saveMany(profiles);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Erro ao salvar perfis:', error);
        return NextResponse.json({ error: 'Erro interno ao salvar perfis.' }, { status: 500 });
    }
}
