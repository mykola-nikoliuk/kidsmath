import { exerciseQueryAction } from '../../queryActions/exercises';
import { TelegramInlineButton, TelegramInlineButtons } from './types';

export function getAnswersButtons(answers: number[] | string[], maxInRow: number = 2): TelegramInlineButtons {
  const buttons: TelegramInlineButtons = [];
  let row: TelegramInlineButton[] = [];
  answers.map(v => {
    row.push({ text: v.toString(), callback_data: `${exerciseQueryAction.name}:${v}` });
    if (row.length >= maxInRow) {
      buttons.push(row);
      row = [];
    }
  });

  return buttons;
}
