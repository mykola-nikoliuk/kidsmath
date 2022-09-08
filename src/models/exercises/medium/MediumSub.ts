import { NewMath } from '../../../services/math';
import { SubExercise } from '../SubExercise';

export class MediumSub extends SubExercise {

  constructor(first: number = MediumSub.randNumber(),
    second: number = MediumSub.randNumber(first)) {
    super(first, second);
  }

  private static randNumber(first?: number): number {
    let size = NewMath.randBetween(2, 2);
    const digits = [];

    if (typeof first === 'number') {
      const firstNumberDigits = first.toString().split('').reverse().map(v => +v);

      for (let i = 0; i < size; i++) {
        const firstDigit = firstNumberDigits[i] || 0;
        digits.unshift(NewMath.randBetween(1, firstDigit));
      }
    } else {
      while (size--) {
        digits.push(NewMath.randBetween(1, 8));
      }
    }

    return digits
      .reverse()
      .reduce((acc, value, index) => acc + value * Math.pow(10, index), 0);
  }
}
