import {
  IsString,
  IsNumber,
  IsOptional,
  MinLength,
  MaxLength,
  IsUrl
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'Yazz' })
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @ApiProperty({ example: 'brighten your teeth with Yazz toothpaste' })
  @IsString()
  @MinLength(1)
  @MaxLength(255)
  description: string;

  @ApiProperty({ example: 20 })
  @Transform(({ value }) => Number(value)) // Transform string to number
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ example: '/uploads/image-123456.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}