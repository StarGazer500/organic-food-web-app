import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JwtauthModule} from '../../common/jwtauth/jwtauth.module'
import { Product } from './domain/entity/product.entity';
import { ProductController } from './presentation/product.controller';
import { ProductService } from './application/services/product.service';
import { ProductRepository } from './infrastructure/repository/product';

@Module({
    imports: [
        JwtauthModule,
        TypeOrmModule.forFeature([Product]) // 👈 register repositories
      ],
      controllers: [ProductController],
      providers: [ProductService,ProductRepository],

})
export class ProductModuleModule {
    
}
