import { Dao } from './dao.js';

class ImcRepository {
  static save(imc) {
    imc.setId(Dao.getNextId());

    Dao.save(imc);
  }

  update(imc) {}

  get(id) {}

  list() {}

  delete(id) {}
}

export { ImcRepository };
