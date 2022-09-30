const testCase1: number[] = [1,2,3,1];
// Output: 4
// Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
// Total amount you can rob = 1 + 3 = 4.

const testCase2: number[] = [2, 7, 9, 3, 1];
// Output: 12
// Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
// Total amount you can rob = 2 + 9 + 1 = 12.

const testCase3: number[] = [1, 2];

function rob(nums: number[]): number {
  let curr: number = 0; //starting point
  let pre: number = 0; 


  for(let i = 0; i < nums.length; i++){
    let comb: number = nums[i] + pre; //combination of the current number with the previous number
    let max: number = Math.max(comb, curr); // checks if the combination or the current combination is the max number
    pre = curr; // set the previous number from the previous current;
    curr = max; // set the max number into the current number
  }

  return curr;
};

console.log(rob(testCase1));
console.log(rob(testCase2));
console.log(rob(testCase3));
