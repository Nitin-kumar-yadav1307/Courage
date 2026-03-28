
const { fetch } = require('./browser.js');


let canvas = document.querySelector('#window');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');


function renderNode(node, ctx, parentNode) {
    
    if (node.type === 'text') {
         if (parentNode && (parentNode.name === 'style' || parentNode.name === 'head' || parentNode.name === 'title')) return;
        ctx.fillStyle = '#333333';
        ctx.font = '16px sans-serif';
        ctx.fillText(node.value, parentNode.layout.x, parentNode.layout.y + 16);
        return;
    }

    if (!node.layout) return;

    if (node.styles && node.styles.background) {
        ctx.fillStyle = node.styles.background;
        ctx.fillRect(node.layout.x, node.layout.y, node.layout.width, node.layout.height);
    }

    for (let child of node.children) {
        renderNode(child, ctx, node);
    }
}


async function render() {
    const rootNode = await fetch('http://example.com', window.innerWidth, window.innerHeight);
    renderNode(rootNode, ctx); 
}

render();