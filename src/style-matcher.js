function styleMatcher(node, rules) {

  // Step 1: loop through every rule
  // if rule.selector matches node.name → attach rule.declaration to node.styles
  for (let rule of rules) {
    if (rule.selector === node.name) {

      // create styles object if it doesn't exist
      if (!node.styles) {
        node.styles = {};
      }

      // copy all declarations into node.styles
      for (let key in rule.declarations) {
        node.styles[key] = rule.declarations[key];
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