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

  colunaAcao.innerHTML = `<a href="excluir/${registro.id}" data-id="${registro.id}" class="">Excluir</a> | <a href="editar/${registro.id}" data-id="${registro.id}">Editar</a>`;

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

    if (event.target.href) {
      console.log(event.target.href);

      console.log(event.target.dataset.id);

      if (event.target.href.includes("excluir")) {
        console.log("excluir");

        return;
      }

      console.log("editar");
      editar(event.target.dataset.id);
    } else {
      console.log(event.target);
    }
  });
}

function getDados() {
  return JSON.parse(localStorage.getItem("dados"));
}

function editar(id) {
  let dados = getDados();

  let registro = dados[id - 1];

  console.log(registro);

  form.id.value = registro.id;

  form.nome.value = registro.nome;
  form.altura.value = registro.altura.toString().replace(".", ",");
  form.peso.value = registro.peso.toString().replace(".", ",");
}

function getCount() {
  let dados = getDados();
  if (dados) {
    return ++dados.length;
  }

  return 1;
}

function salvar(registro) {
  let dados = getDados();

  if (dados) {
    dados.push(registro);

    localStorage.setItem("dados", JSON.stringify(dados));

    return;
  }

  localStorage.setItem("dados", JSON.stringify(new Array(registro)));
}

function atualizar(registro) {
  let dados = getDados();

  if (dados) {
    let index = registro.id - 1;

    dados[index].data = registro.data;
    dados[index].nome = registro.nome;
    dados[index].altura = registro.altura;
    dados[index].peso = registro.peso;
    dados[index].imc = registro.imc;
    dados[index].classificacao = registro.classificacao;

    localStorage.setItem("dados", JSON.stringify(dados));
  }

  let arr = Array.from(tabela.children);

  arr.forEach((linha) => linha.remove());

  carregarDados();
}

function resetForm() {
  form.id.value = "";
  form.nome.value = "";
  form.altura.value = "";
  form.peso.value = "";

  form.nome.focus();
}

function carregarDados() {
  let dados = getDados();

  if (dados) {
    dados.forEach((d) => {
      d.data = new Date(d.data);

      criarLinhaTabela(d);
    });
  }
}

function handleForm(event) {
  event.preventDefault();

  let nome = form.nome.value;
  let altura = parseFloat(form.altura.value.replace(",", "."));
  let peso = parseFloat(form.peso.value.replace(",", "."));

  let imc = calculaImc(peso, altura);
  let classificacao = classificarImc(imc);

  let registro = {
    id: form.id.value ? form.id.value : getCount(),
    data: new Date(),
    nome: nome,
    altura: altura,
    peso: peso,
    imc: imc,
    classificacao: classificacao,
  };

  if (form.id.value) {
    console.log("editar!!");

    atualizar(registro);
  } else {
    criarLinhaTabela(registro);

    salvar(registro);
  }

  resetForm();
}

let form = document.querySelector("form");

form.nome.focus();

let btn = form.querySelector("button");

let tabela = document.querySelector("table tbody");

btn.addEventListener("click", handleForm);

carregarDados();
