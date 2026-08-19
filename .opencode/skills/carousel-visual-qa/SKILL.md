---
name: carousel-visual-qa
description: Use ONLY when a change may affect the carousel presentation, such as CSS, structural HTML, fonts, export rendering, or slide dimensions. Do NOT use for pure content edits, pricing changes, or technical maintenance unrelated to visual output.
---

# Skill: Garantia visual do carrossel

Esta skill garante que mudancas que possam afetar a apresentacao do `carousel-generator` sejam validadas de forma reproduzivel, comparando o estado atual com as referencias e com os invariantes do projeto.

## Quando usar

Acione esta skill quando houver alteracao em:

- **CSS** em `index.html` (cores, tipografia, espacamentos, bordas, sombras, animacoes, media queries).
- **HTML estrutural** dos slides (ordem de elementos, classes, containers, tabbar, gutter, footerbar).
- **Fontes** (familias do Google Fonts, pesos, fallbacks, carregamento).
- **Exportacao** (logica de `html2canvas`, escala, clone, dimensoes do canvas, background).
- **Dimensoes** dos slides ou do viewport (1080x1350 base, 2160x2700 exportado, responsividade).
- **Imagens, texturas ou elementos decorativos** que afetem a renderizacao visual.

## Quando NAO usar

Nao use esta skill para:

- Edicao pura de conteudo (textos, mes, preco, CTA) — use a skill `carousel-content`.
- Manutencao tecnica que nao afete a apresentacao (CI, scripts de build, configuracao de linter).
- Alteracoes em `package.json` ou `playwright.config.mjs` que nao muduem a saida visual.

## Invariantes a preservar

Antes de qualquer validacao, confirme que a mudanca respeita:

- **4 slides** no carrossel.
- Dimensao base dos slides: **1080x1350 CSS pixels**.
- Exportacao PNG em **scale 2**, gerando imagens de **2160x2700 pixels**.
- Interface do usuario em **portugues brasileiro**.
- Botoes de download individual e do ZIP funcionando.
- Comportamento `contenteditable` preservado.

## Procedimento de validacao

### 1. Leitura obrigatoria

Leia antes de comecar:

- `AGENTS.md` — invariantes e regras de validacao.
- `TASKS.md` — tarefa atual e criterios de aceite.
- `README.md` — secao de testes visuais.
- `index.html` — CSS e HTML alterados.
- `playwright.config.mjs` — viewports e projetos de teste.
- `tests/visual.spec.mjs` — cobertura de regressao visual.

### 2. Inspecao manual no navegador

Abra `index.html` em um navegador moderno e verifique:

1. **Desktop** (viewport minimo 1440px de largura):
   - Todos os 4 slides aparecem na grade sem quebrar.
   - Textos nao sobrepoem, cortam ou transbordam os limites do slide.
   - Cores e fontes carregam corretamente.
   - Botoes de download individuais e o botao de ZIP estao habilitados apos o carregamento das fontes.

2. **Mobile** (viewport iPhone 13 / 390x844 ou similar):
   - A grade se adapta a largura da tela.
   - Os slides escalam proporcionalmente sem distorcer.
   - Nenhum conteudo fica fora da area visivel ou inacessivel.

### 3. Validacao de exportacao visual

1. Aguarde o carregamento completo das fontes.
2. Exporte cada slide individualmente e confirme:
   - Dimensao final de 2160x2700 pixels.
   - Nenhuma mensagem de overflow.
   - Conteudo visual corresponde ao visto na tela.
3. Exporte o ZIP completo e confirme:
   - 4 PNGs presentes.
   - Nenhum slide faltando.
   - Mensagem de sucesso ou erro clara.

### 4. Execucao dos testes visuais

Rode os testes de regressao visual:

```bash
npx playwright test visual
```

- Se todos passarem, documente no handoff.
- Se houver falha por diferenca esperada e legitima, **nao atualize os snapshots automaticamente**. Peca aprovacao explicita do usuario antes de rodar:
  ```bash
  npx playwright test visual --update-snapshots
  ```
- Se houver falha inesperada, investigue a causa antes de qualquer acao.

### 5. Checklist de saida

Antes de finalizar, confirme:

- [ ] Desktop e mobile foram inspecionados.
- [ ] Exportacao individual gerou 2160x2700.
- [ ] Exportacao em ZIP incluiu os 4 slides.
- [ ] `npx playwright test visual` foi executado.
- [ ] Diferencas de snapshot, se houver, foram explicadas.
- [ ] Nenhum invariante do projeto foi violado.

## Registro no handoff

Inclua no handoff:

1. Navegador e viewports usados na revisao manual.
2. Resultado da exportacao individual e do ZIP.
3. Resultado de `npx playwright test visual`.
4. Links ou nomes dos arquivos de snapshot afetados, se aplicavel.
5. Decisao sobre atualizacao de referencias visuais.
