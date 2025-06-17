import {
  insertNumber,
  clearAll,
  negateNumber,
  insertPercent,
  insertDecimalPoint,
  generateResult,
  insertOperator,
} from './calculator';
import '../css/index.css';
import '../css/switch.css';
import '../css/calculator.css';

const keypad = document.querySelector('.calculator__keypad');

keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const type = btn.dataset.type;

  if (type === 'digit') {
    insertNumber(btn.innerText);
  } else if (type === 'operator') {
    const operator = btn.dataset.operator;
    const value = btn.innerText;
    switch (operator) {
      case 'all-clear': {
        clearAll();
        break;
      }
      case 'negation': {
        negateNumber();
        break;
      }
      case 'percent': {
        insertPercent();
        break;
      }
      case 'dec-point': {
        insertDecimalPoint();
        break;
      }
      case 'equals': {
        generateResult();
        break;
      }
      default: {
        insertOperator(value);
        break;
      }
    }
  }
});

const modeSwitch = document.querySelector('.switch__input');

modeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('darkstyle');
});
