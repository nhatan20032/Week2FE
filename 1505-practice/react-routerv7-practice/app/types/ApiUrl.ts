const BASE_URL = "https://dummyjson.com";

const apiUrls = {
  getProducts: (limit: number, skip: number, search: string): string =>
    `${BASE_URL}/products/search?q=${search}&limit=${limit}&skip=${skip}`,
  getProductById: (id: number): string => `${BASE_URL}/products/${id}`,
};

export default apiUrls;
