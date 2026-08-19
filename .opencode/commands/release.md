---
description: Confirma versao, testes e estado do repositorio antes do push. Nao publica sozinho.
---

Voce esta executando o comando `/release` no projeto `carousel-generator`.

## Tarefas

1. Verifique a versao/estado atual:
   - `git status`
   - `git log --oneline -10`
   - Diferenca em relacao ao branch remoto, se houver (`git branch -vv`)
2. Confirme que `TASKS.md` esta atualizado e que a tarefa em andamento foi validada.
3. Execute `npm test` e reporte o resultado.
4. Liste o que sera publicado (arquivos alterados).

## Restricoes absolutas

- Nao execute `git commit`, `git push`, `git reset`, `git rebase` ou qualquer mutacao no repositorio.
- Nao faca deploy no Netlify nem altere configuracao de publicacao.
- Nao publique sem uma acao explicita do responsavel pelo projeto.

## Ao final

- Se tudo estiver ok, diga explicitamente que esta pronto para push e pergunte ao usuario se deseja prosseguir.
- Se houver testes falhos, mudancas nao commitadas ou `TASKS.md` desatualizado, bloqueie o release e explique o que precisa ser corrigido.
