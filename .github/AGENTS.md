# Instruções para agentes de AI (Copilot)

Resumo rápido

- Projeto: SPA vanilla JS para cálculo de IMC (sem frameworks).
- Entry: `src/assets/js/main.js` ? instancia `CalculadoraImc`.
- Build: `npm run dev` (webpack --watch para desenvolvimento), `npm run build` (produção).

Arquitetura — visão rápida (o “porquê”)

- Código modular em `src/assets/js/modules/`. Cada arquivo exporta uma classe nomeada (ex.: `CalculadoraImc`, `Dao`, `Tabela`, `Formulario`, `Imc`).
- `CalculadoraImc` orquestra: cria `Formulario`, `Tabela` e chama `Dao` para persistência.
- Persistência: `Dao` serializa objetos via `toJSON()` e grava em `localStorage` sob a chave `dados`. Para testes locais, use `localStorage.removeItem('dados')`.
- Pipeline: `webpack` gera `dist/assets/js/main.bundle.js` e copia `dist/` ? `docs/` (usado para GitHub Pages). O plugin `ReplaceInFileWebpackPlugin` remove o `<script type="module">` do HTML final.

Padrões e convenções importantes

- Estilo de código: classes com campos privados (`#campo`), getters públicos e métodos privados (`#metodo`). Preservar esse estilo facilita coerência com Babel/targets.
- Export/Import: sempre `export class Nome {}` e `import { Nome } from './modules/nome.js'`.
- DOM / seletores: `Formulario` e `Tabela` dependem de nomes/structure específicos:
  - Formulário espera inputs com `name`/`id`: `nome`, `altura`, `peso`, `id` (hidden).
  - Tabela seleciona `table tbody` e as ações usam âncoras com `href` contendo `excluir/{id}` ou `editar/{id}` e `data-id` (o handler extrai `data-id` do parentElement).
  - Mantenha essas convenções ao modificar markup ou handlers.
- Validação & formatação: `Formulario` normaliza `altura`/`peso` trocando `,` por `.` antes do parseFloat; preserve isso quando consumir valores.
- IDs: `Dao.getNextId()` usa `Math.max(...ids)+1` — alterar isso impacta registros existentes.

Ferramentas, comandos e workflows

- Instalar dependências: `npm install`
- Desenvolvimento (watch): `npm run dev` — re-bundle automático (não há dev server integrado).
- Build produção: `npm run build` — atualiza `dist/` e copia para `docs/`.
- Preview local: abrir `dist/index.html` ou `docs/index.html` no navegador; ou usar um servidor estático simples (`npx serve dist` ou `npx http-server dist`).
- Lint: regras em `eslint.config.mjs` (ex.: `no-console: 'error'`, `semi`, `indent: 2`). Execute `npx eslint src/` e, se quiser aplicar correções, `npx eslint src/ --fix`.
- Publicação (GitHub Pages): o conteúdo final está em `docs/` — garantir que GitHub Pages esteja configurado para publicar a pasta `docs/` (padrão do projeto).

PR checklist & sugestões práticas

- Rode `npm run build` e valide `docs/index.html`/`dist/index.html` antes de abrir PR. ?
- Execute `npx eslint src/` e corrija violações; evite deixar `console.log` no código. ?
- Valide manualmente fluxo crítico: inserir registro, editar, excluir e confirmar persistência em `localStorage` (limpe `dados` entre testes). ?
- Ao modificar `Dao`, `Imc` ou `toJSON()`, considere migração de dados no `localStorage` ou documente a quebra de compatibilidade. ??

Notas de implementação e pegadinhas

- Há um `console.log('nao')` em `Formulario` usado para indicar erro de validação; remova ou converta para uma notificação adequada antes de PR.
- Regex de nomes em `Formulario` usa suporte Unicode; revisar se for necessário aceitar outros alfabetos.
- `Tabela` destaca classificações por string exata; se alterar textos de `Imc.classificacao`, atualize `Tabela.#destacarClassificacao`.

Arquivos-chave (referência rápida)

- `src/assets/js/main.js` — entry
- `src/assets/js/modules/calculadoraImc.js` — orquestração
- `src/assets/js/modules/dao.js` — persistência (`localStorage`, chave: `dados`)
- `src/assets/js/modules/formulario.js` — inputs & validação (normalização de `,` ? `.`)
- `src/assets/js/modules/tabela.js` — renderização e handlers (âncoras `excluir/{id}` e `editar/{id}`)
- `src/index.html` — estrutura de form/tabela usada por selectores
- `webpack.config.js` — build / cópia para `docs/`

Observação final

- Não há testes automatizados nem CI configurado; prefira validação manual e inclua instruções no PR quando lidar com mudanças que possam quebrar dados existentes.

Quer que eu estenda isso com um exemplo de template de PR (títulos, checks automáticos sugeridos) ou adicione um script `npm run lint` no `package.json`?
