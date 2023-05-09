const operatorBtn = document.querySelectorAll(".operator");
const digitBtn = document.querySelectorAll(".digit");
const botScreen = document.getElementById("bot-screen");
const topScreen = document.getElementById("top-screen");
const clearBtn = document.getElementById("clear-btn");
const deleteBtn = document.getElementById("delete-btn");
const equalBtn = document.getElementById("=");
const pointBtn = document.getElementById("point");

let num = "";
let num2 = "";
let result;
let operator = null;
let resetIsTrue = false;

operatorBtn.forEach(op => { op.addEventListener("click", () => setOperator(op.id))});

digitBtn.forEach( digit => { digit.addEventListener("click", () => numFunc(digit.id))});

equalBtn.addEventListener("click", () => {
    evaluate();
});

pointBtn.addEventListener("click", pointFunc);
clearBtn.addEventListener("click", clear);
deleteBtn.addEventListener("click", deleteNum);

function resetScreen() {
    botScreen.innerHTML = "";
    resetIsTrue = false;
}

function round(number) {
    return Math.round(number * 1000) / 1000
}

function clear() {
    num = "";
    num2 = "";
    operator = null;
    botScreen.innerHTML = "0";
    topScreen.innerHTML = "";
}

function pointFunc() {
    if(resetIsTrue) {
        resetScreen();
    }

    if(botScreen.innerHTML === "") {
        botScreen.innerHTML = "0";
    }

    if(botScreen.innerHTML.includes(".")){
        return
    }

    botScreen.innerHTML += ".";
}

function setOperator(op) {
    if (operator !== null) {
        evaluate();
    }
    num = botScreen.innerHTML;
    operator = op;
    topScreen.innerHTML = num + operator;
    resetIsTrue = true;
}

function evaluate() {
    if (operator === null || resetIsTrue) {
        return
    }
    num2 = botScreen.innerHTML;
    botScreen.innerHTML = round(operate(operator, num, num2));
    topScreen.innerHTML = num + operator + num2; 
    operator = null;
}

function numFunc(digit) {
    if (resetIsTrue == true) {
        resetScreen();
    }
    botScreen.innerHTML += digit;
}

function deleteNum() {
    botScreen.innerHTML = botScreen.innerHTML.toString().slice(0,-1);
}

function plus(a, b) {
    return a + b
}

function minus(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function division(a, b) {
    return a / b
}

function operate(op, a, b) {
    a = Number(a);
    b = Number(b);

    switch (op) {
        case "+":
            return plus(a, b)
            break;
        
        case "-":
            return minus(a, b)
            break;

        case "/":
            return division(a, b)
            break;
        
        case "x":
            return multiply(a, b)
            break;

        default:
            return null
            break;
    }
}

clear();