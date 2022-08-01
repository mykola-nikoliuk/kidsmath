import { Command, CommandAccessLevel, CommandHandler } from "../services/TelegramBotService";

export function createCommand(regex: RegExp, handler: CommandHandler, accessLevel: CommandAccessLevel = CommandAccessLevel.ADMIN): Command {
  return {
    regex,
    handler,
    accessLevel,
  }
}
