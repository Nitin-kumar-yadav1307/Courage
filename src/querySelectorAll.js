/**
 * The function `querySelectorAll` recursively searches for all elements with a specific tag name
 * within a given node.
 * @param node - The `node` parameter represents the starting node from which you want to start
 * querying for elements with a specific tag name.
 * @param tagName - The `tagName` parameter in the `querySelectorAll` function is the name of the tag
 * you want to query for within the given `node`. It is used to search for all elements with a specific
 * tag name within the provided node and its descendants.
 * @returns The `querySelectorAll` function is returning an array of nodes that match the given
 * `tagName` within the provided `node` and its children.
 */
function querySelectorAll(node,tagName){
    let queries = [];
    if(node.name == tagName || tagName == '*'){
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