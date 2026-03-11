/**
 * Motor de normalização para importação do catálogo de itens PDV.
 * Resolve: IDs inconsistentes, UDMs ausentes, subgrupos hierárquicos,
 * ambiguidade de embalagem e dados agregados na descrição.
 * 
 * Agora com suporte resiliente a headers (fuzzy matching para encoding/delimitadores).
 */

// ── Tipos ─────────────────────────────────────────────────────────────────────

export interface RawItemRow {
    [key: string]: string | undefined;
}

export interface ItemNormalizado {
    idOriginal: string;
    idNormalizado: string;
    descricao: string;
    subgrupo: string;
    udmPreco: string;
    udmEstoque: string;
    qualidadeScore: number;
    alertas: string[];
}

export interface RelatorioLinha {
    linha: number;
    tipo: 'UDM_INFERIDA' | 'SUBGRUPO_PROPAGADO' | 'ID_GERADO' | 'LINHA_VAZIA' | 'UDM_PADRONIZADA' | 'COLUNA_NAO_ENCONTRADA';
    descricao: string;
}

export interface ResultadoNormalizacao {
    itens: ItemNormalizado[];
    relatorio: RelatorioLinha[];
    totalLinhas: number;
    itensValidos: number;
    itensComAlerta: number;
    qualidadeGeral: number;
    mapeamentoHeaders: Record<string, string>;
}

// ── Constantes ────────────────────────────────────────────────────────────────

const REGEX_FARDO = /\(FD\s+(\d+)\/(\d+(?:[.,]\d+)?\s*KG)\)/i;
const REGEX_UDM_SIMPLES = /(\d+(?:[.,]\d+)?\s*(?:KG|G|L|ML|UN|UNI))\b/i;
const UDM_GENERICA = new Set(['0', '0 uni', 'uni', 'UNI', '']);

// ── Helpers de Mapeamento ─────────────────────────────────────────────────────

/**
 * Normaliza uma string para comparação (minusculas, sem acentos, sem espaços extras)
 */
function normalizeKey(k: string): string {
    return k.toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]/g, "")
        .trim();
}

/**
 * Mapeia os headers do CSV para as chaves internas esperadas.
 */
function resolverHeaders(row: RawItemRow): Record<string, string> {
    const keys = Object.keys(row);
    const mapping: Record<string, string> = {
        subgrupo: '',
        id: '',
        descricao: '',
        udmPreco: '',
        udmEstoque: '',
    };

    const targets = {
        subgrupo: ['idsubgrupodeitens', 'subgrupo', 'categoria', 'agrupamento'],
        id: ['iditem', 'codigo', 'sku', 'id', 'referencia'],
        descricao: ['descricaoitem', 'descricao', 'produto', 'nome'],
        udmPreco: ['udmpreco', 'unidade', 'unidadepreco', 'udm'],
        udmEstoque: ['udmestoque', 'unidadeestoque', 'estoqueudm'],
    };

    keys.forEach(key => {
        const norm = normalizeKey(key);
        (Object.entries(targets) as [keyof typeof targets, string[]][]).forEach(([field, aliases]) => {
            if (aliases.includes(norm) && !mapping[field]) {
                mapping[field] = key;
            }
        });
    });

    return mapping;
}

// ── Funções Puras ─────────────────────────────────────────────────────────────

export function forwardFillSubgrupo(rows: RawItemRow[], headerKey: string): string[] {
    let ultimoSubgrupo = '';
    return rows.map(row => {
        const raw = (headerKey ? String(row[headerKey] || '') : '').trim();
        if (raw !== '') ultimoSubgrupo = raw;
        return ultimoSubgrupo;
    });
}

export function normalizarId(rawId: string | undefined, index: number): { id: string; gerado: boolean } {
    const limpo = (rawId ?? '').trim();
    if (limpo === '') return { id: `gen_${String(index + 1).padStart(3, '0')}`, gerado: true };
    return { id: limpo, gerado: false };
}

export function extrairUdmDaDescricao(descricao: string): { udmPreco: string; udmEstoque: string } | null {
    const fardoMatch = descricao.match(REGEX_FARDO);
    if (fardoMatch) {
        const qtUnidades = fardoMatch[1];
        const pesoUnit = fardoMatch[2].toUpperCase().replace(',', '.');
        return { udmPreco: pesoUnit, udmEstoque: `FD ${qtUnidades}` };
    }

    const simplesMatch = descricao.match(REGEX_UDM_SIMPLES);
    if (simplesMatch) {
        return { udmPreco: simplesMatch[1].toUpperCase().replace(' ', ''), udmEstoque: 'uni' };
    }

    return null;
}

