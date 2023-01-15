import { IExerciseWithAnswers } from '../types';
import { AnswersGenerator } from '../../services/AnswersGenerator';

export abstract class SubExercise implements IExerciseWithAnswers {

  private readonly answers: number[];

  protected constructor(protected firstNumber: number, protected secondNumber: number) {
    this.answers = AnswersGenerator.generate(this.getAnswer(), 4);
  }

  getQuestion(): string {
    return `${this.firstNumber} - ${this.secondNumber} = ?`;
  }

  tryAnswer(answer: number): boolean {
    return answer === this.getAnswer();
  }

  getAvailableAnswers(): number[] {
    return this.answers.slice(0);
  }

  protected getAnswer(): number {
    return this.firstNumber - this.secondNumber;
  }
}

