import { createCommand } from "./createCommandHandler";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { Users } from '../models/User';
import { messages } from '../messages';

export function createExerciseCommands(state: Users): Command[] {
  return [
    createCommand(
      /^\d+$/g,
      async ({ chatId, message, bot }) => {
        const user = state.getUserState(chatId);
        const answer = message.text || '';
        const response = user.tryAnswer(answer);
        await bot.sendMessage(chatId, response);
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      /^credit\s(\d+)$/gi,
      async ({ regexResult, chatId, bot }) => {
        const user = state.getUserState(chatId);
        const credit = parseInt(regexResult[1]);
        const resultMessage = user.balance.credit(credit) ? messages.creditSuccessful : messages.lowBalance;

        await bot.sendMessage(chatId, `${resultMessage}\n${messages.balance} ${user.balance.getBalance()}`);
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
