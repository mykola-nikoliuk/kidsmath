import { Currency } from '../services/Currency';

export interface IBalance {
  getBalance(): string;
  debit(value: number): void;
  credit(value: number): boolean;
}

export class Balance implements IBalance {
  constructor(protected balance: number = 0) {}

  getBalance(): string {
    return Currency.toPrice(this.balance);
  }

  debit(value: number) {
    this.balance += value;
  }

  credit(value: number): boolean {
    if (this.balance >= value) {
      this.balance -= value;
      return true;
    }

    return false;
  }
}