import { IExercise, Newable } from '../types';

export class Exercises implements IExercise {

  private exercise: IExercise = this.createExercise();

  constructor(private exerciseClasses: Newable<IExercise>[]) {}

  getQuestion(): string {
    return this.exercise.getQuestion();
  }

  tryAnswer(answer: number): boolean {
    return this.exercise.tryAnswer(answer);
  }

  next() {
    this.exercise = this.createExercise();
  }

  getExercise(): IExercise {
    return this.exercise;
  }

  // setExerciseClasses(newExerciseClasses: Newable<IExercise>[]) {
  //   this.exerciseClasses = newExerciseClasses;
  //   this.next();
  // }

  private createExercise(): IExercise {
    const ExerciseClass = this.getRandomExerciseClass();
    return new ExerciseClass();
  }

  private getRandomExerciseClass(): Newable<IExercise> {
    const index = Math.floor(Math.random() * this.exerciseClasses.length);
    return this.exerciseClasses[index];
  }
}