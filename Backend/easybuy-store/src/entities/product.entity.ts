import { Category } from './category.entity';

export class Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}
