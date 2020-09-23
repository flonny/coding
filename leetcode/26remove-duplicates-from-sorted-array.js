/**
 * @param {number[]} nums
 * @return {number}
 */
let nums = [1,1,2]
var removeDuplicates = function(nums) {
    for(let i =0;i<nums.length;i++) {
        debugger
        if(nums.indexOf(nums[i]) !==i) {
            nums.splice(i,1)
        }
 
    }
    return nums.length
    };
    removeDuplicates(nums)