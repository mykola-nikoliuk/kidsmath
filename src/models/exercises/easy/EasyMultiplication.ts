import { NewMath } from '../../../services/math';
import { MultiplicationExercise } from '../MultiplicationExercise';

export class EasyMultiplication extends MultiplicationExercise {

  constructor(first: number = EasyMultiplication.randNumber(), second: number = EasyMultiplication.randNumber()) {
    super(first, second);
  }

  private static randNumber(): number {
    return NewMath.randBetween(1, 6);
  }
}

