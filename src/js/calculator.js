const display = document.querySelector('.calculator__display');
let input = [];

const updateDisplay = () => {
  display.innerText = input.length
    ? input.map((elem) => elem.value).join(' ')
    : '0';
};

const getLastElement = () => input[input.length - 1];

const addElement = (type, value) => {
  input.push({ type, value });
};

const replaceLastElementValue = (value) => {
  if (input.length) {
    getLastElement().value = value;
  }
};

const changePercentToDecimal = (value) => value / 100;

const processPercentOperand = (operand) => {
  operand = operand.slice(0, -1);
  return changePercentToDecimal(operand)
}

export const insertNumber = (value) => {
  if (!input.length || getLastElement().type === 'operator') {
    addElement('digit', value);
  } else {
    const lastElem = getLastElement();
    if (lastElem.value === '0') {
      lastElem.value = value;
    } else if (isFinite(lastElem.value)) {
      lastElem.value += value;
    }
  }
  updateDisplay();
};

export const insertOperator = (value) => {
  if (!input.length) return;

  const lastElem = getLastElement();
  if (lastElem.type === 'operator') {
    replaceLastElementValue(value);
  } else if (lastElem.type === 'digit') {
    addElement('operator', value);
  }
  updateDisplay();
};

export const clearAll = () => {
  input = [];
  updateDisplay();
};

export const negateNumber = () => {
  if (!input.length) return;

  const lastElem = getLastElement();
  if (lastElem.type === 'digit') {
    let value = lastElem.value;
    const isPercent = value.includes('%');
    value = isPercent ? value.slice(0, -1) : value;
    lastElem.value = (parseFloat(value) * -1).toString() + (isPercent ? '%' : '');
    updateDisplay();
  }
};

export const insertPercent = () => {
  if (!input.length) {
    addElement('digit', '0%');
  } else {
    const lastElem = getLastElement();
    const lastSymbol = lastElem.value.slice(-1);
    if (lastElem.type === 'digit') {
      lastElem.value = lastSymbol === '%' || lastSymbol === '.'
        ? lastElem.value.slice(0, -1) + '%'
        : lastElem.value + '%';
    }
  }
  updateDisplay();
};

export const insertDecimalPoint = () => {
  if (!input.length) {
    addElement('digit', '0.');
  } else {
    const lastElem = getLastElement();
    if (lastElem.type === 'digit' && !lastElem.value.includes('.') && !lastElem.value.includes('%')) {
      lastElem.value += '.';
    } else if (lastElem.type === 'operator') {
      addElement('digit', '0.');
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
    rightOperand = leftOperand * processPercentOperand(rightOperand)
  } else {
    if (isLeftOperandIncludesPercent) {
      leftOperand = processPercentOperand(leftOperand)
    }

    if (isRightOperandIncludesPercent) {
      rightOperand = processPercentOperand(rightOperand);
    }
  }

  leftOperand = parseFloat(leftOperand);
  rightOperand = parseFloat(rightOperand);

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
  }
};

const simplifyExpression = (currentExpression, operator) => {
  const operatorIndex = currentExpression.findIndex((elem) => {
    return new RegExp(operator).test(elem);
  });

  if (operatorIndex === -1) {
    return currentExpression;
  }

  const leftOperandIndex = operatorIndex - 1;
  const rightOperatorIndex = operatorIndex + 1;

  const partialSolution = performOperation(
    ...currentExpression.slice(leftOperandIndex, rightOperatorIndex + 1),
  );

  currentExpression.splice(
    leftOperandIndex,
    3,
    parseFloat(partialSolution.toFixed(6)).toString(),
  );

  return simplifyExpression(currentExpression, operator);
};

export const generateResult = () => {
  if (!input.length) return;

  if (input.length === 1) {
    const value = input[0].value.includes('%')
      ? processPercentOperand(input[0].value).toString()
      : input[0].value;

    input = [{ type: 'digit', value }];
    updateDisplay();
    return;
  }

  const lastElem = getLastElement()
  if (lastElem.type === 'digit') {
    const result = ['×|÷', '−|\\+'].reduce(
      simplifyExpression,
      input.map((elem) => elem.value),
    );
    input = [{ type: 'digit', value: result[0] }];
    updateDisplay();
  }
};
