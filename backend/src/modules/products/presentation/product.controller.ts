import { Controller, Get, UseGuards, Req, Post, Body, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateProductDto } from '../application/dto/product.dto';
import { ProductService } from '../application/services/product.service';
import { SuperUserAdminGuard } from 'src/common/jwtauth/admin-guard.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'),SuperUserAdminGuard)
  @Post('create-product')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads', // Make sure this directory exists
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only image files are allowed!'), false);
      }
    },
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
    },
  }))
  async createProduct(
    @Body() createDto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    // Convert price from string to number and add image path
    const productData = {
      ...createDto,
      price: Number(createDto.price), // Convert string to number
      imageUrl: file ? `/uploads/${file.filename}` : undefined, // Changed from null to undefined
    };

    return this.productService.create(productData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('get-all-product')
  async getAllProduct() {
    return this.productService.findAll();
  }
}