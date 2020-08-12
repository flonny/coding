import { defaultEquals } from '../util';
export class Node<T>{
  private element: T;
  public next: any;
  constructor(element: T) {
    this.element = element;
    this.next = undefined;
  }
}
export class LinkedList<T> {
  private count: number;
  private head: any;
  private equalsFn: any;
  constructor(equalsFn = defaultEquals) {
    this.count = 0; // {2}
    this.head = void 0; // {3}
    this.equalsFn = equalsFn; // {4}
  }
  push(element: T) {
    const node = new Node(element);
    if (this.head) {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    } else {
      this.head = node;
    }
    this.count += 1;
  }
  insert(element: T, position: number) {
    if (position >= 0 && position <= this.count) {
      if (this.isEmpty() || position === this.count) {
        this.push(element);
      } else if (position === 0) {
        const next = this.head;
        this.head = new Node(element);
        this.head.next = next;
        this.count++;
      } else {
        const node = new Node(element);
        let prev = this.head;
        for (let i = 0; i < position - 1; i++) {
          prev = prev.next;
        }
        const next = prev.next;
        prev.next = node;
        node.next = next;
        this.count++;
      }
      return true;
    }
    return false;
  }
  getElementAt(index: number) {
    if (index < 0 || index >= this.count) {
      return undefined;
    } else {
      let current = this.head;
      for (let i = 0; i < index; i++) {
        current = current.next;
      }
      return current;
    }
  }
  remove(element: T) {
    const positon = this.indexOf(element);
    if (positon !== -1) {
      return this.removeAt(positon);
    }
  }
  indexOf(element: T) {
    let current = this.head;
    for (let i = 0; i < this.count; i++) {
      if (this.equalsFn(current.element, element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }
  removeAt(position: number) {
    if (position < 0 || position >= this.count) {
      return undefined;
    } else if (position === 0) {
      const head = this.getElementAt(1);
      const current = this.head;
      this.head = head;
      this.count--;
      return current.element;
    } else {
      let current = this.head;
      let prev;
      for (let i = 0; i < position; i++) {
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
      this.count--;
      return current.element;
    }
  }
  isEmpty() {
    return this.count === 0;
  }
  getHead() {
    return this.head;
  }
  size() {
    return this.count;
  }
  clear() {
    this.count = 0; // {2}
    this.head = void 0; // {3}
  }
  toString() {
    let count = this.count;
    let current = this.head;
    let aString = '';
    while (count--) {
      if (aString) {
        aString = `${aString},${current.element}`;
      } else {
        aString = `${current.element}`;
      }
      current = current.next;
    }
    return aString;
  }
}



