const { fetch } = require('./browser.js');
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
    console.log('clicked');
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

