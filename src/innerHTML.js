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