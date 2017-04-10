
const runFunction= function(callbackf){
    const aMesg ="yo!"
    //throw new Error("there is a problem")
    callbackf(aMesg)
}



const delayedTaskWithErrors = function(message){
        let delay = 2000
        //Using setTimeout we get our display function executed concurrently after a random delay
        setTimeout(function(){
            console.log("inside settimeout callback"+message)
            //throw new Error("delayed function had an error")
        }, delay)        
}

const makeDelayedPromise = function(id){
    return new Promise(resolve=>{
        setTimeout(function(){
            console.log("inside settimeout callback - process id: "+id)
            resolve(42)
       }, 2000)  
    })
}


const promiseWithErrors = (id, message, makeError) =>{
    return new Promise(
        (resolve,reject)=>{
            console.log( message +' id: '+id + "-errors flag: " + makeError)
            if(!makeError){
                resolve( message +' id: '+id +'- error flag is: ' + makeError)
            }
            else{
                reject('OOOPS - Error in Promise with id: '+id + ' error flag is: ' + makeError)
            }
    })
}

const promiseWithErrors1 = (val) =>{
    console.log(val)
    return new Promise(
        (resolve, reject)=>reject('OOOPS - Error in Promise')
    )
}

/*promiseWithErrors(1, "first promise", true)
.catch(err=>console.log(err))
.then(()=>promiseWithErrors(2, "second promise", true))
.catch(err=>console.log(err))
.then(()=>console.log("in the then after the promises"))
.catch(err=>console.log(err))
console.log("I am here")
*/
let promise = promiseWithErrors(1, "Creating promise with errors", false)
            .then(makeDelayedPromise(10))
            .then(()=>promiseWithErrors1())         
            .catch(e => console.log(e))  
            //.then((data) => console.log("There was no error "+data))
            //.catch(e => console.log(e))
            //.then(delayedPromise("Running delayed task after the second Promise with error"))
 

/*try{
    runFunction(delayedTaskWithErrors)
    console.log("completed")
}
catch(err){
    console.log("in the catch block")
    console.log(err.message)
}
console.log("I am here")
*/

/*const taskWithDelay = function(message, delay=2000){
        //using time for ansynchrony
        setTimeout(function(){
            hf.display(message +" - current time : " +  moment().format('HH:mm:ss:SSS'))
        }, delay)
}
*/