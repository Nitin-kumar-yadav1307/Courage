const { styleMatcher } = require('../src/style-matcher.js');

let fakeNode = {
    type: 'element',
    name: 'div',
    attributes: { 'data-color-mode': 'dark' },
    children: []
};

let rules = [
    { selector: '[data-color-mode="dark"]', declaration: { 'color': 'white' } }
];


let fakeNode2 = {
    type: 'element',
    name: 'input',
    attributes: { disabled: '' },
    children: []
};

let rules2 = [
    { selector: '[disabled]', declaration: { 'opacity': '0.5' } }
];

styleMatcher(fakeNode2, rules2);
console.log('Result2:', fakeNode2.styles);

styleMatcher(fakeNode, rules);
console.log('Result:', fakeNode.styles);