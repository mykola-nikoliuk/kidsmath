import { Exercises } from './exercises/Exercises';
import { easyExercises } from './exercises/easy';
import { ExercisesWithScore } from './exercises/ExercisesWithScore';
import { IBalance } from './Balance';
import { StorageBalance } from './StorageBalance';
import { messages } from '../messages';

export interface IUser {
  exercises: ExercisesWithScore;
  balance: IBalance;
  getDashboard(): string;
}

export class User implements IUser {
  constructor(public exercises: ExercisesWithScore, public balance: IBalance) {
  }

  getDashboard(): string {
    return `${messages.balance}: ${this.balance.getBalance()}\n${this.exercises.getView()}`;
  }
}

export class Users {
  private users: Record<number, User> = {};

  getUserState(userId: number) {
    if (!this.users[userId]) {
      this.users[userId] = this.createNewUser(userId);
    }

    return this.users[userId];
  }

  private createNewUser(userId: number) {
    return new User(
      new ExercisesWithScore(new Exercises(easyExercises), 5),
      new StorageBalance(userId),
    );
  }
}