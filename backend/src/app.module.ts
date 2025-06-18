import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AccountModule} from './modules/account/account.module'
import {AdminUser} from './modules/account/domain/entities/account/adminusers.entity'
import {Role} from './modules/account/domain/entities/account/role.entity'
import {NormalUser} from './modules/account/domain/entities/account/normalusers.entity'


@Module({
  imports: [
     TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [AdminUser,Role,NormalUser],
      synchronize: false, // Always false in production
      migrations: ['dist/migrations/*.js'],
      migrationsRun: true, // Automatically run migrations on startup
    }),
    AccountModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
