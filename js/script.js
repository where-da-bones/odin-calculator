const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const bottomOutput = document.querySelector("#bottom");
const topOutput = document.querySelector("#top");
const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const undoButton = document.getElementById("undo");

let leftValue = 0;
let total = 0;
let operator = null;
let firstOpReceived = false;


numberButtons.forEach(button => button.addEventListener("click", updateOutput));
operatorButtons.forEach(button => button.addEventListener("click", storeExpression));
equalsButton.addEventListener("click", operate);
clearButton.addEventListener("click", clearAll);
undoButton.addEventListener("click", clear);


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
        case "x":
            total = leftValue * rightValue;
            break;
        case "÷":
            total = leftValue / rightValue;
    }

    if (total.toString().length > 18) total = total.toExponential();

    bottomOutput.textContent = total;
    firstOpReceived = false;
}

function storeExpression(event) {
    if (firstOpReceived) return;

    operator = event.target.textContent;
    leftValue = Number(bottomOutput.textContent);
    bottomOutput.textContent = "0";
    firstOpReceived = true;
}

function updateOutput(event) {
    value = event.target.textContent;

    if ((bottomOutput.textContent + value).length > 18) {
        topOutput.textContent = "Exceeded display length";
        return;
    }

    bottomOutput.textContent = bottomOutput.textContent == 0 ? value :
        bottomOutput.textContent += value;
}

function clear() {
    if (bottomOutput.textContent.length > 1) {
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
}