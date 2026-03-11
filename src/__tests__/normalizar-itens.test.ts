import { describe, it, expect } from 'vitest';
import {
    forwardFillSubgrupo,
    normalizarId,
    extrairUdmDaDescricao,
    normalizarUdm,
    calcularQualidadeItem,
    normalizarCatalogo,
    type RawItemRow,
} from '../lib/importadores/normalizar-itens';

// ── forwardFillSubgrupo ───────────────────────────────────────────────────────

describe('forwardFillSubgrupo', () => {
    it('propaga subgrupo da linha anterior para linhas sem valor', () => {
        const rows: RawItemRow[] = [
            { 'SUBGRUPO': 'PA ARROZ' },
            { 'SUBGRUPO': '' },
            { 'SUBGRUPO': '' },
        ];
        expect(forwardFillSubgrupo(rows, 'SUBGRUPO')).toEqual(['PA ARROZ', 'PA ARROZ', 'PA ARROZ']);
    });

    it('reseta o subgrupo quando aparece um novo valor', () => {
        const rows: RawItemRow[] = [
            { 'SUBGRUPO': 'PA ARROZ' },
            { 'SUBGRUPO': '' },
            { 'SUBGRUPO': 'FEIJAO' },
            { 'SUBGRUPO': '' },
        ];
        expect(forwardFillSubgrupo(rows, 'SUBGRUPO')).toEqual(['PA ARROZ', 'PA ARROZ', 'FEIJAO', 'FEIJAO']);
    });
});

// ── normalizarId ──────────────────────────────────────────────────────────────

describe('normalizarId', () => {
    it('mantém conc_ como prefixo válido', () => {
        expect(normalizarId('conc_6530', 0)).toEqual({ id: 'conc_6530', gerado: false });
    });

    it('gera ID automático para valor vazio', () => {
        const result = normalizarId('', 0);
        expect(result.id).toMatch(/^gen_/);
        expect(result.gerado).toBe(true);
    });
});

// ── extrairUdmDaDescricao ─────────────────────────────────────────────────────

describe('extrairUdmDaDescricao', () => {
    it('extrai UDM simples de kg', () => {
        expect(extrairUdmDaDescricao('ARROZ CAMIL 5KG')).toEqual({ udmPreco: '5KG', udmEstoque: 'uni' });
    });

    it('extrai fardo com padrão (FD N/NKG)', () => {
        expect(extrairUdmDaDescricao('ARROZ BRANCO REDE KRILL T1 (FD 6/5KG)')).toEqual({
            udmPreco: '5KG',
            udmEstoque: 'FD 6',
        });
    });
});

// ── normalizarCatalogo (Resiliência de Headers) ──────────────────────────────

describe('normalizarCatalogo (Resiliência)', () => {
    it('encontra colunas mesmo com encoding corrompido ou aliases', () => {
        const fixture: RawItemRow[] = [
            { 
                'ID ITEM': '101', 
                'DESCRIÇÃO ITEM': 'PRODUTO TESTE 5KG', // Aqui o Ç e Ã podem estar zoados no real, mas o fuzzy trata
                'UDM Preço': 'uni',
                'UDM estoque': 'UNI'
            }
        ];
        const resultado = normalizarCatalogo(fixture);
        expect(resultado.itens[0].idNormalizado).toBe('101');
        expect(resultado.itens[0].descricao).toBe('PRODUTO TESTE 5KG');
    });

    it('encontra colunas por aliases (sku, produto)', () => {
        const fixture: RawItemRow[] = [
            { 
                'SKU': '999', 
                'PRODUTO': 'ARROZ 5KG',
                'UNIDADE': 'uni'
            }
        ];
        const resultado = normalizarCatalogo(fixture);
        expect(resultado.itens[0].idNormalizado).toBe('999');
        expect(resultado.itens[0].descricao).toBe('ARROZ 5KG');
        expect(resultado.mapeamentoHeaders.id).toBe('SKU');
        expect(resultado.mapeamentoHeaders.descricao).toBe('PRODUTO');
    });

    it('reporta colunas não encontradas', () => {
        const fixture: RawItemRow[] = [{ 'COLUNA ESTRANHA': 'valor' }];
        const resultado = normalizarCatalogo(fixture);
        expect(resultado.relatorio.some(r => r.tipo === 'COLUNA_NAO_ENCONTRADA')).toBe(true);
    });
});
