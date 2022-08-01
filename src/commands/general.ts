import { createCommand } from "./createCommandHandler";
import { messages } from "../messages";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { Users } from '../models/User';


export function createGeneralCommands(state: Users): Command[] {
  return [
    createCommand(
      /^\/start$/g,
      async ({ chatId, message, bot }) => {
        const user = state.getUserState(chatId);
        await bot.sendMessage(chatId, messages.welcomeMessage);
        await bot.sendMessage(chatId, user.getDashboard());
      },
      CommandAccessLevel.ANY,
    ),
  ];
}
