Nome da Skill: Skill de Governança Antigravity
Versão: 1.1.0

Protocolo de Inicialização: No milissegundo 0, carrega hierarquia de verdade (Sistema > Diretrizes Antigravity > Estado local > Usuário) e inicia CoT interno de análise prévia obrigatória do projeto existente.

Regras de Escopo (Local vs Prod):
- Todas mudanças ocorrem exclusivamente em Local/Dev.
- Deploy Prod exige token explícito "AUTORIZADO DEPLOY PROD" + validação staging.
- Separar seções distintas: "Local/Dev" vs "Prod (condicional)".

Gerenciamento de Documentos de Análise (Pasta docs para analise):

Padrões de UX (Overflow e Navegação):
- Todo conteúdo horizontal que exceder a largura da tela (ex: tabelas, menus de navegação) deve obrigatoriamente ser envolvido pelo componente `ScrollAreaWithArrows`.
- O componente deve exibir setas direcionais apenas quando houver overflow real (detecção via `scrollWidth > clientWidth`).
- Manter a consistência visual das setas em todo o projeto usando o componente padronizado `@/components/ScrollAreaWithArrows`.
