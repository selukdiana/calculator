import { random, PI, E, log, sin, cos, tan, sinh, cosh, tanh } from './math';
export class Calculator {
  constructor() {
    this.memory = 0;
    this.history = [];
    this.leftOperand = '0';
    this.rightOperand = null;
    this.operator = null;
    this.pendingCmd = null;
    this.isDegrees = false;
  }

  set(x) {
    if (this.operator) {
      this.rightOperand = x;
    } else {
      this.leftOperand = x;
    }
  }
  clear() {
    this.leftOperand = 0;
    this.operator = null;
    this.rightOperand = null;
    this.pendingCmd = null;
    this.memory = 0;
    this.history.length = 0;
  }
  add() {
    return parseFloat(this.leftOperand) + parseFloat(this.rightOperand);
  }
  subtract() {
    return parseFloat(this.leftOperand) - parseFloat(this.rightOperand);
  }
  multiply() {
    return parseFloat(this.leftOperand) * parseFloat(this.rightOperand);
  }
  divide() {
    return parseFloat(this.leftOperand) / parseFloat(this.rightOperand);
  }
  power() {
    return parseFloat(this.leftOperand) ** parseFloat(this.rightOperand);
  }
  yRoot() {
    return parseFloat(this.leftOperand) ** (1 / parseFloat(this.rightOperand));
  }
  EE() {
    return this.leftOperand * 10 ** parseFloat(this.rightOperand);
  }
  square(x) {
    return x ** 2;
  }
  cube(x) {
    return x ** 3;
  }
  ePowerX(x) {
    return E ** x;
  }
  tenPowerX(x) {
    return 10 ** x;
  }
  reciprocal(x) {
    return 1 / x;
  }
  squareRoot(x) {
    return x ** (1 / 2);
  }
  cubeRoot(x) {
    return x ** (1 / 3);
  }
  ln(x) {
    return log(E, x);
  }

  log10(x) {
    return log(10, x);
  }
  factorial(x) {
    let n = parseInt(x),
      res = 1;
    if (n < 0) throw new Error('Ошибка ввода');
    for (let i = 1; i <= n; i++) res *= i;
    return res;
  }
  sin(x) {
    return sin(x, this.isDegrees);
  }
  cos(x) {
    return cos(x, this.isDegrees);
  }
  tan(x) {
    return tan(x, this.isDegrees);
  }
  sinh(x) {
    return sinh(x);
  }
  cosh(x) {
    return cosh(x);
  }
  tanh(x) {
    return tanh(x);
  }

  percent(x) {
    return x / 100;
  }
  changeSign(x) {
    return x * -1;
  }

  e() {
    return E;
  }

  pi() {
    return PI;
  }

  rand() {
    return random();
  }

  // Memory
  memoryClear() {
    this.memory = 0;
  }
  memoryAdd(x) {
    this.memory += x;
  }
  memorySubtract(x) {
    this.memory -= x;
  }
  memoryRecall() {
    this.leftOperand = this.memory;
    this.rightOperand = null;
    this.operator = null;
    this.pendingCmd = null;
  }
}
