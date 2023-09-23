import { Product } from "../../models/Product";
import { ProductRepository } from "../product.repository";

export class MySQLProductRepository implements ProductRepository {
    search(searchQuery: string): Product[] {
        throw new Error("Method not implemented.");
    }
    getAll(): Product[] {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Product | undefined {
        throw new Error("Method not implemented.");
    }
}