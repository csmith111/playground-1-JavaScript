"use strict"
require("../index.html")
const moment = require("moment")
const hf = require('./helperFunctions')

hf.display('<h3>Learning JavaScript Promises</h3>')

const taskWithSpecifiedDelay = function(message, delay){
        setTimeout(function(){
            hf.display(message +" - current time : " + moment().format('x'))
        }, delay)
}

const taskWithRandomDelay = function(message){
        let delay = Math.floor(Math.random()*1000)
        //Using setTimeout we get our display function executed concurrently after a random delay
        setTimeout(function(){
            hf.display(message +" - current time: " + moment().format('HH:mm:ss:SSS'))
        }, delay)
}

const taskWithRandomErrors = function(message){
        let delay = Math.floor(Math.random()*1000)
        //Using setTimeout we get our display function executed concurrently after a random delay
        setTimeout(function(){
            hf.display(message +" - current time: " + moment().format('x'))
        }, delay)
}


//function to show that using callbacks if functions take different time to run
const test = function(id){ 
    hf.display("Starting function " + id)
    const x1 = moment()
    taskWithRandomDelay("Concurrent First Task is executing in function call " +id)
    taskWithRandomDelay("Concurrent Second Task is executing in function call "+ id)
    const x2 = moment()
    //This will exectute first even though it is the last statement
    hf.display("Time elapsed to complete the function - synchronous parts - " + x2.diff(x1).valueOf('x'))
}

test(1)
test(2)
test(3)







