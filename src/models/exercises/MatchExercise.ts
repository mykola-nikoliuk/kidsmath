import { IExerciseWithAnswers } from '../types';

export abstract class MatchExercise implements IExerciseWithAnswers {

  private readonly pairIndex: number;
  private readonly answers: string[];

  protected constructor(protected pairs: [string, string][]) {
    this.pairIndex = Math.floor(Math.random() * pairs.length);
    this.answers = this.pairs.map(([, b]) => b);
  }

  getQuestion(): string {
    return `Оберіть пару: ${this.pairs[this.pairIndex][0]}`;
  }

  tryAnswer(answer: string): boolean {
    return answer === this.getAnswer();
  }

  getAvailableAnswers(): string[] {
    return this.answers.slice(0);
  }

  protected getAnswer(): string {
    return this.pairs[this.pairIndex][1];
  }
}

