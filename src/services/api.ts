const API_BASE_URL = 'http://localhost:3010';

export const api = {
  async getProducts() {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    const products = await response.json();
    // Add image property to each product object
    return products.map((product: any) => ({
      ...product,
      image: '../images/shoes.png',
    }));
  },

  async getProductById(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    const product = await response.json();
    return {
      ...product,
      image: '../images/shoes.png'
    };
  },

  async getBrands() {
    const response = await fetch(`${API_BASE_URL}/brands`);
    if (!response.ok) throw new Error('Failed to fetch brands');
    return response.json();
  },

  async getCategories() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getOptions() {
    const response = await fetch(`${API_BASE_URL}/options`);
    if (!response.ok) throw new Error('Failed to fetch options');
    return response.json();
  }
};