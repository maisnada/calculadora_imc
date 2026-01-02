import { Imc } from './imc.js';
import { ImcRepository } from './imcRepository.js';

class Formulario {
  #form;
  #btnSubmit;
  #campos;

  constructor(document) {
    this.#form = document.querySelector('form');
    this.#btnSubmit = this.#form.querySelector('button');

    this.#adicionarListenerClick();
  }
  #adicionarListenerClick() {
    this.#btnSubmit.addEventListener('click', this.#hadleClick.bind(this));
  }
  #hadleClick(event) {
    event.preventDefault();

    if (this.#isCamposValidos()) {
      this.#getValorCampos();

      let imc = new Imc(
        this.#campos.nome,
        this.#campos.peso,
        this.#campos.altura
      );

      ImcRepository.save(imc);
    } else {
      console.log('nao');
    }

    /*if (isCamposValidos(form)) {
      let campos = getCamposForm(form);

      let imc = calculaImc(campos.peso, campos.altura);
      let classificacao = classificarImc(imc);

      let registro = {
        id: form.id.value ? form.id.value : getCount(),
        data: new Date(),
        nome: capitalize(campos.nome),
        altura: campos.altura,
        peso: campos.peso,
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
    }*/
  }
  #isCamposValidos() {
    this.#getValorCampos();

    if (this.#campos.nome) {
      if (this.#campos.altura && !isNaN(this.#campos.altura)) {
        if (this.#campos.peso && !isNaN(this.#campos.peso)) {
          return true;
        }
      }
    }

    return false;
  }

  #getValorCampos() {
    let nome = this.#form.nome.value;
    let altura = parseFloat(this.#form.altura.value.replace(',', '.')).toFixed(
      2
    );
    let peso = parseFloat(this.#form.peso.value.replace(',', '.')).toFixed(2);

    this.#campos = { nome, altura, peso };
  }
}

export { Formulario };
