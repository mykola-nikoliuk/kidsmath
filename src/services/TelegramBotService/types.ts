import { TelegramBotWrapper } from '../../classes/telegramBotWrapper';

export enum TelegramEventTypes {
  VIDEO = 'video',
  PHOTO = 'photo',
  TEXT = 'text',
  DOCUMENT = 'document',
  ANIMATION = 'animation',
  MEDIA_GROUP = 'mediaGroup',
}

export type TelegramMessage = {
  message_id: number,
  from: {
    id: number,
    is_bot: boolean,
    first_name: string,
    last_name: string,
    username: string,
    language_code: string
  },
  chat: {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    type: string
  },
  video?: {
    duration: number,
    width: number,
    height: number,
    mime_type: string,
    thumb: {},
    file_id: string,
    file_unique_id: string,
    file_size: number
  },
  date: number,
  text?: string,
  caption?: string,
  customVideo?: string,
  customImage?: string,
};

export type TelegramEvent = {
  type: TelegramEventTypes,
  msg: TelegramMessage,
  media?: TelegramEvent[],
  extraText?: string,
  document?: { file_id: number },
}

export type CommandHandler = (params: { regexResult: RegExpExecArray, chatId: number, message: TelegramMessage, bot: TelegramBotWrapper }) => void;

export enum CommandAccessLevel {
  ANY,
  ADMIN
}

export type Command = {
  regex: RegExp,
  handler: CommandHandler,
  accessLevel: CommandAccessLevel,
}