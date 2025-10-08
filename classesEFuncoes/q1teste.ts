import { quadradoComFor, quadradoComForEach } from "./src/q1";

// 1.1 Teste com o array [3,5,7,3,8,9,1]
const arrayTest: number[] = [3, 5, 7, 3, 8, 9, 1];
const expectedResult: number[] = [9, 25, 49, 9, 64, 81, 1];

test("Quadrado dos numeros [3, 5, 7, 3, 8, 9, 1] com for simples", () => {
    expect(quadradoComFor(arrayTest)).toEqual(expectedResult);
});

test("Quadrado dos numeros [3, 5, 7, 3, 8, 9, 1] com forEach", () => {
    expect(quadradoComForEach(arrayTest)).toEqual(expectedResult);
});