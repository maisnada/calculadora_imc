import { Imc } from './imc.js';
import { Formulario } from './formulario.js';
import { Tabela } from './tabela.js';
import { Dao } from './dao.js';

export class CalculadoraImc {
  #document;
  #formulario;
  #tabela;

  constructor(document) {
    this.#document = document;

    this.#formulario = new Formulario(this.#document, (campos) =>
      this.#salvar(campos)
    );

    this.#tabela = new Tabela(
      this.#document,
      (id) => this.#get(id),
      (id) => this.#excluir(id)
    );

    this.#listarRegistros();
  }
  #salvar(campos) {
    if (campos.id) {
      let imc = new Imc(campos.id, campos.nome, campos.peso, campos.altura);

      Dao.update(imc);
    } else {
      let imc = new Imc(
        Dao.getNextId(),
        campos.nome,
        campos.peso,
        campos.altura
      );

      Dao.save(imc);
    }

    this.#tabela.atualizar(Dao.list());
  }

  #get(id) {
    this.#formulario.preencherCampos(Dao.get(id));
  }

  #excluir(id) {
    Dao.delete(id);
    this.#tabela.atualizar(Dao.list());
  }

  #listarRegistros() {
    this.#tabela.atualizar(Dao.list());
  }
}
