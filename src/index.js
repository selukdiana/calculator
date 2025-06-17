import { insertNumber, clearAll, negateNumber, insertPercent, insertDecimalPoint, generateResult, insertOperator } from './js/calculator';
import './css/styles.css';

const keypad = document.querySelector('.keypad');

keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  const type = btn.dataset.type;

  if (type === 'digit') {
    insertNumber(btn.innerHTML);
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
