class Tabela {
  #table;

  constructor(document) {
    this.#table = document.querySelector('table tboby');
  }

  #criarLinha(imc) {
    let linha = document.createElement('tr');

    let colunaId = document.createElement('th');
    let colunaData = document.createElement('td');
    let colunaNome = document.createElement('td');
    let colunaAltura = document.createElement('td');
    let colunaPeso = document.createElement('td');
    let colunaImc = document.createElement('td');
    let colunaClassificacao = document.createElement('td');
    let colunaAcao = document.createElement('td');

    colunaId.innerText = imc.getId();
    colunaId.setAttribute('scope', 'row');

    colunaData.innerText = formatDate(registro.data);

    colunaNome.innerText = imc.getNome();
    colunaAltura.innerText = imc.getAltura();
    colunaPeso.innerText = imc.getPeso();
    colunaImc.innerText = imc.getIndice();

    colunaClassificacao.innerText = imc.getClassificacao();

    colunaClassificacao.classList.add(
      this.#destacarClassificacao(classificacao)
    );

    colunaAcao.innerHTML = `<a href="excluir/${registro.id}" data-id="${registro.id}"><i class="fa-regular fa-trash-can"></i></a><a href="editar/${registro.id}" data-id="${registro.id}"><i class="fa-regular fa-pen-to-square"></i></a>`;

    linha.appendChild(colunaId);
    linha.appendChild(colunaData);
    linha.appendChild(colunaNome);
    linha.appendChild(colunaAltura);
    linha.appendChild(colunaPeso);
    linha.appendChild(colunaImc);
    linha.appendChild(colunaClassificacao);
    linha.appendChild(colunaAcao);

    this.#table.prepend(linha);
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
}

export { Tabela };
