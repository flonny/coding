/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}
class LinkList {
    constructor(arr) {
        this.head = null
        if (arr) { this.factory(arr) }
    }
    factory(arr) {
        let current
        for (let c of arr) {
            if (!this.head) {
                this.head = new ListNode(c);
                current = this.head
            } else {
                current.next = new ListNode(c);
                current = current.next
            }
        }
    }
    toArray() {
        let arr = []
        let current = this.head
        while (current) {
            arr.push(current.val)
            current = current.next
        }
        return arr

    }
}
// [1,2,4]
// [1,3,4]
const l1 = new LinkList([1, 2, 4])
console.log(l1.toArray())
const l2= new LinkList([1, 3, 4])
var mergeTwoLists = function (l1, l2) {
    console.log(l1, l2)
    var i = 0
    let newHead = new ListNode(0)
    let current = newHead
    while (l1 || l2) {
        i++
        console.log(i)
        if (l1 && l2) {
            let smallNode = null
            if (l1.val <= l2.val) {
                smallNode = new ListNode(l1.val)
                l1 = l1.next
            } else {
                smallNode = new ListNode(l2.val)
                l2 = l2.next
            }
            current.next = smallNode
            current = current.next
        } else if (l1) {
            current.next = l1
            l1 = null
            return newHead.next
        } else {
            current.next = l2
            l2 = null
            return newHead.next
        }
        if(i>100) {
            break;
        }
    }

    return newHead.next
};
console.log(mergeTwoLists(l1.head,l2.head))