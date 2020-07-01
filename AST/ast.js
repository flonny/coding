
var regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g
var dictionary = ["Number", "Whitespace", "Identifier", "+", "-", "*", "/"]

function* tokenize(source) {
    var result = null
    var lastIndex = 0
    do {
        lastIndex = regexp.lastIndex;
        result = regexp.exec(source);
        if (!result) break;
        if(regexp.lastIndex - lastIndex > result[0].length){
            throw new Error(`Unexpected token "${source.slice(lastIndex,regexp.lastIndex-result[0].length)}"`)
        }
        let token = {
            type: null,
            value: null
        }
        for(var i =0;i<dictionary.length;i++) {
            if(result[i+1]) {
                token.type = dictionary[i]
            
            }
      
        }
        if(!token.type){
            console.log('unexpect token')
        }
        token.value = result[0]
        yield token
    } while (result)
    
    yield {type: "EOF"}
}


for(let token of tokenize("1024 + 10 * 25")) {
    console.log(token)
}
console.log('end')
