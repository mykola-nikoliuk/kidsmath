const TelegramBot = require('node-telegram-bot-api');

export class TelegramBotWrapper {

  protected _bot: typeof TelegramBot | null;
  private _me: any;

  constructor(bot: typeof TelegramBot = null) {
    this._bot = bot;
    this._me = null;
  }

  set bot(bot: typeof TelegramBot) {
    this._bot = bot;
  }

  sendKeyboard(id: number, text: string, buttons: any[], options = {}) {
    const opts = {
      reply_markup: {
        resize_keyboard: true,
        keyboard: buttons,
      },
      ...options,
    };
    return this.sendMessage(id, text, opts);
  }

  sendPhoto(...params: any[]) {
    return this._bot.sendPhoto(...params);
  }

  sendVideo(...params: any[]) {
    return this._bot.sendVideo(...params);
  }

  sendDocument(...params: any[]) {
    return this._bot.sendDocument(...params);
  }

  sendMediaGroup(...params: any[]) {
    return this._bot.sendMediaGroup(...params);
  }

  sendAnimation(...params: any[]) {
    return this._bot._formatSendData('animation', ...params);
  }

  sendMessage(id: number, text: string, options = {},
    buttons: ({ text: string; callback_data: string })[][] = [], message_id = null) {
    if (this._bot) {
      const opts = {
        ...this.createButtonsOptions(buttons),
        ...options,
      };

      if (message_id) {
        return this._bot.editMessageText(text, Object.assign(opts, {
          chat_id: id,
          message_id,
        }));
      } else {
        return this._bot.sendMessage(id, text, opts);
      }
    } else {
      console.error('Bot => you should initiate bot first');
    }
  }

  deleteMessage(...params: any[]) {
    return this._bot.deleteMessage(...params);
  }

  getMe() {
    if (!this._me) {
      this._me = this._bot.getMe();
    }
    return this._me;
  }

  getFileLink(...params: any[]) {
    return this._bot.getFileLink(...params);
  }

  private createButtonsOptions(buttons: any[]) {
    return {
      reply_markup: {
        inline_keyboard: buttons,
        // resize_keyboard: true,
        // one_time_keyboard: true
      },
    };
  }
}
