import { QueryAction, QueryActionHandler } from '../services/TelegramBotService/QueryAction';
import { Users } from '../models/User';
import { getAnswersButtons } from '../services/TelegramBotService/getAnswersButtons';

export const exerciseQueryAction = new QueryAction('exercise');

export function createExerciseQueryActions(state: Users): QueryActionHandler[] {
  return [
    {
      queryAction: exerciseQueryAction,
      handler: async ({ queryAction, chatId, messageId, bot }) => {
        const [answerString] = queryAction.params;
        const answer = answerString;
        const user = state.getUserState(chatId);
        const response = user.tryAnswer(answer);
        if (messageId) {
          bot.deleteMessage(chatId, messageId);
        }

        const buttons = getAnswersButtons(user.exercises.getAvailableAnswers());
        await bot.sendMessage(chatId, response, {}, buttons);
      }
    },
  ]
}
