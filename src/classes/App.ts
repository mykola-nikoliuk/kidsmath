import { TelegramBotService } from '../services/TelegramBotService';
import { createGeneralCommands } from '../commands/general';
import { createEmptyAppState } from '../models/AppState';
import { createExerciseCommands } from '../commands/exerceses';

interface AppParams {
  telegramToken: string;
}

export function createApp({ telegramToken }: AppParams): void {
  const state = createEmptyAppState();

  const bot = new TelegramBotService(telegramToken, [
    ...createGeneralCommands(state.users),
    ...createExerciseCommands(state.users)
  ]);
}