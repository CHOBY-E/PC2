import api from "../api/axios";
import type { Page, ProductInput, Products } from "../types";

export const getProducts = (page: number, size = 8) =>
  api.get<Page<Products>>("/products", { params: { page, size } });

export const getProductById = (id: number | string) =>
  api.get<Products>(`/products/${id}`);

export const createProduct = (data: ProductInput) =>
  api.post<Products>("/products", data);

export const updateProduct = (id: number | string, data: ProductInput) =>
  api.put<Products>(`/products/${id}`, data);

export const deleteProduct = (id: number | string) =>
  api.delete<void>(`/products/${id}`);
