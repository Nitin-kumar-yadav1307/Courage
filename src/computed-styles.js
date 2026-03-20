// Computed Styles — reads the final styles attached to any DOM node
// after styleMatcher runs, every matched node has node.styles attached
// this function just reads what's already there — clean and simple

function getComputedStyle(node) {

    // if no styles were matched to this node — return empty object
    // never return undefined or null — always safe to use
    if (!node.styles) {
        return {};
    }

    // return the styles object attached by styleMatcher
    // e.g. { color: 'red', 'font-size': '16px', background: '#eee' }
    return node.styles;
}

module.exports = { getComputedStyle };