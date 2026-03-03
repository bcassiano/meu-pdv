# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
