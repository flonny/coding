/*
promise is an object or function with a then method whose behavior conforms to his specifcation
*/

function promiseA() {
  this.then = function () {};
}
/*thenable is an object or function that defines a then method*/
function thenable() {}
function promiseA() {
  this.then = thenable;
}
// value is an legal javascript value including undefined, a thenable or a promise
// “exception” is a value that is thrown using the throw statement.
// “reason” is a value that indicates why a promise was rejected.
function thenable() {}
function promiseA() {
  this.then = thenable;
  this.value = void 0;
  this.reason = void 0;
}
//A promise must be in one of three states: pending, fulfilled, or rejected.
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function thenable() {}
function promiseA() {
  var that = this;
  this.then = thenable;
  this.value = void 0;
  this.reason = void 0;
  this.state = PENDING;
}
/* 
a promise must provide a then method to access its current or eventual value or reason 
a promise's then method accepts two arguments
promise.then(onFulfilled, onRejected)
*/
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function thenable() {}
function promiseA() {
  var that = this;
  this.then = thenable;
  this.value = void 0;
  this.reason = void 0;
  this.state = PENDING;
  this.then = function (onFulfilled, onRejected) {};
}
/*
Both onFulfilled and onRejected are optional arguments
  if onFulfilled is not a function it must be ignored
  if onRejected is not a function it must be ignored
*/
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function thenable() {}
function promiseA() {
  var that = this;
  this.then = thenable;
  this.value = void 0;
  this.reason = void 0;
  this.state = PENDING;
  this.then = function (onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      return;
    }
    if (typeof onFulfilled !== "function") {
      return;
    }
  };
}

/*
If onFulfilled is a function:
it must be called after promise is fulfilled, with promise’s value as its first argument.
it must not be called before promise is fulfilled.
it must not be called more than once.
If onRejected is a function,
it must be called after promise is rejected, with promise’s reason as its first argument.
it must not be called before promise is rejected.
it must not be called more than once.
*/
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function promiseA() {
  var that = this;
  this.then = thenable;
  this.value = void 0;
  this.reason = void 0;
  this.state = PENDING;
  this.then = function (onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      return;
    } else if (that.state === FULFILLED) {
      onFulfilled(that.value);
    }
    if (typeof onFulfilled !== "function") {
      return;
    } else if (this.state === REJECTED) {
      onRejected(that.reason);
    }
  };
}
// onFulfilled or onRejected must not be called until the execution context stack contains only platform code. [3.1].
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function thenable() {}
function promiseA() {
  var that = this;
  this.then = thenable;
  this.value = void 0;
  this.reason = void 0;
  this.state = PENDING;
  this.then = function (onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      return;
    } else if (that.state === FULFILLED) {
      var timer = setTimeout(() => {
        clearTimeout(timer);
        onFulfilled(that.value);
      }, 0);
    }
    if (typeof onFulfilled !== "function") {
      return;
    } else if (this.state === REJECTED) {
      var timer = setTimeout(() => {
        clearTimeout(timer);
        onRejected(that.reason);
      }, 0);
    }
  };
}
/** 
 * then may be called multiple times on the same promise.
If/when promise is fulfilled, all respective onFulfilled callbacks must execute in the order of their originating calls to then.
If/when promise is rejected, all respective onRejected callbacks must execute in the order of their originating calls to then.
 * 
*/
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
function promiseA(fn) {
  // debugger;
  var that = this;
  this.value = void 0;
  this.reason = void 0;
  this.state = PENDING;
  this.onFulfilledCall = [];
  this.onRejectedCall = [];
  function resolve(value) {
    // debugger
    if (that.state === PENDING) {
      that.state = FULFILLED;
      that.value = value;
    }
  }
  function reject(reason) {
    // debugger
    if (that.state === PENDING) {
      that.state = REJECTED;
      that.reason = reason;
      throw reason
    }
  }
  try {
    typeof resolve
    fn(resolve, reject);
  } catch (error) {
    reject(error);
  }
}
promiseA.prototype.then = function (onFulfilled, onRejected) {
// debugger;
  var onFulfilledIsFunction = typeof onFulfilled === "function";
  var onRejectedIsFunction = typeof onRejected === "function";
  if (this.state === FULFILLED && onFulfilledIsFunction) {
    var timer = setTimeout((function() {
      // debugger
      clearTimeout(timer);
     this.value =  onFulfilled(this.value)
    }).bind(this), 0);

  }
  if (this.state === REJECTED && onRejectedIsFunction) {
    var timer = setTimeout((function() {
      // debugger
      clearTimeout(timer);
      onRejected(this.reason)
    }).bind(this), 0);
  }
  return new promiseA((resolve,reject) => {
    // debugger
    resolve(this.value)
  })
};

var myPromise = new promiseA((resolve, reject) => {
  // debugger;
  resolve("1213213");
});
myPromise.then((res) => {
  // debugger;
  console.log("res", res);
  return 543321
}).then(a=> {
  // debugger
  console.log('a',a)
});
console.log("first");
var test = new Promise((resolve,reject)=> {
  resolve('test')
})
test.then(res => {
  console.log('p1', res)
  return 'tet1'
}).then(a=> {
  console.log('p2', a)
})
setTimeout(() => {
  console.log('settime')
}, 0);