import { Command } from './Command.js';

export class MemoryCommand extends Command {
  constructor(calc, op, operand) {
    super();
    this.calc = calc;
    this.op = op;
    this.operand = operand;
  }

  execute() {
    this.calc[this.op](parseFloat(this.operand));
  }
}
