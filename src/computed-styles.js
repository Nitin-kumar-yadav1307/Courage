// Computed Styles — reads the final styles attached to any DOM node
// after styleMatcher runs, every matched node has node.styles attached
// this function just reads what's already there — clean and simple

function getComputedStyle(node) {

    // if no styles were matched to this node — return empty object
    // never return undefined or null — always safe to use

    if (!node.styles) {
        return {};
    }

 resolvedStyles = {};

   for( let property in node.styles){

      let value = node.styles[property] ;

      if(value.startsWith("var(")){
      let varName =  value.slice(4,value.length-1);
       let current = node;
while (current.parentNode) {
    current = current.parentNode;
    if (current.styles && current.styles[varName]) {
        resolvedStyles[property] = current.styles[varName];
        break;
    }
}
      }
      else{
        resolvedStyles[property] = value;
      }
   }


    // return the styles object attached by styleMatcher
    // e.g. { color: 'red', 'font-size': '16px', background: '#eee' }
    return resolvedStyles;
}
module.exports = { getComputedStyle };