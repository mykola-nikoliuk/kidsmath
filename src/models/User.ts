import { Exercises } from './exercises/Exercises';
import { easyExercises } from './exercises/easy';
import { ExercisesWithScore } from './exercises/ExercisesWithScore';
import { IBalance } from './Balance';
import { StorageBalance } from './StorageBalance';
import { DailyBalance } from './DailyBalance';
import { messages } from '../messages';

export interface IUser {
  exercises: ExercisesWithScore;
  balance: IBalance;
  getDashboard(): string;
}

export class User implements IUser {
  constructor(public exercises: ExercisesWithScore, public balance: DailyBalance) {
  }

  getDashboard(): string {
    return [
      `${messages.balance} ${this.balance.getBalance()}\n`,
      `${messages.dailyBalance} ${this.balance.getDailyBalance()}\n`,
      `${this.exercises.getView()}`,
    ].join('');
  }

  tryAnswer(answer: string) {
    const score = this.exercises.tryAnswer(answer);
    const isAnswerCorrect = score >= 0;
    const result = isAnswerCorrect ? messages.correct : messages.incorrect;

    if (isAnswerCorrect) {
      this.exercises.next();
      this.balance.debit(score);
    }

    return `${result}\n\n${this.getDashboard()}`;
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
    const storageBalance = new StorageBalance(userId);
    return new User(
      new ExercisesWithScore(new Exercises(easyExercises)),
      new DailyBalance(storageBalance, userId),
    );
  }
}
