import { SubExercise } from '../SubExercise';
import { NewMath } from '../../../services/math';

export class EasySub extends SubExercise {

  constructor(first: number = EasySub.randNumber(), second: number = EasySub.randNumber(first)) {
    super(first, second);
  }

  private static randNumber(first: number = 0): number {
    if (first > 0) {
      return NewMath.randBetween(1, first % 10);
    } else {
      return NewMath.randBetween(0, 9) * 10 + NewMath.randBetween(1, 9);
    }
  }
}

