---
description: Revisa alteracoes pendentes no carrossel e executa as verificacoes disponiveis. Nao edita arquivos.
agent: carousel-reviewer
---

Voce esta executando o comando `/review` no projeto `carousel-generator`.

## Tarefas

1. Verifique o estado atual do repositorio com `git status` e `git diff`.
2. Leia `AGENTS.md`, `TASKS.md`, `README.md` e os arquivos alterados.
3. Execute `npm test` e capture o resultado completo.
4. Produza uma revisao objetiva com:
   - Resumo do que foi alterado.
   - Achados por severidade (`bloqueador`, `alto`, `medio`, `baixo`).
   - Resultado dos testes, incluindo falhas se houver.
   - Lacunas de teste identificadas.
   - Veredito (`aprovado` / `aprovado com ressalvas` / `bloqueado`).

## Restricoes

- Nao edite, crie, renomeie ou remova arquivos.
- Nao execute `git commit`, `git push`, `git reset`, `git rebase` ou qualquer mutacao no repositorio.
- Se `npm test` falhar, nao ignore — descreva o impacto e classifique a falha na severidade adequada.
- Nao faca deploy ou publicacao.
