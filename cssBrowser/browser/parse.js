/**
 * <html maaa=a >
    <head>
        <style>
    body div #myid{
        width:100px;
        background-color: #ff5000;
    }
    body div img{
        width:30px;
        background-color: #ff1111;
    }
        </style>
    </head>
    <body>
        <div>
            <img id="myid"/>
            <img />
        </div>
    </body>
    </html>
 */

function isASCIIAlpha(c) {
  return c.match(/^[a-zA-Z]$/);
}

function isSpace(c) {
  return c.match(/^[\t\n\f ]$/);
}

const EOF = Symbol("EOF");
const EOFToken = {
  type: "EOF",
};
const css = require("css");
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;
let stack = [
  {
    type: "document",
    children: [],
  },
];

let rules = [];
function addCssRules(text) {
  var ast = css.parse(text);
  rules.push(...ast.stylesheet.rules);
}
function computeCss(element) {
  var elements = stack.slice().reverse();
  if (!element.computedStyle) {
    element.computedStyle = {};
  }
  for (let rule of rules) {
    let matched = false;
    var selectorParts = rule.selectors[0].split(" ").reverse();
    if (!match(element, selectorParts[0])) {
      continue;
    }
    var j = 1;
    for (var i = 0; i < elements.length; i++) {
      if (match(elements[i], selectorParts[j])) {
        j++;
      }
      if (j >= selectorParts.length) {
        matched = true;
      }
      if (matched) {
        let sp  =specificity(rule.selectors[0])
        let computedStyle = element.computedStyle;
        for (let declaration of rule.declarations) {
          if(!computedStyle[declaration.property]) {
            computedStyle[declaration.property] = {};
          }
          if(!computedStyle[declaration.property].specificity) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp
          }else if(compare( computedStyle[declaration.property].specificity , sp)<0) {
            computedStyle[declaration.property].value = declaration.value;
            computedStyle[declaration.property].specificity = sp
          }
    
        }
      }
    }
  }
}
function compare(sp1,sp2) {
  if(sp1[0]-sp2[0]) {
    return sp1[0]-sp2[0]
  }
  if(sp1[1]-sp2[1]) {
    return sp1[1]-sp2[1]
  }
  if(sp1[2]-sp2[2]) {
    return sp1[2]-sp2[2]
  }
  return sp1[3]-sp2[3]
}
function specificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
    if (part.charAt(0) === "#") {
      p[1] += 1;
    } else if (part.charAt(0) === ".") {
      p[2] += 1;
    } else {
      p[3] += 1;
    }
  }
  return p;
}
function match(element, selector) {
  if (!selector || !element.attributes) {
    return false;
  }
  if (selector.charAt(0) === "#") {
    var attr = element.attributes.find((attr) => attr.name === "id");
    if (attr && attr.value === selector.replace("#", "")) {
      return true;
    }
  } else if (selector.charAt(0) === ".") {
    var attr = element.attributes.find((attr) => attr.name === "class");
    if (attr && attr.value === selector.replace(".", "")) {
      return true;
    }
  } else {
    if (element.tagName === selector) {
      return true;
    }
  }
  return false;
}
function emit(token) {
  let top = stack[stack.length - 1];
  if (token.type === "startTag") {
    let element = {
      type: "element",
      children: [],
      attributes: [],
    };
    element.tagName = token.tagName;
    for (let p in token) {
      if (p !== "type" && p !== "tagName") {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }
    computeCss(element);
    top.children.push(element);
    // element.parent = top;
    if (!token.isSlefClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === "endTag") {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end don't match");
    } else {
      if (top.tagName === "style") {
        addCssRules(top.children[0].content);
      }
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === "text") {
    if (currentTextNode === null) {
      currentTextNode = {
        type: "text",
        content: "",
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
  // if (token.type !== "text") {
  //   console.log(token);
  // }
}
function data(c) {
  if (c === "<") {
    return tagOpen;
  } else if (c === EOF) {
    emit(EOFToken);
    return;
  } else {
    emit({
      type: "text",
      content: c,
    });
    return data;
  }
}
function tagOpen(c) {
  if (c === "/") {
    return endTagOpen;
  } else if (isASCIIAlpha(c)) {
    currentToken = {
      type: "startTag",
      tagName: "",
    };
    return tagName(c);
  } else if (c === ">") {
    emit(currentToken);
    return data;
  }
}
function endTagOpen(c) {
  if (isASCIIAlpha(c)) {
    currentToken = {
      type: "endTag",
      tagName: "",
    };
    return tagName(c);
  }
  return endTagOpen;
}
function tagName(c) {
  if (isSpace(c)) {
    return beforeAttributeName;
  } else if (isASCIIAlpha(c)) {
    currentToken.tagName += c;
    return tagName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    return emit(EOFToken);
  }
}
function selfClosingStartTag(c) {
  if (c === ">") {
    currentToken.isSlefClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    return emit(EOFToken);
  } else {
    throw new Error("This is an unexpected-solidus-in-tag ");
  }
}
function beforeAttributeName(c) {
  if (isSpace(c)) {
    return beforeAttributeName;
  } else if (c === "=") {
  } else if (c === ">" || c === "/" || c === EOF) {
    return afterAttributeName(c);
  } else {
    currentAttribute = {
      name: "",
      value: "",
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (isSpace(c) || c === "/" || c === ">" || c === "EOF") {
    return afterAttributeName(c);
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<") {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}
//After attribute name state
function afterAttributeName(c) {
  if (isSpace(c)) {
    return afterAttributeName;
  } else if (c === "/") {
    return selfClosingStartTag;
  } else if (c === "=") {
    return beforeAttributeValue;
  } else if (c === ">") {
    emit(currentToken);
    return data;
  } else if (c === EOF) {
    emit(EOFToken);
  } else {
    currentAttribute = {};
  }
}
function beforeAttributeValue(c) {
  if (isSpace(c) || c === "/" || c === ">" || c === "EOF") {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    return singleQuotedAttributeValue;
  } else if (c === ">") {
  } else {
    return unquotedAttributeValue(c);
  }
}
//Switch to the attribute value (double-quoted) state.
function doubleQuotedAttributeValue(c) {
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuetedAttributeValue;
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}
//Switch to the attribute value (single-quoted) state.
function singleQuotedAttributeValue(c) {
  if (c === "'") {
    return afterQuetedAttributeValue;
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}
//Reconsume in the attribute value (unquoted) state.
function unquotedAttributeValue(c) {
  if (isSpace(c)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentAttribute);
    return data;
  } else if (c === "\u0000") {
  } else if (c === '"' || c === "'" || c === "<" || c === "=" || c === "`") {
    currentAttribute.value += c;
    return unquotedAttributeValue;
    throw new Error("unexpected-character-in-unquoted-attribute-value");
  } else if (c === EOF) {
    emit(EOFToken);
  } else {
    currentAttribute.value += c;
    return unquotedAttributeValue;
  }
}
function afterQuetedAttributeValue(c) {
  if (isSpace(c)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === "/") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === ">") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === "EOF") {
    emit(EOFToken);
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    //This is a missing-whitespace-between-attributes parse error.
    return beforeAttributeName(c);
  }
}
module.exports.parseHTML = function (html) {
  let state = data;
  for (let c of html) {
    if (typeof state !== "function") {
      state = data;
    }
    state = state(c);
  }
  state = state(EOF);
  return stack
};
