import { TelegramBotService } from '../services/TelegramBotService';
import { createGeneralCommands } from '../commands/general';
import { createExerciseCommands } from '../commands/exerceses';
import { createAdminCommands } from '../commands/admin';
import { createExerciseQueryActions } from '../queryActions/exercises';
import { envs } from '../envs';
import { KidsMathService } from '../services/KidsMathService';

interface AppParams {
  telegramToken: string;
}

const { SERVICE_URL, SERVICE_TOKEN } = envs;

export function createApp({ telegramToken }: AppParams): void {
  if (!SERVICE_URL) {
    console.error('SERVICE_URL is not provided');
    process.exit(1);
  }

  if (!SERVICE_TOKEN) {
    console.error('SERVICE_TOKEN is not provided');
    process.exit(1);
  }

  const kidsMathService = new KidsMathService(SERVICE_URL, SERVICE_TOKEN);

  new TelegramBotService(telegramToken, [
    ...createGeneralCommands(kidsMathService),
    ...createExerciseCommands(kidsMathService),
    ...createAdminCommands(),
  ], [
    ...createExerciseQueryActions(kidsMathService),
  ]);
}
