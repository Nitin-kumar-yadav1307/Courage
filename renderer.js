
const { fetch } = require('./browser.js');

let buttton = document.querySelector('#go');
let url = ''
let canvas = document.querySelector('#window');
const toolbar = document.getElementById('toolbar');

canvas.height = window.innerHeight - toolbar.offsetHeight;
canvas.width = window.innerWidth;


let ctx = canvas.getContext('2d');

buttton.addEventListener('click', function (){
    console.log('clicked')
     url = document.getElementById('addressbar').value;
     render(url);
});


function wrapText(ctx, text, maxWidth) {
   
    let lines = []
    let currentLines = "";

    let words = text.split(" ");

    for(let word of words ){
        let testLine = currentLines ? currentLines + " " + word : word;
      let testWidth =   ctx.measureText(testLine).width;
      if(testWidth>maxWidth){
        lines.push(currentLines);
        currentLines = word;
      }
      else{
        currentLines = testLine;
      }

    }

    lines.push(currentLines);
    return  lines;
    // returns array of lines
}


function renderNode(node, ctx, parentNode) {
    
    if (node.type === 'text') {
        if (parentNode && (parentNode.name === 'style' || 
                   parentNode.name === 'head' || 
                   parentNode.name === 'title' ||
                   parentNode.name === 'script')) return;
                   
        ctx.fillStyle = '#333333';
        ctx.font = '16px sans-serif';
        const lines = wrapText(ctx, node.value, parentNode.layout.width );
        lines.forEach((line, index) => {
        ctx.fillText(line, parentNode.layout.x, parentNode.layout.y + 16 + (index * 20));
        });
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


async function render(url) {
    const rootNode = await fetch(url, window.innerWidth, window.innerHeight);
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderNode(rootNode, ctx); 
}

