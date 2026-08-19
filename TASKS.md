# Backlog de Manutencao

Este arquivo e a fonte de verdade das tarefas do projeto. Trabalharemos em uma tarefa por vez, na ordem indicada, salvo uma necessidade diferente.

## Convencao de encoding

Este arquivo e mantido em ASCII puro (sem acentuacao grafica) por escolha explicita do projeto. A motivacao e evitar inconsistencias de encoding entre editores, terminais, GitHub e Netlify. `README.md` e `OPS.md` permanecem em UTF-8 com acentuacao porque sao renderizados via HTML; `TASKS.md` e lido em terminais e em diffs de git onde a consistencia ASCII e mais segura. Se algum trecho exigir acentuacao, mover o conteudo para `README.md` ou `OPS.md`.

## Como usar

1. Escolha uma tarefa pelo identificador, por exemplo: `Vamos fazer INFRA-01`.
2. A tarefa so e marcada como concluida apos a implementacao e a validacao descrita em seus criterios de aceite.
3. Itens bloqueados permanecem pendentes ate que a dependencia esteja pronta.
4. Novas necessidades devem ser adicionadas ao final, com identificador e criterio de aceite.

## Estado atual

- Publicacao: Netlify conectado ao repositorio no GitHub, com deploy automatico a cada push.
- Repositorio Git: inicializado e conectado ao remoto `origin` no GitHub.
- Aplicacao: uma pagina HTML estatica com quatro slides editaveis e exportacao PNG.
- Backlog: 24 tarefas abertas na secao **Revisao Geral** (REV-01 a REV-24), derivadas da revisao documentada em `REVIEW.md`.

## Legenda

- `[ ]` Pendente
- `[-]` Em andamento
- `[x]` Concluida
- `[!]` Bloqueada

## Fundacao

### [x] INFRA-01 - Inicializar o repositorio Git

Responsavel: projeto

Dependencias: nenhuma

Primeiros passos:

1. Executar `git init` no diretorio do projeto.
2. Criar o repositorio remoto no GitHub e configurar o remoto `origin`.
3. Criar o primeiro commit com o estado atual do projeto.

Criterios de aceite:

1. `git status` funciona no diretorio do projeto.
2. O repositorio remoto recebe o primeiro commit.
3. `index.html` e este arquivo estao versionados.

### [x] INFRA-02 - Conectar o repositorio ao Netlify

Responsavel: projeto

Dependencias: INFRA-01

Primeiros passos:

1. Criar um novo site no Netlify a partir do repositorio GitHub.
2. Configurar publicacao estatica sem comando de build nesta primeira fase.
3. Manter `index.html` como pagina inicial na raiz do repositorio.

Criterios de aceite:

1. Um deploy e criado a partir do branch principal.
2. A URL publica abre sem erros no navegador.
3. Uma alteracao enviada ao GitHub dispara um novo deploy.

### [x] DOC-01 - Criar documentacao operacional

Dependencias: INFRA-01

Primeiros passos:

1. Criar `README.md` com finalidade, estrutura e instrucoes para abrir localmente.
2. Documentar como editar textos, atualizar o mes e exportar os PNGs.
3. Registrar o fluxo de deploy pelo Netlify.

Criterios de aceite:

1. Uma pessoa sem contexto consegue abrir e usar o projeto apenas com o README.
2. O processo de publicacao esta documentado e corresponde a configuracao real.

### [x] DOC-02 - Criar instrucoes permanentes para agentes

Dependencias: DOC-01

Primeiros passos:

1. Criar `AGENTS.md` na raiz do projeto.
2. Registrar as invariantes: pagina estatica, slides em 1080x1350, exportacao em PNG e alteracoes minimas.
3. Exigir validacao visual em desktop e mobile para mudancas de layout.

Criterios de aceite:

1. As regras de implementacao e validacao estao claras para manutencao futura.
2. O arquivo nao duplica detalhes que pertencem ao README ou a skills especializadas.

## Confiabilidade da Aplicacao

### [x] APP-01 - Alinhar os campos editaveis com a dica da interface

Dependencias: INFRA-01

Primeiros passos:

1. Listar os textos que devem ser personalizados.
2. Tornar editaveis os titulos definidos na lista ou corrigir a mensagem da interface.
3. Validar que as alteracoes aparecem na exportacao PNG.

