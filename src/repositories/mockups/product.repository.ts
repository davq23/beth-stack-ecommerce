import { Product } from "../../models/Product";
import { ProductRepository } from "../product.repository";

export class MockupProductRepository implements ProductRepository {
    private db: Product[] = [
        {
            id: '1',
            name: 'Apples',
            price: 0,
            quantity: 0,
        },
        {
            id: '2',
            name: 'Bananas',
            price: 0,
            quantity: 0,
        },
        {
            id: '3',
            name: 'Oranges',
            price: 0,
            quantity: 0,
        },
    ];

    public getAll(): Product[] {
        return this.db;
    }
    public getById(id: string): Product|undefined {
        return this.db.filter((product) => product.id === id).pop();
    }
}