
const { fetch } = require('./browser.js');


let canvas = document.querySelector('#window');

let ctx = canvas.getContext('2d');


function renderNode(node,ctx){
    if (!node.children) return;

    if (node.type === 'element') {
     ctx.fillRect(node.layout.x,node.layout.y,node.layout.width,node.layout.height);
} else if (node.type === 'text') {
    ctx.fillText(node.value,node.layout.x,node.layout.y);
}
    
   
    for( let Node of node.children){
   
     renderNode(Node,ctx);
   
}
} 


async function render() {
    const rootNode = await fetch('http://example.com');
    renderNode(rootNode, ctx); 
}

render();