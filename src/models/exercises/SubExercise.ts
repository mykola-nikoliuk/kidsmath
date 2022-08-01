import { IExercise } from '../types';

export abstract class SubExercise implements IExercise {

  protected constructor(private firstNumber: number, private secondNumber: number) {}

  getQuestion(): string {
    return `${this.firstNumber} - ${this.secondNumber} = ?`;
  }

  tryAnswer(answer: number): boolean {
    return answer === this.getAnswer();
  }

  protected getAnswer(): number {
    return this.firstNumber - this.secondNumber;
  }
}

