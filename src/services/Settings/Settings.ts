import fs from 'fs';
import path from 'path';

interface ISettings {
  admins: number[];
  names: Record<number, string>;
}

const defaultSetting: ISettings = {
  admins: [],
  names: {},
}

export class Settings {

  private readonly settings: ISettings = defaultSetting;

  constructor(private readonly path: string) {
    if (fs.existsSync(this.path)) {
      const fileSettings: Partial<ISettings> = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      this.settings = {
        ...defaultSetting,
        ...fileSettings,
      };
    }
  }

  getSettings(): ISettings {
    return JSON.parse(JSON.stringify(this.settings));
  }

  addAdmin(userId: number): void {
    const { admins } = this.settings;
    if (!admins.includes(userId)) {
      admins.push(userId);
      this.save();
    }
  }

  removeAdmin(userId: number): void {
    const { admins } = this.settings;
    if (admins.includes(userId)) {
      const index = admins.indexOf(userId);
      admins.splice(index, 1);
      this.save();
    }
  }

  addName(userId: number, name: string) {
    this.settings.names[userId] = name;
    this.save();
  }

  removeName(userId: number) {
    delete this.settings.names[userId];
    this.save();
  }

  private save(): void {
    fs.writeFileSync(this.path, JSON.stringify(this.settings), 'utf-8');
  }

}

export const SettingsService = new Settings(path.join(__dirname, '../../../settings.json'));

