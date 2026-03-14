/**
 * The `buildDOM` function in JavaScript parses tokens to construct a DOM tree structure.
 * @param tokens - The `tokens` parameter in the `buildDOM` function is an array of objects
 * representing different types of tokens. Each token object has a `type` property indicating whether
 * it is an 'open' tag, 'text' content, or 'close' tag, and a `name` property for
 * @returns The `buildDOM` function is returning the rootNode object which represents the parsed DOM
 * structure based on the input tokens provided to the function.
 */
function buildDOM(tokens){
const selfClosing = ['br', 'img', 'meta', 'input', 'link', 'hr'];
let rootNode = {type: 'document',children: []};
 let stack = [rootNode];

 for(let token of tokens){
    if (token.type === 'open') {
       let newNode = { type : 'element', name: token.name,children: []}
       let currentParent = stack[stack.length - 1];
         currentParent.children.push(newNode);
        if (!selfClosing.includes(newNode.name)) {
    stack.push(newNode);
  }
}
else if (token.type === 'text') {
    let textNode = { type: 'text', value: token.value };
    let currentParent = stack[stack.length - 1];
     currentParent.children.push(textNode);

}
else if (token.type === 'close') {
    stack.pop();

}
 }
  return  rootNode;
}

module.exports = {buildDOM};