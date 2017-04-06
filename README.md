# playground-1-JavaScript
Code created to learn JavaScript

One of the difficult aspects of any langage is writing code to deal with Concurrecny.
# Concurrency

When we have a program that has functionality that needs us to access resources that take time to give us what we need, we are faced with challenges. We would like to be able to have our program keep running and doing things that are possible while __simultanelously__ doing the tasks that take time. 

Working out how to do this, and dealing with issues that arise when we have mutiple activities running __concurrently__ - is the subject of concurrent programming.

Fist let us simulate a task that takes a random time to run. 
The function `taskWithRandomDelay`
will display your message to the webpage after a random interval of time. 
We implement this using a function, `setTimeout` takes a function (a callback)
that you would like it to run and executes it for you - no sooner than the specified delay.

But for now I suggest that you just use these functions and see what happens. 


```javascript
const taskWithRandomDelay = function(message){
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

```

