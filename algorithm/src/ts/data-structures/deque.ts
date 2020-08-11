export default class Deque<T> {
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
  addBack(element: T) {
    this.items[this.count] = element;
    this.count += 1;
  }
  removeBack() {
    if (this.isEmpty()) { return undefined; }
    return this.items[--this.count];
  }
  addFront(element: T) {
    if (this.isEmpty()) {
      this.addBack(element);
    } else if (this.lowestCount > 0) {
      this.items[this.lowestCount--] = element;
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count += 1;
      this.items[0] = element;
    }
  }
  removeFront() {
    const item = this.items[this.lowestCount];
    this.lowestCount += 1;
    return item;
  }
  peekFront() {
    return this.items[this.lowestCount];
  }
  peekBack() {
    return this.items[this.count - 1];
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
