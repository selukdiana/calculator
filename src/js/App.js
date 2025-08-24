import { Calculator } from './Calculator';
import { EventHandler } from './EventHandler';
import { opSymbols } from './utils/constants.js';

export class App {
  constructor() {
    this.calc = new Calculator();
    this.display = document.getElementById('display');
    this.currentInput = this.calc.leftOperand;
    this.eventHandler = new EventHandler(this);
    this.eventHandler.initialize();
    this.initializeEventListeners();
    this.render();
  }

  // Event listener initialization
  initializeEventListeners() {
    const calculator = document.querySelector('.calculator');
    calculator.addEventListener('click', (event) =>
      this.eventHandler.handleButtonClick(event),
    );

    const modeSwitch = document.querySelector('.switch__input');
    modeSwitch.addEventListener('change', () =>
      this.eventHandler.handleModeSwitch(),
    );
  }

  // Display rendering
  render() {
    this.display.innerHTML = this.formatDisplay();
  }

  formatDisplay() {
    const operatorSymbol =
      this.calc.operator === null ? '' : opSymbols[this.calc.operator];
    const rightOperand =
      this.calc.rightOperand === null ? '' : this.calc.rightOperand;
    return `${this.calc.leftOperand} ${operatorSymbol} ${rightOperand}`;
  }

  // Command execution
  run(cmd) {
    try {
      cmd.execute();
      this.render();
      return true;
    } catch (e) {
      this.display.innerHTML = e.message;
      this.currentInput = '';
      this.calc.clear();
      return false;
    }
  }

  // Snapshot management
  saveSnapshot() {
    this.calc.history.push(this.calc.createSnapshot(this.currentInput));
  }

  undo() {
    if (!this.calc.history.length) return;
    const prevState = this.calc.history.pop();
    this.currentInput = this.calc.restoreSnapshot(prevState);
    this.render();
  }

  clearAll() {
    this.calc.clear();
    this.currentInput = '0';
    this.render();
  }
}
