// const result = require('./transpiled-code');
// console.log(result);
// require basically read the code and returns and object with all the exports

// There are two ways to implement require functionality
// 1. Extract the code content and read line by line and create an object that has all the exported functionality
// 2. Execute the code by passing a an object named export so that it will set everything to that object
//    see the below example

const fs = require('fs');
function implementation1require(){
  const contents = fs.readFileSync(fileName);
  // read the content parse everthing map the variable to value
  // complexity increase once we have functions and all
  // this is basically an compiler 
}

// 2

function implementation2require(fileName){
  const contents = fs.readFileSync(fileName);
  const executableFunction = `
  (function(){
    let exports = {}
    function require(exports){ 
      ${contents} 
    }
    require(exports)
    return exports;
  })()
  `
  console.log(executableFunction)
  // run the above code in the terminal node require.js and paste the result in console
  // you will be able to see how require works
}

implementation2require('./transpiled-code.js')