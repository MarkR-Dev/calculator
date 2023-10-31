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
    let result = calculator[operator](num1, num2);
    /*
    Formats the result if its a long decimal number by fixing it to 8 decimal places(changes type to string)
    and then turning the result back into a number with unary "+"
    */
    if(result % 1 != 0 && String(result).length > 11){
      result = +result.toFixed(8);
    }
      
    return result;
  }
}

const displayBottom = document.querySelector("#bottom-display");
const displayTop = document.querySelector("#top-display");
const inputs = document.querySelectorAll(".input");
const operators = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const decimalInput = document.querySelector("#decimal");
let operandOne = "";
let operandTwo = "";
let operatorSymbol = "";

equalsButton.addEventListener("click", calculate);
clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteInput);
decimalInput.addEventListener("click", processInput);

// Keypress to handle all character keys and allow for shift+key to get "+" and "*"
window.addEventListener("keypress", handleKeyboardInput);
/*
KeyPress event is invoked only for character (printable) keys, so backspace and escape won't work.
KeyDown event is raised for all including nonprintable such as Control, Shift, Alt, BackSpace, etc. 
*/
window.addEventListener("keydown", event => {
  if(event.key === "Backspace"){
    deleteInput();
  }
  
  if(event.key === "Escape"){
    clear();
  }
})

inputs.forEach(input => {
  input.addEventListener("click", processInput);
});
    
operators.forEach(operator => {
  operator.addEventListener("click", processOperator);
  
});

function updateBottomDisplay(num){
  displayBottom.textContent = num;
}

function updateTopDisplay(operator){
  let currentOperator = "";
  
  if(operator === "add"){
    currentOperator = "+";
  }else if(operator === "subtract"){
    currentOperator = "-";
  }else if(operator === "multiply"){
    currentOperator = "*";
  }else if(operator === "divide"){
    currentOperator = "/";
  }
  
  displayTop.textContent = `${operandOne} ${currentOperator} ${operandTwo}`;
}

function processInput(event, key = undefined){
  let input = "";
  if(key !== undefined){
    input = key;
  }else{
    input = event.target.textContent;
  }
  
  //Allows for new calculation to begin if there's a result in the display and operandOne variable is currently holding a value
  if(typeof operandOne === "number" && !operatorSymbol){
    if(input === "."){
      clear();
      operandOne = "0.";
      updateBottomDisplay(operandOne);
      return
    }
    clear();
    operandOne = input;
    updateBottomDisplay(operandOne);
    return

  }else if((operandOne === "0" | operandTwo === "0") && input === "0" && input !== "."){
    //Removes ability to enter two leading 0's e.g. "00785"
    return

  }else if((operandOne === "0"  | operandTwo === "0") && input !== "0" && input !== "."){
    //Stops numbers from leading with a zero e.g. "03"
    if(operatorSymbol === ""){
      operandOne = input;
      updateBottomDisplay(operandOne);
      return

    }else{
      operandTwo = input;
      updateBottomDisplay(operandTwo);
      return
    }
  }
    
  //Decide which variable to place input if all checks have been passed
  if(operatorSymbol === ""){
    if(operandOne.includes(".") && input === "."){
      return
    }else if(operandOne === "" && input === "."){
      operandOne = "0";
    }
    operandOne += input;
    updateBottomDisplay(operandOne);

  }else{
    if(operandTwo.includes(".") && input === "."){
      return
    }else if(operandTwo === "" && input === "."){
      operandTwo = "0";
    }
    operandTwo += input;
    updateBottomDisplay(operandTwo);
  }
}

function processOperator(event, key = undefined){
  let opInput = "";
  if(key !== undefined){
    opInput = key;
  }else{
    opInput = event.target.id;
  }
  
  //Prevents pressing the operators before any numbers have been selcted
  if(!operandOne){
    return
  }
  
  if(operatorSymbol === ""){
    operatorSymbol = opInput;
  }else{
    //Allows for the chaining of calculations e.g. 12+7(19)-5(14)*3 = 42  
    calculate();
    operatorSymbol = opInput;
  }
  
  updateTopDisplay(operatorSymbol);
}

function calculate(){
  if(operandTwo === "0" && (operatorSymbol === "divide")){
    clear();
    updateBottomDisplay("Can't divide by 0");
    return
  }
  
  if(operandOne && operandTwo){
    operandOne = Number(operandOne);
    operandTwo = Number(operandTwo);
    const result = calculator.operate(operatorSymbol, operandOne, operandTwo);
    updateBottomDisplay(result);
    updateTopDisplay(operatorSymbol);
    operandOne = result;
    operandTwo = "";
    operatorSymbol = "";
  }
}

function clear(){
  operandOne = "";
  operandTwo = "";
  operatorSymbol = "";
  updateBottomDisplay("");
  updateTopDisplay("")
}

function deleteInput(){
  if(operatorSymbol){
    operandTwo = operandTwo.slice(0, operandTwo.length-1);
    updateBottomDisplay(operandTwo);
  }else if (typeof operandOne === "string"){
    operandOne = operandOne.slice(0, operandOne.length-1);
    updateBottomDisplay(operandOne);
  }
}

function handleKeyboardInput(event){
  const key = document.querySelector(`div[data-digit="${event.key}"]`);
  
  const op = document.querySelector(`div[data-op="${event.key}"]`);
  
  const equals = document.querySelector(`div[data-equals="${event.key}"]`);
  const equalsEnter = document.querySelector(`div[data-enter="${event.key}"]`);
  
  if(key){
    processInput(event, key.textContent);
  }
  
  if(op){
    processOperator(event, op.id);
  }
  
  if(equals || equalsEnter){
    calculate();
  }
}

