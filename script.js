"use strict"

const calculator = {
    add(a, b){
        return a + b;
    },
    subtract(a, b){
        return a - b;
    },
    multiply(a, b){
        return a * b;
    },
    divide(a, b){
        return a / b;
    },
    operate(operator, num1, num2){
        //maybe pass this an array and destructure it into required varibles?
        return calculator[operator](num1, num2);
    }
}

const display = document.querySelector("#display");
const inputs = document.querySelectorAll(".input");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
let operandOne = "";
let operandTwo = "";
let operatorSymbol = "";


inputs.forEach(input => {
  input.addEventListener("click", processInput);
});
    
operators.forEach(operator => {
  operator.addEventListener("click", (event) => {
    operatorSymbol = event.target.id;
    console.log(operandOne, operatorSymbol, operandTwo)
  })
})

equalsButton.addEventListener("click", calculate);
 
function updateDisplay(num){
  display.textContent = num;
}

clearButton.addEventListener("click", clear);

function processInput(event){
    
    if(operatorSymbol === ""){
      operandOne += event.target.textContent;
      updateDisplay(operandOne);
    }else{
      operandTwo += event.target.textContent;
      updateDisplay(operandTwo);
    }
    console.log(operandOne, operatorSymbol, operandTwo)
}

function calculate(){
  operandOne = Number(operandOne);
  operandTwo = Number(operandTwo);
  const result = calculator.operate(operatorSymbol, operandOne, operandTwo);
  updateDisplay(result);
  console.log(operandOne, operatorSymbol, operandTwo, result)
}

function clear(){
  operandOne = "";
  operandTwo = "";
  operatorSymbol = "";
  updateDisplay("");
}


