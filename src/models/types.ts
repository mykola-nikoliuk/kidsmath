export interface Newable<T = any> {
  new(...args: any): T;
}

export interface IExercise {
  getQuestion(): string;
  tryAnswer(answer: number): boolean;
}
