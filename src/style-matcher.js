function styleMatcher(node, rules) {

  // Step 1: loop through every rule
  // if rule.selector matches node.name → attach rule.declaration to node.styles
 
  for (let rule of rules) {
     if (!rule) continue;
    if (rule.selector === node.name) {
    // existing code
} else if (rule.selector.includes(':')) {
    let e1 = rule.selector.split(',');
    let e2 = e1[0].split(':');
    let e3 = e2[0];
    if (e3 === node.name) {
        if (!node.styles) node.styles = {};
        for (let key in rule.declaration) {
            node.styles[key] = rule.declaration[key];
        }
    }
} else if (rule.selector.startsWith('.')) {
    // existing code
}
    else if (rule.selector.startsWith('.')) {
       if (node.attributes && node.attributes.class) {
      if(node.attributes.class.split(' ').includes(rule.selector.slice(1))){
        if (!node.styles) {
        node.styles = {};
      }

      // copy all declarations into node.styles
      for (let key in rule.declaration) {
        node.styles[key] = rule.declaration[key];
      }
          }  
    }
}

else if (rule.selector.startsWith('#')) {
  if (node.attributes && node.attributes.id) {
    if (node.attributes.id === rule.selector.slice(1)) {
      if (!node.styles) {
        node.styles = {};
      }
      for (let key in rule.declaration) {
        node.styles[key] = rule.declaration[key];
      }
    }
  }
}
  }

  // Step 2: if no children → stop
  if (!node.children) return;

  // Step 3: loop through children and call styleMatcher recursively
  for (let child of node.children) {
    styleMatcher(child, rules);
  }
}

module.exports = {styleMatcher};