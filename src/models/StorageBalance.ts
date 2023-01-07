import fs from 'fs';
import path from 'path';
import { Balance } from './Balance';

const balancePath = path.join(__dirname, '../../balance');

if (!fs.existsSync(balancePath)) {
  fs.mkdirSync(balancePath);
}

export class StorageBalance extends Balance {
  constructor(private userId: number) {
    super();
    this.readBalance();
  }

  debit(value: number): boolean {
    const result = super.debit(value);
    this.writeBalance();
    return result;
  }

  credit(value: number): boolean {
    const result = super.credit(value);
    this.writeBalance();
    return result;
  }

  private getFileNamePath(): string {
    return path.join(balancePath, `${this.userId.toString()}.json`);
  }

  private writeBalance() {
    fs.writeFileSync(this.getFileNamePath(), this.balance.toString(), 'utf-8');
  }

  private readBalance() {
    const filePath = this.getFileNamePath();
    if (fs.existsSync(filePath)) {
      this.balance = parseInt(fs.readFileSync(filePath, 'utf-8'));
    }
  }
}
