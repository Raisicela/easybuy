import { Category } from '../entities/category.entity';
const baseUrl = process.env.REACT_APP_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

class CategoryService {
  async getAll() {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
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
      console.log(data);
      return data as Category[];
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async create(category: Category) {
    try {
      const response = await fetch(`${baseUrl}/categories`, {
        method: 'POST',
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey as string,
        },
      });

      const data = await response.json();
      return data as Category;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async update(category: Category) {
    try {
      const response = await fetch(`${baseUrl}/categories/${category.id}`, {
        method: 'PUT',
        body: JSON.stringify(category),
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey as string,
        },
      });

      const data = await response.json();
      return data as Category;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async delete(id: number) {
    try {
      const response = await fetch(`${baseUrl}/categories/${id}`, {
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

export default CategoryService;
