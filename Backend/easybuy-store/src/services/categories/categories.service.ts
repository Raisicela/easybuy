import { Injectable, NotFoundException } from '@nestjs/common';
import { FakeStoreService } from '../fake-store-service/fake-store-service.service';
import { Category } from 'src/entities/category.entity';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private fakeStoreService: FakeStoreService) {}

  async findAll(): Promise<Category[]> {
    const response = await lastValueFrom(
      this.fakeStoreService.getAllCategories(),
    );
    return response.data;
  }

  async findOne(id: number): Promise<Category> {
    try {
      const response = await lastValueFrom(
        this.fakeStoreService.getOneCategory(id),
      );
      const category = response.data;
      if (!category) {
        throw new NotFoundException(`Category #${id} not found`);
      }
      return category;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error fetching category #${id}:`, error.message);
      throw new NotFoundException(`Category #${id} not found`);
    }
  }

  async create(payload: any) {
    const response = await lastValueFrom(
      this.fakeStoreService.createCategory(payload),
    );
    return response.data;
  }

  async update(id: number, payload: any) {
    const response = await lastValueFrom(
      this.fakeStoreService.updateCategory(id, payload),
    );
    return response.data;
  }

  async remove(id: number) {
    const response = await lastValueFrom(
      this.fakeStoreService.removeCategory(id),
    );
    return response.data;
  }
}
