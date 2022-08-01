import { SumExercise } from '../SumExercise';

export class EasySum extends SumExercise {

  constructor(first: number = EasySum.randNumber(), second: number = EasySum.randNumber()) {
    super(first, second);
  }

  private static randNumber(): number {
    return Math.floor(Math.random() * 10) + 1;
  }
}

