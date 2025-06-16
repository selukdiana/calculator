export class Calculator {
  constructor(display) {
    this.display = display;
    this.input = [];
  }

  updateDisplay() {
    this.display.innerHTML =
      this.input.length === 0
        ? '0'
        : this.input.map((elem) => elem.value).join(' ');
  }

  insertNumber(value) {
    if (this.input.length === 0) {
      this.input.push({
        type: 'digit',
        value,
      });
    } else {
      const lastElemIndex = this.input.length - 1;
      const elemType = this.input[lastElemIndex].type;
      if (elemType === 'digit') {
        if (this.input[lastElemIndex].value === '0') {
          this.input[lastElemIndex].value = value;
        } else {
          this.input[lastElemIndex].value += value;
        }
      } else if (elemType === 'operator') {
        this.input.push({
          type: 'digit',
          value,
        });
      }
    }
    this.updateDisplay();
  }

  insertOperator(value) {
    if (!this.input.length) return;
    const lastElemIndex = this.input.length - 1;
    const elemType = this.input[lastElemIndex].type;
    if (elemType === 'operator') {
      this.input[lastElemIndex].value = value;
    } else if (elemType === 'digit') {
      this.input.push({ type: 'operator', value });
    }

    this.updateDisplay();
  }

  clearAll() {
    this.input = [];
    this.updateDisplay();
  }

  negateNumber() {
    if (!this.input.length) return;
    const lastElemIndex = this.input.length - 1;
    const elemType = this.input[lastElemIndex].type;
    if (elemType === 'digit') {
      this.input[lastElemIndex].value *= -1;
    }
    this.updateDisplay();
  }
  changePercentToDecimal() {
    if (!this.input.length) return;
    const lastElemIndex = this.input.length - 1;
    const elemType = this.input[lastElemIndex].type;
    if (elemType === 'digit') {
      const lastElemVal = this.input[lastElemIndex].value;
      this.input[lastElemIndex].value = lastElemVal / 100;
    }
    this.updateDisplay();
  }

  insertDecimalPoint() {
    if (this.input.length === 0) {
      this.input.push({
        type: 'digit',
        value: '0.',
      });
    } else {
      const lastElemIndex = this.input.length - 1;
      const elemType = this.input[lastElemIndex].type;
      if (elemType === 'digit') {
        const value = this.input[lastElemIndex].value;
        if (value.includes('.')) return;
        this.input[lastElemIndex].value += '.';
      } else if (elemType === 'operator') {
        this.input.push({
          type: 'digit',
          value: '0.',
        });
      }
    }
    this.updateDisplay();
  }

  generateResult() {
    if (!this.input.length) return;
    const lastElemIndex = this.input.length - 1;
    const elemType = this.input[lastElemIndex].type;
    if (elemType === 'digit') {
      const self = this;
      const simplifyExpression = function (currentExpression, operator) {
        const operatorIndex = currentExpression.findIndex((elem) => {
          return new RegExp(`${operator}`).test(elem);
        });
        if (operatorIndex === -1) {
          return currentExpression;
        } else {
          const leftOperandIndex = operatorIndex - 1;
          const rightOperatorIndex = operatorIndex + 1;

          const partialSolution = self.performOperation(
            ...currentExpression.slice(
              leftOperandIndex,
              rightOperatorIndex + 1,
            ),
          );

          currentExpression.splice(
            leftOperandIndex,
            3,
            partialSolution.toString(),
          );
          return simplifyExpression(currentExpression, operator);
        }
      };
      const result = ['×|÷', '−|\\+'].reduce(
        simplifyExpression,
        this.input.map((elem) => elem.value),
      );
      this.input = [{ type: 'digit', value: result }];
      this.updateDisplay();
    }
  }

  performOperation(leftOperand, operator, rightOperand) {
    leftOperand = parseFloat(leftOperand);
    rightOperand = parseFloat(rightOperand);

    if (Number.isNaN(leftOperand) || Number.isNaN(rightOperand)) return;

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
  }
}
