export default class Stack<T> {
  private items: any;
  private count: number;
  constructor() {
    this.items = {};
    this.count = 0;
  }
  size() {
    return this.count;
  }
  isEmpty() {
    return this.count === 0;
  }
  push(element: T) {
    this.count += 1;
    this.items[this.count] = element;
  }
  pop() {
    return this.isEmpty() ? this.items[this.count] : this.items[this.count--];
  }
  peek() {
    return this.items[this.count];
  }
  clear() {
    this.items = {};
    this.count = 0;
  }
  toString() {
    return this.isEmpty() ? '' : Object.values(this.items).join(',');
  }
}
