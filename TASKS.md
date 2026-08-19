# Backlog de Manutencao

Este arquivo e a fonte de verdade das tarefas do projeto. Trabalharemos em uma tarefa por vez, na ordem indicada, salvo uma necessidade diferente.

## Como usar

1. Escolha uma tarefa pelo identificador, por exemplo: `Vamos fazer INFRA-01`.
2. A tarefa so e marcada como concluida apos a implementacao e a validacao descrita em seus criterios de aceite.
3. Itens bloqueados permanecem pendentes ate que a dependencia esteja pronta.
4. Novas necessidades devem ser adicionadas ao final, com identificador e criterio de aceite.

## Estado atual

- Publicacao: Netlify conectado ao repositorio no GitHub, com deploy automatico a cada push.
- Repositorio Git: inicializado e conectado ao remoto `origin` no GitHub.
- Aplicacao: uma pagina HTML estatica com quatro slides editaveis e exportacao PNG.

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

### [ ] AGENT-04 - Criar comandos de revisao e publicacao

Dependencias: AGENT-01, CI-01

Primeiros passos:

1. Criar o comando `/review` para revisar alteracoes e executar verificacoes disponiveis.
2. Criar o comando `/release` para confirmar versao, testes e estado do repositorio antes do push.
3. Manter a publicacao no Netlify disparada pelo GitHub, sem deploy autonomo do agente.

Criterios de aceite:

1. Os comandos nao ignoram testes falhos.
2. Nenhum comando publica sem uma acao explicita do responsavel pelo projeto.

## Manutencao Periodica

### [ ] OPS-01 - Criar checklist mensal

Dependencias: APP-05, QA-02

Primeiros passos:

1. Criar um checklist para testar URL publicada, exportacao, fontes e dependencias.
2. Registrar a data e os resultados de cada revisao.
3. Abrir uma tarefa neste backlog quando houver correcao necessaria.

Criterios de aceite:

1. A manutencao mensal pode ser executada sem depender de memoria ou contexto oral.
2. Problemas identificados possuem rastreabilidade no backlog.

## Proxima Tarefa

`AGENT-04 - Criar comandos de revisao e publicacao`

Depois de concluir AGENT-04, atualize o estado dela para `[x]` e prossiga para `OPS-01`.
