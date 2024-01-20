import { QueryAction, QueryActionHandler } from '../services/TelegramBotService/QueryAction';
import { getAnswersButtons } from '../services/TelegramBotService/getAnswersButtons';
import { KidsMathService } from '../services/KidsMathService';

export const exerciseQueryAction = new QueryAction('exercise');

export function createExerciseQueryActions(kidsMathService: KidsMathService): QueryActionHandler[] {
  return [
    {
      queryAction: exerciseQueryAction,
      handler: async ({ queryAction, chatId, messageId, bot }) => {
        try {
          const [answer] = queryAction.params;
          console.log(queryAction.params);
          if (messageId) {
            bot.deleteMessage(chatId, messageId);
          }
          const { dashboard, answers } = await kidsMathService.tryAnswer(chatId, answer);
          const buttons = getAnswersButtons(answers);
          await bot.sendMessage(chatId, dashboard, {}, buttons);
        }
        catch (err) {

        }
      }
    },
  ]
}
