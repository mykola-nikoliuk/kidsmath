import { TelegramBotWrapper } from '../../classes/telegramBotWrapper';

const QUERY_ACTION_SEPARATOR = ':';

export class QueryAction {
  readonly name: string;
  readonly params: any[];

  constructor(private queryActionString: string) {
    const [name, ...params] = queryActionString.split(QUERY_ACTION_SEPARATOR);
    this.name = name;
    this.params = params;
  }

  toString(params: any[] = this.params) {
    return [this.name, ...params].join(QUERY_ACTION_SEPARATOR);
  }
}

export interface QueryActionHandler {
  queryAction: QueryAction;
  handler: (params: { queryAction: QueryAction, chatId: number, messageId?: number, bot: TelegramBotWrapper }) => void
}
