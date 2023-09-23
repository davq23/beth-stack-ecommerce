import { Product } from "../models/Product";

export interface ProductRepository {
    getAll(): Promise<Product[]>;
    search(searchQuery: string): Promise<Product[]>;
    getById(id: string): Promise<Product|undefined>;
};