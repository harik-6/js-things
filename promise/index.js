class MyPromise {
    _promiseCallback = null;
    _successCallback = null;
    _failureCallback = null;
    constructor(promiseFn) {
        // @Todo add validation if promiseFn with two arguments or whatever is required
        this._promiseCallback = promiseFn;
        this._resolveCallback = this._rejetcCallback.bind(this);
        this._rejetcCallback = this._rejetcCallback.bind(this);
        this._promiseCallback(this._resolveCallback,this._rejetcCallback);
        return this;
    }

    then = function(successCallback) {
        this._successCallback = successCallback;
        return this;
    }

    catch = function(failureCallback) {
        this._failureCallback = failureCallback;
        return this;
    }

    _resolveCallback = function(args){
        // console.log("Resolve is called",args);
        if(this._successCallback) {
            this._successCallback(args);
        }
    }

    _rejetcCallback = function(args){
        // console.log("Reject is called",args);
        if(this._failureCallback == null) {
            throw new Error("Unhandled promise rejection");
        }
        this._failureCallback(args)
    }

}


function getPromise() {
    return new MyPromise((resolve,reject) => {
        setTimeout(() => {
            reject("some error happened");
        },5000)
    })
}

// console.log(getPromise());

getPromise()
    .then(value => console.log("Promise completed ",value))
    .catch(error => console.log("Promise errored ",error));