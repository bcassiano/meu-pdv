import { NextResponse } from 'next/server';
import Papa from 'papaparse';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'Nenhum arquivo recebido.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Tratamento para caracteres UTF-8 de acentuação (latão)
        const textContent = buffer.toString('utf-8');

        // Faz o parser do CSV
        const { data, errors, meta } = Papa.parse(textContent, {
            header: true,
            skipEmptyLines: true,
            delimiter: "", // Auto-detect
            // Tratamento extra para remover BOM do UTF-8 e espaços em branco invisíveis
            transformHeader: (header) => header.replace(/^\uFEFF/, '').trim(),
        });

        if (errors.length > 0) {
            console.warn('Papaparse Validation Warnings/Errors:', errors);

            if (data.length === 0) {
                const formattedErrors = errors.map(err => ({
                    linha: err.row !== undefined ? (err.row + 1) : 1,
                    tipo: `(PARSER)`,
                    descricao: `Code: ${err.code} | Msg: ${err.message}`
                }));

                return NextResponse.json({
                    success: false,
                    message: 'Erro estrutural. Verifique as delimitacões padrão do CSV.',
                    errors: formattedErrors
                }, { status: 422 });
            }
        }

        // Regras de validação customizadas simuladas (Check de Qualidade)
        const validationErrors: Array<{ linha: number, tipo: string, descricao: string, isWarning?: boolean }> = [];
        const validationWarnings: Array<{ linha: number, tipo: string, descricao: string, isWarning: boolean }> = [];

        data.forEach((row: any, index: number) => {
            const rowNum = index + 2; // +1 zero-index, +1 header

            // Validação de CNPJ (campo 'CNPJ')
            let cnpj = String(row['CNPJ'] || row['cnpj'] || '').trim();
            let cnpjDigits = cnpj.replace(/\D/g, '');

            if (!cnpj || cnpj === '') {
                validationErrors.push({
                    linha: rowNum,
                    tipo: 'CAMPO VAZIO',
                    descricao: `O campo obrigatório 'CNPJ' está ausente.`
                });
            } else if (cnpjDigits.length > 0 && cnpjDigits.length < 14) {
                // Padronização: se tiver menos de 14, injetar zeros à esquerda (ex: problema do CSV no Excel perdendo zeros)
                const cnpjPadronizado = cnpjDigits.padStart(14, '0');
                row['CNPJ'] = cnpjPadronizado; // Aplicando a Mutação pro JSON final!

                validationWarnings.push({
                    linha: rowNum,
                    tipo: 'PADRONIZADO',
                    descricao: `CNPJ '${cnpj}' estava incompleto. Preenchido com zeros: '${cnpjPadronizado}'.`,
                    isWarning: true
                });
            } else if (cnpjDigits.length === 14 && cnpj !== cnpjDigits) {
                row['CNPJ'] = cnpjDigits; // Aplicando limpeza 
                validationWarnings.push({
                    linha: rowNum,
                    tipo: 'FORMATADO',
                    descricao: `CNPJ limpo para possuir apenas os 14 números: '${cnpjDigits}'.`,
                    isWarning: true
                });
            } else if (cnpjDigits.length > 14) {
                validationErrors.push({
                    linha: rowNum,
                    tipo: 'CNPJ INVÁLIDO',
                    descricao: `O valor '${cnpj}' possui mais de 14 dígitos.`
                });
            }

            // Validação de Nome/Razão Social e Descrição
            const razaoSocial = row['RAZÃO SOCIAL LOCAL'];
            const descricaoLocal = row['DESCRIÇÃO LOCAL'];

            if (!razaoSocial || String(razaoSocial).trim() === '') {
                validationErrors.push({
                    linha: rowNum,
                    tipo: 'RAZÃO SOCIAL AUSENTE',
                    descricao: `O campo 'RAZÃO SOCIAL LOCAL' é obrigatório.`
                });
            }

            if (!descricaoLocal || String(descricaoLocal).trim() === '') {
                validationErrors.push({
                    linha: rowNum,
                    tipo: 'DESCRIÇÃO AUSENTE',
                    descricao: `O campo 'DESCRIÇÃO LOCAL' está vazio. Todo PDV precisa de uma descrição clara.`
                });
            }

            // Validação de Endereço Local (Logradouro)
            const logradouro = row['LOGRADOURO'] || row['Logradouro'];
            if (!logradouro || String(logradouro).trim() === '') {
                validationErrors.push({
                    linha: rowNum,
                    tipo: 'ENDEREÇO AUSENTE',
                    descricao: `O campo 'LOGRADOURO' está em branco, impedindo a localização do PDV.`
                });
            }
        });

        const totalRows = data.length;
        const errorLinesSet = new Set(validationErrors.map(e => e.linha));
        const validRowsCount = totalRows - errorLinesSet.size;
        const qualityScore = totalRows > 0 ? Math.round((validRowsCount / totalRows) * 100) : 0;

        // Mapeamento para o formato canônico PdvRecord
        const validRows = data
            .filter((_: any, index: number) => !errorLinesSet.has(index + 2))
            .map((row: any) => ({
                idLocal: String(row['ID LOCAL '] || row['idLocal'] || '').trim(),
                razaoSocial: String(row['RAZÃO SOCIAL LOCAL'] || row['razaoSocial'] || '').trim(),
                nomeFantasia: String(row['DESCRIÇÃO LOCAL'] || row['nomeFantasia'] || row['RAZÃO SOCIAL LOCAL'] || '').trim(),
                cnpj: String(row['CNPJ'] || row['cnpj'] || '').trim(),
                cidadeUf: `${row['CIDADE'] || ''} / ${row['ESTADO'] || ''}`.trim() || 'N/A',
                endereco: `${row['TIPO LOGRADOURO'] || ''} ${row['LOGRADOURO'] || ''}, ${row['NÚMERO LOGRADOURO'] || ''}`.trim() || 'N/A',
                ativo: row['ATIVO LOCAL'] !== 'NÃO' && row['ativo'] !== false,
            }));

        const responseData = {
            success: validationErrors.length === 0,
            message: validationErrors.length === 0 
                ? 'A validação estrutural da planilha foi aprovada.' 
                : 'O arquivo contém erros de validação impeditivos.',
            rowsProcessed: totalRows,
            validRowsCount: validRowsCount,
            invalidRowsCount: errorLinesSet.size,
            qualityScore: qualityScore,
            errors: [...validationErrors, ...validationWarnings],
            warnings: validationWarnings,
            validRows: validRows
        };

        if (validationErrors.length > 0) {
            return NextResponse.json(responseData, { status: 422 });
        }

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('Erro na rota de importação:', error);
        return NextResponse.json({ error: 'Erro interno ao processar o arquivo.' }, { status: 500 });
    }
}
