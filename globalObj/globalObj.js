var set = new Set();
var globalProperties = [
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "Array",
  "Date",
  "RegExp",
  "Promise",
  "Proxy",
  "Map",
  "WeakMap",
  "Set",
  "WeakSet",
  "Function",
  "Boolean",
  "String",
  "Number",
  "Symbol",
  "Object",
  "Error",
  "EvalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError",
  "ArrayBuffer",
  "SharedArrayBuffer",
  "DataView",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Int16Array",
  "Int32Array",
  "Uint8Array",
  "Uint16Array",
  "Uint32Array",
  "Uint8ClampedArray",
  "Atomics",
  "JSON",
  "Math",
  "Reflect",
];

var queue = [];

for (var p of globalProperties) {
  queue.push({
    path: [p],
    object: this[p],
  });
}

let current;
while (queue.length) {
  current = queue.shift();
  if (set.has(current.object)) continue;
  console.log(current.path.join('.'))
  set.add(current.object);
  for (let p of Object.getOwnPropertyNames(current.object)) {
    var property = Object.getOwnPropertyDescriptor(current.object, p);
    if (
      typeof property.value === 'object' &&
      property.hasOwnProperty("value") &&
      property.value instanceof Object
    ) {
      queue.push({
        object: property.value,
        path: current.path.concat([p]),
      });
    }
    if (property.hasOwnProperty("get")&&(typeof property.get ==='function')) {
      queue.push({
        object: property.get,
        path: current.path.concat([p]),
      });
    }
    if (property.hasOwnProperty("set")&&(typeof property.set ==='function')) {
      queue.push({
        object: property.set,
        path: current.path.concat([p]),
      });
    }
  }
}
console.log(queue);
