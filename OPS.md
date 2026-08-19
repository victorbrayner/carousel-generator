# Checklist Mensal de Manutencao

Este documento registra o procedimento de revisao periodica do `carousel-generator`. A ideia e que qualquer pessoa consiga executar a manutencao mensal sem depender de memoria ou contexto oral.

## Quando executar

- Uma vez por mes.
- Apos qualquer incidente reportado na URL publica.
- Antes de uma campanha ou divulgacao importante.

## Como usar

1. Abra a URL publicada no navegador.
2. Execute os itens do checklist na ordem abaixo.
3. Registre a data, o executor e os resultados na secao **Registros**.
4. Se encontrar algum problema, abra uma tarefa em `TASKS.md` com o identificador `OPS-XX` (numero sequencial) e descricao clara.
5. Nao altere o checklist sem refletir a mudanca no processo de manutencao.

## Checklist

### URL publica

- [ ] A URL publicada abre sem erro de DNS, TLS ou 404.
- [ ] A pagina carrega completamente (sem tela em branco).
- [ ] O titulo da aba exibe `Carrossel — Carreira em T.I.`.

### Apresentacao

- [ ] Os 4 slides estao visiveis na grade.
- [ ] Nenhum slide apresenta texto cortado, sobreposto ou fora dos limites.
- [ ] As fontes carregam corretamente (sem fallback visivel).
- [ ] A versao mobile (redimensionar a janela ou usar devtools) mantem o layout legivel.

### Exportacao

- [ ] Os botoes de download individuais ficam habilitados apos o carregamento das fontes.
- [ ] E possivel baixar cada um dos 4 slides como PNG.
- [ ] O botao `Baixar todos os slides (ZIP)` baixa um ZIP com 4 PNGs.
- [ ] As imagens exportadas tem dimensao 2160x2700 pixels.
- [ ] O texto editado e refletido corretamente nas imagens exportadas.

### Dependencias externas

- [ ] `html2canvas` (1.4.1) carrega sem erro no console.
- [ ] `jszip` (3.10.1) carrega sem erro no console.
- [ ] As fontes do Google Fonts (Space Grotesk, JetBrains Mono, Inter) carregam.
- [ ] Se houver bloqueio de CDN, a pagina exibe mensagem clara de indisponibilidade.

### Console e erros

- [ ] Nao ha erros JavaScript no console do navegador ao carregar a pagina.
- [ ] Nao ha erros ao executar uma exportacao individual.
- [ ] Nao ha erros ao executar a exportacao em lote.

### Testes automatizados

- [ ] `npm test` executa localmente sem falhas.
- [ ] O workflow de CI no GitHub Actions esta verde no branch principal.

### Documentacao

- [ ] `README.md` reflete a configuracao atual de deploy e testes.
- [ ] `TASKS.md` nao possui tarefas concluidas ainda pendentes de validacao.

## Registros

Use o formato abaixo para registrar cada revisao. Adicione novas entradas no topo da lista.

```markdown
### YYYY-MM-DD — Nome do executor

- Navegador: ...
- Viewport desktop: ...
- Viewport mobile: ...
- Resultado geral: OK / Problemas encontrados
- Itens com falha: ... (se houver)
- Acoes: ... (tarefa aberta em TASKS.md ou correcao aplicada)
```

### 2026-08-19 — configuracao inicial

- Navegador: Chromium (Playwright)
- Viewport desktop: 1440x1000
- Viewport mobile: iPhone 13 (390x844)
- Resultado geral: OK
- Itens com falha: nenhum
- Acoes: checklist criado; todos os testes automatizados passaram.
