import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('DB_HOST') || 'localhost',
  port: parseInt(configService.get<string>('DB_PORT') || '5432'),
  username: configService.get<string>('DB_USERNAME'),
  password: String(configService.get<string>('DB_PASSWORD') || ''),
  database: configService.get<string>('DB_NAME'),
  synchronize: false,
  entities: ['src/**/*.entity.ts'], // Fixed path - looks for all .entity.ts files
  migrations: ['src/database/migrations/*.ts'], // Fixed path - matches your migration files
  migrationsRun: false,
  logging: true,
});

export default AppDataSource;