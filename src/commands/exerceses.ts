import { createCommand } from "./createCommandHandler";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { KidsMathService } from '../services/KidsMathService';
import { getAnswersButtons } from '../services/TelegramBotService/getAnswersButtons';

export function createExerciseCommands(kidsMathService: KidsMathService): Command[] {
  return [
    createCommand(
      /^\d+$/g,
      async ({ chatId, message, bot }) => {
        try {
          const answer = message.text || '';
          const { dashboard, answers } = await kidsMathService.tryAnswer(chatId, answer);
          const buttons = getAnswersButtons(answers);
          await bot.sendMessage(chatId, dashboard, {}, buttons);
        }
        catch (err) {

        }
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      /^credit\s(\d+)$/gi,
      async ({ regexResult, chatId, bot }) => {
        // const user = state.getUserState(chatId);
        // const credit = parseInt(regexResult[1]);
        // const resultMessage = user.balance.credit(credit) ? messages.creditSuccessful : messages.lowBalance;
        //
        // await bot.sendMessage(chatId, `${resultMessage}\n${messages.balance} ${user.balance.getBalance()}`);
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
