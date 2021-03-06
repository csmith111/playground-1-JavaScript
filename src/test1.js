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

//Created this to make test the then call. function takes one parameter that it does not use
const promiseWithErrors1 = (val) =>{
    console.log("Message from previous promise--" +val)
    return new Promise(
        (resolve, reject)=>reject('OOOPS - Error in Promise')
    )
}
//Created this to make test the then call. 
// This error will not be handled.
const promiseWithErrors2 = () =>{
    console.log("Inside the promise callback--")
    return new Promise(
        (resolve, reject)=>reject('OOOPS - Error in Promise')
    )
}

let promise = promiseWithErrors(1, "Creating promise with errors", false)
            .then(promiseWithErrors2)  //no problems now because the function accepts on parameter    
            .catch(e => console.log(e))  


/*let promise = promiseWithErrors(1, "Creating promise with errors", false)
            .then(promiseWithErrors1)  //no problems now because the function accepts on parameter    
            .catch(e => console.log(e))  */

