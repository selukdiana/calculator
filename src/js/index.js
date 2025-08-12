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
    case 'left-parenthesis': {
      return null;
    }
    case 'right-parenthesis': {
      return null;
    }
    case 'memory-clear': {
      return null;
    }
    case 'memory-plus': {
      return null;
    }
    case 'memory-minus': {
      return null;
    }
    case 'memory-recall': {
      return null;
    }
    case '2nd': {
      return null;
    }
    case 'pow-of-2': {
      return null;
    }
    case 'pow-of-3': {
      return null;
    }
    case 'x-to-pow-of-y': {
      return null;
    }
    case 'e-to-pow-of-x': {
      return null;
    }
    case '10-to-pow-of-x': {
      return null;
    }
    case 'reciprocal': {
      return null;
    }
    case 'square-roo': {
      return null;
    }
    case 'cube-root3': {
      return null;
    }
    case 'y-rooty': {
      return null;
    }
    case 'ln': {
      return null;
    }
    case 'log10': {
      return null;
    }
    case 'factorial': {
      return null;
    }
    case 'sin': {
      return null;
    }
    case 'cos': {
      return null;
    }
    case 'tan': {
      return null;
    }
    case 'e': {
      return null;
    }
    case 'EE': {
      return null;
    }
    case 'rad': {
      return null;
    }
    case 'sinh': {
      return null;
    }
    case 'cosh': {
      return null;
    }
    case 'tanh': {
      return null;
    }
    case 'pi': {
      return null;
    }
    case 'rand': {
      return null;
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
