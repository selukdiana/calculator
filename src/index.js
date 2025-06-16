import { Calculator } from './js/Calculator';
import './styles/app.css';

const display = document.querySelector('.display');
const keypad = document.querySelector('.keypad');

const calculator = new Calculator(display);

keypad.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  const type = btn.dataset.type;

  if (type === 'digit') {
    calculator.insertNumber(btn.innerHTML);
  } else if (type === 'operator') {
    const operator = btn.dataset.operator;
    const value = btn.innerText;
    switch (operator) {
      case 'all-clear': {
        calculator.clearAll();
        break;
      }
      case 'negation': {
        calculator.negateNumber();
        break;
      }
      case 'percent': {
        calculator.changePercentToDecimal();
        break;
      }
      case 'dec-point': {
        calculator.insertDecimalPoint();
        break;
      }
      case 'equals': {
        calculator.generateResult();
        break;
      }
      default: {
        calculator.insertOperator(value);
        break;
      }
    }
  }
});
