import Queue from '../data-structures/queue';

export function hotPotato(elementsList: any[], num: number) {
  const queue = new Queue();
  const elimitatedList = [];
  for (const ele of elementsList) {
    queue.enqueue(ele);
  }
  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue()); // {3}
    }
    elimitatedList.push(queue.dequeue()); // {4}
  }
  return {
    eliminated: elimitatedList,
    winner: queue.dequeue() // {5}
  };
}
const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);

result.eliminated.forEach(name => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`);
});

console.log(`胜利者： ${result.winner}`);