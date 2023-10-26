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
        return calculator[operator](num1, num2);
    }
}

