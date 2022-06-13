const numbers = document.querySelectorAll(".number");
const calculatorScreen = document.querySelector(".calculator-screen");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal-sign");
const clearBtn = document.querySelector(".all-clear");
const decimal = document.querySelector(".decimal");
const percentage = document.querySelector(".percentage");

let dataNumbers = [];
let dataOperators = [];
let currentNumber = "0";

const updateScreen = (screen) => {
    calculatorScreen.value = screen;
}

const inputNumber = (number) => {
    if (currentNumber === "0") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }
}

numbers.forEach((number) => {
    number.addEventListener("click", (event) => {
        inputNumber(event.target.value);
        updateScreen(currentNumber);
    });
});

const inputOperator = (operator) => {
    dataNumbers.push(currentNumber);
    dataOperators.push(operator);
    currentNumber = "0";
}

operators.forEach((operator) => {
    operator.addEventListener("click", (event) => {
        inputOperator(event.target.value);
    });
});

const calculate = () => {
    dataNumbers.push(currentNumber);

    let result = dataNumbers.reduce((prevValue, currentValue, currentIndex) => {
        let outcome;
        switch (dataOperators[currentIndex - 1]) {
            case "+":
                outcome = parseFloat(prevValue) + parseFloat(currentValue);
                break;
            case "-":
                outcome = parseFloat(prevValue) - parseFloat(currentValue);
                break;
            case "*":
                outcome = parseFloat(prevValue) * parseFloat(currentValue);
                break;
            case "/":
                outcome = parseFloat(prevValue) / parseFloat(currentValue);
                break;
            default:
                outcome = currentValue;
                break;
        }

        return outcome;
    });

    currentNumber = result;
}

equalSign.addEventListener("click", () => {
    calculate();
    updateScreen(currentNumber);
});

const clearAll = () => {
    prevNumber = '';
    currentNumber = '0';
}

clearBtn.addEventListener("click", () => {
    clearAll();
    updateScreen(currentNumber);
});

const inputDecimal = (dot) => {
    if (currentNumber.includes(".")) {
        return;
    }
    currentNumber += dot;
}

decimal.addEventListener("click", (event) => {
    inputDecimal(event.target.value);
    updateScreen(currentNumber);
});

const inputPercentage = (percent) => {
    currentNumber = currentNumber / 100;
}

percentage.addEventListener("click", (event) => {
    inputPercentage(event.target.value);
    updateScreen(currentNumber);
});