function find(source, pattern) {
    let starCount = 0
    for (let c of pattern) {
        if (c === '*') {
            starCount++
        }
    }
    if (starCount === 0) {
        for (let i = 0; i < pattern.length; i++) {
            if (pattern[i] !== source[i] && pattern[i] !== '?') {
                return false
            }
        }
        return;
    }
    let i = 0
    for (i = 0; pattern[i] !== '*'; i++) {
        if (pattern[i] !== source[i] && pattern[i] !== '?') {
            return false
        }
    }
    for (let p = 0; p < starCount - 1; p++) {
        i++
        let subPatter = ""
        while (pattern[i] !== "*" && i<pattern.length) {
            subPatter += pattern[i]
            i++
        }
        console.log(subPatter)
    }

}
find("abcabcabc","a*b*c")