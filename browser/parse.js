const EOF = Symbol("EOF")
function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        return;
    }
    else {
        return data
    }
}

function tagOpen(c) {
    if(c ==="/"){
        return endTagOpen
    }else if(c.match(/^[a-zA-Z]$/)) {
        return tagName(c)
    }
}
function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    }else if (c ==='/') {
        return selfClosingStartTag;
    }else if(c.match(/^[a-zA-Z]$/)) {
        return tagName;
    }else if (c==='>') {
        return data;
    } else {
        return tagName;
    }
}
function endTagOpen(c) {
    if(c.match(/^[a-zA-Z]$/)) {
        return
    }
}
function beforeAttributeName(c) { }
function selfClosingStartTag() { }
























module.exports.parseHTML = function (html) {
    let state = data;
    for (let c of html) {
        state = state(c)
    }
    state = state(EOF)
}