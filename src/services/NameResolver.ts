import { SettingsService } from './Settings/Settings';

export function resolveName(userId: number): string {
  const { names } = SettingsService.getSettings();
  return names[userId] || userId.toString();
}
