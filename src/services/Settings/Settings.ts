import fs from 'fs';

interface ISettings {
  admins: number[];
}

const defaultSetting: ISettings = {
  admins: [],
}

export class Settings {

  private readonly settings: ISettings = defaultSetting;

  constructor(private readonly path: string) {
    if (fs.existsSync(this.path)) {
      this.settings = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
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

  private save(): void {
    fs.writeFileSync(this.path, JSON.stringify(this.settings), 'utf-8');
  }

}

export const SettingsService = new Settings('settings.json');

