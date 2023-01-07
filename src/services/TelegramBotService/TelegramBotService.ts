import { TelegramBotWrapper } from '../../classes/telegramBotWrapper';
import TelegramBot from 'node-telegram-bot-api';
import { Command, CommandAccessLevel, TelegramEventTypes, TelegramMessage } from './types';
import { SettingsService } from '../Settings/Settings';

process.env.NTBA_FIX_319 = "NTBA_FIX_319";
process.env.NTBA_FIX_350 = "NTBA_FIX_350";


export class TelegramBotService extends TelegramBotWrapper {
  constructor(token: string, private commands: Command[]) {
    super(new TelegramBot(token, { polling: true }));
    this.initCommands();
  }

  private initCommands() {
    this._bot.on(TelegramEventTypes.TEXT, (msg: TelegramMessage) => {
      const {chat: {id: chatId}, text = '', from: {id: userId}} = msg;

      const commands = this.commands;

      for (let i = 0; i < commands.length; i++) {
        const {regex, handler, accessLevel} = commands[i];
        const adminRequired = accessLevel === CommandAccessLevel.ADMIN;
        regex.lastIndex = -1;

        const regexResult = regex.exec(text.toLowerCase());
        if (regexResult) {
          if (adminRequired) {
            const { admins } = SettingsService.getSettings();
            if (!admins.includes(userId)) continue;
          }
          handler({ regexResult, chatId, message: msg, bot: this });
          break;
        }
      }
    });
  }
}
