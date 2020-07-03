/**basic types */
function basicTypes(): void {
    let isDone: boolean = false
    let decimal: number = 6
    let hex: number = 0xf00d
    let binary: number = 0b1010
    let octal: number = 0o744
    let color: string = "blue"
    color = 'red'
    let fullName: string = "Bob Bob"
    let age: number = 17
    let sentence: string = `Hello, my name is ${fullName}
    i'll be ${age + 1} years old
    `
    console.log(sentence)

    // for(let a of list ) {
    //     console.log(a)
    // }
    // var list: number[] = [1, 2, 3]
    let list: Array<number> = [2, 3, 4, 5]
    list = [4, 5, 6, 7]
    for (let a of list) {
        console.log(a)
    }
    /*tuple*/
    let x: [string, number]
    x = ["hello", 12,]
    x[1].toFixed(1)
    x.push('123') // don't do this
    for (let a of x) {
        console.log(a)
    }
    /*Enum Enum 类型不可枚举*/
    // enum Color {Red,Green,Blue}
    // console.log(Color)
    // let c:Color =Color.Green
    enum Color { Yellow = 5, Green, Blue = "asd" }
    console.log(Color)
    let n: number = Color.Green
    console.log(n)
    let notSure: any = 4
    notSure = "maybe a string"
    notSure = false
    notSure = 400
    notSure.toFixed(2)
    console.log(notSure.toFixed(2))
    let prettySure: Object = 4
    // console.log(prettySure.toFixed(2)) // Property 'toFixed' does not exist on type 'Object'.
    let mixinlist: any[] = [1, true, 'fff']
    console.log(mixinlist)
    //注意：我们鼓励您--strictNullChecks在可能的情况下使用，但出于本手册的目的，我们将其视为已关闭
    let undefined: null = null
    console.log(undefined)
    // let nn:undefined = undefined //不能将类型“null”分配给类型“undefined”。
    let nn: undefined = void 0
    console.log(nn)
    let someValue: any = "this is a string"
    let strLength: number = (<string>someValue).length
    strLength = someValue.length
    strLength = (someValue as string).length

    function warnUser(): void {
        console.warn('this is warn')
    }
    warnUser()
    function error(message: string): never {
        throw new Error(message)
    }
    // error('error')
    function fail(): never {
        return error('faild')
    }
    // fail()
    function infiniteLoop(): never {
        while (true) { }
    }

}

function variableDeclarations(): void {
    let tuple: [number, string, boolean] = [7, 'hello', true]
    let [a, b, c] = tuple
    console.log([a, b, c])
  
}
debugger;
function f() {
 
    var a = 1;

    a = 1;
    var b = g();
    a = 3;

    return b;

    function g() {
        console.log(a)
        return a;
    }
}
console.log(f())
variableDeclarations()