export class Calculator {
  constructor(display) {
    this.display = display;
    this.input = [];
    this.memory = [];
  }

  updateDisplay() {
    ;
    this.display.innerText = this.input.length
      ? this.input.map((elem) => elem.value).join(' ')
      : '0';
  }

  getLastElement() {
    return this.input[this.input.length - 1];
  }

  addElement(type, value) {
    this.input.push({ type, value });
  }

  replaceLastElementValue(value) {
    if (this.input.length) {
      this.getLastElement().value = value;
    }
  }

  changePercentToDecimal(value) {
    return value / 100;
  }

  insertNumber(value) {
    ;
    if (!this.input.length || this.getLastElement().type === 'operator') {
      this.addElement('digit', value);
    } else {
      const lastElem = this.getLastElement();
      if (lastElem.value === '0') {
        lastElem.value = value;
      } else if (isFinite(lastElem.value)) {
        lastElem.value += value;
      }
    }
    this.updateDisplay();
  }

  undoInsertNumber() {}
  insertOperator(value) {
    ;
    if (!this.input.length) return;
    if (this.input.some((elem) => elem.type === 'operator'))
      this.generateResult();
    const lastElem = this.getLastElement();
    if (lastElem.type === 'operator') {
      this.replaceLastElementValue(value);
    } else if (lastElem.type === 'digit') {
      this.addElement('operator', value);
    }
    this.updateDisplay();
  }

  undoInsertOperator() {}
  negateNumber() {
    if (!this.input.length) return;

    const lastElem = this.getLastElement();
    if (lastElem.type === 'digit') {
      let value = lastElem.value;
      const isPercent = value.includes('%');
      value = parseFloat(value);
      lastElem.value = (value * -1).toString() + (isPercent ? '%' : '');
      this.updateDisplay();
    }
  }

  insertPercent = () => {
    if (!this.input.length) {
      this.addElement('digit', '0%');
    } else {
      const lastElem = this.getLastElement();
      const lastSymbol = lastElem.value.slice(-1);
      if (lastElem.type === 'digit') {
        lastElem.value =
          lastSymbol === '%' || lastSymbol === '.'
            ? lastElem.value.slice(0, -1) + '%'
            : lastElem.value + '%';
      }
    }
    this.updateDisplay();
  };

  insertDecimalPoint = () => {
    if (!this.input.length) {
      this.addElement('digit', '0.');
    } else {
      const lastElem = this.getLastElement();
      if (
        lastElem.type === 'digit' &&
        !lastElem.value.includes('.') &&
        !lastElem.value.includes('%')
      ) {
        lastElem.value += '.';
      } else if (lastElem.type === 'operator') {
        this.addElement('digit', '0.');
      }
    }
    this.updateDisplay();
  };
  clearAll() {
    ;
    this.input = [];
    this.updateDisplay();
  }

  calculate(leftOperand, operator, rightOperand) {
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
  }
  generateResult() {
    ;
    if (this.input.length < 3) return;
    let [leftOperand, operator, rightOperand] = this.input;
    const isLeftOperandIncludesPercent = leftOperand.value.includes('%');
    const isRightOperandIncludesPercent = rightOperand.value.includes('%');

    leftOperand = parseFloat(leftOperand.value);
    rightOperand = parseFloat(rightOperand.value);
    operator = operator.value;

    if (isLeftOperandIncludesPercent) {
      leftOperand = this.changePercentToDecimal(leftOperand);
    }

    if (isRightOperandIncludesPercent) {
      rightOperand =
        !isLeftOperandIncludesPercent && (operator === '−' || operator === '+')
          ? leftOperand * this.changePercentToDecimal(rightOperand)
          : this.changePercentToDecimal(rightOperand);
    }
    const result = this.calculate(leftOperand, operator, rightOperand);
    this.input = [{ type: 'digit', value: result.toString() }];
    this.updateDisplay();
  }
}
