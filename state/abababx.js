//    const pattern = 'abababx'
function match(string) {
    let state = start
    for (const c of string) {
        state = state(c)
    }
    if(state === end) {
        console.log(state)
        return true
    }
    return false
}
function start(c) {
    if (c === 'a') {
        return foundA
    }else {
        return start
    }
}
function foundA(c) {
    if (c === 'b') {
        return foundB
    } else {
        return start(c)
    }
}
function foundB(c) {
    if (c === 'a') {
        return foundA2
    } else {
        return start(c)
    }
}
function foundA2(c) {
    if (c === 'b') {
        return founB2
    } else {
        return start(c)
    }
}
function founB2(c) {
    if (c === 'a') {
        return foundA3
    } else {
        return start(c)
    }

}
function foundA3(c) {
    if (c === 'b') {
        return founB3
    } else {
        return start(c)
    }
}
function founB3(c) {
    if (c === 'x') {
        return end
    } else if (c === 'a') {
        return foundA3
    } else {
        return start(c)
    }
}
function end(c) {
    return end
}
console.log(match('aaaabaababdsabsxbabxaaa'))