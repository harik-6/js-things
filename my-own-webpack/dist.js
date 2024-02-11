(function(metadata,fileToIdMapping){
  function require(fileName){
    const id = fileToIdMapping[fileName];
    const [f] = metadata[id];
    let expObject = {};
    f(require,expObject);
    return expObject;
  } 
  const mainFunction = metadata['0'][0];
  mainFunction(require);
})({0: [
    function(require, exports){ "use strict";

var _message = _interopRequireDefault(require("./message.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
console.log(_message.default); },
  ],1: [
    function(require, exports){ "use strict";

Object.defineProperty(exports, "__esModule", {
value: true
});
exports.default = void 0;
const message = "Hello world";
var _default = message;
exports.default = _default; },
  ],},{ './index.js' : '0', './message.js' : '1',})