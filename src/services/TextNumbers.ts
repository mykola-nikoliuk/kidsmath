const numbersToWordMap: Record<number, string> = {
  1: 'один',
  2: 'два',
  3: 'три',
  4: 'чотири',
  5: 'п\'ять',
  6: 'шість',
  7: 'сім',
  8: 'вісім',
  9: 'дев\'ять',
  10: 'десять',
  11: 'одинадцять',
  12: 'дванадцять',
  13: 'тринадцять',
  14: 'чотирнадцять',
  15: 'п\'ятнадцять',
  16: 'шістнадцять',
  17: 'сімнадцять',
  18: 'вісімнадцять',
  19: 'дев\'ятнадцять',
};

const dozensToWordMap: Record<number, string> = {
  0: '',
  1: '',
  2: 'двадцять',
  3: 'тридцять',
  4: 'сорок',
  5: 'п\'ятдесят',
  6: 'шістдесят',
  7: 'сімдесят',
  8: 'вісімдесят',
  9: 'дев\'яносто',
};

const hundredToWordMap: Record<number, string> = {
  1: 'сто',
  2: 'двісті',
  3: 'триста',
  4: 'чотириста',
  5: 'п\'ятсот',
  6: 'шістсот',
  7: 'сімсот',
  8: 'вісімсот',
  9: 'дев\'ятсот',
}

const MINUS = 'мінус';
const ZERO = 'нуль';

export const TextNumbers = {
  // toNumber(text: string): number {
  //
  // },
  toText(number: number): string {
    const positiveNumber = Math.abs(number);
    let result = '';

    if (positiveNumber > 999) throw Error('The function supports up to 999');

    const lastTwoDigits = positiveNumber % 100;
    if (numbersToWordMap.hasOwnProperty(lastTwoDigits)) {
      result = numbersToWordMap[lastTwoDigits];
    } else {
      const [dozen, digit] = lastTwoDigits.toString().split('').map(v => +v);
      result = dozensToWordMap[dozen];

      if (numbersToWordMap.hasOwnProperty(digit)) {
        result += ` ${numbersToWordMap[digit]}`;
      }
    }

    const hundreds = Math.floor(positiveNumber / 100);

    if (hundreds) {
      result = `${hundredToWordMap[hundreds]} ${result}`;
    }

    if (number < 0) {
      return `${MINUS} ${result}`;
    }

    if (number === 0) {
      return ZERO;
    }

    return result;
  }
}