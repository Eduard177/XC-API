import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  username: 'xpert_user',
  password: '1oORMSSQgTZzGLVHvgczcEAEOd4Ql3Bc',
  host: 'dpg-chvqasj3cv26tfm0ldh0-a.oregon-postgres.render.com',
  port: 5432,
  database: 'xpert_qb25',
  entities: ['./src/**/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*{.ts,.js}'],
  ssl:true
});
 dataSource.initialize()

export default dataSource

