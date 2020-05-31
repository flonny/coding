
const css = require('css')

let rules = []
function addCssRules(text) {
  var ast = css.parse(text)
  console.log(JSON.stringify(ast))
  rules.push(...ast.stylesheet.rules)
}

module.exports.addCssRules = addCssRules