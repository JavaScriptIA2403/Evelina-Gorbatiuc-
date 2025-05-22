// calculator.js — логика вычислений и состояние калькулятора
export default class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
  }

  clear() {
    this.current = '';
    this.previous = '';
    this.operation = null;
    this.updateDisplay('0');
  }

  delete() {
    this.current = this.current.toString().slice(0, -1);
    if (this.current === '') {
      this.updateDisplay('0');
    } else {
      this.updateDisplay(this.current);
    }
  }

  appendNumber(number) {
    if (number === '.' && this.current.includes('.')) return;
    this.current = this.current.toString() + number.toString();
    this.updateDisplay(this.current);
  }

  chooseOperation(operation) {
    if (this.current === '') return;
    if (this.previous !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previous = this.current;
    this.current = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previous);
    const current = parseFloat(this.current);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '−':
        computation = prev - current;
        break;
      case '×':
        computation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          this.updateDisplay('Ошибка');
          this.current = '';
          this.previous = '';
          this.operation = null;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }

    this.current = computation.toString();
    this.operation = null;
    this.previous = '';
    this.updateDisplay(this.current);
  }

  updateDisplay(value) {
    this.displayElement.textContent = value;
  }
}
