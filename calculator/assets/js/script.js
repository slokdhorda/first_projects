class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
  }

  delete() {
    if (this.currentOperand === '0') return;
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  }

  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.shouldResetScreen = true;
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert("Cannot divide by zero!");
          this.clear();
          return;
        }
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = '';
    }
  }
}

const previousOperandTextElement = document.getElementById('previous-operand');
const currentOperandTextElement = document.getElementById('current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Improved event delegation
document.querySelector('.buttons-grid').addEventListener('click', e => {
  const target = e.target;
  if (!target.matches('button')) return;

  const action = target.dataset.action;
  const number = target.dataset.number;

  // Add ripple effect logic here if needed, or simple scale using CSS active state

  if (number !== undefined) {
    calculator.appendNumber(number);
    calculator.updateDisplay();
  }

  if (action === 'clear') {
    calculator.clear();
    calculator.updateDisplay();
  }

  if (action === 'delete') {
    calculator.delete();
    calculator.updateDisplay();
  }

  if (action === '+' || action === '-' || action === '*' || action === '/' || action === '%') {
    calculator.chooseOperation(action);
    calculator.updateDisplay();
  }

  if (action === 'calculate') {
    calculator.compute();
    calculator.updateDisplay();
  }
});

// Keyboard support
document.addEventListener('keydown', e => {
  if (e.key >= 0 && e.key <= 9) calculator.appendNumber(e.key);
  if (e.key === '.') calculator.appendNumber('.');
  if (e.key === '=' || e.key === 'Enter') calculator.compute();
  if (e.key === 'Backspace') calculator.delete();
  if (e.key === 'Escape') calculator.clear();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') calculator.chooseOperation(e.key);

  calculator.updateDisplay();
});