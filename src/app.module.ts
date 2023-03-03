import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ReportsModule } from './modules/reports/reports.module';
import { ConfigService } from './modules/config/config.service';
import { Configuration } from './modules/config/config.keys';
import { ExcelModule } from './modules/excel/excel.module';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    DatabaseModule,
    AuthModule,
    ReportsModule,
    ExcelModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
