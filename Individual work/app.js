import Calculator from './calculator.js';

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button');

const calculator = new Calculator(display);

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const action = button.dataset.action;
    const buttonText = button.textContent;

    if (!action) {
      // Это цифра или точка
      calculator.appendNumber(buttonText);
    } else {
      switch (action) {
        case 'clear':
          calculator.clear();
          break;
        case 'backspace':
          calculator.delete();
          break;
        case 'add':
          calculator.chooseOperation('+');
          break;
        case 'subtract':
          calculator.chooseOperation('−');
          break;
        case 'multiply':
          calculator.chooseOperation('×');
          break;
        case 'divide':
          calculator.chooseOperation('÷');
          break;
        case 'equals':
          calculator.compute();
          break;
      }
    }
  });
});
