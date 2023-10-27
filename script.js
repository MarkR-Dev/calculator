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

