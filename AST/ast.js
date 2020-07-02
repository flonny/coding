
/** 
 * <Mul>:=<Num>|<Num> '*' <Mul>|<Num> '/' <Mul>
 * <Add>:=<Mul>|<Mul>+<Add>|<Mul>-<Add>
 * 
 * 
*/
var regexp = /([0-9\.]+)|([ ]+)|([\r\n]+)|(\+)|(\-)|(\*)|(\/)/g
var dictionary = ["Number", "Whitespace", "Identifier", "+", "-", "*", "/"]

function* tokenize(source) {
    var result = null
    var lastIndex = 0
    while (true) {
        lastIndex = regexp.lastIndex;
        result = regexp.exec(source);
        if (!result) break;
        if (regexp.lastIndex - lastIndex > result[0].length) {
            throw new Error(`Unexpected token "${source.slice(lastIndex, regexp.lastIndex - result[0].length)}"`)
        }
        let token = {
            type: null,
            value: null
        }
        for (var i = 0; i < dictionary.length; i++) {
            if (result[i + 1]) {
                token.type = dictionary[i]

            }

        }
        if (!token.type) {
            console.log('unexpect token')
        }
        token.value = result[0]
        yield token
    }

    yield { type: "EOF" }
}
function Expr(source) {
    if (source[1].type === "EOF") {
        let node = {
            type: 'Expr',
            children: [
                source.shift(),
                source.shift()
            ]
        }
        source.unshift(node)
        return node
    }
    AddExpr(source)
    return Expr(source)
}
function AddExpr(source) {
    if (source[0].type === 'Number') {
         MulExpr(source)
    }
    if (source[0].type === 'MulExpr') {
        let node = {
            type: 'AddExpr',
            children: [source.shift()]
        }
        source.unshift(node)
        return AddExpr(source)
    }
    if (source[0].type === 'AddExpr' && source.length > 1 && source[1].type === '+') {
        let node = {
            type: 'AddExpr',
            children: [source.shift(), source.shift()]
        }
        node.children.push(MulExpr(source))
        source.shift()
        source.unshift(node)
        return AddExpr(source)
    }
    if (source[0].type === 'AddExpr' && source.length > 1 && source[1].type === '-') {
        let node = {
            type: 'AddExpr',
            children: [source.shift(), source.shift()]
        }
        node.children.push(MulExpr(source))
        source.shift()
        source.unshift(node)
        return AddExpr(source)
    }
    if (source[0].type === 'AddExpr') {
        return source[0]
    }
}
function MulExpr(source) {
    if (source[0].type === 'Number') {
        let node = {
            type: 'MulExpr',
            children: [source.shift()]
        }
        source.unshift(node)
        return MulExpr(source)
    }
    if (source[0].type === 'MulExpr' && source.length > 1 && source[1].type === '*') {
        let node = {
            type: 'MulExpr',
            children: [source.shift(), source.shift(), source.shift()]
        }
        source.unshift(node)
        return MulExpr(source)
    }
    if (source[0].type === 'MulExpr' && source.length > 1 && source[1].type === '/') {
        let node = {
            type: 'MulExpr',
            children: [source.shift(), source.shift(), source.shift()]
        }
        source.unshift(node)
        return MulExpr(source)
    }
    if (source[0].type === 'MulExpr') {
        return source[0]
    }


}
let source = []
for (let token of tokenize("1024 * 25 + 2*45")) {
    if (token.type !== 'Whitespace' && token.type !== 'Identifier') {
        source.push(token)
    }
}
Expr(source)
console.log(source)
console.log('end')
