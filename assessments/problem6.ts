// Longest substring

const testCase1String: string = "aaabb";
const testCase1Amount: number = 3;

const testCase2String: string = "ababbc";
const testCase2Amount: number = 2;

const testCase3String: string = "ababacb";
const testCase3Amount: number = 3;

//using the Divide and Conquer Algo
function findLongestSubString(str: string, left: number, right: number, freq: number): number {
  const arrOfLetters = str.split(""); //Split the string into an array

  // if the right side (at first pass would be the length of the array) is less than the frequency of letters, return 0;
  if(right < freq){ 
    return 0;
  }

  const countStrings: Record<string, number> = {};

  for(let i = left; i < right; i++){
    // Count the times a letter has popped up in the array and store it into an object
    countStrings[arrOfLetters[i]] = countStrings[arrOfLetters[i]] ? countStrings[arrOfLetters[i]] + 1 : 1;
  }

  for(let j = left; j < right; j++){
    //Check if the count of a letter from the countStrings object is larger or equal than the frequency of letters
    if(countStrings[str.charAt(j)] >= freq){
      continue;
    }

    let next = j + 1;

    //While the next count is smaller than the right count and the count of the times the letter appears is less than the
    //frequency, increase the next count
    while (next < right && countStrings[str.charAt(next)] < freq){
      next++
    };

    //perform a recursive to the split array and find the maximum amount from the left side of an array and the right side of the array or splits
    return Math.max(findLongestSubString(str, left, j, freq), findLongestSubString(str, next, right, freq));
  }

  return right - left;
}

function longestSubstring(s: string, k: number): number {
  return findLongestSubString(s, 0, s.split("").length, k);
};


console.log(longestSubstring(testCase1String, testCase1Amount)); // Answer: 3
console.log(longestSubstring(testCase2String, testCase2Amount)); // Answer: 5
console.log(longestSubstring(testCase3String, testCase3Amount)); // Answer: 0
