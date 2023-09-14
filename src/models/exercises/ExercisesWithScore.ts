import { Exercises } from './Exercises';
import { Currency } from '../../services/Currency';
import { messages } from '../../messages';
import { IExercise, IExerciseWithAnswers } from '../types';
import { EasySum } from './easy/EasySum';
import { EasySub } from './easy/EasySub';
import { EasySumUsingWords } from './easy/EasySumUsingWords';
import { EasyMultiplication } from './easy/EasyMultiplication';
import { MediumSub } from './medium/MediumSub';
import { MediumSum } from './medium/MediumSum';
import { EasyDirection } from './easy/EasyDirection';
import { EasySequence } from './easy/EasySequence';

export class ExercisesWithScore {
  private mistakes = 0;

  constructor(private exercises: Exercises) {
  }

  getView(): string {
    return `${messages.prize} ${Currency.toPrice(this.getScore())}\n\n${this.exercises.getQuestion()}`;
  }

  tryAnswer(answer: string): number {
    if (this.exercises.tryAnswer(answer)) {
      return this.getScore();
    }

    this.mistakes++;

    return -1;
  }

  getAvailableAnswers(): ReturnType<IExerciseWithAnswers['getAvailableAnswers']> {
    return this.exercises.getAvailableAnswers();
  }

  next() {
    this.exercises.next();
    this.mistakes = 0;
  }

  private getScore(): number {
    const exerciseScore = this.getExerciseScore(this.exercises.getExercise());

    switch (this.mistakes) {
      case 0:
        return exerciseScore;
      case 1:
        return Math.floor(exerciseScore / 2);

      default:
        return 0;
    }
  }

  private getExerciseScore(exercise: IExercise) {
    switch (true) {
      case exercise instanceof EasySum:
      case exercise instanceof EasySub:
      case exercise instanceof EasyDirection:
        return 5;

      case exercise instanceof EasySumUsingWords:
      case exercise instanceof EasyMultiplication:
      case exercise instanceof MediumSub:
      case exercise instanceof MediumSum:
      case exercise instanceof EasySequence:
        return 6;

      default:
        return 0;
    }
  }
}
