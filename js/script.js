const numberButtons = document.querySelectorAll(".number-button");
const bottomOutput = document.querySelector("#bottom");
const topOutput = document.querySelector("#top");

numberButtons.forEach(button => button.addEventListener("click", updateOutput));

function add(firstOperand, secondOperand) {
    return firstOperand + secondOperand;
}

function subtract(firstOperand, secondOperand) {
    return firstOperand - secondOperand;
}

function multiply(firstOperand, secondOperand) {
    return firstOperand * secondOperand;
}

function divide(firstOperand, secondOperand) {
    return firstOperand / secondOperand;
}

function operate(firstOperand, secondOperand, operator) {
    //code here
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