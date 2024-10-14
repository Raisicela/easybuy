import { CreateUpdateProduct, Product } from '../entities/product.entity';
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

class ProductService {
  async getAlls(title: string) {
    try {
      const response = await fetch(`${baseUrl}/products?title=${title}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey as string,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('products', data);
      return data as Product[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getNextPage(offset: number, limit: number) {
    try {
      console.log(offset, limit);
      const response = await fetch(
        `${baseUrl}/products/pages?offset=${offset}&limit=${limit}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey as string,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('products', data);
      return data as Product[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(product: CreateUpdateProduct) {
    try {
      const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey as string,
        },
      });

      const data = await response.json();
      return data as Product;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async update(product: CreateUpdateProduct) {
    try {
      const response = await fetch(`${baseUrl}/products/${product.id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey as string,
        },
      });

      const data = await response.json();
      return data as Product;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async delete(id: number) {
    try {
      const response = await fetch(`${baseUrl}/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey as string,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
}

export default ProductService;
