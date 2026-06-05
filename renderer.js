const { fetch } = require('./browser.js');
const { querySelectorAll } = require('./src/querySelectorAll.js');
let tabs = [];
let activeTab = 0;
let history = [];
let currentIndex = history.length - 1;
const addButton = document.querySelector('#addTab');
const button = document.querySelector('#go');
let url = ''
let canvas = document.querySelector('#window');
const toolbar = document.getElementById('toolbar');
const backButton = document.querySelector('#backword');
const farwordButton = document.querySelector('#farword');
const reloadButton = document.querySelector('#reload');
let rootNode = null ;



canvas.height = window.innerHeight - toolbar.offsetHeight;
canvas.width = window.innerWidth;

// for default tab
let ctx = canvas.getContext('2d');
createTab();


function createTab(){

    let tab = { url: '', history: [], currentIndex: -1 };
    tabs.push(tab);

    let tabElement = document.createElement('div');
    tabElement.className = 'tab';
    tabElement.textContent = 'New Tab';
    let deleteButton = document.createElement('button')
    deleteButton.className = 'deleteButton';
    deleteButton.textContent = 'x';
    tabElement.appendChild(deleteButton);

    // tab click event
    tabElement.addEventListener('click', function(){
      let Tabs =  document.querySelectorAll('.tab');
      activeTab = tabs.indexOf(tab);
      document.getElementById('addressbar').value = tab.url;
      if(!tab.url){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      else{
        render(tab.url);
      }
      for(Tab of Tabs){
        Tab.classList.remove('active');
      }
      tabElement.classList.add('active') ;
    });

    // delete tab
    deleteButton.addEventListener('click', function(e){
           e.stopPropagation();
        tabElement.remove(); 
    });
    let addButton = document.querySelector('#addTab');
    addButton.parentNode.insertBefore(tabElement, addButton);

    let Tabs =  document.querySelectorAll('.tab');
     
      for(Tab of Tabs){
        Tab.classList.remove('active');
      }
    activeTab = tabs.length - 1;
    tabElement.classList.add('active');
}

//canvas eventListner
canvas.addEventListener('click', function(event) {
   
    console.log('toolbar height:', toolbar.offsetHeight);
   const rect = canvas.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;
if (!rootNode) return;

    let anchorNodes = querySelectorAll(rootNode , 'a');
    
console.log('anchors found:', anchorNodes.length);
    for(let anchorNode of anchorNodes){
        if (!anchorNode.layout) continue;
     // console.log('anchor href:', anchorNode.attributes.href);
     // console.log('anchor layout:', anchorNode.layout);
     // console.log('adjusted y:', event.clientY - rect.top, 'layout y:', anchorNode.layout.y);
      if (x >= anchorNode.layout.x && 
    x <= anchorNode.layout.x + anchorNode.layout.width &&
   y >= anchorNode.layout.y &&
   y <= anchorNode.layout.y + anchorNode.layout.height) {
    render(anchorNode.attributes.href);
}
    }
});


// mouse pointer
canvas.addEventListener('mousemove', function(event) {
    canvas.style.cursor = 'default';
     const rect = canvas.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;
if (!rootNode) return;
    let anchorNodes = querySelectorAll(rootNode , 'a');
    for(let anchorNode of anchorNodes){
        if (!anchorNode.layout) continue;
if (x >= anchorNode.layout.x && 
    x <= anchorNode.layout.x + anchorNode.layout.width &&
   y >= anchorNode.layout.y &&
   y <= anchorNode.layout.y + anchorNode.layout.height) {
    canvas.style.cursor = 'pointer';
   // console.log('adjusted y:', event.clientY - rect.top, 'layout y:', anchorNode.layout.y);
}
    }

});


window.addEventListener('resize', function () {
  canvas.height = window.innerHeight - toolbar.offsetHeight;
  canvas.width = window.innerWidth;

  if (tabs[activeTab] && tabs[activeTab].url) {
    render(tabs[activeTab].url);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});


// add tab
addButton.addEventListener('click', function(){
   createTab();
});

// Go button
button.addEventListener('click', function (){
    console.log('clicked')
     url = document.getElementById('addressbar').value;
     tabs[activeTab].url = url;
    tabs[activeTab].history.push(url);
    tabs[activeTab].currentIndex = tabs[activeTab].history.length - 1;
     render(url);
});

// back button
backButton.addEventListener('click', function(){
    console.log('clicked');
    if(tabs[activeTab].currentIndex > 0){
        tabs[activeTab].currentIndex--;
        document.getElementById('addressbar').value = tabs[activeTab].history[tabs[activeTab].currentIndex];
        render(tabs[activeTab].history[tabs[activeTab].currentIndex]);
    }
});

// farword button
farwordButton.addEventListener('click', function(){
   // console.log('clicked');
    if(tabs[activeTab].currentIndex< tabs[activeTab].history.length-1){
        tabs[activeTab].currentIndex++;
        document.getElementById('addressbar').value = tabs[activeTab].history[tabs[activeTab].currentIndex];
        render(tabs[activeTab].history[tabs[activeTab].currentIndex]);
    }
});

// reload button
reloadButton.addEventListener('click', function(){
    render(document.getElementById('addressbar').value);
})


// it wraps the text which goes out side the parent elemnt
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
    return  lines;  // returns array of lines

}


function renderNode(node, ctx, parentNode) {
    if (node.name === 'style' || node.name === 'script' || node.name === 'head' || node.name === 'title') return;
    if (node.type === 'text') {
     //   console.log('parentNode.name:', parentNode.name);
        if (parentNode && (parentNode.name === 'style' || 
                   parentNode.name === 'head' || 
                   parentNode.name === 'title' ||
                   parentNode.name === 'script')) return;
                   
       const parentStyles = parentNode?.computedStyles || parentNode?.styles || {};
const nodeStyles = node?.computedStyles || node?.styles || {};

ctx.fillStyle = parentStyles.color || '#333333';

const headingSizes = { h1: '32px', h2: '24px', h3: '20px', h4: '18px' };
const rawSize = nodeStyles['font-size'] || parentStyles['font-size'] || '16px';
const size = rawSize.endsWith('em')
    ? `${parseFloat(rawSize) * 16}px`
    : rawSize;
    
const weight = nodeStyles['font-weight'] || parentStyles['font-weight'] || 'normal';
const style = nodeStyles['font-style'] || parentStyles['font-style'] || 'normal';

       const rawFamily = nodeStyles['font-family'] || parentStyles['font-family'] || 'sans-serif';
       const family = rawFamily.includes('system-ui') ? 'Segoe UI, sans-serif' : rawFamily;
          ctx.font = `${style} ${weight} ${size} ${family}`;
        const lines = wrapText(ctx, node.value, parentNode.layout.width );
        lines.forEach((line, index) => {
    const x = parentNode.layout.x;
    const y = parentNode.layout.y + 16 + (index * 20);

    const isInList = parentNode.name === 'li' || 
                     (parentNode.name === 'a' && parentNode.parentNode?.name === 'li');

    if (isInList) {
        ctx.fillText('•', x - 15, y);
        ctx.fillText(line, x + 10, y);
       // console.log('a layout.x:', parentNode.layout.x, 'parentNode.parentNode:', parentNode.parentNode?.name);
        console.log('drawing bullet at:', x - 15, y, 'fillStyle:', ctx.fillStyle);
    } else {
        ctx.fillText(line, x, y);
    }

    if (parentNode.name === 'a') {
        const metrics = ctx.measureText(line);
        ctx.fillRect(x, y + 2, metrics.width, 1);
    }
});
        return;
    }

    if (!node.layout) return;
   const styles = node.computedStyles || node.styles || {}; 
if (node.name === 'body') {
    if (styles.background) {
        ctx.fillStyle = styles.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height); // full viewport
    }
} else if (styles.background) {
    ctx.fillStyle = styles.background;
    ctx.fillRect(node.layout.x, node.layout.y, node.layout.width, node.layout.height);
}

for (let child of node.children) {
    renderNode(child, ctx, node);
}
}



async function render(url) {
     rootNode = await fetch(url, canvas.width, canvas.height);
     ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderNode(rootNode, ctx); 
}

