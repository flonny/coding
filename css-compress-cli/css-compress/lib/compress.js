//copress.js
var css = require("css");
function compress(cssText, isCompress) {
    var compress = true
    if (isCompress === false) { compress = false }

    var ast = css.parse(cssText);
    return css.stringify(ast, { compress: compress });
}
var compresscss = compress(`div {
    width:100px
}`) // div{width:100px;}
console.log(compresscss)
module.exports = compress;