export function normalizarUdm(
    rawPreco: string | undefined,
    rawEstoque: string | undefined,
    descricao: string
): { udmPreco: string; udmEstoque: string; inferida: boolean } {
    const precoLimpo = (rawPreco ?? '').trim().toUpperCase();
    const estoqueLimpo = (rawEstoque ?? '').trim().toUpperCase();

    const precoGenerico = UDM_GENERICA.has(precoLimpo) || precoLimpo === '0';
    const estoqueGenerico = UDM_GENERICA.has(estoqueLimpo) || estoqueLimpo === '0';

    if (!precoGenerico && !estoqueGenerico) {
        return { udmPreco: precoLimpo, udmEstoque: estoqueLimpo, inferida: false };
    }

    const inferida = extrairUdmDaDescricao(descricao);
    if (inferida) {
        return {
            udmPreco: precoGenerico ? inferida.udmPreco : precoLimpo,
            udmEstoque: estoqueGenerico ? inferida.udmEstoque : estoqueLimpo,
            inferida: true,
        };
    }

    return {
        udmPreco: precoGenerico ? 'uni' : precoLimpo,
        udmEstoque: estoqueGenerico ? 'uni' : estoqueLimpo,
        inferida: false,
    };
}

export function calcularQualidadeItem(item: {
    descricao: string;
    idNormalizado: string;
    idGerado: boolean;
    udmPreco: string;
    udmEstoque: string;
}): number {
    let score = 0;
    if (item.descricao.trim() !== '') score += 40;
    if (!item.idGerado) score += 30;
    if (item.udmPreco !== 'uni' && item.udmPreco !== '') score += 15;
    if (item.udmEstoque !== 'uni' && item.udmEstoque !== '') score += 15;
    return score;
}

// ── Pipeline Principal ────────────────────────────────────────────────────────

export function normalizarCatalogo(rawRows: RawItemRow[]): ResultadoNormalizacao {
    const relatorio: RelatorioLinha[] = [];
    
    if (rawRows.length === 0) {
        return {
            itens: [],
            relatorio: [],
            totalLinhas: 0,
            itensValidos: 0,
            itensComAlerta: 0,
            qualidadeGeral: 0,
            mapeamentoHeaders: {},
        };
    }

    // Resolve mapeamento de colunas (fuzzy match)
    const map = resolverHeaders(rawRows[0]);
    
    // Log colunas não encontradas no relatório
    Object.entries(map).forEach(([field, header]) => {
        if (!header) {
            relatorio.push({
                linha: 1,
                tipo: 'COLUNA_NAO_ENCONTRADA',
                descricao: `Aviso: A coluna para '${field}' não foi identificada no CSV.`
            });
        }
    });

    const subgrupos = forwardFillSubgrupo(rawRows, map.subgrupo);
    const itens: ItemNormalizado[] = [];

    rawRows.forEach((row, i) => {
        const linhaNum = i + 2;
        const descricaoRaw = (map.descricao ? String(row[map.descricao] || '') : '').trim();
        const idRaw = map.id ? String(row[map.id] || '') : undefined;
        
        const { id: idNormalizado, gerado: idGerado } = normalizarId(idRaw, i);

        // Pula linhas completamente vazias
        if (!descricaoRaw && !idRaw) {
            relatorio.push({ linha: linhaNum, tipo: 'LINHA_VAZIA', descricao: 'Linha ignorada: sem ID nem descrição.' });
            return;
        }

        const { udmPreco, udmEstoque, inferida } = normalizarUdm(
            map.udmPreco ? String(row[map.udmPreco] || '') : undefined,
            map.udmEstoque ? String(row[map.udmEstoque] || '') : undefined,
            descricaoRaw
        );

        const alertas: string[] = [];

        // Verifica propagação de subgrupo
        const subgrupoOriginal = map.subgrupo ? (row[map.subgrupo] || '').trim() : '';
        if (subgrupos[i] !== subgrupoOriginal && subgrupos[i] !== '') {
            alertas.push('Subgrupo propagado da linha anterior');
            relatorio.push({ linha: linhaNum, tipo: 'SUBGRUPO_PROPAGADO', descricao: `Subgrupo '${subgrupos[i]}' herdado.` });
        }

        if (idGerado) {
            alertas.push('ID gerado automaticamente');
            relatorio.push({ linha: linhaNum, tipo: 'ID_GERADO', descricao: `ID ausente → atribuído '${idNormalizado}'.` });
        }

        if (inferida) {
            alertas.push('UDM inferida da descrição');
            relatorio.push({ linha: linhaNum, tipo: 'UDM_INFERIDA', descricao: `UDM extraída de '${descricaoRaw}'.` });
        }

        const qualidadeScore = calcularQualidadeItem({
            descricao: descricaoRaw,
            idNormalizado,
            idGerado,
            udmPreco,
            udmEstoque,
        });

        itens.push({
            idOriginal: idRaw ?? '',
            idNormalizado,
            descricao: descricaoRaw,
            subgrupo: subgrupos[i],
            udmPreco,
            udmEstoque,
            qualidadeScore,
            alertas,
        });
    });

    const itensComAlerta = itens.filter(it => it.alertas.length > 0).length;
    const qualidadeGeral = itens.length > 0
        ? Math.round(itens.reduce((acc, it) => acc + it.qualidadeScore, 0) / itens.length)
        : 0;

    return {
        itens,
        relatorio,
        totalLinhas: rawRows.length,
        itensValidos: itens.length,
        itensComAlerta,
        qualidadeGeral,
        mapeamentoHeaders: map,
    };
}
