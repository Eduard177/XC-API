import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';
import { DatabaseModule } from './database/database.module';
import { ReportsModule } from './modules/reports/reports.module';

@Module({
  imports: [UserModule, ConfigModule, DatabaseModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
