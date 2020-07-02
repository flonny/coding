class Trie {
    constructor() {
        this.root = Object.create(null)
    }
    insert(word) {
        let node = this.root
        for (let c of word) {
            if (!node[c]) {
                node[c] = Object.create(null)
            }
            node = node[c]
        }
        if (!('$' in node)) {
            node["$"] = 0
        }
        node["$"] += 1
    }
    most() {
        let max = 0
        let maxWord = null
        let visit = (node,word) => {
            if(node.$&&node.$>max){
                max = node.$
                maxWord = word
            }
            for(let p in node) {
                visit(node[p],word+p)
            }
        }
        visit(this.root,"")
        console.log(maxWord)
        console.log(max)
    }

}
function randomWord(length) {
    var s = ''

    for (let i = 0; i < length; i++) {
        charcodeatNUM = Math.random() * 26 + "a".charCodeAt(0)
        s += String.fromCharCode(charcodeatNUM)
    }
    return s
}
var trid = new Trie
for(let i = 0;i<10000;i++) {
    trid.insert(randomWord(4))
}
trid.most()
console.log(trid)
console.log('end')
