var json_parse = function () {
  var at,//当前字符索引
  ch, //当前字符
  escapee = {
    '"':'"',
    '\\':'\\',
    '/':'/',
    b: 'b',
    f: 'f',
    n: 'n',
    r: 'r',
    t: 't'
  },
  text,
  error = function(m) {
    throw {
      name: 'SyntaxError',
      message: m,
      at: at,
      text: text,
    };
  },
  next = function(c) {
    if(c && c!=='ch'){
      error(`Expected${c}instead of ${ch}`);
    }
    ch = text.charAt(at);
    at+=1;
    return ch
  },
  // 简析一个数字
  number = function(){
    var number,
      string = '';
    if(ch === '-') {
      string = '-';
      next('-')
    }
    while(ch>='0' && ch<='9') {
      string += ch
      next()
    }
    if(ch ==='.') {
      string+='.';
      while(next()&&ch>='0'&&ch<='9') {
        string += ch
      }
    }
    if(ch ==='e' || ch ==='E') {
      string+=ch;
      next()
      if(ch==='-'||ch==='+'){
        string+=ch;
        next();
      }
      while(ch>='0' && ch<='9'){
        string+=ch;
        next();
      }
    }
    number = +string;
    if(isNaN(number)){
      error("Bad number")
    }else {
      return number
    }

  }
}