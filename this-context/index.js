var a = "hello world";
// console.log(this.a);

function hello() {
  a = "overriden"
  function helloInner() {
    console.log("inside a function inside a function", this.a);
  }
  helloInner()
}

// const object = {
//   // a: 'a inside object',
//   f: () => {
//     console.log(this.a);
//   }
// }

// console.log(window);

// const helloArrow = () => console.log("inside arrow function ",this.a);
hello();
// helloArrow();
// object.f();