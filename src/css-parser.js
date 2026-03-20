// CSS Parser — takes flat token array from css-tokenizer
// builds structured rule objects: { selector, declaration }
// same idea as dom-builder — flat list → structured data

function parseCSS(tokens) {
    let rules = [];           // all completed rules collected here
    let currentRule = null;   // the rule currently being built
    let currentProperty = ""; // holds property name until its value arrives

    for (let token of tokens) {

        if (token.type === 'selector') {
            // start of a new rule — create fresh rule object
            // declaration starts empty — filled as property/value pairs arrive
            let newRule = { selector: token.value, declaration: {} };
            currentRule = newRule;

        } else if (token.type === 'openBlock') {
            // { encountered — rule already started at selector
            // nothing to do here

        } else if (token.type === 'property') {
            // property name arrived e.g. "color"
            // store it temporarily — value comes next
            currentProperty = token.value;

        } else if (token.type === 'value') {
            // value arrived e.g. "red"
            // now we have both key and value — add to declaration
            // currentProperty = "color", token.value = "red"
            // → declaration["color"] = "red"
            currentRule.declaration[currentProperty] = token.value;

        } else if (token.type === 'closeBlock') {
            // } encountered — rule is complete
            // push to rules array and reset for next rule
            rules.push(currentRule);
            currentRule = null;
        }
    }

    return rules;
}

module.exports = { parseCSS };