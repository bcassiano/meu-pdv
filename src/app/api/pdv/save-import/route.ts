import { NextResponse } from 'next/server';
import { DatabaseFactory } from '@/db/factory';
import { PdvRecord } from '@/db/interfaces/IPdvRepository';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const pdvs: PdvRecord[] = body.pdvs;

        if (!pdvs || !Array.isArray(pdvs) || pdvs.length === 0) {
            return NextResponse.json({ error: 'Nenhum PDV válido fornecido para salvar.' }, { status: 400 });
        }

        // Recupera o repositório instanciado (agora Firebase, no futuro Postgres)
        const pdvRepository = DatabaseFactory.getPdvRepository();

        // Executa a persistência dos dados
        await pdvRepository.saveMany(pdvs);

        return NextResponse.json({
            success: true,
            message: `${pdvs.length} PDVs salvos com sucesso.`,
            savedCount: pdvs.length
        });

    } catch (error) {
        console.error('Erro na rota de salvamento de PDVs:', error);
        return NextResponse.json({ error: 'Erro interno ao salvar os dados no banco de dados.' }, { status: 500 });
    }
}
