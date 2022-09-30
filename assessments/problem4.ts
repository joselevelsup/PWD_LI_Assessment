//Bubble Sort
// Bubble sorting is taking an array and sorting it but changing up the places in the array. Bubble sorting passes through the array multiple times and changes the position of 2 items in an array, starting with the current and the next. The last loop makes sure that the array is fully sorted through.

function bubbleSortNumbers(nums: number[]) {
  for(let i = 0; i < nums.length; i++){
    for(let j = 0; j < nums.length; j++){
      const currNum = nums[j];
      const nextNum = nums[j + 1];
      if(currNum > nextNum){
        nums[j] = nextNum;
        nums[j + 1] = currNum;
      }
    }
  }

  return nums;
}

(() => {
  let testCase1: number[] = [5, 1, 4, 2, 8]; //Comes out as 1, 2, 4, 5, 8
  let testCase2: number[] = [5, 1]; // Comes out as 1, 5
  let testCase3: number[] = [8, 10, 2, 7, 1, 4, 3] //Comes out as 1, 2, 3, 4, 7, 8, 10

  console.log(bubbleSortNumbers(testCase1));
  console.log(bubbleSortNumbers(testCase2));
  console.log(bubbleSortNumbers(testCase3));
})()

