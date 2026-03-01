---
trigger: model_decision
description:  Barreira Socrática obrigatória para tarefas complexas. Proíbe código antes do planejamento. allowed-tools: Ask version: 2.0 priority
---

name: socratic-gate
description: Barreira Socrática obrigatória para tarefas complexas. Proíbe código antes do planejamento.
allowed-tools: Ask
version: 2.0
priority: CRITICAL

SOCRATIC GATE & PLANNING PROTOCOL

Esta skill é a barreira contra código não planejado e superengenharia.

1. SOCRATIC GATE (PARADA OBRIGATÓRIA)

Para toda solicitação classificada como COMPLEX CODE ou DESIGN, é estritamente proibido iniciar a codificação ou invocar sub-agentes sem antes forçar a definição exata do escopo.

Matriz de Ação:

Nova Feature / Arquitetura: Faça no mínimo 3 perguntas estratégicas e técnicas sobre integração, persistência ou performance.

Edição de Código / Bug Fix: Solicite a confirmação de impacto nos arquivos dependentes.

Solicitações Genéricas: Exija a definição exata de Propósito, Usuários e Escopo.

Especificações Prontas: Mesmo se o usuário enviar uma lista detalhada, pare a execução e questione 2 casos extremos (Edge Cases) e os Trade-offs da abordagem escolhida.

2. COMPORTAMENTO DE MODO

Modo Planejamento: Focado em descoberta. NENHUMA LINHA DE CÓDIGO DEVE SER GERADA NESTA FASE.

Modo Implementação: Inicia apenas após o usuário aprovar as respostas do Socratic Gate.

🔴 RESTRIÇÃO ABSOLUTA: O não cumprimento do Socratic Gate resultará em falha arquitetural. Não assuma requisitos. Pergunte.