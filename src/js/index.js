import '../css/index.css';
import '../css/switch.css';
import '../css/calculator.css';
import { Calculator } from './Calculator.js';
import {
  ClearAllCommand,
  GenerateResultCommand,
  insertDecimalPointCommand,
  InsertNumberCommand,
  InsertOperatorCommand,
  insertPercentCommand,
  negateNumberCommand,
} from './Command.js';

const calculator = new Calculator(
  document.querySelector('.calculator__display'),
);

const executeCommand = (command) => {
  command.execute();
};

const getCommand = (btn) => {
  const type = btn.dataset.type;
  switch (type) {
    case 'digit': {
      return new InsertNumberCommand(calculator, btn.innerText);
    }
    case 'all-clear': {
      return new ClearAllCommand(calculator);
    }
    case 'negation': {
      return new negateNumberCommand(calculator);
    }
    case 'percent': {
      return new insertPercentCommand(calculator);
    }
    case 'dec-point': {
      return new insertDecimalPointCommand(calculator);
    }
    case 'equals': {
      return new GenerateResultCommand(calculator);
    }
    case 'plus': {
      return new InsertOperatorCommand(calculator, '+');
    }
    case 'minus': {
      return new InsertOperatorCommand(calculator, '−');
    }
    case 'multiply': {
      return new InsertOperatorCommand(calculator, '×');
    }
    case 'divide': {
      return new InsertOperatorCommand(calculator, '÷');
    }
    default: {
      return null;
    }
  }
};

const keypad = document.querySelector('.calculator__keypad');
keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const command = getCommand(btn);
  executeCommand(command);
});

const modeSwitch = document.querySelector('.switch__input');

modeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('darkstyle');
});
