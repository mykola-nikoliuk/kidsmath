import { envs } from './envs';
import { createApp } from './classes/App';

const { TELEGRAM_BOT_TOKEN = '' } = envs;

createApp({
  telegramToken: TELEGRAM_BOT_TOKEN,
})