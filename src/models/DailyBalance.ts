import { IBalance } from './Balance';
import path from 'path';
import fs from 'fs';
import { NewMath } from '../services/math';
import { Currency } from '../services/Currency';

interface IDailyBalance {
  debit: number;
  credit: number;
}

type UserDailyBalances = Record<string, IDailyBalance>

const dailyBalancePath = path.join(__dirname, '../../dailyBalance');

if (!fs.existsSync(dailyBalancePath)) {
  fs.mkdirSync(dailyBalancePath);
}

export class DailyBalance implements IBalance {
  constructor(private balance: IBalance, private userId: number) {}

  credit(value: number): boolean {
    const result = this.balance.credit(value);
    if (result) {
      this.increment(0, value);
    }
    return result;
  }

  debit(value: number): boolean {
    const result = this.balance.debit(value);
    if (result) {
      this.increment(value, 0);
    }
    return result;
  }

  getBalance(): string {
    return this.balance.getBalance();
  }

  getDailyBalance(): string {
    const summaries = DailyBalance.readSummaries();
    const { debit, credit } = summaries[this.userId] || { debit: 0, credit: 0 };
    return Currency.toPrice(debit - credit);
  }

  private increment(debit: number, credit: number): void {
    const summaries = DailyBalance.readSummaries();

    if (!summaries[this.userId]) {
      summaries[this.userId] = {
        debit: 0,
        credit: 0,
      };
    }

    const userSummary = summaries[this.userId];

    userSummary.credit += credit;
    userSummary.debit += debit;
    this.writeSummaries(summaries);
  }

  static readSummaries(): UserDailyBalances {
    const filePath = DailyBalance.getFileNamePath();
    let summaries: UserDailyBalances = {};

    if (fs.existsSync(filePath)) {
      summaries = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }

    return summaries;
  }

  private static getFileNamePath(): string {
    const date = new Date();
    const dateString = `${date.getFullYear()}.${NewMath.pad(date.getMonth() + 1, 2)}.${NewMath.pad(date.getDate(), 2)}`;

    return path.join(dailyBalancePath, `${dateString}.json`);
  }

  private writeSummaries(summaries: UserDailyBalances) {
    fs.writeFileSync(DailyBalance.getFileNamePath(), JSON.stringify(summaries), 'utf-8');
  }
}