Criterios de aceite:

1. A dica da interface descreve fielmente o que pode ser editado.
2. Todo campo declarado editavel e exportado com o texto atualizado.

### [x] APP-02 - Exibir status e falhas de exportacao

Dependencias: APP-01

Primeiros passos:

1. Criar uma area de status na barra superior.
2. Informar progresso e resultado de exportacoes individuais e em lote.
3. Informar visualmente os slides que falharem.

Criterios de aceite:

1. Falhas nao dependem do console para serem percebidas.
2. O usuario sabe quais arquivos foram ou nao gerados.

### [x] APP-03 - Exportar todos os slides em ZIP

Dependencias: APP-02

Primeiros passos:

1. Escolher e fixar uma biblioteca ZIP.
2. Gerar os quatro PNGs e reuni-los em um unico arquivo ZIP.
3. Preservar a exportacao individual de cada slide.

Criterios de aceite:

1. O botao de exportacao geral baixa um unico ZIP com quatro PNGs.
2. Uma falha em um slide e comunicada ao usuario.
3. Navegadores nao precisam liberar downloads multiplos.

### [x] APP-04 - Validar textos que ultrapassam o layout

Dependencias: APP-01

Primeiros passos:

1. Definir limites praticos para titulos, bullets e rodapes.
2. Detectar overflow antes da exportacao.
3. Exibir uma orientacao que identifique o campo com problema.

Criterios de aceite:

1. A exportacao nao gera texto cortado sem aviso.
2. O usuario recebe uma orientacao acionavel para corrigir o campo.

### [x] APP-05 - Tratar indisponibilidade de dependencias externas

Dependencias: APP-02

Primeiros passos:

1. Verificar a existencia de `html2canvas` antes de habilitar a exportacao.
2. Exibir erro claro quando a dependencia estiver indisponivel.
3. Fixar as versoes de bibliotecas externas e documenta-las.

Criterios de aceite:

1. A pagina nao aparenta estar pronta para exportar se a biblioteca falhar.
2. A versao de cada dependencia critica esta registrada.

## Qualidade Automatizada

### [x] QA-01 - Configurar testes de navegador com Playwright

Dependencias: INFRA-01, DOC-01

Primeiros passos:

1. Criar `package.json` com scripts de teste.
2. Configurar Playwright para servir e abrir a pagina localmente.
3. Testar carregamento em viewport desktop e mobile.

Criterios de aceite:

1. Um unico comando executa os testes localmente.
2. Os testes confirmam que a pagina abre sem erro em desktop e mobile.

### [x] QA-02 - Testar a exportacao dos slides

Dependencias: QA-01, APP-02

Primeiros passos:

1. Criar testes para cada botao de exportacao individual.
2. Confirmar a geracao do canvas em 2160x2700 pixels.
3. Cobrir a mensagem apresentada em caso de falha simulada.

Criterios de aceite:

1. Os quatro slides sao testados.
2. Uma regressao na exportacao falha a suite de testes.

### [x] QA-03 - Criar testes visuais de regressao

Dependencias: QA-01, APP-01

Primeiros passos:

1. Criar screenshots de referencia dos quatro slides.
2. Comparar as capturas atuais com as referencias no teste.
3. Documentar o processo para atualizar referencias apos uma mudanca aprovada.

Criterios de aceite:

1. Alteracoes visuais inesperadas sao detectadas automaticamente.
2. As referencias sao atualizadas apenas de forma intencional.

### [x] CI-01 - Executar validacoes no GitHub Actions

Dependencias: QA-01

Primeiros passos:

1. Criar workflow para instalar dependencias e executar testes em push e pull request.
2. Incluir os testes de exportacao quando QA-02 estiver concluida.
3. Incluir os testes visuais quando QA-03 estiver concluida.

Criterios de aceite:

1. Toda alteracao no repositorio executa as verificacoes aplicaveis.
2. Uma falha de teste impede que a alteracao seja considerada pronta.

## Harness de Agentes

### [x] AGENT-01 - Criar agente de revisao do carrossel

Dependencias: DOC-02, QA-01

Primeiros passos:

1. Criar `.opencode/agents/carousel-reviewer.md` com permissao somente leitura.
2. Orientar o agente a revisar regressao visual, acessibilidade, exportacao e dependencias.
3. Exigir que o agente reporte achados por severidade e lacunas de teste.

