import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from 'src/entities/product.entity';
import { FakeStoreService } from '../fake-store-service/fake-store-service.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [];

  constructor(private fakeStoreService: FakeStoreService) {}

  async findAll(title: string): Promise<Product[]> {
    const response = await lastValueFrom(
      this.fakeStoreService.getAllProducts(title),
    );
    return response.data;
  }
  async getNextPage(offset: number, limit: number): Promise<Product[]> {
    const response = await lastValueFrom(
      this.fakeStoreService.getNextPage(offset, limit),
    );
    return response.data;
  }

  async findOne(id: number): Promise<Product> {
    try {
      const response = await lastValueFrom(
        this.fakeStoreService.getOneProduct(id),
      );
      const product = response.data;
      if (!product) {
        throw new NotFoundException(`Product #${id} not found`);
      }
      return product;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error fetching product #${id}:`, error.message);
      throw new NotFoundException(`Product #${id} not found`);
    }
  }

  async create(payload: any) {
    const response = await lastValueFrom(
      this.fakeStoreService.createProduct(payload),
    );
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lastValueFrom(
      this.fakeStoreService.updateProduct(id, payload),
    );
    return response.data;
  }

  async remove(id: number) {
    const response = await lastValueFrom(
      this.fakeStoreService.removeProduct(id),
    );
    return response.data;
  }
}
