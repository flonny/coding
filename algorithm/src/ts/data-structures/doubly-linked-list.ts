import { defaultEquals, IEqualsFunction } from '../util';
import LinkedList from './linked-list';
import { DoublyNode } from './models/linked-list-models';

export default class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | undefined;
  protected tail: DoublyNode<T> | undefined;

  constructor(protected equalsFn: IEqualsFunction<T> = defaultEquals) {
    super(equalsFn);
  }
  push(element: T) {
    const node = new DoublyNode(element);
    if (this.tail) {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
    this.count++;
  }
  getTail() {
    return this.tail;
  }
  insert(element: T, position: number) {
    if (position >= 0 && position <= this.count) {
      if (this.isEmpty() || position === this.count) {
        this.push(element);
      } else if (position === 0) {
        const next = this.head;
        this.head = new DoublyNode(element);
        this.head.next = next;
        next.prev = this.head;
        this.count++;
      } else {
        const node = new DoublyNode(element);
        let prev = this.head;
        for (let i = 0; i < position - 1; i++) {
          prev = prev.next;
        }
        const next = prev.next;
        prev.next = node;
        node.prev = prev;
        next.prev = node;
        node.next = next;
        this.count++;
      }
      return true;
    }
    return false;
  }
  removeAt(position: number) {
    if (position < 0 || position >= this.count) {
      return undefined;
    } else if (this.count === 1) {
      const current = this.head;
      this.head = undefined;
      this.tail = undefined;
      this.count--;
      return current.element;
    } else if (position === 0) {
      const head = this.getElementAt(1);
      const current = this.head;
      this.head = head;
      this.head.prev = undefined;
      this.count--;
      return current.element;
    } else if (position === this.count - 1) {
      const current = this.tail;
      const tail = this.tail.prev;
      tail.next = undefined;
      this.tail = tail;
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
      current.next.prev = prev;
      this.count--;
      return current.element;
    }
  }
  inverseToString() {
    let count = this.count;
    let current = this.tail;
    let aString = '';
    while (count--) {
      if (aString) {
        aString = `${aString},${current.element}`;
      } else {
        aString = `${current.element}`;
      }
      current = current.prev;
    }
    return aString;
  }
}
