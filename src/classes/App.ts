import { TelegramBotService } from '../services/TelegramBotService';
import { createGeneralCommands } from '../commands/general';
import { createEmptyAppState } from '../models/AppState';
import { createExerciseCommands } from '../commands/exerceses';
import { createAdminCommands } from '../commands/admin';
import { createExerciseQueryActions } from '../queryActions/exercises';

interface AppParams {
  telegramToken: string;
}

export function createApp({ telegramToken }: AppParams): void {
  const state = createEmptyAppState();

  new TelegramBotService(telegramToken, [
    ...createGeneralCommands(state.users),
    ...createExerciseCommands(state.users),
    ...createAdminCommands(),
  ], [
    ...createExerciseQueryActions(state.users),
  ]);
}
