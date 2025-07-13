import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggingService } from './common/logging/logging.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add cookie parser middleware
  app.use(cookieParser());
  
  app.useLogger(new LoggingService());
  
  app.enableCors({
    origin: 'http://localhost:5173', // frontend URL
    credentials: true, // allow cookies if needed
  });
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();