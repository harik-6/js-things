/* eslint-disable no-undef */
console.log("JS loading successfully");
// const elementToRender = React.createElement("p", null, "This is a paragraph");
// console.log(elementToRender);
// const domRoot = document.getElementById('myroot');
// // myRender(domRoot);
// console.log(domRoot);
// const reactRoot = ReactDOM.createRoot(document.getElementById('myroot'));
// console.log(reactRoot);
// reactRoot.render(elementToRender);

let highPriorityTaskQueue = [];
let queueIndex = -1;
let backup = [];

function createTextElement(value) {
  return {
    type: 'TEXT_ELEMENT',
    value
  }
}
// returns an object to render
function myCreateElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child => typeof child === 'object' ? child : createTextElement(child))
    }
  }
}

function Myrender(parentDom, element, deadline) {
  console.log(deadline.timeRemaining());
  const { type, props } = element;
  let node = document.createElement(type);
  const childArray = props.children || []
  for (let i = 0; i < childArray.length; i++) {
    const child = childArray[i];
    if (child.type === 'TEXT_ELEMENT') {
      node.appendChild(document.createTextNode(child.value));
    } else {
      Myrender(node, child, deadline);
    }
  }
  parentDom.appendChild(node);
  console.log("rendering completed");
}

var MyReact = {
  createElement: myCreateElement,
  render: Myrender
}

const elementToRender = MyReact.createElement('div', null,
  MyReact.createElement('div', null,
    MyReact.createElement('div', null,
      MyReact.createElement('div', null, MyReact.createElement('p', null, 'This is a paragraph')
      )
    )
  )
);



const rootNode = document.getElementById('myroot');
requestIdleCallback((deadline) => Myrender(rootNode, elementToRender, deadline));
// setTimeout(() => {
//   console.log("starting for loop")
//   for (let i = 0; i < 1000000000; i++) { }
//   console.log("endling for loop")
// })