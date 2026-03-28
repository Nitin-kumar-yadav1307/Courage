



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

/* The `calculateLayout` function is responsible for calculating the layout of a given node in a tree
structure. It takes three parameters: `node` representing the current node being processed,
`parentWidth` representing the width of the parent node, and `currentY` representing the current Y
position in the layout. */
function calculateLayout(node, parentWidth, currentY, viewportWidth, viewportHeight)  {
  if (node.type === 'text') return;

  let layout = {x:0,y:currentY,width:parentWidth,height:0};

  node.layout = layout;

  

if (node.styles && node.styles.width) {
  node.layout.width = parseValue(node.styles.width, viewportWidth, viewportHeight);
}

let childY = currentY;

if (node.styles && node.styles.margin) {
  const margin = parseMargin(
    node.styles.margin,
    viewportWidth,
    viewportHeight,
    node.layout.width,
    parentWidth
);
  node.layout.x = margin.left;
  node.layout.y = currentY + margin.top;
  childY = node.layout.y;
}
  

 for (let Node of node.children) {
  if (Node.type === 'text') {
    childY += 20; // default line height
  } else {
    calculateLayout(Node, parentWidth, childY, viewportWidth, viewportHeight);
    if (Node.layout) {
      childY += Node.layout.height;
    }
  }
}
  node.layout.height = childY - node.layout.y;


  // rest of the logic comes here
}

 function parseMargin(marginValue, viewportWidth, viewportHeight, elementWidth, parentWidth) {
  let parts = marginValue.split(' ');

  let top, right, bottom, left;

  if (parts.length === 1) {
    top = right = bottom = left =
      parseValue(parts[0], viewportWidth, viewportHeight);
  }

  else if (parts.length === 2) {
  top = bottom = parseValue(parts[0], viewportWidth, viewportHeight);
  
  if (parts[1] === 'auto') {
    left = right = (parentWidth - elementWidth) / 2;
  } else {
    right = left = parseValue(parts[1], viewportWidth, viewportHeight);
  }
}

  else if (parts.length === 3) {
    top = parseValue(parts[0], viewportWidth, viewportHeight);
    right = left = parseValue(parts[1], viewportWidth, viewportHeight);
    bottom = parseValue(parts[2], viewportWidth, viewportHeight);
  }

  else if (parts.length === 4) {
    top = parseValue(parts[0], viewportWidth, viewportHeight);
    right = parseValue(parts[1], viewportWidth, viewportHeight);
    bottom = parseValue(parts[2], viewportWidth, viewportHeight);
    left = parseValue(parts[3], viewportWidth, viewportHeight);
  }
  

  return { top, right, bottom, left };
}

module.exports = { calculateLayout };