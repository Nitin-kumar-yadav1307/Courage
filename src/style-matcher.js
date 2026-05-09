const defaultRules = [
    { selector: 'h1', declaration: { 'font-size': '32px', 'font-weight': 'bold', 'margin-top': '21px', 'margin-bottom': '21px' } },
    { selector: 'h2', declaration: { 'font-size': '24px', 'font-weight': 'bold', 'margin-top': '19px', 'margin-bottom': '19px' } },
    { selector: 'h3', declaration: { 'font-size': '20px', 'font-weight': 'bold', 'margin-top': '18px', 'margin-bottom': '18px' } },
    { selector: 'p',  declaration: { 'margin-top': '16px', 'margin-bottom': '16px' } },
    { selector: 'a', declaration: { 'text-decoration': 'underline' } },
];

function styleMatcher(node, rules) {

  // Step 1: loop through every rule
  // if rule.selector matches node.name → attach rule.declaration to node.styles
 const allRules = [...defaultRules, ...rules];
  for (let rule of allRules) {
     if (!rule) continue;
    if (rule.selector === node.name) {
      if (!node.styles) node.styles = {};
    for (let key in rule.declaration) {
        node.styles[key] = rule.declaration[key];
    }
} else if (rule.selector.includes(':')) {
    let e1 = rule.selector.split(',');
    let e2 = e1[0].split(':');
    let e3 = e2[0];
    if (rule.selector === ':root' && node.name === 'html') {
      console.log('matched :root to html node');
     if (!node.styles) node.styles = {};
    for (let key in rule.declaration) {
        node.styles[key] = rule.declaration[key];
    }
}
    if (e3 === node.name) {
        if (!node.styles) node.styles = {};                  
       // console.log('matching rule:', rule.selector, 'to node:', node.name, 'declaration:', rule.declaration);
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