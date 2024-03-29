const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const bottomOutput = document.querySelector("#bottom");
const topOutput = document.querySelector("#top");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const undoButton = document.getElementById("undo");
const signButton = document.getElementById("sign");
const decimalButton = document.getElementById("decimal");

let leftValue = 0;
let total = 0;
let operator = null;
let firstOpReceived = false;

numberButtons.forEach((button) =>
  button.addEventListener("click", updateOutput)
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", storeExpression)
);
equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clearAll);
undoButton.addEventListener("click", clear);
signButton.addEventListener("click", flipSign);
decimalButton.addEventListener("click", addDecimal);

/*event handler for keyboard support*/
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      updateOutput(event);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      storeExpression(event);
      break;
    case "Enter":
    case "=":
      operate();
      break;
    case "s":
      flipSign();
      break;
    case "Backspace":
      clear();
      break;
    case "c":
    case "C":
      clearAll();
      break;
    case ".":
      addDecimal();
  }
});

function operate() {
  if (!firstOpReceived) return;

  let rightValue = Number(bottomOutput.textContent);

  switch (operator) {
    case "+":
      total = leftValue + rightValue;
      break;
    case "-":
      total = leftValue - rightValue;
      break;
    case "*":
      total = leftValue * rightValue;
      break;
    case "÷":
      rightValue === 0
        ? (total = "Undefined")
        : (total = leftValue / rightValue);
  }

  if (total.toString().length > 17) total = total.toExponential(4);
  if (decimalButton.disabled) decimalButton.disabled = false;

  bottomOutput.textContent = total;
  topOutput.textContent += " " + rightValue;
  firstOpReceived = false;
}

function storeExpression(event) {
  if (firstOpReceived) return;

  if (event.type === "click") {
    if (event.target.textContent === "x") {
      operator = "*";
    } else {
      operator = event.target.textContent;
    }
  } else {
    if (event.key === "/") operator = "÷";
    else {
      operator = event.key;
    }
  }

  leftValue = Number(bottomOutput.textContent);
  bottomOutput.textContent = "0";
  topOutput.textContent = leftValue + " " + operator;
  firstOpReceived = true;
  if (decimalButton.disabled) decimalButton.disabled = false;
}

function updateOutput(event) {
  if (event.type === "click") value = event.target.textContent;
  else {
    value = event.key;
  }

  if (bottomOutput.textContent.length < 16) {
    bottomOutput.textContent =
      bottomOutput.textContent === "0"
        ? value
        : (bottomOutput.textContent += value);
  }
}

function clear() {
  if (bottomOutput.textContent.length === 2 && bottomOutput.textContent.includes("-")) {
    bottomOutput.textContent = "0";
  }
  else if (
    bottomOutput.textContent.length > 1 &&
    bottomOutput.textContent !== "Undefined" &&
    bottomOutput.textContent !== "NaN"
  ) {
    if (bottomOutput.textContent[bottomOutput.textContent.length - 1] === ".") {
      decimalButton.disabled = false;
    }
    let currentLength = bottomOutput.textContent.length;
    let previousValue = bottomOutput.textContent.slice(0, currentLength - 1);
    bottomOutput.textContent = previousValue;
  }
  else {
    bottomOutput.textContent = "0";
  }
}

function clearAll() {
  leftValue = 0;
  total = 0;
  bottomOutput.textContent = 0;
  topOutput.textContent = "";
  firstOpReceived = false;
  if (decimalButton.disabled) decimalButton.disabled = false;
}

function flipSign() {
  if (bottomOutput.textContent.includes("-")) {
    let valueToFlip = bottomOutput.textContent;
    bottomOutput.textContent = valueToFlip.slice(
      1,
      bottomOutput.textContent.length
    );
  } else if (bottomOutput.textContent != "0" &&
    bottomOutput.textContent != "NaN" &&
    bottomOutput.textContent != "Undefined") {
    bottomOutput.textContent = "-" + bottomOutput.textContent;
  }
}

function addDecimal() {
  if (
    bottomOutput.textContent.length < 16 &&
    !bottomOutput.textContent.includes(".")
  ) {
    bottomOutput.textContent += ".";
    decimalButton.disabled = true;
  }
}
