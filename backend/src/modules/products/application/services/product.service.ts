import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repository/product';
import { Product } from '../../domain/entity/product.entity';
import { CreateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async create(createProductDto: CreateProductDto & { imageUrl?: string }): Promise<object> {
    this.logger.log(`Creating product: ${createProductDto.name}`);
    
    try {
      const result = await this.productRepository.create(createProductDto);
      this.logger.log(`Product created successfully with ID: ${result}`);
      return result;
    } catch (error) {
      this.logger.error(`Failed to create product: ${error.message}`);
      throw error;
    }
  }

  async findAll(): Promise<Product[]> {
    this.logger.log('Fetching all products');
    return await this.productRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    this.logger.log(`Fetching product with ID: ${id}`);
    const product = await this.productRepository.findOne(id);
    
    if (!product) {
      this.logger.warn(`Product with ID ${id} not found`);
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    
    return product;
  }
}