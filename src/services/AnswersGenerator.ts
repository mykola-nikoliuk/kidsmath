import { NewMath } from './math';

export class AnswersGenerator {
  static generate(answer: number, maxAmount: number = Infinity) {
    const wrongAnswers = [];

    wrongAnswers.push(answer + 1);
    wrongAnswers.push(answer - 1);
    wrongAnswers.push(answer + 10);
    wrongAnswers.push(answer - 10);
    wrongAnswers.push(answer + 2);
    wrongAnswers.push(answer - 2);
    wrongAnswers.push(answer + 3);
    wrongAnswers.push(answer - 3);

    const sign = answer / Math.abs(answer);
    const mirrored = sign * parseInt(Math.abs(answer).toString(10).split('').reverse().join(''))
    if (mirrored !== answer) {
      wrongAnswers.push(mirrored);
    }

    const allAnswers = [
      answer,
      ...NewMath.shuffle(wrongAnswers).slice(0, maxAmount - 1),
    ];

    return NewMath.shuffle(allAnswers);
  }
}
