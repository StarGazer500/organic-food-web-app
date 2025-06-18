import { 
  IsString, 
  IsBoolean, 
  IsOptional, 
  MinLength, 
  MaxLength,
  IsNumber
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

// DTO for creating a new role
export class CreateRoleDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean = true;
}