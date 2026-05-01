// CSS Tokenizer — reads raw CSS text character by character
// breaks it into meaningful tokens: selector, property, value, openBlock, closeBlock
// same idea as html-tokenizer but CSS has different landmark characters

function tokenizeCSS(css) {

    let tokens = [];       // all tokens collected here
    let characters = "";   // current token being built character by character
    let inBlock = false;
    // the four characters that signal something is starting or ending in CSS
    const landmark = ['{', '}', ':', ';'];

    for (let i = 0; i < css.length; i++) {
        let char = css.charAt(i);

        if (char === '{') {
            // opening brace means everything collected so far is the selector
            // e.g. "h1 " → selector "h1"
            // trim() removes extra whitespace like "h1 " → "h1"
            inBlock=true;
            tokens.push({ type: 'selector', value: characters.trim() });
            tokens.push({ type: 'openBlock' }); // marks start of rule block
            characters = ""; // reset — start collecting next token

        }  else if (char === '}') {
    inBlock = false;
    if (characters.trim()) {
        tokens.push({ type: 'value', value: characters.trim() });
    }
    tokens.push({ type: 'closeBlock' });
    characters = "";
    
   }else if (char === ':') {
       if(inBlock){
        tokens.push({ type: 'property', value: characters.trim() });
        characters = "";
       } 
       else {
        characters += char;
       }
    } else if (char === ';') {
            // semicolon ends a declaration
            // everything collected so far is the value e.g. "red" or "16px"
            tokens.push({ type: 'value', value: characters.trim() });
            characters = ""; // reset — next we collect the next property

        } else {
            // not a landmark — just a regular character
            // keep building the current token
            characters += char;
        }
    }

    return tokens;
}

module.exports = { tokenizeCSS };