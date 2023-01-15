export const NewMath = {
  ...Math,
  randBetween(start: number, end: number) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
  },
  pad(num: number, size: number): string {
    let numString = num.toString();
    while (numString.length < size) numString = "0" + numString;
    return numString;
  },
  shuffle<T = any>(array: T[]): T[] {
    const copy = array.slice(0);
    const shuffled = [];

    while (copy.length) {
      const index = Math.floor(Math.random() * copy.length);
      shuffled.push(...copy.splice(index, 1));
    }

    return shuffled;
  }
}
