export class Formulario {
  #form;
  #btnSubmit;
  #cbSalvar;

  constructor(document, cbSalvar) {
    this.#form = document.querySelector('form');

    this.#btnSubmit = this.#form.querySelector('button');

    this.#cbSalvar = cbSalvar;

    this.#adicionarListenerClick();

    this.#limparCampos();
  }

  #adicionarListenerClick() {
    this.#form.nome.addEventListener(
      'input',
      this.#hadleInputSomementeTexto.bind(this)
    );

    this.#form.altura.addEventListener(
      'input',
      this.#hadleInputSomenteNumeros.bind(this)
    );

    this.#form.peso.addEventListener(
      'input',
      this.#hadleInputSomenteNumeros.bind(this)
    );

    this.#btnSubmit.addEventListener('click', this.#hadleClick.bind(this));
  }

  #hadleClick(event) {
    event.preventDefault();

    if (this.#isCamposValidos()) {
      let campos = this.#getValorCampos();
      this.#limparCampos();
      this.#cbSalvar(campos);
    } else {
      console.log('nao');
    }
  }
  #hadleInputSomenteNumeros(event) {
    event.target.value = event.target.value.replace(/[^0-9.,]/g, '');
  }

  #hadleInputSomementeTexto(event) {
    event.target.value = event.target.value.replace(/[^A-zÀ-ȕ ]+$/gu, '');
  }

  #isCamposValidos() {
    let campos = this.#getValorCampos();

    if (campos.nome) {
      if (campos.altura && !isNaN(campos.altura)) {
        if (campos.peso && !isNaN(campos.peso)) {
          return true;
        } else {
          this.#alertaCampoObrigatorio('peso');
        }
      } else {
        this.#alertaCampoObrigatorio('altura');
      }
    } else {
      this.#alertaCampoObrigatorio('nome');
    }
  }

  #alertaCampoObrigatorio(campo) {
    let element = this.#form.querySelector(`#erro_${campo}`);

    element.classList.toggle('ocultar');

    setTimeout(() => {
      element.classList.toggle('ocultar');
    }, 3000);
  }

  #getValorCampos() {
    let id = parseInt(this.#form.id.value);
    let nome = this.#formatarNome(this.#form.nome.value);
    let altura = parseFloat(this.#form.altura.value.replace(',', '.'));
    let peso = parseFloat(this.#form.peso.value.replace(',', '.'));

    return { id, nome, altura, peso };
  }

  #formatarNome(nome) {
    return `${nome.charAt(0).toUpperCase()}${nome
      .substring(1, nome.length)
      .toLowerCase()}`;
  }

  #limparCampos() {
    this.#form.id.value = '';
    this.#form.nome.value = '';
    this.#form.altura.value = '';
    this.#form.peso.value = '';

    this.#form.nome.focus();
  }

  preencherCampos(imc) {
    this.#form.id.value = imc.id;

    this.#form.nome.value = imc.nome;

    this.#form.altura.value = imc.altura.toString().replace('.', ',');

    this.#form.peso.value = imc.peso.toString().replace('.', ',');
  }
}
