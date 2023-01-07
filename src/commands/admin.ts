import { createCommand } from "./createCommandHandler";
import { Command, CommandAccessLevel } from '../services/TelegramBotService';
import { messages } from '../messages';
import { SettingsService } from '../services/Settings/Settings';
import { DailyBalance } from '../models/DailyBalance';
import { Currency } from '../services/Currency';

export function createAdminCommands(): Command[] {
  return [
    createCommand(
      /^add admin (\d+)$/g,
      async ({ chatId, regexResult, bot }) => {
        const [, adminId] = regexResult;
        SettingsService.addAdmin(parseInt(adminId));
        await bot.sendMessage(chatId, messages.adminAdded);
      },
      CommandAccessLevel.ADMIN,
    ),
    createCommand(
      /^rm admin (\d+)$/g,
      async ({ chatId, regexResult, bot }) => {
        const [, adminId] = regexResult;
        SettingsService.removeAdmin(parseInt(adminId));
        await bot.sendMessage(chatId, messages.adminRemoved);
      },
      CommandAccessLevel.ADMIN,
    ),
    createCommand(
      /^daily$/g,
      async ({ chatId, bot }) => {
        const summaries = DailyBalance.readSummaries();
        let response = '';
        Object.keys(summaries).forEach((userId: string) => {
          response += `${userId}:\n`;
          response += `📥 debit: ${Currency.toPrice(summaries[userId].debit)}\n`;
          response += `📤 credit: ${Currency.toPrice(summaries[userId].credit)}\n\n`;
        });
        await bot.sendMessage(chatId, response);
      },
      CommandAccessLevel.ADMIN,
    ),
  ];
}


