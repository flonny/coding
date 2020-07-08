/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 * 前中后序
 *
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
  return root ? [root.val, ...preorderTraversal(root.left), ...preorderTraversal(root.right)] : []
};

