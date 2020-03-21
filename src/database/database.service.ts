import { Injectable } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Configuration } from '../modules/config/config.keys';
import { ConfigModule } from '../modules/config/config.module';
import { ConnectionOptions } from 'typeorm';
import { ConfigService } from '../modules/config/config.service';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get(Configuration.DB_HOST),
        username: config.get(Configuration.DB_USER),
        // tslint:disable-next-line:radix
        port: parseInt(config.get(Configuration.DB_PORT)),
        database: config.get(Configuration.DB_NAME),
        password: config.get(Configuration.DB_PASSWORD),
        entities: [__dirname + '/../**/*/*.entity{.ts,.js}'],
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        extra: {
          ssl: true,
        },
      } as ConnectionOptions;
    },
  }),
];
