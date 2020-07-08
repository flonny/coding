let useReactivities = []
let handlers = new Map()
let reactiveDep = new Map()
export function reactive(obj) {
  if (reactiveDep.get(obj)) {
    return reactiveDep.get(obj)
  }
  let proxy = new Proxy(obj, {
    get: function (obj, prop) {
      useReactivities.push([obj, prop])
      if (typeof obj[prop] === 'object') {
        return reactive(obj[prop])
      }
      return prop in obj ? obj[prop] : void 0;
    },
    set: function (obj, prop, newVal) {
      obj[prop] = newVal
      if (handlers.has(obj) && handlers.get(obj).has(prop)) {
        for (let handler of handlers.get(obj).get(prop)) {
          handler()
        }
      }
      return newVal
    },
    has: function (obj, prop) {
      if (prop[0] === '_') {
        return false;
      }
      if (typeof obj[prop] === 'string' || typeof obj[prop] === 'number') {
        useReactivities.push([obj, prop])
      }
      return prop in obj;
    },
    deleteProperty: function (obj, prop) {
      if (handlers.get(obj) && handlers.get(obj).has(prop)) {
        for (let handler of handlers.get(obj).get(prop)) {
          if (prop in obj) {
            delete obj[prop]
          }
          handler()
        }
      }
      return true;
    }
  })
  reactiveDep.set(obj, proxy)
  return proxy
}

export function effect(handler) {
  handler()
  for (let useReactivity of useReactivities) {
    const [obj, prop] = useReactivity
    if (!handlers.has(obj)) {
      handlers.set(obj, new Map())
    }
    if (!handlers.get(obj).has(prop)) {
      handlers.get(obj).set(prop, [])
    }
    handlers.get(obj).get(prop).push(handler)
  }
}

let dummy
const obj = reactive({ prop: 'value' })
effect(() => {dummy = 'prop' in obj })
console.log(1, dummy)
delete obj.prop
console.log(2, dummy)
obj.prop = 12
console.log(3, dummy)