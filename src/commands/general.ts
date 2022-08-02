import { createCommand } from "./createCommandHandler";
import { messages } from "../messages";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { Users } from '../models/User';


export function createGeneralCommands(state: Users): Command[] {
  return [
    createCommand(
      /^\/start$/g,
      async ({ chatId, bot }) => {
        await bot.sendKeyboard(chatId, messages.welcomeMessage, [[messages.exerciseButton, messages.balanceButton]]);
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      new RegExp(messages.exerciseButton.toLowerCase()),
      async ({ chatId, bot }) => {
        const user = state.getUserState(chatId);
        await bot.sendMessage(chatId, user.getDashboard());
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      new RegExp(messages.balanceButton.toLowerCase()),
      async ({ chatId, bot }) => {
        const user = state.getUserState(chatId);
        await bot.sendMessage(chatId, `${messages.balance} ${user.balance.getBalance()}`);
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
