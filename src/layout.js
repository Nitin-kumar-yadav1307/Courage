
const VIEWPORT_WIDTH = 800;
const VIEWPORT_HEIGHT = 600;


function parseValue(value, viewportWidth, viewportHeight){
  if (value === '0') return 0;
  let ans = null ;

  if(value.endsWith('vw')){
      ans = viewportWidth * (Number(value.slice(0, value.length - 2)) / 100);
  }
  else if(value.endsWith('vh')){
      ans = viewportHeight * (Number(value.slice(0, value.length - 2)) / 100);
  }
  else{
     ans = Number(value.slice(0, value.length - 2));
  }

  return ans;

}

function calculateLayout(node, parentWidth, currentY) {
  if (node.type === 'text') return;

  let layout = {x:0,y:currentY,width:parentWidth,height:0};

  node.layout = layout;

  

if (node.styles && node.styles.width) {
  node.layout.width = parseValue(node.styles.width, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
}
  let childY = currentY;

 for (let Node of node.children) {
  if (Node.type === 'text') {
    childY += 20; // default line height
  } else {
    calculateLayout(Node, parentWidth, childY);
    if (Node.layout) {
      childY += Node.layout.height;
    }
  }
}
  node.layout.height = childY - currentY;


  // rest of the logic comes here
}

 function parseMargin(marginValue, elementWidth, parentWidth){

  let parts = marginValue.split(' ');

  let top, bottom, left, right;

  if(parts.length == 2){

  }

  if(parts.length == 1){
    
  }


  return { top, bottom, left, right }

}

module.exports = { calculateLayout };