Criterios de aceite:

1. O agente nao altera arquivos.
2. Uma solicitacao de revisao gera achados objetivos e referencia arquivos afetados.

### [x] AGENT-02 - Criar skill para alteracoes de conteudo

Dependencias: DOC-02, APP-04

Primeiros passos:

1. Criar `.opencode/skills/carousel-content/SKILL.md`.
2. Definir quando a skill deve ser usada: textos, agenda, preco, CTA e identidade visual.
3. Incluir verificacao de limites de texto e exportacao apos edicao.

Criterios de aceite:

1. A skill nao e acionada para manutencao tecnica sem alteracao de conteudo.
2. Alteracoes de conteudo preservam o layout e passam nas validacoes definidas.

### [x] AGENT-03 - Criar skill para garantia visual

Dependencias: DOC-02, QA-03

Primeiros passos:

1. Criar `.opencode/skills/carousel-visual-qa/SKILL.md`.
2. Definir gatilhos: CSS, HTML estrutural, fontes, exportacao e mudanca de dimensoes.
3. Exigir execucao de testes visuais e revisao de desktop e mobile.

Criterios de aceite:

1. A skill e usada somente para mudancas que possam afetar a apresentacao.
2. O procedimento de validacao e reproduzivel.

### [x] AGENT-04 - Criar comandos de revisao e publicacao

Dependencias: AGENT-01, CI-01

Primeiros passos:

1. Criar o comando `/review` para revisar alteracoes e executar verificacoes disponiveis.
2. Criar o comando `/release` para confirmar versao, testes e estado do repositorio antes do push.
3. Manter a publicacao no Netlify disparada pelo GitHub, sem deploy autonomo do agente.

Criterios de aceite:

1. Os comandos nao ignoram testes falhos.
2. Nenhum comando publica sem uma acao explicita do responsavel pelo projeto.

## Manutencao Periodica

### [x] OPS-01 - Criar checklist mensal

Dependencias: APP-05, QA-02

Primeiros passos:

1. Criar um checklist para testar URL publicada, exportacao, fontes e dependencias.
2. Registrar a data e os resultados de cada revisao.
3. Abrir uma tarefa neste backlog quando houver correcao necessaria.

Criterios de aceite:

1. A manutencao mensal pode ser executada sem depender de memoria ou contexto oral.
2. Problemas identificados possuem rastreabilidade no backlog.

## Revisao Geral

Itens abertos pela revisao documentada em `REVIEW.md`. Cada tarefa referencia o identificador do achado no review e mantem o formato padrao (passos + criterios). Trabalhe em uma tarefa por vez, na ordem sugerida abaixo ou na que melhor servir ao projeto.

Ordem sugerida por bloco:

1. **Seguranca e headers** — REV-01 a REV-03.
2. **Empacotamento e DX** — REV-04 a REV-08 (ganho rapido antes de mudancas estruturais).
3. **Testes** — REV-09 a REV-15 (cobrir lacunas antes de refatorar).
4. **Arquitetura de codigo** — REV-16 a REV-20 (refatoros com testes em cima).
5. **Acessibilidade** — REV-21 a REV-23.
6. **Documentacao** — REV-24.

### [x] REV-01 - Adicionar Subresource Integrity (SRI) e crossorigin nas bibliotecas externas

Severidade: alta

Dependencias: nenhuma

Primeiros passos:

1. Calcular o hash SHA-384 de `html2canvas@1.4.1` e `jszip@3.10.1` servidos pelo cdnjs.
2. Em `index.html`, adicionar `integrity="sha384-..."` e `crossorigin="anonymous"` em cada `<script>` externo.
3. Confirmar que `html2canvas` e `JSZip` continuam disponiveis no escopo global apos a politica.

Criterios de aceite:

1. As duas tags `<script>` externas declaram `integrity` e `crossorigin`.
2. A pagina carrega, edita e exporta sem alteracao de comportamento.
3. `npm test` permanece verde.

### [x] REV-02 - Adicionar Content-Security-Policy e headers relacionados

Severidade: media

Dependencias: REV-01 (referencial)

Primeiros passos:

1. Em `index.html`, adicionar `<meta http-equiv="Content-Security-Policy" content="...">` restringindo `script-src`, `style-src`, `font-src`, `img-src` e `connect-src` as origens realmente usadas.
2. Considerar `<meta name="referrer" content="strict-origin-when-cross-origin">` e `<meta name="color-scheme" content="dark">`.

