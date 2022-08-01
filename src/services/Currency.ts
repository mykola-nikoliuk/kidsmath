export const Currency = {
  toPrice(score: number): string {
    return `${(score / 100).toFixed(2)}€`;
  }
}