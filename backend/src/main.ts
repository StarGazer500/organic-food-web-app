import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import { AppModule } from './app.module';
import { LoggingService } from './common/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Add cookie parser middleware
  app.use(cookieParser());
  app.useLogger(new LoggingService());
  
  // Serve static files from uploads directory
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });
  
  app.enableCors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // allow cookies if needed
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();