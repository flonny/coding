import Deque from '../data-structures/deque';

export function palindromeChecker(aString: string) {
  if (aString.trim() === '') {
    return false;
  }
  const deque = new Deque;
  let isEqual = true;
  for (const c of aString) {
   (c!==' ') && (deque.addBack(c.toLowerCase()));
  }
  while (!deque.isEmpty() && isEqual) {
    if (deque.size() === 1) {
      deque.removeBack();
    } else if (deque.removeBack() === deque.removeFront()) {
      continue;
    } else {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log('\n\n------ begin: test ------');
console.log(palindromeChecker(''));
console.log(palindromeChecker('a'));
console.log(palindromeChecker('aa'));
console.log(palindromeChecker('aba'));
console.log(palindromeChecker('ab'));
console.log(palindromeChecker('kayak'));
console.log(palindromeChecker('radar'));
console.log(palindromeChecker('level'));
console.log(palindromeChecker('Was it a car or a cat I saw'));
console.log('------ end: test ------\n\n');



