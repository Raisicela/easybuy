import { Category } from "./category.entity";

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type CreateUpdateProduct = {
  id?: number;
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};
