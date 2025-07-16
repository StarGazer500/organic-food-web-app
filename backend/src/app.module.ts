import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './modules/account/account.module';
import { AdminUser } from './modules/account/domain/entities/account/adminusers.entity';
import { Role } from './modules/account/domain/entities/account/role.entity';
import { NormalUser } from './modules/account/domain/entities/account/normalusers.entity';
import {Product} from './modules/products/domain/entity/product.entity'
import { JwtauthModule } from './common/jwtauth/jwtauth.module';
import { ProductModuleModule } from './modules/products/product.module.module';





@Module({
  imports: [
    AccountModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD || ''), // Ensure it's a string
      database: process.env.DB_NAME,
      entities: [AdminUser, Role, NormalUser,Product], // Explicitly list entities
      synchronize: false, // Always false in production
      autoLoadEntities: true,
      logging: true,
    }),
    JwtauthModule,
    ProductModuleModule,
    ProductModuleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}