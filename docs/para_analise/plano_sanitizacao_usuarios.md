STATUS_DELECAO: MARCAR_PARA_DELECAO_POS_IMPLEMENTACAO

# Plano de Ação: Sanitização de Usuários Duplicados

## 1. Problema Identificado
Inconsistência na coleção `usuarios` com múltiplos registros para o mesmo e-mail, provavelmente causados por importações em lote sem checagem de existência.

## 2. Critérios de Deduplicação
*   **Chave Única**: `email` (normalizado para minúsculas).
*   **Critério de Seleção (Vencedor)**:
    1. Registro com `createdAt` mais recente.
    2. Em caso de empate, registro com mais campos preenchidos.

## 3. Etapas de Execução
1.  **Criação do Script de Dry Run**: Um script que lê o banco, identifica as duplicatas e apenas imprime no console o que seria deletado.
2.  **Revisão**: Apresentação da lista de e-mails afetados.
3.  **Aplicação**: Execução via `WriteBatch` (exclusão atômica).

## 5. Resultados do Dry Run (Simulação em 05/03/2026)
*   **Total de usuários analisados**: 447
*   **Total de duplicatas identificadas**: 341 (76% da base)
*   **Ação Recomendada**: Execução de Batch Delete para manter apenas os registros mais recentes (Winner).

## 6. Próximo Passo
Aguardando autorização para executar o script de sanitização real (que utilizará o mesmo algoritmo do Dry Run mas com persistência no Firestore).
