# playground-1-JavaScript
Code created to learn JavaScript

One of the most difficult aspects of programming is writing code to deal with Concurrency.

# Concurrency

When we have a program that has functionality that needs us to use resources that take time to access, 
we are faced with interesting challenges. Actually, we have this problem in our daily life and we use different strategies 
to deal with it. (Human beings have the amazing ability to do multiple things at once. 
Sometimes this means that all the tasks are not all executed well or optimally. 
So try not to overuse this ability! :-))

We would like to be able to have our program keep running and doing as many things that are possible. 
We want to use the available resources while __simultanelously__ waiting for the tasks that take time. 

Working out how to do this, and dealing with issues that arise when we have mutiple activities 
running __concurrently__ - is the subject of concurrent programming.

Fist let us simulate a task that takes a random time to run. 
The function `taskWithRandomDelay` will display your message to the webpage after a random interval of time. 
We implement this using a function, `setTimeout` which takes a function (a callback)
that you would like it to run and executes it for you - no sooner than the specified delay.


```javascript
const taskWithRandomDelay = function(message){
        let delay = Math.floor(Math.random()*1000)
        //Using setTimeout we get our display function executed concurrently after a random delay
        setTimeout(function(){
            hf.display(message +" - current time: " + moment().format('HH:mm:ss:SSS'))
        }, delay)
}
```

Then we can run this function as follows:

```javascript
//function to demostrate the use of callbacks to run code aynchronusly
const test = function(id){ 
    hf.display("Starting function " + id)
    const x1 = moment()
    taskWithRandomDelay("Concurrent First Task is executing in function call: " +id)
    taskWithRandomDelay("Concurrent Second Task is executing in function call: "+ id)
    const x2 = moment()
    //This will exectute first even though it is the last statement
    hf.display("Time elapsed to complete the function - synchronous parts - " + x2.diff(x1).valueOf('x'))
}

test(1)
test(2)
test(3)
```

```bash
Starting function 1
Time elapsed to complete the function - synchronous parts - 1
Starting function 2
Time elapsed to complete the function - synchronous parts - 0
Starting function 3
Time elapsed to complete the function - synchronous parts - 0
Concurrent First Task is executing in function call: 1 - current time: 15:02:28:501
Concurrent Second Task is executing in function call: 2 - current time: 15:02:28:524
Concurrent Second Task is executing in function call: 1 - current time: 15:02:28:535
Concurrent Second Task is executing in function call: 3 - current time: 15:02:28:659
Concurrent First Task is executing in function call: 2 - current time: 15:02:28:800
Concurrent First Task is executing in function call: 3 - current time: 15:02:29:239
```

The first thing to notice is that there is no fixed order in which our code is executing. 
The callbacks that we have passed to set timeout exectute `asynchronously`.

__Non-deterministic code is hard to deal with.__
Reasoning about asynchronous code is a very difficult thing for us. Since we lose
deterministic execution and it is the source of many bugs that are hard to detect and fix.

**One important idea that I find useful, is to be clear about which portions of the code is 
synchronous and which part is asynchronous.**

Just making portions of our code aynchronous may be manageable, the problem is that we want to 
then synchronize this activity so that we can produce definite outcomes in our programs. 
This is the portion that can get very tricky. 
It only gets worse when we try to deal with Tasks that can have errors. 
Let us create a task that throws errors:

## Error handling in asynchronous code with callbacks
```javascript
const delayedTaskWithErrors = function(message){
        let delay = 2000
        //Using setTimeout we get our display function executed concurrently after a random delay
        setTimeout(function(){
            hf.display(message +" - current time: " +  moment().format('HH:mm:ss:SSS'))
        }, delay)
        throw new Error("delayed function had an error")
}
```  

Now if we write code like:

```javascript
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
```

You can see that the error handling is broken! 
If you look in the developer tools console in your browser you will see the error.

__How do I fix this broken error handling?__
The reason the error handling is not working is that the try catch block was executed sychronously and so it is not able to help us when the callback passed to setTimeout has an error later.
So you can fix this problem by wrapping the callback in a try-catch block as follows:

