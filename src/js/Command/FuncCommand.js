import { Command } from './Command.js';

export class FuncCommand extends Command {
  constructor(calc, funcName) {
    super();
    this.calc = calc;
    this.fn = funcName;
  }

  execute() {
    if (this.calc.rightOperand !== null) {
      const res = this.calc[this.fn](parseFloat(this.calc.rightOperand));
      if (res === Infinity || res === -Infinity) throw new Error('Overflow');
      this.calc.rightOperand = res;
    } else if (this.calc.leftOperand !== null) {
      const res = this.calc[this.fn](parseFloat(this.calc.leftOperand));
      if (res === Infinity || res === -Infinity) throw new Error('Overflow');
      this.calc.leftOperand = res;
    }
  }
}
