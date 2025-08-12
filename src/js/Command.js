class Command {
  execute() {}
  undo() {}
}

export class InsertNumberCommand extends Command {
  constructor(calculator, value) {
    super();
    this.calculator = calculator;
    this.value = value;
  }

  execute() {
    this.calculator.insertNumber(this.value);
  }
  undo() {}
}

export class InsertOperatorCommand extends Command {
  constructor(calculator, value) {
    super();
    this.calculator = calculator;
    this.value = value;
  }

  execute() {
    this.calculator.insertOperator(this.value);
  }
  undo() {}
}

export class ClearAllCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.clearAll();
  }
  undo() {}
}

export class GenerateResultCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.generateResult();
  }
  undo() {}
}

export class negateNumberCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.negateNumber();
  }
  undo() {}
}

export class insertPercentCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.insertPercent();
  }
  undo() {}
}

export class insertDecimalPointCommand extends Command {
  constructor(calculator) {
    super();
    this.calculator = calculator;
  }

  execute() {
    this.calculator.insertDecimalPoint();
  }
  undo() {}
}
