# Instruções para agentes de AI (Copilot)

Resumo rápido

- Projeto: SPA vanilla JS (sem frameworks) para cálculo de IMC.
- Entry: `src/assets/js/main.js` ? instancia `CalculadoraImc`.
- Build: `npm run dev` (webpack --watch para desenvolvimento), `npm run build` (produção).

Arquitetura — visão rápida (o "porquê")

- Código organizado em módulos ES (pasta `src/assets/js/modules`). Cada módulo expõe uma classe com `export` nomeado (ex.: `CalculadoraImc`, `Dao`, `Tabela`, `Formulario`, `Imc`).
- `CalculadoraImc` orquestra a aplicação: cria `Formulario`, `Tabela` e usa `Dao` para persistir dados.
- Persistência: `Dao` grava em `localStorage` sob a chave `dados`. Isso significa que testes locais podem precisar limpar essa chave.
- Build pipeline: `webpack` gera `dist/assets/js/main.bundle.js` e o conteúdo de `dist/` é copiado para `docs/` (usado como GitHub Pages). O plugin `ReplaceInFileWebpackPlugin` remove a tag `<script type="module">` do HTML gerado.

Padrões e convenções do projeto

- Estilo de código: classes com campos privados (p.ex. `#campo`), getters e métodos privados (prefixo `#`).
- Export/Import: sempre `export class Nome {}` e `import { Nome } from './modules/nome.js'`.
- DOM hooks: `Formulario` seleciona `form` por name/fields; `Tabela` assume que ações são âncoras com `href` contendo `excluir/{id}` ou `editar/{id}` (o click handler verifica `href` e `data-id`). Mantenha esse padrão ao alterar a UI.
- Validação/formatação: `Formulario` normaliza `altura` e `peso` trocando `,` por `.`; mantenha esse comportamento quando consumir input.
- Persistência/IDs: `Dao.getNextId()` calcula o próximo id com `Math.max(...ids)+1`; evite alterar esse comportamento sem migrar dados.

Ferramentas e comandos úteis

- Instalar dependências: `npm install`
- Desenvolvimento (watch): `npm run dev` — re-bundle automático; não há dev server embutido.
- Produção: `npm run build` — cria `dist/` e atualiza `docs/`.
- Preview: abra `dist/index.html` ou `docs/index.html` no navegador; confirme `assets/js/main.bundle.js` está carregado.
- Lint: existe `eslint` configurado em `eslint.config.mjs` (regras: `semi`, `no-console: 'error'`, `indent: 2`, etc.). Não há script `npm run lint`; execute `npx eslint src/` manualmente se necessário.

Arquivo(s)-chave para referência rápida

- `src/assets/js/main.js` — ponto de entrada
- `src/assets/js/modules/calculadoraImc.js` — orquestração
- `src/assets/js/modules/dao.js` — persistência em `localStorage` (chave: `dados`)
- `src/assets/js/modules/formulario.js` — tratamento de inputs e validação
- `src/assets/js/modules/tabela.js` — renderização e handlers de ação
- `webpack.config.js` — configuração de build / cópia para `docs/` / remoção de module script
- `src/index.html` — template HTML (contém `<script type="module" src="assets/js/main.js"></script>` que é removido no bundle)

Boas práticas específicas (faça / evite)

- Faça: recriar componentes como classes com campos privados e métodos pequenos; siga o padrão de import/export já existente.
- Faça: rodar `npm run build` e abrir `dist/` ou `docs/` para validar mudanças antes de abrir PRs.
- Evite: alterar a forma como `Dao` serializa os objetos (método `toJSON()` em `Imc`) sem migrar dados existentes.
- Atenção: eslint proíbe `console.log` por padrão; há pelo menos um `console.log('nao')` em `Formulario` — alinhe alterações de lint se desejar habilitar checagem automática.

Exemplos rápidos

- Para adicionar um novo módulo (comportamento): coloque em `src/assets/js/modules/`, `export class Nome {}`, importe em `main.js` ou `calculadoraImc.js`.
- Para limpar dados de teste no navegador: `localStorage.removeItem('dados')` no console.

Notas finais

- Não há testes automáticos nem CI configurado neste repositório — priorize validação manual ao enviar PRs.

Se algo aqui estiver incompleto ou você quer que eu detalhe um trecho (por exemplo, adicionar checks de lint/CI ou instruções para deploy GH Pages), me diga qual parte preferiria expandir.
