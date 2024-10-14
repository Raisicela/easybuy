import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';

// import { Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';
import { ApiKeyGuard } from 'src/auth/api-key/api-key.guard';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @UseGuards(ApiKeyGuard)
  getAll(@Query('title') title: string) {
    return this.productsService.findAll(title);
  }

  @Get('/pages')
  @UseGuards(ApiKeyGuard)
  getNextPage(@Query('offset') offset: number, @Query('limit') limit: number) {
    console.log(offset, limit);
    return this.productsService.getNextPage(offset, limit);
  }

  @Get(':productId')
  @UseGuards(ApiKeyGuard)
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  @UseGuards(ApiKeyGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  @UseGuards(ApiKeyGuard)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
