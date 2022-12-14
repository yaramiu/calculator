function add(firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
  return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
  return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
  return firstNumber / secondNumber;
}

function operate(operator, firstNumber, secondNumber) {
  let result = 0;

  switch (operator) {
    case "+":
      result = add(firstNumber, secondNumber);
      break;
    case "-":
      result = subtract(firstNumber, secondNumber);
      break;
    case "*":
      result = multiply(firstNumber, secondNumber);
      break;
    case "/":
      result = divide(firstNumber, secondNumber);
      break;
  }

  return result;
}

const screen = document.querySelector(".screen");
let displayValue = 0;
let firstNumber = null;
let secondNumber;
let operator;
let isOperatorButtonClicked = false;
let isEqualsButtonClicked = false;

const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach((button) => {
  const number = parseInt(button.textContent);
  button.addEventListener("click", () => displayNumberToScreen(number));

  document.addEventListener("keypress", (event) => {
    if (event.key === button.textContent) {
      displayNumberToScreen(number);
    }
  });
});

function displayNumberToScreen(number) {
  isEqualsButtonClicked = false;

  if (isOperatorButtonClicked) {
    screen.textContent = "";
    displayValue = 0;
    isOperatorButtonClicked = false;
  }

  if (screen.textContent.length < 10) {
    screen.textContent += String(number);
    displayValue = Number(screen.textContent);
  }
}

const operatorButtons = document.querySelectorAll(".operator");
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    clickOperatorButton();
    operator = button.textContent;
  });

  document.addEventListener("keypress", (event) => {
    if (event.key === button.textContent) {
      clickOperatorButton();
      operator = button.textContent;
    }
  });
});

function clickOperatorButton() {
  if (isEqualsButtonClicked) {
    isEqualsButtonClicked = false;
    firstNumber = null;
  }

  isOperatorButtonClicked = true;

  if (firstNumber === null) {
    firstNumber = displayValue;
  } else {
    secondNumber = displayValue;

    displayValue = operate(operator, firstNumber, secondNumber);
    displayValue = +(Math.round(displayValue + "e+8") + "e-8");

    if (displayValue === Infinity || isNaN(displayValue)) {
      screen.textContent = "Nice try";
      firstNumber = 0;
      secondNumber = 0;
      return;
    }

    if (String(displayValue).length > 9) {
      displayValue = String(displayValue).substring(0, 9);
    }

    screen.textContent = displayValue;
    firstNumber = displayValue;
    secondNumber = 0;
  }
}

const equalsButton = document.querySelector(".equals-button");
equalsButton.addEventListener("click", () => clickEqualsButton());
document.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    clickEqualsButton();
  }
});

function clickEqualsButton() {
  if (isEqualsButtonClicked) {
    return;
  }
  isEqualsButtonClicked = true;
  isOperatorButtonClicked = false;

  if (firstNumber === null && secondNumber === undefined) {
    return;
  }

  secondNumber = displayValue;

  displayValue = operate(operator, firstNumber, secondNumber);
  displayValue = +(Math.round(displayValue + "e+8") + "e-8");

  if (displayValue === Infinity || isNaN(displayValue)) {
    screen.textContent = "Nice try";
    firstNumber = 0;
    secondNumber = 0;
    return;
  }

  if (String(displayValue).length > 9) {
    displayValue = String(displayValue).substring(0, 9);
  }

  screen.textContent = displayValue;
  firstNumber = displayValue;
  secondNumber = 0;
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => resetData());

function resetData() {
  displayValue = 0;
  firstNumber = null;
  secondNumber = 0;
  operator = "";
  isOperatorButtonClicked = false;
  isEqualsButtonClicked = false;
  screen.textContent = "";
}

const decimalButton = document.querySelector(".decimal-button");
decimalButton.addEventListener("click", () => addDecimal());
document.addEventListener("keypress", (event) => {
  if (event.key === decimalButton.textContent) {
    addDecimal();
  }
});

function addDecimal() {
  if (screen.textContent.includes(".")) {
    return;
  }

  screen.textContent += ".";
}

const backspaceButton = document.querySelector(".backspace-button");
backspaceButton.addEventListener("click", () => clickBackspaceButton());
document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    clickBackspaceButton();
  }
});

function clickBackspaceButton() {
  screen.textContent = screen.textContent.substring(
    0,
    screen.textContent.length - 1
  );
  displayValue = Number(screen.textContent);
}
