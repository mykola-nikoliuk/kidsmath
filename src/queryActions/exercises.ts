import { QueryAction, QueryActionHandler } from '../services/TelegramBotService/QueryAction';
import { Users } from '../models/User';

export const exerciseQueryAction = new QueryAction('exercise');

export function createExerciseQueryActions(state: Users): QueryActionHandler[] {
  return [
    {
      queryAction: exerciseQueryAction,
      handler: async ({ queryAction, chatId, messageId, bot }) => {
        const [answerString] = queryAction.params;
        const answer = parseInt(answerString);
        const user = state.getUserState(chatId);
        const response = user.tryAnswer(answer);
        if (messageId) {
          bot.deleteMessage(chatId, messageId);
        }

        const buttons = [user.exercises.getAvailableAnswers()
          .map(v => ({ text: v.toString(), callback_data: `${exerciseQueryAction.name}:${v}` }))
        ];
        await bot.sendMessage(chatId, response, {}, buttons);
      }
    },
  ]
}