Criterios de aceite:

1. Nenhuma requisicao legitima falha apos aplicar a politica.
2. O DevTools nao reporta bloqueios inesperados.
3. `npm test` permanece verde.

### [x] REV-03 - Declarar favicon para eliminar 404 silencioso

Severidade: baixa

Dependencias: nenhuma

Primeiros passos:

1. Definir um favicon (PNG 32x32 ou SVG inline).
2. Adicionar `<link rel="icon" ...>` em `index.html`.

Criterios de aceite:

1. Nenhum 404 de `/favicon.ico` aparece no console ou network tab.
2. `npm test` permanece verde.

### [x] REV-04 - Completar `package.json` com metadados padrao

Severidade: media

Dependencias: nenhuma

Primeiros passos:

1. Preencher `name`, `version`, `description`, `license` e `engines.node` em `package.json`.
2. Garantir que `package-lock.json` continua consistente.

Criterios de aceite:

1. `npm pkg get name version description license engines` retorna os campos preenchidos.
2. `npm test` permanece verde.

### [x] REV-05 - Adicionar `.editorconfig` na raiz

Severidade: baixa

Dependencias: nenhuma

Primeiros passos:

1. Criar `.editorconfig` com `root = true`, indentacao de 2 espacos (HTML/CSS/JS) e finais de linha LF.

Criterios de aceite:

1. Editores que suportam `.editorconfig` aplicam a configuracao.
2. Nenhuma mudanca de comportamento em runtime.

### [x] REV-06 - Criar `LICENSE`

Severidade: baixa

Dependencias: nenhuma

Primeiros passos:

1. Escolher uma licenca (sugestao: MIT para portfolio pessoal).
2. Criar `LICENSE` na raiz com o texto completo.
3. Referenciar a licenca no `package.json` (campo `license`) — ver REV-04.

Criterios de aceite:

1. `LICENSE` existe na raiz e o campo `license` em `package.json` aponta para a mesma licenca.

### [x] REV-07 - Criar `CHANGELOG.md`

Severidade: baixa

Dependencias: nenhuma

Primeiros passos:

1. Criar `CHANGELOG.md` com o formato Keep a Changelog (ou equivalente).
2. Popular com as entregas existentes (INFRA-01 ate OPS-01) e o item atual (revisao documentada).

Criterios de aceite:

1. `CHANGELOG.md` lista as versoes/releases conhecidas.
2. A entrada da revisao atual esta registrada.

### [x] REV-08 - Fixar versao do Node (`.nvmrc` ou `engines.node`)

Severidade: baixa

Dependencias: REV-04 (parcial)

Primeiros passos:

1. Criar `.nvmrc` com a versao usada em CI (`20`).
2. Garantir que `package.json` declare `engines.node` consistente — ver REV-04.

Criterios de aceite:

1. `nvm use` (ou equivalente) fixa a mesma versao usada pela CI.
2. `npm test` permanece verde na versao fixada.

### [x] REV-09 - Teste do happy path do ZIP (4 PNGs validos)

Severidade: alta

Dependencias: QA-01 (Playwright configurado)

Primeiros passos:

1. Em um novo teste (sugestao: arquivo `tests/zip.spec.mjs`), navegar para `/` apos `fonts.ready`.
2. Interceptar o download do `downloadAllBtn` e ler o blob como ZIP.
3. Listar as 4 entradas esperadas (`01-capa.png`, `02-mentoria-como-funciona.png`, `03-como-agendar.png`, `04-aulas.png`).
4. Decodificar cada PNG embutido e afirmar `width === 2160 && height === 2700`.

Criterios de aceite:

1. O teste falha se o ZIP nao contiver exatamente as 4 entradas nomeadas.
2. O teste falha se qualquer PNG nao tiver 2160x2700 pixels.
3. `npm test` permanece verde com o teste incluido.

### [x] REV-10 - Teste unitario de `syncMonth`

Severidade: alta

Dependencias: nenhuma

Primeiros passos:

