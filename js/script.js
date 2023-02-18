const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const bottomOutput = document.querySelector("#bottom");
const topOutput = document.querySelector("#top");
const equalsButton = document.getElementById("equals");

let leftValue = 0;
let total = 0;
let operator = null;
let firstOpReceived = false;


numberButtons.forEach(button => button.addEventListener("click", updateOutput));
operatorButtons.forEach(button => button.addEventListener("click", storeExpression));
equalsButton.addEventListener("click", operate);


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

function clearAll() {
    leftValue = 0;
    total = 0;
    bottomOutput.textContent = 0;
    firstOpReceived = false;
}