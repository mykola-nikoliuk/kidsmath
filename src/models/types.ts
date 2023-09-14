export interface Newable<T = any> {
  new(...args: any): T;
}

export interface IExercise {
  getQuestion(): string;
  tryAnswer(answer: string): boolean;
}

export interface IExerciseWithAnswers extends IExercise {
  getAvailableAnswers(): number[] | string[];
}
