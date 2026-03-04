# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.7.0] - 2026-03-04

### Added
- **Features**: Nova tela de "Listagem de PDVs" em `/pdv/lista` com pesquisa dinâmica e suporte a dados legados.
- **Backend**: Endpoint de consulta `/api/pdv/list` integrado ao Pattern Repository e Firestore.
- **Scripts**: Automação administrativa `migrate-pdvs` para saneamento e padronização (camelCase) de registros na base.

### Fixed
- **Runtime**: Resolução definitiva de erros de Chunk e Sintaxe via limpeza profunda do cache e saneamento de codificação no frontend.
- **Navegação**: Sincronização de rotas e redirecionamento automático pós-importação bem-sucedida.

### Changed
- **Arquitetura**: Implementação de lógica de fallback defensivo para leitura de campos antigos de CSV (ex: RAZÃO SOCIAL LOCAL) na UI de listagem.
- **Dependencies**: Inclusão de `dotenv` e `ts-node` para suporte a scripts administrativos CLI.


## [1.6.0] - 2026-03-04

### Added
- Database: Implementação robusta do Padrão Repository (`IPdvRepository`), abstraindo a camada de dados para permitir transição futura (Azure PostgreSQL) sem refatoração de UI/API.
- Backend: Nova API route finalizadora (`/api/pdv/save-import`) acoplada a Factory Method injetável (`DatabaseFactory`).
- Persistência: Integração e instalação oficial nativa do `firebase-admin` realizando commits assíncronos em formato WriteBatch para o Firestore.

## [1.6.1] - 2026-03-04

### Fixed
- **API Importação**: Correção no retorno HTTP 422 para devolver a lista `validRows`, permitindo que o frontend libere a importação mista (com erros ignoráveis).
- **Backend Firestore**: Sanitização rigorosa no `FirestorePdvRepository` para remover chaves `undefined` do payload, evitando Erro 500 no Google Cloud.
- **Frontend Navegação**: Redirecionamento da tela pós-importação corrigido de `/pdv/lista` (rota ausente) para a Home `/`.

### Changed
- UX/API: Refatoração da API principal de parse (`/api/pdv/import`) para devolver os registros pré-limpos (`validRows`).
- UI/Carga Inicial: Atualização atômica do Componente `ClientCargaInicial.tsx`. O botão de "Finalizar", ao ser engatilhado (considerando ignoreError alert logic), agora deflagra POST direto na API para inserir blocos brutos via Service Account.

## [1.5.1] - 2026-03-03

### Changed
- UX Refinement: Remoção do link redundante "Dashboard" do cabeçalho (`Header`) em todas as páginas do módulo PDV, limpando a interface. Padronização de ícones e títulos na tela de Carga Inicial.
- Navigation: Correção da lógica de seleção da `Sidebar`, garantindo que o menu principal "PDVs Ativos" permaneça iluminado mesmo ao navegar por sub-rotas como Carga Inicial ou Importação.
- Features: Adição de interatividade de teste (mock de upload com feedback visual temporizado e download de template CSV validado) na tela de Carga Inicial.

## [1.5.0] - 2026-03-03

### Added
- Features: Nova tela de "Carga Inicial de Lojas" adicionada ao módulo PDV (`/pdv/carga-inicial`), provendo interface de upload com validação drag-and-drop e pré-visualização de dados.
- Navigation: Expansão coordenada da navegação global (Sidebar, Header do cadastro de PDV e atalhos na Home) para integrar a nova tela organicamente.

### Changed
- i18n: Evolução do dicionário `locales/pt.json` de modo a englobar as novas chaves literais para os componentes da Carga Inicial, reforçando a escalabilidade do sistema.

## [1.4.0] - 2026-03-03

### Changed
- UX/Acessibilidade: Adequação estrutural das rotas principais (`/`, `/logon`, `/usuarios`, `/usuarios/novo`, `/pdv/importacao`) garantindo `h1` único, inputs com `aria-label`/`label` explícitos e correção de roles/focos.
- SEO: Injeção sistemática de metadados (`title`, `description`, `robots`, `alternates`) na raiz de `layout.tsx` e `page.tsx` de cada módulo operante.
- i18n: Configuração mínima viável de internacionalização baseada em hook customizado e injeção do dicionário `locales/pt.json` para textos literais críticos.

## [1.3.0] - 2026-03-02

### Added
- Features: Novo módulo de "Importação de PDVs em Lote" (`/pdv/importacao`) com conversão nativa do layout projetado. Adição de Drag & Drop zone e painel dinâmico de tracking de erros geográficos/fiscais.
- UX/Aesthetics: Expansão do sistema `dark:` do Tailwind permitindo uma mesclagem suave e compatibilidade com o atual ThemeToggle para tabelas e selects.

### Changed
- UI Refinement: A página de `Novo Cadastro de PDV` (`/pdv/cadastro`) abandonou seu header engessado estático, herdando agora o `<Header />` global com abas de navegação (Dashboard / Novo Cadastro / Importação em Lote).
- UX: Componente de rodapé da página de Lote corrigido do seu fluxo absoluto, voltando a respeitar a hierarquia de rolamento padrão (evitando oclussão).

## [1.2.0] - 2026-03-02

### Added
- UX/Aesthetics: Suporte global a temas (Dark/Light/System) implantado via `next-themes` no `RootLayout`. Adição do botão de alternância fluído com transição de 500ms configurado no `<Header />`.
- Components: Novo componente `<ThemeToggle />` estilizado via Tailwind com suporte a feedback via Toast nativo de DOM.

### Changed
- UI Refinement: A página de `Novo Usuário` abandonou a header engessada e local; ela agora herda o componente `<Header />` global preservando contexto e botões "Salvar" no DOM flexível.

### Fixed
- Bugfix (Critical): Solução definitiva da falha de assets corrompidos (Erro 404 em `layout.css`, Chunks Next e `935.js`/`682.js`) via expurgo agressivo do Webpack Cache (`rmdir /s /q .next`) e transição do dev server para a porta 3006, mitigando colapso de file locking do Windows OS.

## [1.1.1] - 2026-03-02

### Fixed
- Security: Validação de campos obrigatórios na tela de Logon para impedir acessos sem credenciais.

## [1.1.0] - 2026-03-02

### Added
- User Management: Nova tela de Cadastro de Usuários (`/usuarios/novo`) com persistência funcional em `db.json`.
- UI Components: Lançamento do componente `Header` reutilizável com suporte a ícones dinâmicos, títulos contextuais e navegação unificada em linha única.

### Changed
- UX Refinement: Sincronização de ícones entre Sidebar e Header para consistência visual.
- Navigation: Consolidação do módulo de Usuários e Permissões em uma única experiência fluida via navegação superior.
- Cleanup: Remoção de itens redundantes na Sidebar e limpeza de breadcrumbs (visual minimalista).

## [1.0.0] - 2026-03-01

### Added
- Core Architecture: Inicialização do ecossistema Next.js 14 com suporte nativo a Dark Mode e componentes reutilizáveis (Sidebar dinâmica).
- Security & RBAC: Implementação de telas de Logon, Gestão de Usuários e Matriz de Permissões de Perfil por hierarquia.
- Mobile Solutions: Entrega do hub "Promotor Connect" com fluxos de Agenda Diária, Auditoria (Product Collection) e Fila de Sincronização Offline-First.
