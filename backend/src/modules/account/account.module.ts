import { Module } from '@nestjs/common';
import { AccountController } from './presentation/controllers/account/account.controller';
import { AccountService } from './application/services/account/adminuser.service';

@Module({
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
