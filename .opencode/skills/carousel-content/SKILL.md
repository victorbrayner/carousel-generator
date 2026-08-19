---
name: carousel-content
description: Use ONLY when the user wants to change carousel content such as slide texts, month agenda, price, CTA, signature, badges, or visual identity colors. Do NOT use for technical maintenance, export logic, dependencies, CI, testing infrastructure, or layout restructuring without a content change.
---

# Skill: Alteracoes de conteudo do carrossel

Esta skill orienta a edicao de conteudo do `carousel-generator` preservando o layout, as regras de acessibilidade e o fluxo de exportacao.

## Quando usar

Acione esta skill quando o usuario pedir para alterar:

- Textos dos slides (titulos, subtitulos, bullets, passos, notas, rodapes).
- Mes da agenda (campo da toolbar ou `.tab-month` nos slides).
- Preco (`R$ 70/h` ou similar no slide 4).
- Chamada para acao / CTA (`chama no direct →` ou similar).
- Assinatura (`victor brayner` ou similar).
- Badges de tecnologia (AI, JS, PY, REACT, VUE) — adicionar, remover ou renomear.
- Identidade visual leve: cores de destaque dos slides, cores dos badges ou ajustes de contraste que acompanhem uma mudanca de conteudo.

## Quando NAO usar

Nao use esta skill para:

- Manutencao tecnica pura (refatoracao de JavaScript, ajuste de logica de exportacao, troca de bibliotecas).
- Alteracoes em `playwright.config.mjs`, CI, `package.json` ou infraestrutura de testes.
- Mudancas estruturais de layout (redimensionar slides, alterar grid, reposicionar secoes) sem que haja tambem uma mudanca de conteudo solicitada.
- Renomear, mover ou remover `index.html`.

## Procedimento

### 1. Leitura obrigatoria

Antes de editar, leia:

- `AGENTS.md` — invariantes do projeto.
- `TASKS.md` — estado atual e proxima tarefa.
- `index.html` — para localizar os campos editaveis (`[contenteditable]`, `[data-field-label]`).
- `README.md` — instrucoes de edicao e exportacao.

### 2. Identifique os campos

Os campos editaveis estao marcados com `contenteditable="true"` e `data-field-label`. Localize o campo pelo label antes de altera-lo. Exemplos de labels:

- `Mês da agenda`
- `Título da capa`
- `Subtítulo da capa`
- `Título da mentoria`
- `Mentoria · item 1` a `Mentoria · item 5`
- `Título do agendamento`
- `Agendamento · passo 1` a `Agendamento · passo 3`
- `Dica do agendamento`
- `Título das aulas`
- `Aulas · item 1` a `Aulas · item 5`
- `Preço`
- `CTA`
- `Assinatura`

### 3. Edicao de textos

- Mantenha a lingua do texto em **português brasileiro**, salvo solicitacao explicita do usuario.
- Preservar tags HTML internas quando existirem (ex: `<span class="accent">`, `<span class="price-highlight">`, `<br>`).
- Nao altere preco, nome pessoal (`victor brayner`) ou chamadas para acao sem confirmacao implicita ou explicita do usuario.
- Para o mes da agenda, use `slugify` (minusculas, sem acentos, hifens no lugar de espacos) tanto no campo da toolbar quanto nos `.tab-month`.

### 4. Verificacao de limites de texto

Apos editar, verifique se o conteudo ainda cabe no slide:

- Titulos (`h1.big-title`, `h2.section-heading`) devem permanecer em poucas palavras (idealmente 1 a 4 palavras).
- Bullets e passos devem ocupar no maximo 1 a 2 linhas cada.
- Subtitulos e notas nao devem ultrapassar a largura da area de conteudo.
- O preco deve manter formato curto (ex: `R$ 70/h`).
- O CTA deve ser breve.

Se o texto novo for significativamente maior que o original, avise o usuario sobre risco de overflow antes de prosseguir.

### 5. Validacao visual

Apos a edicao:

1. Verifique `index.html` em viewport desktop (>= 1440px) e mobile (iPhone 13 ou similar).
2. Confirme que nenhum texto transborda, corta ou sobrepoe outros elementos.
3. Confirme que o redimensionamento responsivo (`fitSlides`, `fitAsciiIn`) continua funcionando.
4. Verifique contraste e legibilidade das cores alteradas.

### 6. Validacao de exportacao

Antes de finalizar:

1. Aguarde o carregamento das fontes (botao principal habilitado).
2. Exporte pelo menos um slide individual e o ZIP completo.
3. Confirme que:
   - Nao ha mensagem de overflow.
   - Os PNGs gerados estao em 2160x2700 pixels.
   - O conteudo editado aparece corretamente na imagem.

### 7. Testes automatizados

Execute `npm test` apos a edicao. Se algum teste visual falhar por causa da alteracao legitima de conteudo, documente no handoff e atualize os screenshots de referencia apenas com aprovacao explicita do usuario (`npx playwright test visual --update-snapshots`).

## Regras de preservacao

- Preservar **4 slides**.
- Preservar dimensoes base **1080x1350** e exportacao scale **2** (2160x2700).
- Preservar comportamento `contenteditable` nos campos editaveis.
- Preservar funcionamento dos botoes de download individual e do ZIP.
- Preservar mensagens de status e deteccao de overflow.
- Preservar versões fixas das dependencias externas.

## Entrega

Apos concluir:

1. Resuma quais campos foram alterados.
2. Informe se houve risco de overflow e como foi mitigado.
3. Informe o resultado da exportacao individual e do ZIP.
4. Informe o resultado de `npm test`.
5. Atualize `TASKS.md` apenas se a tarefa atual exigir.
