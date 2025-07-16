import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository, FindOptionsWhere } from 'typeorm';

import { Product } from 'src/modules/products/domain/entity/product.entity';

import { CreateProductDto } from '../../application/dto/product.dto';

@Injectable()
export class ProductRepository {
    constructor(
    @InjectRepository( Product)
     private productRepository: Repository<Product>,
    ){}

    async create(createProductDto : CreateProductDto):Promise<Product>{
        const product = this.productRepository.create(createProductDto);
        return await this.productRepository.save(product)
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
      }

     async findOne(id: number): Promise<any> {
    return await this.productRepository.findOne({
      where: { id },
      
    });
  }

}
