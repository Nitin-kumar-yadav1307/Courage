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