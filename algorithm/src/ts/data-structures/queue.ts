export default class Queue<T> {
  private count: number;
  private lowestCount: number;
  private items: any;
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  size() {
    return this.count - this.lowestCount;
  }
  isEmpty() {
    return this.count === this.lowestCount;
  }
  enqueue(element: T) {
    this.items[this.count] = element;
    this.count += 1;
  }
  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }
    const item = this.items[this.lowestCount];
    this.lowestCount += 1;
    return item;
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  toString() {
    return this.isEmpty() ? '' : Object.values(this.items).join(',');
  }
}
