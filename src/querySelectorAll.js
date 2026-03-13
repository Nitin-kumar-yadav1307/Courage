function querySelectorAll(node,tagName){
    let queries = [];
    if(node.name == tagName){
     queries.push(node);
}

if (!node.children) return [] ;

for( let Node of node.children){
    
    let result = querySelectorAll(Node,tagName);
    
      queries =  queries.concat(result);
    
}

    return queries;
}
module.exports = {querySelectorAll};