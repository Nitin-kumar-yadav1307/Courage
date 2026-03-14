/**
 * The function `innerHTML` recursively extracts and concatenates the inner HTML content of a given
 * node in a JavaScript DOM tree.
 * @param node - The `node` parameter in the `innerHTML` function represents a node in a tree
 * structure. Each node can have a type (e.g., 'text') and may contain children nodes. The function
 * recursively traverses the tree structure to concatenate the inner HTML content of all child nodes
 * and returns the combined
 * @returns The `innerHTML` function is returning the concatenated inner HTML content of the given node
 * and its children. If the node is of type 'text', it returns the node's value. If the node has
 * children, it recursively calls the `innerHTML` function on each child node and concatenates the
 * results to build the inner HTML content.
 */
function innerHTML(node){
    let innerHtml = "";
    if(node.type == 'text'){
        return node.value;
    }
    if (!node.children) return "";

   for( let Node of node.children){
    
   let result = innerHTML(Node);
   innerHtml = innerHtml.concat(result);


}
return innerHtml;

}

module.exports = {innerHTML};