const display = document.querySelector('.calculator__display');
let input = [];

const updateDisplay = () => {
  display.innerText =
    input.length === 0 ? '0' : input.map((elem) => elem.value).join(' ');
};

export const insertNumber = (value) => {
  if (input.length === 0) {
    input.push({
      type: 'digit',
      value,
    });
  } else {
    const lastElemIndex = input.length - 1;
    const elemType = input[lastElemIndex].type;
    if (elemType === 'digit') {
      if (input[lastElemIndex].value.includes('%')) {
        return;
      }
      if (input[lastElemIndex].value === '0') {
        input[lastElemIndex].value = value;
      } else {
        input[lastElemIndex].value += value;
      }
    } else if (elemType === 'operator') {
      input.push({
        type: 'digit',
        value,
      });
    }
  }
  updateDisplay();
};

export const insertOperator = (value) => {
  if (!input.length) return;
  const lastElemIndex = input.length - 1;
  const elemType = input[lastElemIndex].type;
  if (elemType === 'operator') {
    input[lastElemIndex].value = value;
  } else if (elemType === 'digit') {
    input.push({ type: 'operator', value });
  }

  updateDisplay();
};

export const clearAll = () => {
  input = [];
  updateDisplay();
};

export const negateNumber = () => {
  if (!input.length) return;
  const lastElemIndex = input.length - 1;
  const elemType = input[lastElemIndex].type;
  if (elemType === 'digit') {
    input[lastElemIndex].value *= -1;
    input[lastElemIndex].value = input[lastElemIndex].value.toString();
    updateDisplay();
  }
};
const changePercentToDecimal = (value) => {
  return value / 100;
};

export const insertPercent = () => {
  if (!input.length) {
    input.push({
      type: 'digit',
      value: '0%',
    });
  } else {
    const lastElemIndex = input.length - 1;
    const elemType = input[lastElemIndex].type;
    if (elemType === 'digit') {
      const lastSymbol = input[lastElemIndex].value.slice(-1);
      if (lastSymbol === '%' || lastSymbol === '.') {
        input[lastElemIndex].value =
          input[lastElemIndex].value.slice(0, -1) + '%';
      } else {
        input[lastElemIndex].value += '%';
      }
    } else {
      return;
    }
  }
  updateDisplay();
};

export const insertDecimalPoint = () => {
  if (input.length === 0) {
    input.push({
      type: 'digit',
      value: '0.',
    });
  } else {
    const lastElemIndex = input.length - 1;
    const elemType = input[lastElemIndex].type;
    if (elemType === 'digit') {
      const value = input[lastElemIndex].value;
      if (value.includes('.') || value.includes('%')) return;
      input[lastElemIndex].value += '.';
    } else if (elemType === 'operator') {
      input.push({
        type: 'digit',
        value: '0.',
      });
    }
  }
  updateDisplay();
};

const performOperation = (leftOperand, operator, rightOperand) => {
  const isLeftOperandIncludesPercent = leftOperand.includes('%');
  const isRightOperandIncludesPercent = rightOperand.includes('%');

  if (
    !isLeftOperandIncludesPercent &&
    isRightOperandIncludesPercent &&
    (operator === '−' || operator === '+')
  ) {
    rightOperand = rightOperand.slice(0, -1);
    rightOperand = parseFloat(rightOperand);
    leftOperand = parseFloat(leftOperand);
    rightOperand = leftOperand * changePercentToDecimal(rightOperand);
  } else {
    if (isLeftOperandIncludesPercent) {
      leftOperand = leftOperand.slice(0, -1);
      leftOperand = parseFloat(leftOperand);
      leftOperand = changePercentToDecimal(leftOperand);
    } else {
      leftOperand = parseFloat(leftOperand);
    }

    if (isRightOperandIncludesPercent) {
      rightOperand = rightOperand.slice(0, -1);
      rightOperand = parseFloat(rightOperand);
      rightOperand = changePercentToDecimal(rightOperand);
    } else {
      rightOperand = parseFloat(rightOperand);
    }
  }

  switch (operator) {
    case '×': {
      return leftOperand * rightOperand;
    }
    case '÷': {
      return leftOperand / rightOperand;
    }
    case '−': {
      return leftOperand - rightOperand;
    }
    case '+': {
      return leftOperand + rightOperand;
    }
    default: {
      return;
    }
  }
};

const simplifyExpression = (currentExpression, operator) => {
  const operatorIndex = currentExpression.findIndex((elem) => {
    return new RegExp(`${operator}`).test(elem);
  });
  if (operatorIndex === -1) {
    return currentExpression;
  } else {
    const leftOperandIndex = operatorIndex - 1;
    const rightOperatorIndex = operatorIndex + 1;

    const partialSolution = performOperation(
      ...currentExpression.slice(leftOperandIndex, rightOperatorIndex + 1),
    );

    currentExpression.splice(leftOperandIndex, 3, partialSolution.toString());
    return simplifyExpression(currentExpression, operator);
  }
};

export const generateResult = () => {
  if (!input.length) return;

  if (input.length === 1) {
    if (input[0].value.includes('%')) {
      let value = input[0].value.slice(0, -1);
      value = changePercentToDecimal(value).toString();
      input = [
        {
          type: 'digit',
          value,
        },
      ];
      updateDisplay();
    }
    return;
  }

  const lastElemIndex = input.length - 1;
  const elemType = input[lastElemIndex].type;
  if (elemType === 'digit') {
    const result = ['×|÷', '−|\\+'].reduce(
      simplifyExpression,
      input.map((elem) => elem.value),
    );
    input = [{ type: 'digit', value: result[0] }];
    updateDisplay();
  }
};