1. Expor `syncMonth` em `window.__carouselExport` ou via modulo testavel.
2. Criar `tests/sync-month.spec.mjs` (ou arquivo unificado) que altere `monthInput.value` para varios casos (`Agosto`, `  mes  com  espacos  `, etc.) e afirme o `textContent` dos `.tab-month`.
3. Cobrir `slugify` indiretamente atraves desse teste.

Criterios de aceite:

1. Os casos de normalizacao (caixa, acentos, espacos) estao cobertos.
2. O teste falha se `slugify` for removido ou alterado para comportamento divergente.

### [x] REV-11 - Teste do gate de fontes (botoes desabilitados → habilitados apos `fonts.ready`)

Severidade: media

Dependencias: QA-01

Primeiros passos:

1. Criar teste que navega para `/` e, imediatamente apos `goto`, afirma que `#downloadAllBtn` esta desabilitado.
2. Aguardar `document.fonts.ready` e afirmar que o botao foi reabilitado e o status mudou para sucesso.
3. Repetir para `.dl-btn`.

Criterios de aceite:

1. A transicao `disabled → enabled` e afirmada explicitamente.
2. O status `data-state` reflete `success` apos o gate.

### [x] REV-12 - Teste do contrato do clone de exportacao (sem `[contenteditable]`)

Severidade: media

Dependencias: QA-01

Primeiros passos:

1. Criar teste que chame `window.__carouselExport.captureSlide('slide1')`.
2. Durante a chamada (ou via spy em `createExportClone`), afirmar que o clone nao contem nenhum `[contenteditable]`.

Criterios de aceite:

1. O teste falha se `createExportClone` deixar de remover `contenteditable` no clone.

### [x] REV-13 - Teste de responsividade (reescalonamento apos resize)

Severidade: media

Dependencias: QA-01

Primeiros passos:

1. Criar teste que carrega `/` em um viewport e le `wrap.style.height`.
2. Redimensionar o viewport via `page.setViewportSize(...)`.
3. Reafirmar que `wrap.style.height` mudou e e consistente com `1350 * scale` calculado a partir de `wrap.clientWidth`.

Criterios de aceite:

1. O teste falha se o redimensionamento nao propagar para `fitSlides`.
2. A relacao `height === 1350 * (clientWidth / 1080)` e verificada.

### [x] REV-14 - Estabilizar snapshots com `mask` (mascarar `.tab-month`)

Severidade: media

Dependencias: QA-03

Primeiros passos:

1. Em `tests/visual.spec.mjs`, aplicar uma mascara sobre `.tab-month` (e idealmente sobre o `cursor-blink`) ao capturar o snapshot.
2. Atualizar os snapshots de referencia (`tests/visual.spec.mjs-snapshots/`).

Criterios de aceite:

1. Trocar o mes da agenda em `index.html` nao quebra mais os snapshots.
2. `npx playwright test visual` permanece verde.

### [x] REV-15 - Adicionar `retries` ao Playwright config

Severidade: baixa

Dependencias: QA-01

Primeiros passos:

1. Em `playwright.config.mjs`, adicionar `retries: process.env.CI ? 2 : 0` no escopo raiz.

Criterios de aceite:

1. CI roda cada teste ate 2 vezes em caso de falha.
2. Execucao local nao faz retry.

### [x] REV-16 - Adicionar JSDoc as funcoes principais do script

Severidade: media

Dependencias: nenhuma

Primeiros passos:

1. Em `index.html`, adicionar bloco JSDoc com `@param`, `@returns` e `@throws` em `fitSlides`, `fitAsciiIn`, `slugify`, `createExportClone`, `findOverflowFields`, `captureSlide`, `triggerDownload`, `syncMonth`.

Criterios de aceite:

1. Editores com suporte a JSDoc exibem assinatura e tipos inferidos.
2. Nenhuma mudanca de comportamento em runtime.

### [x] REV-17 - Centralizar constantes magicas e mensagens de UI

Severidade: media

Dependencias: nenhuma

Primeiros passos:

1. Em `index.html`, criar um objeto `CARROUSEL_CONFIG` no topo do `<script>` com `baseWidth`, `baseHeight`, `exportScale`, `exportBackgroundColor`, `mimeType`.
2. Substituir literais espalhados por referencias ao objeto.
3. Centralizar mensagens de UI em um objeto `MESSAGES` ou helper.

Criterios de aceite:

