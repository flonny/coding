# LL 算法

> BNF
>
> <MulExp>::=<Number>| <MulExp> "*" <Number> |<MulExp> "/" <Number>

## 四则运算

```javascript
// TokenNumber
/[1-9][0-9]*/
// Operator: + - * /
// whitespace: <SP>
// LineTerminator <LF> <CR>
```

