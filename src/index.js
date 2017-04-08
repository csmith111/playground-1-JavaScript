"use strict"
require("../index.html")
const moment = require("moment")
const hf = require('./helperFunctions')

hf.display('<h3>Learning JavaScript Promises</h3>')

const taskWithDelay = function(message, delay=2000){
        setTimeout(function(){
            hf.display(message +" - current time : " +  moment().format('HH:mm:ss:SSS'))
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
        let isError = Math.floor(Math.random())
        //Using setTimeout we get our display function executed concurrently after a random delay
        if(isError===0){
            setTimeout(function(){
                hf.display(message +" - current time: " + moment().format('HH:mm:ss:SSS'))
            }, 1000)
        }
        else{
            throw new Error("There was a problem")
        }
}


const delayedTaskWithErrors = function(message){
        let delay = 2000
        //Using setTimeout we get our display function executed concurrently after a random delay
        setTimeout(function(){
            hf.display(message +" - current time: " +  moment().format('HH:mm:ss:SSS'))
            throw new Error("delayed function had an error")
        }, delay)        
}

const delayedTaskWithErrorsAndErrorHandling = function(message){
        let delay = 2000
            setTimeout(function(){
                try{
                hf.display(message +" - current time: " +  moment().format('HH:mm:ss:SSS'))
                throw new Error("delayed function had an error")}
                catch(e){
                    hf.display("There was an error")
            }}, delay)        
}

//function to demonstrate the use of callbacks to run code aynchronusly
const test = function(id){ 
    hf.display("Starting function " + id)
    const x1 = moment()
    taskWithRandomDelay("Concurrent First Task is executing in function call: " +id)
    taskWithRandomDelay("Concurrent Second Task is executing in function call: "+ id)
    const x2 = moment()
    //This will exectute first even though it is the last statement
    hf.display("Time elapsed to complete the function - synchronous parts - " + x2.diff(x1).valueOf('x'))
}

//test(1)
//test(2)


//function to demonstrate the failed error handling with the use of callbacks running code aynchronusly
const test1 = function(id){ 
    hf.display("Starting test function with errors " + id)
    const x1 = moment()
    try{
        delayedTaskWithErrors("First Task with errors function id: "+id)
    }catch(e){
        hf.display("There was an error")
    }
    const x2 = moment()
    //This will exectute first even though it is the last statement
    hf.display("Time elapsed to complete the function - synchronous parts - " + x2.diff(x1).valueOf('x'))
}

test1(1)


//using Promises
const delayedPromise= function(message){
        let delay = 2000
        return new Promise((resolve, reject)=>{
            setTimeout(function(){
            hf.display(message +" - current time: " +  moment().format('HH:mm:ss:SSS'))
            throw new Error("delayed function had an error")}, delay)
        })
}

const promiseWithErrors = (id, message, makeError) =>{
    return new Promise(
        (resolve,reject)=>{
            hf.display('id:'+id + message +"-errors flag: " + makeError)
            if(!makeError){
                resolve('id:'+id + message +'- error flag is: ' + makeError)
            }
                else{reject('id:'+id + message + 'OOPS - error flag is: ' + makeError)
            }
    })
}


const test2 = function(id){
    hf.display("Starting test function with Promises " + id)
    const x1 = moment()

    let promise = promiseWithErrors(1, "a new promise", true)
            promise.then(hf.display('Running first THEN call after for promiseWithErrors'))
            .catch(e => hf.display("There was an error " +e))
            .then(hf.display('Running first THEN call after for promiseWithErrors'))
            .then(promiseWithErrors(2, "First THEN task with errors", true))
            .then(taskWithRandomDelay("Task after the error"))
            .catch(e => hf.display("There was an error " +e))
            
    const x2 = moment()
    //This will exectute first even though it is the last statement
    hf.display("Time elapsed to complete the function - synchronous parts - " + x2.diff(x1).valueOf('x'))
}


//test2(1)
//test2(2)
//test2(3)




/*new Promise((resolve,reject)=>{
        hf.display("first promise in chain")
        
        resolve("first promise completed")
        reject('oops')
    })
    .catch(error =>{hf.display(error)})
    .then((value)=>hf.display("second promise in chain value from previous promise : " + value))
    .then((value)=>hf.display("third promise in chain " + value))
*/

//const a_promise = new Promise((resolve, reject) => {resolve(1)})
//a_promise.then(res => delayedTaskWithErrors("a task"))
//.catch(error=> {hf.display(error.stack)})








