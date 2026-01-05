export class Tabela {
  #document;
  #table;
  #cbEditar;
  #cbExcluir;

  constructor(document, cbEditar, cbExcluir) {
    this.#document = document;
    this.#table = document.querySelector('table tbody');
    this.#cbEditar = cbEditar;
    this.#cbExcluir = cbExcluir;
  }

  #criarLinha(imc) {
    let linha = this.#document.createElement('tr');

    let colunaId = this.#document.createElement('th');
    let colunaData = this.#document.createElement('td');
    let colunaNome = this.#document.createElement('td');
    let colunaAltura = this.#document.createElement('td');
    let colunaPeso = this.#document.createElement('td');
    let colunaImc = this.#document.createElement('td');
    let colunaClassificacao = this.#document.createElement('td');
    let colunaAcao = this.#document.createElement('td');

    colunaId.innerText = imc.id;
    colunaId.setAttribute('scope', 'row');

    colunaData.innerText = this.#formatarData(imc.data);

    colunaNome.innerText = imc.nome;
    colunaAltura.innerText = imc.altura;
    colunaPeso.innerText = imc.peso;
    colunaImc.innerText = imc.indice;

    colunaClassificacao.innerText = imc.classificacao;

    colunaClassificacao.classList.add(
      this.#destacarClassificacao(imc.classificacao)
    );

    colunaAcao.innerHTML = `<a href="excluir/${imc.id}" data-id="${imc.id}"><i class="fa-regular fa-trash-can"></i></a><a href="editar/${imc.id}" data-id="${imc.id}"><i class="fa-regular fa-pen-to-square"></i></a>`;

    linha.appendChild(colunaId);
    linha.appendChild(colunaData);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaAltura);
    linha.appendChild(colunaPeso);
    linha.appendChild(colunaImc);
    linha.appendChild(colunaClassificacao);
    linha.appendChild(colunaAcao);

    linha.addEventListener('click', this.#handleClick.bind(this));

    this.#table.prepend(linha);
  }

  #handleClick(event) {
    if (event.target.parentElement.href) {
      event.preventDefault();

      let href = event.target.parentElement.href;

      let id = parseInt(event.target.parentElement.dataset.id);

      if (href.includes('excluir')) {
        this.#cbExcluir(id);
      } else {
        this.#cbEditar(id);
      }
    }
  }

  #criarLinhaSemRegistro() {
    let linha = this.#document.createElement('tr');

    let coluna = this.#document.createElement('td');

    coluna.innerText = 'Sem registros';

    coluna.setAttribute('colspan', 8);

    coluna.classList.add('text-center');

    linha.appendChild(coluna);

    this.#table.appendChild(linha);
  }

  #destacarClassificacao(classificacao) {
    let listaClassificacao = new Array();

    listaClassificacao['Abaixo do peso'] = 'text-danger';
    listaClassificacao['Peso Normal'] = 'text-success';
    listaClassificacao['Sobrepeso'] = 'text-success';
    listaClassificacao['Obesidade Grau I'] = 'text-warning';
    listaClassificacao['Obesidade Grau II'] = 'text-danger';
    listaClassificacao['Obesidade Grau III (Mórbida)'] = 'text-danger';

    return listaClassificacao[classificacao];
  }

  #limpar() {
    let linhas = Array.from(this.#table.children);

    linhas.forEach((linha) => linha.remove());
  }

  atualizar(listaImc) {
    this.#limpar();

    if (listaImc && listaImc.length) {
      listaImc.forEach((imc) => {
        this.#criarLinha(imc);
      });
    } else {
      this.#criarLinhaSemRegistro();
    }
  }

  #formatarData(dateString) {
    let date = new Date(dateString);

    let dateFormat = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    }).format(date);

    let timeFormat = new Intl.DateTimeFormat('pt-BR', {
      timeStyle: 'medium',
    }).format(date);

    return `${dateFormat} - ${timeFormat}`;
  }
}
