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
    if(this.isEmpty()) {
      this.addBack(element);
    }else if(this.lowestCount>0) {
      this.items[this.lowestCount]
    }
  }
  removeFront() {
    const item = this.items[this.lowestCount];
    this.lowestCount += 1;
    return item;
  }

}
