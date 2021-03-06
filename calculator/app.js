class Calculator {
    constructor (previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    // All Clear Function
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    // Delete Function
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // How the numbers appear on the screen when pressed
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Selecting the operation 
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    // Calculate the output
   compute() {
       let computation;
       const previous = parseFloat(this.previousOperand);
       const current = parseFloat(this.currentOperand);
       if (isNaN(previous) || isNaN(current)) return;
       switch (this.operation) {
           case '+':
               computation = previous + current;
               break;
            case '-':
               computation = previous - current;
               break;
            case '×':
               computation = previous * current;
               break;
            case '÷':
               computation = previous / current;
               break;
            default:
               return;
       }
       this.readyToReset = true;
       this.currentOperand = computation;
       this.operation = undefined;
       this.previousOperand = '';
    }

    // Formatting of the numbers
    getDisplay(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits : 0});
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    // Updating the display 
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplay(this.currentOperand);
        // Check whether you are operating or operation is completed
        if (this.operation != undefined) {
            this.previousOperandTextElement.innerText = `${this.getDisplay(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
        
    }
}

// Variables
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Event Listeners

// Numbers
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Check if operation has been completed
        if(calculator.previousOperand === "" && calculator.currentOperand !== "" && calculator.readyToReset) {
            calculator.currentOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Operators
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Equals Button
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

// All Clear Button
allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

// Delete Button
deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay()
});