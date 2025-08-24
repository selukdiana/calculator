import { Command } from './Command.js';

export class BinaryCommand extends Command {
  constructor(calc, op) {
    super();
    this.calc = calc;
    this.op = op;
  }

  execute() {
    const res = this.calc[this.op]();
    if (res === Infinity || res === -Infinity) throw new Error('Overflow');
    this.calc.leftOperand = res;
    this.calc.operator = null;
    this.calc.rightOperand = null;
    this.calc.pendingCmd = null;
  }
}
