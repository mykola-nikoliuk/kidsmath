import { IExerciseWithAnswers } from '../types';
import { AnswersGenerator } from '../../services/AnswersGenerator';

export abstract class SequenceExercise implements IExerciseWithAnswers {

  private readonly answers: number[];
  private readonly sequence: number[];
  private readonly answer: number;

  protected constructor(protected start: number, shift: number, count: number, answersCount: number) {
    this.sequence = [start];
    let previous = start;
    while (--count > 0) {
      previous += shift;
      this.sequence.push(previous);
    }
    this.answer = previous + shift;
    this.answers = AnswersGenerator.generate(this.getAnswer(), 4);
  }

  getQuestion(): string {
    return `Продовжіть послідовність [${[...this.sequence, '?'].join(', ')}]`;
  }

  tryAnswer(answer: string): boolean {
    return parseInt(answer) === this.getAnswer();
  }

  getAvailableAnswers(): number[] {
    return this.answers.slice(0);
  }

  protected getAnswer(): number {
    return this.answer;
  }
}

