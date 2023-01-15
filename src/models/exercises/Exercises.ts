import { IExerciseWithAnswers, Newable } from '../types';

export class Exercises implements IExerciseWithAnswers {

  private exercise: IExerciseWithAnswers = this.createExercise();

  constructor(private exerciseClasses: Newable<IExerciseWithAnswers>[]) {}

  getQuestion(): string {
    return this.exercise.getQuestion();
  }

  tryAnswer(answer: number): boolean {
    return this.exercise.tryAnswer(answer);
  }

  next() {
    this.exercise = this.createExercise();
  }

  getExercise(): IExerciseWithAnswers {
    return this.exercise;
  }

  getAvailableAnswers(): number[] {
    return this.exercise.getAvailableAnswers();
  }

  // setExerciseClasses(newExerciseClasses: Newable<IExerciseWithAnswers>[]) {
  //   this.exerciseClasses = newExerciseClasses;
  //   this.next();
  // }

  private createExercise(): IExerciseWithAnswers {
    const ExerciseClass = this.getRandomExerciseClass();
    return new ExerciseClass();
  }

  private getRandomExerciseClass(): Newable<IExerciseWithAnswers> {
    const index = Math.floor(Math.random() * this.exerciseClasses.length);
    return this.exerciseClasses[index];
  }
}
