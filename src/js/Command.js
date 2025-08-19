// ---------------- Command ----------------
class Command {
  execute() {
    throw 'execute() must be implemented';
  }
}

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

export class BinaryCommand extends Command {
  constructor(calc, op) {
    super();
    this.calc = calc;
    this.op = op;
  }
  execute() {
    const res = this.calc[this.op]();
    if (res === Infinity || res === -Infinity) throw new Error('Переполнение');
    this.calc.leftOperand = res;
    this.calc.operator = null;
    this.calc.rightOperand = null;
    this.calc.pendingCmd = null;
  }
}

export class FuncCommand extends Command {
  constructor(calc, funcName) {
    super();
    this.calc = calc;
    this.fn = funcName;
  }
  execute() {
    if (this.calc.rightOperand !== null) {
      const res = this.calc[this.fn](parseFloat(this.calc.rightOperand));
      if (res === Infinity || res === -Infinity)
        throw new Error('Переполнение');
      this.calc.rightOperand = res;
    } else if (this.calc.leftOperand !== null) {
      const res = this.calc[this.fn](parseFloat(this.calc.leftOperand));
      if (res === Infinity || res === -Infinity)
        throw new Error('Переполнение');
      this.calc.leftOperand = res;
    }
  }
}

export class PercentCommand extends Command {
  constructor(calc) {
    super();
    this.calc = calc;
  }
  execute() {
    if (this.calc.rightOperand) {
      const op = this.calc.operator;
      switch (op) {
        case 'add': {
          this.calc.rightOperand =
            this.calc.leftOperand *
            this.calc['percent'](parseFloat(this.calc.rightOperand));
          break;
        }
        case 'substract': {
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
