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

equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);

inputs.forEach(input => {
  input.addEventListener("click", processInput);
});
    
operators.forEach(operator => {
  operator.addEventListener("click", (event) => {
    //prevents pressing the operators before any numbers have been selcted
    if(!operandOne){
      return
    }
    
    if(operatorSymbol === ""){
      operatorSymbol = event.target.id;
    }else{
      //allows for the chaining of calcs e.g. 12+7(19)-5(14)*3 = 42  
      calculate();
      operatorSymbol = event.target.id;
      
    }
    

    console.log(operandOne, operatorSymbol, operandTwo)
  })
})

function updateDisplay(num){
  display.textContent = num;
}

function processInput(event){
    //allows for new calculation to begin if there's a result in the display and operandOne variable
    if(typeof operandOne === "number" && !operatorSymbol){
      operandOne = event.target.textContent;
      updateDisplay(operandOne);
      return
    }
    
    //logic to decide which variable to place input
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
  if(operandOne && operandTwo){
    operandOne = Number(operandOne);
    operandTwo = Number(operandTwo);
    const result = calculator.operate(operatorSymbol, operandOne, operandTwo);
    updateDisplay(result);
    
    operandOne = result;
    operandTwo = "";
    operatorSymbol = "";
    
    console.log(operandOne, operatorSymbol, operandTwo)
  }
}

function clear(){
  operandOne = "";
  operandTwo = "";
  operatorSymbol = "";
  updateDisplay("");
}

//Can some of the bugs/problems be solved by creating a better/cleaner solution?

