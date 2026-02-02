import { Imc } from "../../assets/js/modules/imc.js";

describe("Classe Imc", () => {
  test("Deve criar um objeto da classe Imc", () => {
    const imc = new Imc(1, "João", 70, 1.75);
    expect(imc.id).toBe(1);
    expect(imc.nome).toBe("João");
    expect(imc.peso).toBe(70);
    expect(imc.altura).toBe(1.75);
    expect(imc.indice).toBeCloseTo(22.86, 1);
    expect(imc.classificacao).toBe("Peso Normal");
  });

  test("Deve classificar como Sobrepeso para IMC entre 25 e 29.9", () => {
    const imc = new Imc(2, "Maria", 80, 1.7);
    expect(imc.indice).toBeGreaterThanOrEqual(25);
    expect(imc.indice).toBeLessThanOrEqual(29.9);
    expect(imc.classificacao).toBe("Sobrepeso");
  });

  test("Deve classificar como Obesidade Grau I para IMC entre 30 e 34.9", () => {
    const imc = new Imc(3, "Carlos", 90, 1.7);
    expect(imc.indice).toBeGreaterThanOrEqual(30);
    expect(imc.indice).toBeLessThanOrEqual(34.9);
    expect(imc.classificacao).toBe("Obesidade Grau I");
  });

  test("Deve classificar como Obesidade Grau II para IMC entre 35 e 39.9", () => {
    // Ex.: altura 1.70m, peso 105kg -> IMC ? 36.33 (Obesidade Grau II)
    const imc = new Imc(4, "Ana", 105, 1.7);
    expect(imc.indice).toBeGreaterThanOrEqual(35);
    expect(imc.indice).toBeLessThanOrEqual(39.9);
    expect(imc.classificacao).toBe("Obesidade Grau II");
  });
});
