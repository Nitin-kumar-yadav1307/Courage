function getComputedStyle(node){
    if(!node.styles){
        return {};
    }

    return node.styles;
}

module.exports = {getComputedStyle};