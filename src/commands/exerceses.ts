import { createCommand } from "./createCommandHandler";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { Users } from '../models/User';
import { messages } from '../messages';
import { StorageBalance } from '../models/StorageBalance';

export function createExerciseCommands(state: Users): Command[] {
  return [
    createCommand(
      /^\d+$/g,
      async ({ chatId, message, bot }) => {
        const user = state.getUserState(chatId);
        const answer = parseInt(message.text || '');
        const score = user.exercises.tryAnswer(answer);
        const isAnswerCorrect = score >= 0;
        const result = isAnswerCorrect ? messages.correct : messages.incorrect;

        if (isAnswerCorrect) {
          user.exercises.next();
          user.balance.debit(score);
        }

        const response = `${result}\n\n${user.getDashboard()}`;

        await bot.sendMessage(chatId, response);
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
