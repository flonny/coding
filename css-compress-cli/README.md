# 写一个简单的 node.js cli 

> 主要是用代码实现一个简单的css压缩cli
>
> 文笔不行，直接上代码了

## 初始化项目

```bash
mkdir css-compress
cd css-compress
npm init -y
```

> node.js cli工具参数读取配置需要通过 [Commander](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md) 实现，具体配置在他的文档中写的很清楚，等会我只会介绍用到的功能

```bash
npm install commander
```

> css 压缩通过 [css npm](https://www.npmjs.com/package/css) 实现

```bash
npm install css
```

> 读写文件通过 [fs-extra](https://www.npmjs.com/package/fs-extra)去实现

```bash
npm i fs-extra
```

## 压缩css

> 在css-compress 创建lib目录，并在lib下新建文件copress.js 用于写压缩css 的代码
>
> 这个目录可以自己去设置，个人习惯时在 lib 写主逻辑

```bash
mkdir lib
cd lib
touch copress.js
```

> css 压缩的代码使用 css npm 已经特我们实现了，我们只用调用的的方法就行了
>
> css.parse 将css 字符串转换为抽象语法树，然后直接将抽象语法树转换为css 字符串，并启用压缩功能

> 提示：在将css 语法树转为抽象语法树后，可以对这个css字符串进行各种操作，比如将 px 转为 vw。

> 安利下我自己写的cli工具  [pxtovw cli ](https://github.com/flonny/pxToVw) 和 webpack插件 [pxtovw-loader ](https://github.com/flonny/pxtovw-loader)

> 可以在node运行下这个代码，简单的测试能不能正常工作

```javascript
//copress.js
var css = require("css");
function compress(cssText) {
    var ast = css.parse(cssText);
    return css.stringify(ast, { compress: true });
}
var compresscss =  compress(`div {
    width:100px
}`) // div{width:100px;}
console.log(compresscss)
module.exports = compress;
```

## 文件读取、转换、输出、命令行参数设置

> 在css-compress 目录下新建文件 bin 目录，并新建文件compress-cli.js，并在package.json中指定这个是入口文件
>
> 目录和文件命名都可以自己设置，只要和package.json中的对应就行了

```bash
mkdir bin
cd bin
touch compress-cli.js
```

```json
{
  "name": "css-compress",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "bin": {
    "css-compress": "./bin/compress-cli.js"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "commander": "^5.1.0",
    "css": "^3.0.0",
    "fs-extra": "^9.0.1",
  }
}
```

