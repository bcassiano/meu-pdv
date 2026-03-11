import { NextResponse } from 'next/server';
import Papa from 'papaparse';
import { normalizarCatalogo, type RawItemRow } from '@/lib/importadores/normalizar-itens';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Nenhum arquivo recebido.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        
        // Decodificação resiliente: Tenta UTF-8, se encontrar caracteres inválidos ou corrompidos,
        // o mapeador de headers no normalizar-itens.ts já faz o fuzzy match, 
        // mas garantir que não quebramos o binário aqui é essencial.
        // O Windows-1252 (ANSI) é comum em exportações de sistemas legado brasileiros.
        let textContent = new TextDecoder('utf-8').decode(bytes);
        
        // Se o conteúdo parecer corrompido (contendo caracteres de substituição), tenta Windows-1252
        if (textContent.includes('\ufffd')) {
            textContent = new TextDecoder('windows-1252').decode(bytes);
        }

        const { data, errors } = Papa.parse<RawItemRow>(textContent, {
            header: true,
            skipEmptyLines: true,
            delimiter: '', // Auto-detectar delimitador (Tab, Vírgula, Ponto-e-vírgula)
            transformHeader: (h) => h.replace(/^\uFEFF/, '').trim(),
        });

        if (errors.length > 0 && data.length === 0) {
            return NextResponse.json({
                success: false,
                message: 'Erro estrutural no CSV. Verifique o delimitador e o encoding.',
                errors: errors.map(e => ({ linha: (e.row ?? 0) + 1, descricao: e.message })),
            }, { status: 422 });
        }

        const resultado = normalizarCatalogo(data);

        return NextResponse.json({
            success: true,
            message: 'Catálogo processado com sucesso.',
            ...resultado,
        });

    } catch (error) {
        console.error('Erro na rota /api/itens/import:', error);
        return NextResponse.json({ error: 'Erro interno ao processar o arquivo.' }, { status: 500 });
    }
}
