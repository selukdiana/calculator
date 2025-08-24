import { Command } from './Command.js';

export class PercentCommand extends Command {
  constructor(calc) {
    super();
    this.calc = calc;
  }

  execute() {
    if (this.calc.rightOperand !== null) {
      const op = this.calc.operator;
      switch (op) {
        case 'add':
        case 'subtract': {
          this.calc.rightOperand =
            this.calc.leftOperand *
            this.calc['percent'](parseFloat(this.calc.rightOperand));
          break;
        }

        case 'multiply': {
          this.calc.leftOperand =
            this.calc.leftOperand *
            this.calc['percent'](parseFloat(this.calc.rightOperand));

          this.calc.rightOperand = null;
          this.calc.operator = null;
          this.calc.pendingCmd = null;
          break;
        }
        default: {
          this.calc.rightOperand = this.calc['percent'](
            parseFloat(this.calc.rightOperand),
          );
        }
      }
    } else {
      this.calc.leftOperand = this.calc['percent'](
        parseFloat(this.calc.leftOperand),
      );
    }
  }
}
