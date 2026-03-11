# Implementação: Gestão de Itens Web (Componentes Globais)

Este plano descreve a criação da interface de Gestão de Itens e Cadastro de Produtos para a plataforma Web, garantindo conformidade total com a arquitetura existente (`src/components/Header.tsx` e `src/components/Sidebar.tsx`).

## Progresso da Implementação
- [x] Criar componente `ImportModal` com design premium
- [x] Implementar processamento de CSV com `papaparse`
- [x] Adicionar cards de estatísticas (Registros, Colunas, Check de Qualidade)
- [x] Garantir que a lista de itens no `ClientItens` seja atualizada dinamicamente
- [x] Implementar mapeamento resiliente de colunas (SKU, Descrição, etc)
- [x] Validar persistência de estado local para pesquisa em tempo real
- [ ] Notificações de sucesso/erro após importação.

## Objetivos
1. Criar a rota administrativa `/itens` para listagem de catálogo.
2. Criar a rota administrativa `/itens/novo` para cadastro de novos SKUs.
3. Utilizar o padrão de layout institucional (Sidebar à esquerda, Header fixo no topo do conteúdo).
4. Integrar o design do Stitch com o sistema de temas (Dark/Light) já presente nos componentes globais.

## Proposta de Mudanças

---

### Módulo de Itens (Web)

#### [NEW] `src/app/itens/page.tsx`
Criação da página de listagem.
- **Layout:** Integrado com `<Sidebar />` e `<Header />`.
- **Header Config:** Título "Gestão de Itens", ícone `inventory_2`, navegação incluindo "Lista" e "Novo Cadastro".
- **Conteúdo:** Tabela de produtos baseada no design do Stitch, utilizando classes do projeto comercial (`slate-900`, `primary`, etc).

#### [NEW] `src/app/itens/ClientItens.tsx`
Componente de cliente para a lógica da tabela.
- Gestão de estado de pesquisa.
- Mock de dados inicial para visualização.
- Botões de ação alinhados com o design coletado.

#### [NEW] `src/app/itens/novo/page.tsx`
Página de formulário de cadastro.
- **Layout:** Consistente com a listagem.
- **Header Config:** Breadcrumb apontando para a listagem.
- **Formulário:** Implementação completa dos campos do Stitch (Descrição, Identificador, Subgrupo, Tags, UDMs, etc).

---

## Plano de Verificação

### Verificação Manual
1. **Consistência de Layout:** Validar se a Sidebar do novo módulo se comporta identicamente ao módulo `/pdv/lista` (recolhimento e ativação de links).
2. **Integração do Header:** Confirmar se o título e navegação superior aparecem corretamente.
3. **Responsividade:** Testar a quebra do formulário em resoluções menores (tablet/mobile).
4. **Navegação:** Testar o fluxo entre Listagem <-> Novo Cadastro.
