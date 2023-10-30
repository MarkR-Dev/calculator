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

      //Formats the result if it is a long decimal number by fixing it to 8 decimal places(changes type to string) and then turning the result back into a number with unary "+"
      if(result % 1 != 0 && String(result).length > 11){
        result = +result.toFixed(8);
        return result
      }else{
        return result
      }
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
  let test = "";
  
  if(operator === "add"){
    test = "+"
  }else if(operator === "subtract"){
    test = "-"
  }else if(operator === "multiply"){
    test = "*"
  }else if(operator === "divide"){
    test = "/"
  }
  
  
  displayTop.textContent = `${operandOne} ${test} ${operandTwo}`;
}

function processInput(event){
    //Allows for new calculation to begin if there's a result in the display and operandOne variable is currently holding a value
    if(typeof operandOne === "number" && !operatorSymbol){
      if(event.target.textContent === "."){
        clear()
        operandOne = "0.";
        updateBottomDisplay(operandOne);
        return
      }
      clear();
      operandOne = event.target.textContent;
      updateBottomDisplay(operandOne);
      return

    }else if((operandOne === "0" | operandTwo === "0") && event.target.textContent === "0" && event.target.textContent !== "."){
      //Removes ability to enter two leading 0's e.g. "00785"
      return

    }else if((operandOne === "0"  | operandTwo === "0") && event.target.textContent !== "0" && event.target.textContent !== "."){
      //Stops numbers from leading with a zero e.g. "03"
      if(operatorSymbol === ""){
        operandOne = event.target.textContent;
        updateBottomDisplay(operandOne);
        return
      }else{
        operandTwo = event.target.textContent;
        updateBottomDisplay(operandTwo);
        return
      }
    }
    
    //Decide which variable to place input
    if(operatorSymbol === ""){
      if(operandOne.includes(".") && event.target.textContent === "."){
        return
      }else if(operandOne === "" && event.target.textContent === "."){
        operandOne = "0";
      }
      operandOne += event.target.textContent;
      updateBottomDisplay(operandOne);
    }else{
      if(operandTwo.includes(".") && event.target.textContent === "."){
        return
      }else if(operandTwo === "" && event.target.textContent === "."){
        operandTwo = "0";
      }
      operandTwo += event.target.textContent;
      updateBottomDisplay(operandTwo);
    }


    console.log(operandOne, operatorSymbol, operandTwo)
}

function processOperator(event){
   //Prevents pressing the operators before any numbers have been selcted
   if(!operandOne){
    return
  }
  
  if(operatorSymbol === ""){
    operatorSymbol = event.target.id;
  }else{
    //Allows for the chaining of calculations e.g. 12+7(19)-5(14)*3 = 42  
    calculate();
    operatorSymbol = event.target.id;
  }
  
    updateTopDisplay(operatorSymbol);
  console.log(operandOne, operatorSymbol, operandTwo)
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
    
    console.log(operandOne, operatorSymbol, operandTwo)
  }
}

function clear(){
  operandOne = "";
  operandTwo = "";
  operatorSymbol = "";
  updateBottomDisplay("");
  updateTopDisplay("")
}

function deleteInput(event){
  if(operatorSymbol){
    operandTwo = operandTwo.slice(0, operandTwo.length-1);
    updateBottomDisplay(operandTwo);
  }else if (typeof operandOne === "string"){
    operandOne = operandOne.slice(0, operandOne.length-1);
    updateBottomDisplay(operandOne);
  }
}


