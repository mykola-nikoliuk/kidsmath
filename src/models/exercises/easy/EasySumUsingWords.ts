import { SumExercise } from '../SumExercise';
import { NewMath } from '../../../services/math';

const digitWordsMap = ['один', 'два', 'три', 'чотири', 'п\'ять', 'шість', 'сім', 'вісім', 'дев\'ять', 'десять']

export class EasySumUsingWords extends SumExercise {

  constructor(first: number = EasySumUsingWords.randNumber(), second: number = EasySumUsingWords.randNumber()) {
    super(first, second);
  }

  getQuestion(): string {
    return `${this.toWord(this.firstNumber)} + ${this.secondNumber} = ?`;
  }

  private toWord(value: number): string {
    return digitWordsMap[value - 1];
  }

  private static randNumber(): number {
    return NewMath.randBetween(1, 10);
  }
}

