










































class jsonParse {
  constructor() {
    this.at = 0;
    this.ch = '';
    this.escapee = {
      '"':'"',
      '\\':'\\',
      '/':'/',
      'b':'b',
      'n':'n',
      'f':'f',
      't':'t',
      'r':'r',
    }
    this.text;
  }
  error(m) {
    throw {
      name: 'SyntaxError',
      message: m,
      at:this.at,
      text: this.text
    }
  }
  next(c) {
    if(c && c!==this.ch) {
      this.error(`Expected ${c} instead of ${this.ch}`)
    }
    this.ch = this.text.charAt(this.at)
    this.at+=1
    return this.ch;
  }
  number() {
    let number,string = "";
    
    if(this.ch === '-') {
      string = '-'
      this.next('-')
    }

    while(this.ch>=0 && this.ch<=9){
      string +=this.ch
      this.next()
    }

    if(this.ch === '.') {
      string+=this.ch
      while(next() && this.ch >= 0 && this.ch <= 9) {
        string += this.ch;
      }
    }

    if(this.ch === 'e' || this.ch === 'E') {
      string += this.ch;
      this.next();
      if(this.ch === '-' || this.ch === '+') {
        string+=this.ch
        this.next()
      }
      while(this.ch >= 0 && this.ch <=9){
        string+=this.ch
        this.next();
      }
      number = +string;
      if(isNaN(number)) {
        this.error("Bad number")
      }else {
        return number
      }
    }  
  }

  string() {
    let hex,i,uffff,string='';
    if(this.ch ==='"') {
      while(this.next()) {
        if(this.ch ==='"') {
          this.next()
          return string
        } else if (this.ch === '\\') {
          this.next()
          if(this.ch === 'u') {
            uffff = 0;
            for(i =0; i<4;i+=1) {
              hex = parseInt(next(), 16);
              if(!isFinite(hex)){
                break;
              }
              uffff = uffff*16 + hex
            }
            string = String.fromCharCode(uffff);
          } else if(typeof this.escapee[this.ch] === 'string') {
            string += this.escapee(this.ch)
          } else{
            break;
          }
        } else {
          string += this.ch
        }
      }
    }
    this.error('Bad string')
  }

  white() {
    while(this.ch && this.ch <= ' ') {
      this.next()
    }
  }

  word() {
    // true false null
    switch(this.ch) {
      case 't':
        this.next('t')
        this.next('r')
        this.next('u')
        this.next('e')
        return true;
      case 'f':
        this.next('f')
        this.next('a')
        this.next('l')
        this.next('s')
        this.next('e')
        return false
      case 'n':
         this.next('n')
         this.next('u')
         this.next('l')
         this.next('l')
         return null
    }
    this.error(`Unexpected "${this.ch}"`)
  }

  array() {
    let array = []
    if(this.ch === '[') {
      this.next('[');
      this.white()
      if(this.ch ===']') {
        this.next(']')
        return array
      }
      while(this.ch) {
        array.push(this.value());
        this.white()
        if(this.ch === ']') {
          this.next(']')
          return array
        }
        this.next(',');
        this.white();
      }
    }
    this.error("Bad array")
  }

  object() {
    let key, object ={}
    if(this.ch === '{') {
      this.next('{');
      this.white();
      if(this.ch === '}') {
        this.next('}')
        return object
      }
      while(this.ch) {
        key = this.string()
        this.white()
        this.next(':')
        object[key] = this.value()
        this.white()
        if(this.ch==='}'){
          this.next('}')
          return object
        }
        this.next(',')
        this.white()
      }
    }
    this.error(`Bad object`)
  }
  
  value() {
    this.white()
    switch (this.ch){
      case '{':
        return this.object();
      case '[':
        return this.array();
      case '"':
        return this.string();
      case '-':
        return this.number();
      default:
        return this.ch >= 0 && this.ch <= 9 ? this.number():this.word()
    }
  }

  parse(source) {
    let result
    this.text = source;
    this.at = 0;
    this.ch = ' ';
    result = this.value()
    this.white()
    if(this.ch) {
      this.error('Syntax error');
    }
    return result
  }
}
var json = new jsonParse;
var  a = {a:'12'}
var  a = JSON.stringify(a)
var b =json.parse(a)
console.log(b.a , '')







