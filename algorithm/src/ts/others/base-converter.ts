import Stack from '../data-structures/stack';

export function decimalToBinary(decNumber: number): string {
  const remStack = new Stack();
  let binaryString  = '';
  let number = decNumber;
  let rem;
  while (number > 0) {
    rem = number % 2;
    remStack.push(rem);
    number = Math.floor(number / 2);
  }
  while (!remStack.isEmpty()) {
    binaryString  += remStack.pop();
  }
  return binaryString ;
}
export function baseConverter(decNumber: number, base: number): string {
  if (base > 36) {
    return '';
  }
  const remStack = new Stack();
  const digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let baseString = '';
  let number = decNumber;
  let rem;
  while (number > 0) {
    rem = number % base;
    remStack.push(rem);
    number = Math.floor(number / base);
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()]; // {7}
  }
  return  baseString;
}
