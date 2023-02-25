import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  username: 'xpert_user',
  password: 'sYExGntfLOLps6mafc0Q0R79zPV2ahDO',
  host: 'dpg-cfqknl5a4991c2coubb0-a.oregon-postgres.render.com',
  port: 5432,
  database: 'xpert',
  entities: ['./src/**/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*{.ts,.js}'],
  ssl:true
});
 dataSource.initialize()

export default dataSource