```javascript
const delayedTaskWithErrorsAndErrorHandling = function(message){
        let delay = 2000
        setTimeout(function(){
            try{
            hf.display(message +" - current time: " +  moment().format('HH:mm:ss:SSS'))
            throw new Error("delayed function had an error")}
            catch(e){
                hf.display("There was an error")
            }
        }, delay)        
}
```
Now if you replace `delayedTaskWithErrors` with `delayedTaskWithErrorsAndErrorHandling`
then all will be well.

__Note: Is there a way to do this outside delayedTaskWithErrorsAndErrorHandling?__


Once we have a a robust way to handle errors, we still have to deal with another problem -Synchronization. 

## Synchronization in code with Asynchronous callbacks
Now if we wanted to coordinate the behavior of these asynchronous tasks we have a different problem to deal with. 
Here are some typical patterns that we will need:
* Sequencing multiple async tasks
* Trigger behavior after all tasks have completed


### Do something after all tasks have completed
We could keep a global variable and use that to detect that all tasks have completed. 

### Perform tasks in sequence
we could have each function accept the next function to execute and call it.


## Promises - Simplyfing Asynchronous code

### Using Promises
The promises library is supposed to enable us to write cleaner asynchronous code. 
It continues to use the callback mechanisms internally, but it gives us a cleaner syntax and better error handling. 

Let us see how a basic promise is created and used.

You can create promise using the following two Promise constructors:
```javascript
const p1 = new Promise((resolve) => resolve(42))
const p2 = new Promise((resolve, reject) => reject(42))
```

Once you have created a promise then you can create a chain of actions using
the `then` contruction like this. 
```javascript
const p = new Promise((resolve) => resolve(42))
p.then((val)=>hf.display('Runing then callback after promise creation ' +val))

```

Here is a more general representation of a Promise showing both the resolove and reject branches. 

```javascript
let p1 = new Promise((resolve, reject)=>{
    const isError = true
    if(!isError){
        resolve(isError)
    }else{
        reject(isError)
    }
}).then((val)=>hf.display('There was no error ' +val))
.catch(val => hf.display("Oops there was an error " +val))
```
The rejection from the reject branch are caught by a catch function with takes a callback 
to handle the promise rejection.
Try changing the isError flag and you can see that the error handler in the catch bock is triggered. 

__note__ This is where I am not sure exactly how things work.

### Handling errors with Promises:
```javascript
//using Promises
const delayedPromise= function(message){
        let delay = 2000
        return new Promise((resolve, reject)=>{
            setTimeout(function(){
                hf.display(message +" - current time: " +  moment().format('HH:mm:ss:SSS'))
            }, delay)
        })
}

const promiseWithErrors = (id, message, makeError) =>{
    return new Promise(
        (resolve,reject)=>{
            hf.display( message +' id: '+id + "-errors flag: " + makeError)
            if(!makeError){
                resolve( message +' id: '+id +'- error flag is: ' + makeError)
            }
                else{reject('OOOPS - '+ message +' id: '+id + 'error flag is: ' + makeError)
            }
    })
}


const testPromises = function(id){
    hf.display("Starting test function with Promises " + id)
    const x1 = moment()

    let promise = promiseWithErrors(1, "Creating promise with errors", true)
            promise.then(hf.display('Running first THEN call after for promiseWithErrors'))
            .catch(e => hf.display("Catch block triggered! There was an error " +e))
            .then(promiseWithErrors(2, "Create a Promise with errors", true))
            .then(delayedPromise("Running delayed task after the second Promise with error"))
            .then(hf.display('Running THEN call after second promiseWithErrors'))
            .catch(e => hf.display("There was an error " +e))
            
    const x2 = moment()
    //This will exectute first even though it is the last statement
    hf.display("Time elapsed to complete the function - synchronous parts - " + x2.diff(x1).valueOf('x'))
}


testPromises(1)
```





## Generators - Simplyfing Asynchronous code

## Async - Simplyfing Asynchronous code

