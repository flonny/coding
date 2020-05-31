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

const EOF = Symbol("EOF");
const EOFToken = {
  type: "EOF",
};
let currentToken = null;
let currentAttribute = null;
let stack = [
  {
    type: "document",
    children: [],
  },
];
function isASCIIAlpha(c) {
  return c.match(/^[a-zA-Z]$/);
}
function isSpace(c) {
  return c.match(/^[\t\n\f ]$/);
}
function emit(token) {
  if (token.type === "text") return;
  let currentTextNode = null;
  let top = stack[stack.length - 1];
  console.log(token.tagName);
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
    top.children.push(element);
    element.parent = top;
    if (!token.isSlefClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === "endTag") {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end don't match");
    } else {
      stack.pop();
    }
    currentTextNode = null;
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
  console.log(stack[0]);
};
