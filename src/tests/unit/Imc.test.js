import { Imc } from '../../assets/js/modules/imc.js';

describe('Classe Imc', () => {
  test('Deve criar um objeto da classe Imc', () => {
    const imc = new Imc(1, 'João', 70, 1.75);
    expect(imc.id).toBe(1);
    expect(imc.nome).toBe('João');
    expect(imc.peso).toBe(70);
    expect(imc.altura).toBe(1.75);
    expect(imc.indice).toBeCloseTo(22.86, 1);
    expect(imc.classificacao).toBe('Peso Normal');
  });

  test('Deve classificar como Sobrepeso para IMC entre 25 e 29.9', () => {
    const imc = new Imc(2, 'Maria', 80, 1.7);
    expect(imc.indice).toBeGreaterThanOrEqual(25);
    expect(imc.indice).toBeLessThanOrEqual(29.9);
    expect(imc.classificacao).toBe('Sobrepeso');
  });
});
