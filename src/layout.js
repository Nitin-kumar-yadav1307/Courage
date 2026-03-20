function calculateLayout(node, parentWidth, currentY) {
  if (node.type === 'text') return;

  let layout = {x:0,y:currentY,width:parentWidth,height:0};

  node.layout = layout;
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

module.exports = { calculateLayout };