import {
  SetCommand,
  FuncCommand,
  BinaryCommand,
  MemoryCommand,
  PercentCommand,
} from '../Command';

export class EventHandler {
  constructor(app) {
    this.app = app;
    this.calc = app.calc;
  }

  // Event handler object
  createEventHandlers() {
    return {
      number: (btn) => this.handleNumberInput(btn),
      operator: (btn) => this.handleOperator(btn),
      equals: () => this.handleEquals(),
      func: (btn) => this.handleFunction(btn),
      memory: (btn) => this.handleMemory(btn),
      undo: () => this.handleUndo(),
      clear: () => this.handleClear(),
      radDegSwitch: () => this.handleRadDegSwitch(),
    };
  }

  // Main event delegation handler
  handleButtonClick(event) {
    const btn = event.target.closest('button');
    const handler = this.getHandlerForButton(btn);

    if (handler) {
      handler(btn);
    }
  }

  getHandlerForButton(btn) {
    if (!btn) return null;

    if (btn.classList.contains('number')) return this.eventHandlers.number;
    if (btn.classList.contains('operator')) return this.eventHandlers.operator;
    if (btn.id === 'btn-equals') return this.eventHandlers.equals;
    if (btn.classList.contains('func')) return this.eventHandlers.func;
    if (btn.classList.contains('memory')) return this.eventHandlers.memory;
    if (btn.id === 'btn-undo') return this.eventHandlers.undo;
    if (btn.id === 'btn-clear') return this.eventHandlers.clear;
    if (btn.id === 'radDegSwitch') return this.eventHandlers.radDegSwitch;

    return null;
  }

  // Input handling methods
  handleNumberInput(btn) {
    this.app.saveSnapshot();
    this.app.currentInput = this.processNumberInput(btn.textContent);
    const cmd = new SetCommand(this.calc, this.app.currentInput);
    this.app.run(cmd);
  }

  processNumberInput(input) {
    if (input === '.') {
      if (this.app.currentInput.includes('.')) return this.app.currentInput;
      return this.app.currentInput ? this.app.currentInput + '.' : '0.';
    }

    return this.app.currentInput === '0'
      ? input
      : this.app.currentInput + input;
  }

  handleOperator(btn) {
    this.app.saveSnapshot();
    const op = btn.dataset.type;

    if (this.calc.pendingCmd && this.calc.rightOperand) {
      if (!this.app.run(this.calc.pendingCmd)) return;
    }

    this.calc.pendingCmd = new BinaryCommand(this.calc, op);
    this.calc.operator = op;
    this.app.currentInput = '';
    this.app.render();
  }

  handleEquals() {
    if (!this.calc.pendingCmd || !this.calc.rightOperand) return;
    this.app.saveSnapshot();
    if (!this.app.run(this.calc.pendingCmd)) return;
    this.app.currentInput = this.calc.leftOperand.toString();
  }

  handleFunction(btn) {
    this.app.saveSnapshot();
    const fn = btn.dataset.type;
    const cmd = this.createFunctionCommand(fn);

    if (!this.app.run(cmd)) return;
    this.app.currentInput = '';
  }

  createFunctionCommand(fn) {
    return fn === 'percent'
      ? new PercentCommand(this.calc)
      : new FuncCommand(this.calc, fn);
  }

  handleMemory(btn) {
    const m = btn.dataset.type;
    const memoryOperation = this.getMemoryOperation(m);
    const operand = this.getMemoryOperand(m);

    if (!this.app.run(new MemoryCommand(this.calc, memoryOperation, operand)))
      return;

    if (m === 'mr') {
      this.app.currentInput = this.calc.leftOperand;
    }
  }

  getMemoryOperation(memoryType) {
    const memoryMap = {
      mc: 'memoryClear',
      mr: 'memoryRecall',
      'm+': 'memoryAdd',
      'm-': 'memorySubtract',
    };
    return memoryMap[memoryType];
  }

  getMemoryOperand(memoryType) {
    if (memoryType !== 'm+' && memoryType !== 'm-') return null;

    if (this.app.currentInput) {
      const operand = parseFloat(this.app.currentInput);
      this.app.currentInput = '';
      return operand;
    }

    return this.calc.rightOperand
      ? parseFloat(this.calc.rightOperand)
      : parseFloat(this.calc.leftOperand);
  }

  handleUndo() {
    this.app.undo();
  }

  handleClear() {
    this.app.clearAll();
  }

  handleRadDegSwitch() {
    const radDegSwitch = document.getElementById('radDegSwitch');
    const isCurrentlyRad = radDegSwitch.textContent === 'Rad';

    radDegSwitch.textContent = isCurrentlyRad ? 'Deg' : 'Rad';
    this.calc.isDegrees = !this.calc.isDegrees;
  }

  handleModeSwitch() {
    document.body.classList.toggle('darkstyle');
  }

  // Initialize event handlers
  initialize() {
    this.eventHandlers = this.createEventHandlers();
  }
}
