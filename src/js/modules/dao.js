class Dao {
  static #dataName = 'dados';

  static #getDataBase() {
    return JSON.parse(localStorage.getItem(this.#dataName));
  }

  static #updateDataBase(db) {
    localStorage.setItem(this.#dataName, JSON.stringify(db));
  }

  static save(imc) {
    let bd = this.#getDataBase();

    if (!this.#isDataBaseEmpty()) {
      bd.push(imc);
    } else {
      bd = new Array(imc);
    }

    this.#updateDataBase(bd);
  }

  static getNextId() {
    let bd = this.#getDataBase();

    if (!this.#isDataBaseEmpty()) {
      let ids = bd.map((r) => r.id);

      return Math.max(...ids) + 1;
    }

    return 1;
  }

  static #isDataBaseEmpty() {
    let bd = this.#getDataBase();

    if (bd && bd.length > 0) {
      return false;
    }

    return true;
  }

  /*listar() {
    return this.#getStorage();
  }

  salvar(registro) {
    let bd = this.#getStorage();

    bd.push(registro);
  }*/
}

export { Dao };
