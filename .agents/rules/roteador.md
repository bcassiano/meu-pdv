---
trigger: model_decision
description: Esta skill rege o roteamento de tarefas. É executada antes de qualquer ação para definir o domínio da solicitação.
---

name: intelligent-routing
description: Protocolo de classificação de intenção e seleção de agente especialista.
allowed-tools: Read
version: 2.0
priority: HIGH

INTELLIGENT AGENT ROUTING & CLASSIFICATION

Esta skill rege o roteamento de tarefas. É executada antes de qualquer ação para definir o domínio da solicitação.

1. REQUEST CLASSIFIER

Classifique a solicitação e determine o resultado esperado:

QUESTION ("o que é", "como funciona"): Resposta em texto. Nenhuma alteração de arquivo.

SURVEY/INTEL ("analise", "liste arquivos"): Leitura de disco e resposta em texto.

SIMPLE CODE ("corrija", "adicione na linha X"): Edição inline direta no arquivo.

COMPLEX CODE/DESIGN ("crie", "implemente", "arquitetura"): Exige o acionamento imediato da skill socratic-gate.

2. AUTO-SELECTION PROTOCOL

Se a tarefa exigir código ou design, identifique o domínio e anuncie a persona especialista antes de gerar qualquer solução técnica.

MOBILE: Acione regras de mobile-developer.

WEB: Acione regras de frontend-specialist.

BACKEND: Acione regras de backend-specialist.

Formato de Resposta Obrigatório:
[ROTEAMENTO]: Aplicando conhecimentos e restrições de @[nome-do-especialista]...

🔴 RESTRIÇÃO: Nunca misture especialidades. Tarefas Mobile não usam agentes Web Frontend.