export class Dao {
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

  static list() {
    let bd = this.#getDataBase();

    if (!this.#isDataBaseEmpty()) {
      return bd;
    }
  }

  static get(id) {
    let bd = this.#getDataBase();

    for (let i = 0; i < bd.length; i++) {
      if (bd[i].id === parseInt(id)) {
        return bd[i];
      }
    }

    return null;
  }

  static #isDataBaseEmpty() {
    let bd = this.#getDataBase();

    if (bd && bd.length > 0) {
      return false;
    }

    return true;
  }

  static update(imcAtualizado) {
    let db = this.#getDataBase();

    let newDb = db.map((imc) => {
      if (imc.id === imcAtualizado.id) {
        return imcAtualizado;
      }

      return imc;
    });

    this.#updateDataBase(newDb);
  }

  static delete(id) {
    let db = this.#getDataBase();

    let newBd = db.filter((imc) => imc.id !== id);

    this.#updateDataBase(newBd);
  }
}
