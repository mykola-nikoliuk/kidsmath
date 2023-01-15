import { createCommand } from "./createCommandHandler";
import { messages } from "../messages";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { Users } from '../models/User';
import { exerciseQueryAction } from '../queryActions/exercises';

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
      new RegExp(messages.exerciseButton, 'i'),
      async ({ chatId, bot }) => {
        const user = state.getUserState(chatId);
        const buttons = [user.exercises.getAvailableAnswers()
          .map(v => ({ text: v.toString(), callback_data: `${exerciseQueryAction.name}:${v}` }))
        ];
        await bot.sendMessage(chatId, user.getDashboard(), {}, buttons);
      },
      CommandAccessLevel.ANY,
    ),
    createCommand(
      new RegExp(messages.balanceButton, 'i'),
      async ({ chatId, bot }) => {
        const user = state.getUserState(chatId);
        await bot.sendMessage(chatId, `${messages.balance} ${user.balance.getBalance()}`);
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
