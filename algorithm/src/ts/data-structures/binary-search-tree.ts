import { Compare, defaultCompare, ICompareFunction } from '../util';
import { Node } from './models/node';

export default class BinarySearchTree<T> {
    protected root: Node<T>;

    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) { }
    getRoot() {
        return this.root;
    }
    insert(key: T) {
        if (!this.root) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key)
        }
    }
    insertNode(node: Node<T>, key: T) {
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (!node.left) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (!node.right) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    inOrderTraverse(callback: any) {
        this.inOrderTraverseNode(this.root, callback); // {1}
    }
    inOrderTraverseNode(node: Node<T>, callback: any) {
        if (node != null) { // {2}
        this.inOrderTraverseNode(node.left, callback); // {3}
        callback(node.key); // {4}
        this.inOrderTraverseNode(node.right, callback); // {5}
      }

    }
}
const tree = new BinarySearchTree<number>();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
const printNode = (value: number) => console.log(value); // {6}
tree.inOrderTraverse(printNode); // {7}