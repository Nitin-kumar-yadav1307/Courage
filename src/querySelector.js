function querySelector(node,tagName){
if(node.name == tagName){
    return node;
}

if (!node.children) return null;

for( let Node of node.children){
    
    let result = querySelector(Node,tagName);
    if (result){
        return result;
    }
}

return null;


}

module.exports = {querySelector};