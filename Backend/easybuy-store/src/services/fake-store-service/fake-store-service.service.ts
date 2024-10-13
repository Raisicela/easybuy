import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { FakeStoreAuth } from 'src/entities/fake_store_auth.entity';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dtos';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/dtos/categories.dtos';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class FakeStoreService {
  constructor(
    private configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.baseUrl = this.configService.get<string>('BASE_URL');

    this.createUser()
      .pipe(
        switchMap(() => {
          return this.getToken();
        }),
      )
      .subscribe((getTokenResponse) => {
        this.token = getTokenResponse.data.access_token;
      });
  }

  public token: string = '';
  public baseUrl: string = '';

  getToken(): Observable<AxiosResponse<FakeStoreAuth>> {
    const body = {
      email: this.configService.get<string>('EMAIL'),
      password: this.configService.get<string>('PASSWORD'),
    };
    return this.httpService.post(`${this.baseUrl}/auth/login`, body);
  }

  createUser(): Observable<AxiosResponse<FakeStoreAuth>> {
    const body = {
      name: this.configService.get<string>('NAME'),
      email: this.configService.get<string>('EMAIL'),
      password: this.configService.get<string>('PASSWORD'),
      avatar: this.configService.get<string>('AVATAR'),
    };
    return this.httpService.post(`${this.baseUrl}/users`, body);
  }
  // Productos
  getAllProducts(title: string): Observable<AxiosResponse<Product[]>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.get(`${this.baseUrl}/products?title=${title}`, {
      headers,
    });
  }

  getOneProduct(id: number): Observable<AxiosResponse<Product>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.get(`${this.baseUrl}/products/${id}`, { headers });
  }

  createProduct(body: CreateProductDto): Observable<AxiosResponse<Product>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.post(`${this.baseUrl}/products/`, body, {
      headers,
    });
  }

  updateProduct(
    id: number,
    body: UpdateProductDto,
  ): Observable<AxiosResponse<Product>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.put(`${this.baseUrl}/products/${id}`, body, {
      headers,
    });
  }

  removeProduct(id: number): Observable<AxiosResponse> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.delete(`${this.baseUrl}/products/${id}`, {
      headers,
    });
  }

  // Categories
  getAllCategories(): Observable<AxiosResponse<Category[]>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.get(`${this.baseUrl}/categories`, {
      headers,
    });
  }

  getOneCategory(id: number): Observable<AxiosResponse<Category>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.get(`${this.baseUrl}/categories/${id}`, {
      headers,
    });
  }

  createCategory(body: CreateCategoryDto): Observable<AxiosResponse<Category>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.post(`${this.baseUrl}/categories/`, body, {
      headers,
    });
  }

  updateCategory(
    id: number,
    body: UpdateCategoryDto,
  ): Observable<AxiosResponse<Category>> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.put(`${this.baseUrl}/categories/${id}`, body, {
      headers,
    });
  }

  removeCategory(id: number): Observable<AxiosResponse> {
    const headers = {
      Authorization: `Bearer ${this.token}`,
    };
    return this.httpService.delete(`${this.baseUrl}/categories/${id}`, {
      headers,
    });
  }
}
