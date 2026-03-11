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
     tokens.push({ type: 'open', name: characters.split(' ')[0] });
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