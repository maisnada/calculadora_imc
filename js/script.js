function calculaImc(peso, altura) {
  return (peso / Math.pow(altura, 2)).toFixed(2);
}

function classificarImc(imc) {
  let classificacao = "Obesidade Grau III (Mórbida)";

  if (imc < 18.5) {
    classificacao = "Abaixo do peso";
  }

  if (imc >= 18.5 && imc <= 24.9) {
    classificacao = "Peso Normal";
  }

  if (imc >= 25 && imc <= 29.9) {
    classificacao = "Sobrepeso";
  }

  if (imc >= 30 && imc <= 34.9) {
    classificacao = "Obesidade Grau I";
  }

  if (imc >= 35 && imc <= 39.9) {
    classificacao = "Obesidade Grau II";
  }

  return classificacao;
}

function destaque(classificacao) {
  let arr = [];

  arr["Abaixo do peso"] = "text-danger";
  arr["Peso Normal"] = "text-success";
  arr["Sobrepeso"] = "text-success";
  arr["Obesidade Grau I"] = "text-warning";
  arr["Obesidade Grau II"] = "text-danger";
  arr["Obesidade Grau III (Mórbida)"] = "text-danger";

  return arr[classificacao];
}

function formatDate(date) {
  let dateFormat = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(date);

  let timeFormat = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "medium",
  }).format(date);

  return `${dateFormat} - ${timeFormat}`;
}

function criarLinhaTabela(registro) {
  let linha = document.createElement("tr");

  let colunaId = document.createElement("th");
  let colunaData = document.createElement("td");
  let colunaNome = document.createElement("td");
  let colunaAltura = document.createElement("td");
  let colunaPeso = document.createElement("td");
  let colunaImc = document.createElement("td");
  let colunaClassificacao = document.createElement("td");
  let colunaAcao = document.createElement("td");

  colunaId.innerText = registro.id;
  colunaId.setAttribute("scope", "row");

  colunaData.innerText = formatDate(registro.data);

  colunaNome.innerText = registro.nome;
  colunaAltura.innerText = registro.altura;
  colunaPeso.innerText = registro.peso;
  colunaImc.innerText = registro.imc;

  let classificacao = classificarImc(registro.imc);

  colunaClassificacao.innerText = classificacao;

  colunaClassificacao.classList.add(destaque(classificacao));

  colunaAcao.innerHTML = `<a href="excluir/${registro.id}" data-id="${registro.id}"><i class="fa-regular fa-trash-can"></i></a><a href="editar/${registro.id}" data-id="${registro.id}"><i class="fa-regular fa-pen-to-square"></i></a>`;

  linha.appendChild(colunaId);
  linha.appendChild(colunaData);
  linha.appendChild(colunaNome);
  linha.appendChild(colunaAltura);
  linha.appendChild(colunaPeso);
  linha.appendChild(colunaImc);
  linha.appendChild(colunaClassificacao);
  linha.appendChild(colunaAcao);

  tabela.prepend(linha);

  linha.addEventListener("click", (event) => {
    event.preventDefault();

    if (event.target.parentElement.href) {
      let href = event.target.parentElement.href;

      let id = event.target.parentElement.dataset.id;

      if (href.includes("excluir")) {
        excluir(id);
      } else {
        editar(id);
      }
    }
  });
}

function store(dados) {
  localStorage.setItem("dados", JSON.stringify(dados));
}

function getDados() {
  return JSON.parse(localStorage.getItem("dados"));
}

function getRegistro(id) {
  let dados = getDados();

  for (let i = 0; i < dados.length; i++) {
    if (dados[i].id === parseInt(id)) {
      return dados[i];
    }
  }

  return null;
}

function editar(id) {
  let registro = getRegistro(id);

  form.id.value = registro.id;

  form.nome.value = registro.nome;
  form.altura.value = registro.altura.toString().replace(".", ",");
  form.peso.value = registro.peso.toString().replace(".", ",");
}

function excluir(id) {
  let dados = getDados();

  let dadosAtualizados = dados.filter((registro) => registro.id != id);

  store(dadosAtualizados);

  carregarDados();
}

function getCount() {
  let dados = getDados();

  if (dados && dados.length) {
    let ids = dados.map((r) => r.id);

    return Math.max(...ids) + 1;
  }

  return 1;
}

function salvar(registro) {
  let dados = getDados();

  if (dados) {
    dados.push(registro);

    store(dados);

    return;
  }

  store(new Array(registro));
}

function atualizar(registroAtualizado) {
  let dados = getDados();

  dados.forEach((registro) => {
    if (registro.id == registroAtualizado.id) {
      registro.data = registroAtualizado.data;
      registro.nome = registroAtualizado.nome;
      registro.altura = registroAtualizado.altura;
      registro.peso = registroAtualizado.peso;
      registro.imc = registroAtualizado.imc;
      registro.classificacao = registroAtualizado.classificacao;
    }
  });

  store(dados);
}

function resetForm() {
  form.id.value = "";
  form.nome.value = "";
  form.altura.value = "";
  form.peso.value = "";

  form.nome.focus();
}

function limparTabela() {
  let arr = Array.from(tabela.children);

  arr.forEach((linha) => linha.remove());
}

function semRegistros() {
  let linha = document.createElement("tr");

  let colunaData = document.createElement("td");

  colunaData.innerText = "Sem registros";

  colunaData.setAttribute("colspan", 8);

  colunaData.classList.add("text-center");

  linha.appendChild(colunaData);

  tabela.appendChild(linha);
}

function carregarDados() {
  limparTabela();

  let dados = getDados();

  if (dados && dados.length) {
    dados.forEach((d) => {
      d.data = new Date(d.data);

      criarLinhaTabela(d);
    });
  } else {
    semRegistros();
  }
}

function capitalize(nome) {
  return `${nome.charAt(0).toUpperCase()}${nome
    .substring(1, nome.length)
    .toLowerCase()}`;
}

function campoObrigatorio(campo) {
  campo.classList.toggle("ocultar");

  setTimeout(() => {
    campo.classList.toggle("ocultar");
  }, 3000);
}

function handleForm(event) {
  event.preventDefault();

  let nome = form.nome.value;
  let altura = parseFloat(form.altura.value.replace(",", ".")).toFixed(2);
  let peso = parseFloat(form.peso.value.replace(",", ".")).toFixed(2);

  if (!nome) {
    let erroNome = document.querySelector("#erroNome");

    campoObrigatorio(erroNome);

    return;
  }

  if (!altura || isNaN(altura)) {
    let erroAltura = document.querySelector("#erroAltura");

    campoObrigatorio(erroAltura);
  }

  if (!peso || isNaN(peso)) {
    let erroPeso = document.querySelector("#erroPeso");

    campoObrigatorio(erroPeso);

    return;
  }

  return;

  let imc = calculaImc(peso, altura);
  let classificacao = classificarImc(imc);

  let registro = {
    id: form.id.value ? form.id.value : getCount(),
    data: new Date(),
    nome: capitalize(nome),
    altura: altura,
    peso: peso,
    imc: imc,
    classificacao: classificacao,
  };

  if (form.id.value) {
    atualizar(registro);
  } else {
    salvar(registro);
  }

  carregarDados();

  resetForm();
}

let form = document.querySelector("form");

form.nome.focus();

let btn = form.querySelector("button");

let tabela = document.querySelector("table tbody");

btn.addEventListener("click", handleForm);

carregarDados();
