import Database from "bun:sqlite";
import { ProductRepository } from "../product.repository";
import { Product } from "../../models/Product";
import Container, { ContainerInstance, Inject, Service } from "typedi";
import SQLiteRepository from "./sqlite.repository";

export class SQLiteProductRepository extends SQLiteRepository implements ProductRepository {
    getAll = (): Promise<Product[]> => {
        return new Promise((resolve) => {
                const statement = this.db.prepare('SELECT id, name, price, quantity FROM product', []);
            resolve(statement.all().map(({ id, name, price, quantity }: any): Product => {
                    return {
                        id,
                        name,
                        price,
                        quantity
                    };
            }));
        })
    }
    search = (searchQuery: string): Promise<Product[]> => {
        return new Promise((resolve) => {
            const statement = this.db.prepare(
                'SELECT id, name, price, quantity FROM product WHERE name LIKE ?',
                [`%${searchQuery}%`]
            );
    
            resolve(statement.all().map(({ id, name, price, quantity }: any): Product => {
                return {
                    id,
                    name,
                    price,
                    quantity
                };
            }));
        })
    }
    getById = (id: string): Promise<Product | undefined> => {
        return new Promise((resolve) => {
            const statement = this.db.prepare(
                'SELECT id, name, price, quantity FROM product WHERE id = ? LIMIT 1',
                [id]
            );
    
            resolve(statement.all().map(({ id, name, price, quantity }: any): Product => {
                return {
                    id,
                    name,
                    price,
                    quantity
                };
            }).pop());
        })
    }

}