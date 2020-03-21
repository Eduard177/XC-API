import * as fs from 'fs';
import { parse } from 'dotenv';
import { join } from 'path';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';

    if (isDevelopmentEnv) {
      const envFilePath = join(process.cwd(), `.env`);
      const existPath = fs.existsSync(envFilePath);
      if (!existPath) {
        // tslint:disable-next-line:no-console
        console.log(`.env file does not exist: ${envFilePath}`);
        process.exit(0);
      }
      this.envConfig = parse(fs.readFileSync(envFilePath));
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        DB_USER: process.env.DB_USER,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_NAME: process.env.DB_NAME,
      };
    }
  }

  get(key: string): string {
    return this.envConfig[key];
  }
}
