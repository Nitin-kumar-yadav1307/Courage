function parseCSS(tokens){
    let rules =[];
let currentRule = null ;
 let currentProperty = "";

 for(let token of tokens){
  
    if(token.type == "selector"){
        let newRule = { selector: token.value , declaration:{}}
        currentRule = newRule;

    }
    else if(token.type == "openBlock"){

    }
    else if(token.type == "property"){
         currentProperty = token.value ;
    }
    else if(token.type == "value"){
         currentRule.declaration[currentProperty] = token.value;
    }
    else if (token.type == "closeBlock"){
        rules.push(currentRule);
        currentRule = null ;

    }
    else{
        
    }


 }


    return rules;
}

module.exports ={parseCSS};