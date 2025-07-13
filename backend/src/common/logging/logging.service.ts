import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
    log(message: string) {
    console.log(`[LOG]: ${message}`);
  }

  error(message: string, trace: string) {
    console.error(`[ERROR]: ${message}`, trace);
  }

  warn(message: string) {
    console.warn(`[WARN]: ${message}`);
  }

  debug(message: string) {
    console.debug(`[DEBUG]: ${message}`);
  }

  verbose(message: string) {
    console.info(`[VERBOSE]: ${message}`);
  }
}

// example usage
// export class UserService {
//   private readonly logger = new Logger(UserService.name); // Uses the custom logger if set globally

//   createUser(userData: any) {
//     this.logger.log('Creating a new user...');
//     // Simulate logic
//     if (!userData.name) {
//       this.logger.warn('User name is missing');
//     }

//     try {
//       // Simulate success
//       this.logger.debug(`User data: ${JSON.stringify(userData)}`);
//       return { id: 1, ...userData };
//     } catch (error) {
//       this.logger.error('Failed to create user', error.stack);
//     }
//   }
// }