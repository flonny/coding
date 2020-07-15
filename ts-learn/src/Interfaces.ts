function printLabel(labeledObj: {label:string}) {
    console.log(labeledObj.label)
}
let myObj = {size: 10,label: 'size 10 obj'}
printLabel(myObj)
interface LabeledValue {
    label:string;
}

function printLabel1(labeledObj:LabeledValue) {
    console.log(labeledObj.label)
}
printLabel1({size: 10,label: 'size 10 obj'} as LabeledValue)

interface SquareConfig {
    color?:string,
    width?:number
}
function createSquare(config:SquareConfig):{color:string,area:number}{
    let newSquare = {color:'white',area:100}
    if(config.color)
        newSquare.color = config.color
    if (config.width)
        newSquare.area = config.width * config.width

    return newSquare
}
let mySquare = createSquare({color:'black'})
console.log(mySquare)
interface Point {
    readonly x: number,
    readonly y?:number
}
let p1 :Point = {x:10}
