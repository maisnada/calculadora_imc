export class Imc {
  #id;
  #nome;
  #data;
  #peso;
  #altura;
  #indice;
  #classificacao;

  constructor(id, nome, peso, altura) {
    this.#id = id;
    this.#nome = nome;
    this.#data = new Date();
    this.#peso = parseFloat(peso);
    this.#altura = parseFloat(altura);

    this.#calcular();
    this.#classificar();
  }

  #calcular() {
    this.#indice =
      Math.round((this.#peso / Math.pow(this.#altura, 2)) * 10) / 10;
  }

  #classificar() {
    this.#classificacao = 'Obesidade Grau III (Mórbida)';

    if (this.#indice < 18.5) {
      this.#classificacao = 'Abaixo do peso';
    }

    if (this.#indice >= 18.5 && this.#indice <= 24.9) {
      this.#classificacao = 'Peso Normal';
    }

    if (this.#indice >= 25 && this.#indice <= 29.9) {
      this.#classificacao = 'Sobrepeso';
    }

    if (this.#indice >= 30 && this.#indice <= 34.9) {
      this.#classificacao = 'Obesidade Grau I';
    }

    if (this.#indice >= 35 && this.#indice <= 39.9) {
      this.#classificacao = 'Obesidade Grau II';
    }
  }

  #percentual(valor) {
    return Math.round((valor / this.#peso) * 1000) / 10;
  }

  get id() {
    return this.#id;
  }

  get nome() {
    return this.#nome;
  }

  get data() {
    return this.#data;
  }

  get peso() {
    return this.#peso;
  }

  get altura() {
    return this.#altura;
  }

  get indice() {
    return this.#indice;
  }

  get classificacao() {
    return this.#classificacao;
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      data: this.#data,
      peso: this.#peso,
      altura: this.#altura,
      indice: this.#indice,
      classificacao: this.#classificacao,
    };
  }
}
