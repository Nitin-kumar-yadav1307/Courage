/**
 * The function `tokenize` parses an HTML string and returns an array of tokens representing the
 * elements and text within the HTML.
 * @param html - The function `tokenize` takes an HTML string as input and tokenizes it into an array
 * of tokens. It identifies different types of tokens such as text, opening tags, closing tags, and
 * attributes. The function parses the HTML string character by character and constructs tokens based
 * on the encountered characters.
 * @returns The function `tokenize` returns an array of tokens representing the HTML input. Each token
 * is an object with a `type` property indicating whether it is a text, open tag, or close tag, and
 * additional properties such as `value`, `name`, and `attributes` depending on the type of token.
 */
function tokenize(html) {
  let tokens = [];

  let inTag = false ;
  let characters = "";

  for(let i = 0 ; i<html.length ; i++){
     let char = html.charAt(i);
     if(char == '<'){
        inTag = true;
        if(characters != ""){
           tokens.push({ type: 'text', value: characters });
            characters = "";
        }
     }
     else if(char == '>'){
   inTag = false;

   if(characters.toLowerCase().startsWith('!doctype')){
     characters = '';
     continue;
   }

   if(characters[0] == '/'){
     tokens.push({ type: 'close', name: characters.slice(1) });
   } else {
    let parts = characters.split(' ');
    let tagName = parts[0];
    let attributeParts = parts.slice(1);
    let attributes = {};
    for (let attr of attributeParts) {
    if (!attr.includes('=')) continue; // skip attributes with no value
    let key = attr.split('=')[0];
    let value = attr.split('=').slice(1).join('='); // handle values containing =
    if (value.startsWith('"') || value.startsWith("'")) {
        value = value.slice(1, value.length - 1);
    }
    attributes[key] = value;
}
     tokens.push({ type: 'open', name: tagName ,attributes });
   }

   characters = "";
}
     else{
        characters += char;
     }
  }
  

  
  return tokens;
}


module.exports = { tokenize }