1. Nenhum literal magico (`1080`, `1350`, `2`, `'#0B0F14'`, `'image/png'`) permanece espalhado.
2. Mensagens de exportacao sao editadas em um unico lugar.

### [x] REV-18 - Consolidar `fitSlides` e `fitAllAscii` em um unico mecanismo

Severidade: media

Dependencias: nenhuma

Primeiros passos:

1. Em `index.html`, unificar os listeners de `load` e `resize` em um unico registro.
2. Usar `requestAnimationFrame` para coalescer multiplos eventos de resize.

Criterios de aceite:

1. Apenas um par de listeners de resize e registrado.
2. Comportamento visual permanece identico em desktop e mobile.

### [x] REV-19 - Usar `.dl-btn` como fonte de verdade em vez de `slideOrder`

Severidade: media

Dependencias: nenhuma

Primeiros passos:

1. Em `index.html`, derivar `slideOrder` de `document.querySelectorAll('.dl-btn')` mapeando `data-target` e `data-name`.
2. Expor o array derivado para `window.__carouselExport`.

Criterios de aceite:

1. Adicionar ou remover um slide + botao `.dl-btn` nao exige editar dois lugares.
2. `npm test` permanece verde.

### [x] REV-20 - Mover arte ASCII do slide 1 para arquivo externo

Severidade: media

Dependencias: nenhuma

Primeiros passos:

1. Extrair os 80 `<div style="color:rgb(...)">` para um arquivo `assets/slide1-ascii.html` ou `assets/slide1-ascii.json`.
2. Carregar via `fetch` no `index.html` antes do `fitAllAscii`.

Criterios de aceite:

1. `index.html` nao contem mais a arte ASCII inline.
2. A renderizacao visual e identica a anterior.
3. `npm test` permanece verde (snapshots podem exigir atualizacao apos aprovacao).

### [ ] REV-21 - Teste de navegacao por teclado (Tab order)

Severidade: media

Dependencias: QA-01

Primeiros passos:

1. Criar teste que pressiona `Tab` repetidamente a partir do inicio do documento.
2. Afirmar que cada controle interativo (toolbar, botoes de download, campos editaveis) recebe foco nessa ordem.
3. Afirmar que o foco visual e detectavel (por exemplo, `:focus` aplica estilo).

Criterios de aceite:

1. O teste falha se a ordem de foco for quebrada por alteracoes no DOM.
2. Nenhum controle fica inacessivel por teclado.

### [ ] REV-22 - Teste para `prefers-reduced-motion`

Severidade: baixa

Dependencias: QA-01

Primeiros passos:

1. Criar teste que carrega `/` com `page.emulateMedia({ reducedMotion: 'reduce' })`.
2. Afirmar que o `.cursor-blink` nao tem animacao ativa (por exemplo, `animation-name === 'none'` ou computed style equivalente).

Criterios de aceite:

1. O teste falha se a regra `@media (prefers-reduced-motion:reduce)` for removida.

### [ ] REV-23 - Adicionar `aria-label` em icones soltos

Severidade: baixa

Dependencias: nenhuma

Primeiros passos:

1. Em `index.html`, adicionar `aria-label` (ou texto visivel equivalente) no botao `⬇ Baixar todos os slides (ZIP)` e em qualquer outro icone decorativo que transmita unicamente significado visual.

Criterios de aceite:

1. Leitores de tela anunciam os botoes de icone com nome util.
2. Nenhuma regressao visual em desktop ou mobile.

### [ ] REV-24 - Documentar ou normalizar a decisao de acentuacao em `TASKS.md`

Severidade: baixa

Dependencias: nenhuma

Primeiros passos:

1. Decidir entre:
   - **(a)** Normalizar `TASKS.md` para usar acentos (consistente com `README.md` e `OPS.md`).
   - **(b)** Manter sem acentos e adicionar uma nota no topo de `TASKS.md` explicando o motivo (compatibilidade de encoding).
2. Aplicar a decisao em todo o arquivo.

Criterios de aceite:

1. A escolha esta documentada.
2. Nenhuma regressao de renderizacao em GitHub, Netlify ou terminal.

## Proxima Tarefa

Iniciar por `REV-01` (SRI) ou `REV-09` (happy path do ZIP), conforme prioridade: seguranca primeiro, ou cobertura de testes primeiro. Novas necessidades devem ser adicionadas ao final deste arquivo com identificador e criterios de aceite.
