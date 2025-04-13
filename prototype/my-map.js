/* 
Map is a function of an array that takes function as arguemnt
and basically executes the function for every element in the array
returns the new array;
*/

Array.prototype.mymap = function (fn) {
    const resultArr = new Array(this.length);
    for (let i = 0; i < this.length; i++) {
        resultArr[i] = fn(this[i]);
    }
    return resultArr;
}
const arr = [1, 2, 3, 4, 5, 6, 7];
const defaultDoubled = arr.map(element => element * element);
const myDoubled = arr.mymap(element => element * element);
console.log(defaultDoubled);
console.log(myDoubled);