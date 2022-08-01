import { Users } from './User';

export interface IAppState {
  users: Users;
}

export function createEmptyAppState(): IAppState {
  return {
    users: new Users(),
  }
}