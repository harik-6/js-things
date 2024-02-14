const babel = require("@babel/core");
const babylon = require("babylon");
const fs = require("fs");

function getDepandancies(fileName) {
  const contents = fs.readFileSync(fileName, { encoding: "utf-8" });
  let deps = [];

  // // from ast and traverse
  // const ast = babylon.parse(contents, {
  //   sourceType: "module",
  // });
  // babel.traverse(ast, {
  //   ImportDeclaration: ({ node }) => {
  //     deps.push(node.source.value);
  //   },
  // });


  // from scratch
  for(line of contents.split("\n")) {
    if(line.includes("import")) {
      let filePath = line.split("from")[1];
      filePath = filePath.replace(";","").trim();
      filePath = filePath.replace(/'/g,"").trim();
      deps.push(filePath);
    }
  }
  return deps;
}


function transpile(fileName) {
  const contents = fs.readFileSync(fileName, { encoding: "utf-8" });
  const ast = babylon.parse(contents, {
    sourceType: "module",
  });
  const { code } = babel.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });
  return code;
}

let ID = -1;
let dependanceArray=[]
let fileNameToIdIndex= [];

function buildDepandancyArray(fileName) {
  // console.log("process buildDepandancyGraph for file :",fileName);
  const dependancies = getDepandancies(fileName);
  const code = transpile(fileName)
  ID = ++ID
  dependanceArray.push({
    id: ID,
    fileName : fileName,
    dependancies,
    code
  });
  fileNameToIdIndex.push(fileName);
  for(dep of dependancies) {
    buildDepandancyArray(dep)
  }
}

function generateRuntimeCode() {
  // implement generating runtime code and require function
  let metadata = '';
  let fileToId = '';
  dependanceArray.forEach(obj => {
    metadata += `${obj.id}: [
      function(require, exports){ ${obj.code} },
    ],`
  })

  fileNameToIdIndex.forEach((file,index) => {
    fileToId += ` \'${file}\' : \'${index}\',`
  })

  return `(function(metadata,fileToIdMapping){
    function require(fileName){
      const id = fileToIdMapping[fileName];
      const [f] = metadata[id];
      let expObject = {};
      f(require,expObject);
      return expObject;
    } 
    const mainFunction = metadata['0'][0];
    mainFunction(require);
  })({${metadata}},{${fileToId}})`
}

// // Steps for webpack works
// 1.Read the main file specified as entry
// 2.Then find all the depedancy of that file and repeat the process till all depdancies are processed
// 3.And also transpile the code using traspiler like babel etc
// 4.Implement require function because browser does not support the function to know what exactly require does look at what-is-require folder
// Why require works in NodeJS runtime like server code is that it comes out of the box with nodejs


const mainFile = "./index.js";
buildDepandancyArray(mainFile);
// console.log(dependanceArray);
const runtimeCode = generateRuntimeCode();
console.log(runtimeCode);