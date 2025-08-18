import { Calculator } from './Calculator';
import {
  SetCommand,
  FuncCommand,
  BinaryCommand,
  MemoryCommand,
  PercentCommand,
} from './Command';
import '../css/index.css';
import '../css/switch.css';
import '../css/calculator.css';

// -------------- Client + Invoker --------------

// ----------------------
// Client + Invoker
// ----------------------

const calc = new Calculator();
const display = document.getElementById('display');

let currentInput = calc.leftOperand;
const saveSnapshot = () => {
  calc.history.push({
    currentInput,
    memory: calc.memory,
    leftOperand: calc.leftOperand,
    rightOperand: calc.rightOperand,
    operator: calc.operator,
    pendingCmd: calc.pendingCmd,
  });
};

const undo = () => {
  if (!calc.history.length) return;
  const prevState = calc.history.pop();
  calc.leftOperand = prevState.leftOperand;
  calc.rightOperand = prevState.rightOperand;
  calc.operator = prevState.operator;
  currentInput = prevState.currentInput;
  calc.pendingCmd = prevState.pendingCmd;
  calc.memory = prevState.memory;
};

const opSymbols = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷',
  power: '^',
  EE: 'EE',
  yRoot: 'root',
};

// Обёртка: выполнить команду и сохранить её в истории
const run = (cmd) => {
  try {
    cmd.execute();
    render();
    return true;
  } catch (e) {
    display.innerHTML = e.message;
    currentInput = '';
    calc.clear();
    return;
  }
};

// Рендер дисплея
function render() {
  display.innerHTML = calc.error
    ? calc.error
    : `${calc.leftOperand} ${calc.operator === null ? '' : opSymbols[calc.operator]} ${calc.rightOperand === null ? '' : calc.rightOperand}`;
}

// Сброс всех состояний
function clearAll() {
  calc.clear();
  currentInput = '0';
  render();
}

// Ввод цифр и точки
document.querySelectorAll('.number').forEach((btn) =>
  btn.addEventListener('click', () => {
    saveSnapshot();
    if (btn.textContent === '.') {
      if (currentInput.includes('.')) return;
      currentInput = currentInput ? currentInput + '.' : '0.';
    } else {
      currentInput =
        currentInput === '0' ? btn.textContent : currentInput + btn.textContent;
    }
    // Выполняем и сохраняем ввод как команду
    const cmd = new SetCommand(calc, currentInput);

    run(cmd);
    // render();
  }),
);

// Бинарные операторы
document.querySelectorAll('.operator').forEach((btn) =>
  btn.addEventListener('click', () => {
    saveSnapshot();
    const op = btn.dataset.type;

    if (calc.pendingCmd && calc.rightOperand) {
      if (!run(calc.pendingCmd)) return;
    }
    calc.pendingCmd = new BinaryCommand(calc, op);
    calc.operator = op;
    currentInput = '';
    render();
  }),
);

// «=»
document.getElementById('btn-equals').addEventListener('click', () => {
  if (!calc.pendingCmd || !calc.rightOperand) return;
  saveSnapshot();
  if (!run(calc.pendingCmd)) return;
  currentInput = calc.leftOperand.toString();
  // render();
});

// Унарные функции, константы, % и ±
document.querySelectorAll('.func').forEach((btn) =>
  btn.addEventListener('click', () => {
    saveSnapshot();
    const fn = btn.dataset.type;
    const cmd =
      fn === 'percent' ? new PercentCommand(calc) : new FuncCommand(calc, fn);

    if (!run(cmd)) return;
    currentInput = '';
    // render();
  }),
);

// Память
document.querySelectorAll('.memory').forEach((btn) =>
  btn.addEventListener('click', () => {
    const m = btn.dataset.type;
    const map = {
      mc: 'memoryClear',
      mr: 'memoryRecall',
      'm+': 'memoryAdd',
      'm-': 'memorySubtract',
    };
    let opnd = null;
    if (m === 'm+' || m === 'm-') {
      opnd = currentInput
        ? parseFloat(currentInput)
        : calc.rightOperand
          ? parseFloat(calc.rightOperand)
          : parseFloat(calc.leftOperand);
    }
    if (!run(new MemoryCommand(calc, map[m], opnd))) return;

    if (m === 'mr') {
      // render();
      currentInput = calc.leftOperand;
    }
  }),
);

// Undo
document.getElementById('btn-undo').addEventListener('click', () => {
  undo();
  render();
});
// Clear
document.getElementById('btn-clear').addEventListener('click', clearAll);

const radDegSwitch = document.getElementById('radDegSwitch');
radDegSwitch.addEventListener('click', () => {
  if (radDegSwitch.textContent === 'Rad') {
    radDegSwitch.textContent = 'Deg';
  } else {
    radDegSwitch.textContent = 'Rad';
  }
  calc.isDegrees = !calc.isDegrees;
});
// Инициалный рендер
render(true);
