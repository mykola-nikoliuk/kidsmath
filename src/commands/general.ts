import { createCommand } from "./createCommandHandler";
import { messages } from "../messages";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { getAnswersButtons } from '../services/TelegramBotService/getAnswersButtons';
import { KidsMathService } from '../services/KidsMathService';
import { envs } from '../envs';

export function createGeneralCommands(kidsMathService: KidsMathService): Command[] {
  return [
    createCommand(
      /^\/start$/g,
      async ({ chatId, bot }) => {
        await bot.sendKeyboard(chatId, messages.welcomeMessage, [[messages.exerciseButton, messages.balanceButton]]);
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      new RegExp(messages.exerciseButton, 'i'),
      async ({ chatId, bot }) => {
        try {
          const { dashboard, answers} = await kidsMathService.getDashboard(chatId);
          const buttons = getAnswersButtons(answers);
          await bot.sendMessage(chatId, dashboard, {}, buttons);
        } catch (err) {

        }
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      new RegExp(messages.balanceButton, 'i'),
      async ({ chatId, bot }) => {
        // const user = state.getUserState(chatId);
        // await bot.sendMessage(chatId, `${messages.balance} ${user.balance.getBalance()}`);
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
