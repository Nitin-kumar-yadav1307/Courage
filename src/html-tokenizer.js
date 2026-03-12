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
    for(let attr of attributeParts){
      let key = attr.split('=')[0];
      let value = attr.split('=')[1];
     value = value.slice(1, value.length - 1); 
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