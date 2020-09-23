// MyCircularQueue(k): 构造器，设置队列长度为 k 。
// Front: 从队首获取元素。如果队列为空，返回 -1 。
// Rear: 获取队尾元素。如果队列为空，返回 -1 。
// enQueue(value): 向循环队列插入一个元素。如果成功插入则返回真。
// deQueue(): 从循环队列中删除一个元素。如果成功删除则返回真。
// isEmpty(): 检查循环队列是否为空。
// isFull(): 检查循环队列是否已满。

class MyCircularQueue {
  constructor(k) {
    this.k = k
    this.front = 0
    this.rear = 0
    this.queue = {}
  }
  isEmpty() {
    return this.rear-this.front === 0
  }
  isFull() { 
    return this.rear - this.front === this.k
  }
  Front() { 
    if(this.isEmpty()) {
      return -1
    }
    return this.queue[this.front]
  }
  Rear() { 
    if(this.isEmpty()) {
      return -1
    }
    return this.queue[this.rear-1]
  }
  enQueue(value) { 
    if(this.isFull()) {
      return false
    }
    this.queue[this.rear] = value
    this.rear++
    return true
  }
  deQueue() { 
    if(this.isEmpty()) {
      return false
    }
    this.front++
    return true
  }
  toString() {
    console.log(`front:${this.front}\n rear:${this.rear}`)
    return this.queue
  }
}



const circularQueue = new MyCircularQueue(3); // 设置长度为 3
circularQueue.enQueue(1);  // 返回 true
circularQueue.enQueue(2);  // 返回 true
circularQueue.enQueue(3);  // 返回 true
console.log(circularQueue.enQueue(4))
circularQueue.enQueue(4);  // 返回 false，队列已满
console.log(circularQueue.toString())
console.log(circularQueue.Rear()) // 返回 3
console.log(circularQueue.isFull()) // 返回 true
console.log(circularQueue.deQueue()) // 返回 true
console.log(circularQueue.enQueue(4)) // 返回 true
console.log(circularQueue.Rear()) //4

