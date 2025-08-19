// tests/Calculator.test.js

import { Calculator } from '../js/Calculator';
import { E, PI } from '../js/math';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should add numbers', () => {
    calculator.set(5);
    calculator.operator = 'add';
    calculator.set(3);
    const result = calculator.add();
    expect(result).toBe(8);
  });

  test('should subtract numbers', () => {
    calculator.set(10);
    calculator.operator = 'subtract';
    calculator.set(4);
    const result = calculator.subtract();
    expect(result).toBe(6);
  });

  test('should multiply numbers', () => {
    calculator.set(2);
    calculator.operator = 'multiply';
    calculator.set(3);
    const result = calculator.multiply();
    expect(result).toBe(6);
  });

  test('should divide numbers', () => {
    calculator.set(8);
    calculator.operator = 'divide';
    calculator.set(2);
    const result = calculator.divide();
    expect(result).toBe(4);
  });

  test('shouldnt divide numbers if 0', () => {
    calculator.set(8);
    calculator.operator = 'divide';
    calculator.set(0);
    const result = calculator.divide();
    expect(result).toBe(Infinity);
  });

  test('should correctly calculate power', () => {
    calculator.set(2);
    calculator.operator = 'power';
    calculator.set(3);
    const result = calculator.power();
    expect(result).toBe(8);
  });

  test('should calculate square', () => {
    const result = calculator.square(5);
    expect(result).toBe(25);
  });

  test('should calculate cube', () => {
    const result = calculator.cube(3);
    expect(result).toBe(27);
  });

  test('should calculate e raised to the power x', () => {
    const result = calculator.ePowerX(1); // e^1
    expect(result).toBeCloseTo(2.718, 3); // Поскольку E ≈ 2.718
  });

  test('should calculate factorial for x >= 0', () => {
    const result = calculator.factorial(5);
    expect(result).toBe(120);
  });

  test('shouldnt calculate factorial for x < 0', () => {
    expect(() => calculator.factorial(-5)).toThrowError('Ошибка ввода');
  });

  test('should calculate sine', () => {
    calculator.isDegrees = true;
    const result = calculator.sin(30); // 30 degrees
    expect(result).toBeCloseTo(0.5, 5); // Sin(30°) = 0.5
  });
  test('should calculate sine in rad', () => {
    const result = calculator.sin(3.14159); // pi 180 degrees
    expect(result).toBeCloseTo(0, 5); // Sin(180°) = 0.5
  });

  test('should calculate cosine', () => {
    calculator.isDegrees = true;
    const result = calculator.cos(60); // 60 degrees
    expect(result).toBeCloseTo(0.5, 5); // Cos(60°) = 0.5
  });

  test('should calculate cosine in rad', () => {
    const result = calculator.cos(3.14159); // pi 180 degrees
    expect(result).toBeCloseTo(-1, 5); // Sin(180°) = 0.5
  });

  test('should calculate tangent', () => {
    calculator.isDegrees = true;
    const result = calculator.tan(45); // 45 degrees
    expect(result).toBeCloseTo(1, 5); // Tan(45°) = 1
  });

  test('should calculate tangent in rad', () => {
    const result = calculator.tan(3.14159); // pi 180 degrees
    expect(result).toBeCloseTo(0, 5); // Sin(180°) = 0.5
  });

  test('should calculate hyperbolic sine', () => {
    const result = calculator.sinh(0);
    expect(result).toBe(0);
  });

  test('should calculate hyperbolic cosine', () => {
    const result = calculator.cosh(0);
    expect(result).toBe(1);
  });

  test('should calculate hyperbolic tangent', () => {
    const result = calculator.tanh(0);
    expect(result).toBe(0);
  });

  test('should calculate y root', () => {
    calculator.set(27);
    calculator.operator = 'yRoot';
    calculator.set(3);
    const result = calculator.yRoot();
    expect(result).toBe(3);
  });

  test('should calculate square root', () => {
    const result = calculator.squareRoot(9);
    expect(result).toBe(3);
  });

  test('should calculate cube root', () => {
    const result = calculator.cubeRoot(8);
    expect(result).toBe(2);
  });

  test('should calculate 10 to power x', () => {
    expect(calculator.tenPowerX(2)).toBe(100);
  });

  test('should calculate EE', () => {
    calculator.set(5);
    calculator.operator = 'EE';
    calculator.set(3);
    expect(calculator.EE()).toBe(5000);
  });

  test('should calculate reciprocal', () => {
    expect(calculator.reciprocal(4)).toBe(0.25);
  });

  test('should calculate percent', () => {
    expect(calculator.percent(50)).toBe(0.5);
  });

  test('should change sign', () => {
    expect(calculator.changeSign(-7)).toBe(7);
    expect(calculator.changeSign(7)).toBe(-7);
  });

  test('should calculate ln: (ln(e)=1)', () => {
    expect(calculator.ln(E)).toBeCloseTo(1, 10);
  });
  test('should calculate ln: ln(1)=0', () => {
    expect(calculator.ln(1)).toBeCloseTo(0, 10);
  });
  test('should calculate log10: (log10(100)=2)', () => {
    expect(calculator.log10(100)).toBeCloseTo(2, 10);
  });
  test('should return e', () => {
    expect(calculator.e(123)).toBeCloseTo(E, 10);
  });
  test('should return π', () => {
    expect(calculator.pi(0)).toBeCloseTo(PI, 10);
  });
});
