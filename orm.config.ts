import { DataSource } from 'typeorm';
import { Configuration } from './src/modules/config/config.keys';
import { ConfigService } from './src/modules/config/config.service';

const configService = new ConfigService();
const dataSource = new DataSource({
  type: 'postgres',
  username: configService.get(Configuration.DB_USER),
  password: configService.get(Configuration.DB_PASSWORD),
  host: configService.get(Configuration.DB_HOST),
  port: 5432,
  database: configService.get(Configuration.DB_NAME),
  entities: ['./src/**/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*{.ts,.js}'],
  ssl: true,
});
dataSource.initialize();

export default dataSource;
