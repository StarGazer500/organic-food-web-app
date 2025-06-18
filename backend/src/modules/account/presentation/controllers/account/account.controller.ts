import { Controller, Get } from '@nestjs/common';
import { AdminAccountService } from '../../../application/services/account/adminuser.service';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AdminAccountService) {}

  @Get()
  getAccount(): string {
    return this.accountService.findAll();
  }
}