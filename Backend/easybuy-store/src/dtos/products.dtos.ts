import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  IsArray,
  ArrayNotEmpty,
  IsPositive,
  Validate,
} from 'class-validator';

import { PartialType } from '@nestjs/mapped-types';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly categoryId: number;

  @IsArray()
  @ArrayNotEmpty()
  @Validate(IsUrl, { each: true })
  readonly images: string[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
