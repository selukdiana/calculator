import { Command } from './Command.js';

export class SetCommand extends Command {
  constructor(calc, operand) {
    super();
    this.calc = calc;
    this.operand = operand;
  }

  execute() {
    this.calc.set(this.operand);
  }
}
