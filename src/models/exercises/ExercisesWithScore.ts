import { Exercises } from './Exercises';
import { Currency } from '../../services/Currency';
import { messages } from '../../messages';
import { IExercise } from '../types';
import { EasySum } from './easy/EasySum';
import { EasySub } from './easy/EasySub';
import { EasySumUsingWords } from './easy/EasySumUsingWords';
import { EasyMultiplication } from './easy/EasyMultiplication';

export class ExercisesWithScore {
  private mistakes = 0;

  constructor(private exercises: Exercises) {
  }

  getView(): string {
    return `${messages.prize} ${Currency.toPrice(this.getScore())}\n\n${this.exercises.getQuestion()}`;
  }

  tryAnswer(answer: number): number {
    if (this.exercises.tryAnswer(answer)) {
      return this.getScore();
    }

    this.mistakes++;

    return -1;
  }

  next() {
    this.exercises.next();
    this.mistakes = 0;
  }

  private getScore(): number {
    const exerciseScore = this.getExerciseScore(this.exercises.getExercise());

    switch (this.mistakes) {
      case 0:
      case 1:
        return exerciseScore;
      case 2:
        return Math.floor(exerciseScore / 2);

      default:
        return 0;
    }
  }

  private getExerciseScore(exercise: IExercise) {
    switch (true) {
      case exercise instanceof EasySum:
      case exercise instanceof EasySub:
        return 5;

      case exercise instanceof EasySumUsingWords:
      case exercise instanceof EasyMultiplication:
        return 6;

      default:
        return 0;
    }
  }
}