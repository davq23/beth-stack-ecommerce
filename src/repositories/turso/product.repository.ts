import { Row } from "@libsql/client";
import { Product } from "../../models/Product";
import { ProductRepository } from "../product.repository";
import TursoRepository from "./turso.repository";

export default class TursoProductRepository extends TursoRepository implements ProductRepository {
    mapRow = ({id, name, quantity, price}: Row) => ({id, name, quantity, price} as Product)
    getAll = (): Promise<Product[]> => {
        return new Promise((resolve, reject) => {
            this.libsqlClient.execute('SELECT id, name, price, quantity FROM product').then((resultSet) => {
                resolve(resultSet.rows.map(this.mapRow));
            }).catch((reason) => reject(reason));
        });
    }
    search(searchQuery: string): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            this.libsqlClient.execute({
               sql: 'SELECT id, name, price, quantity FROM product WHERE name LIKE ?',
               args: [`%${searchQuery}%`]
           }).then((resultSet) => {
            resolve(resultSet.rows.map(this.mapRow));
           }).catch((reason) => reject(reason));
        })
    }
    getById(id: string): Promise<Product | undefined> {
        return new Promise((resolve, reject) => {
            this.libsqlClient.execute({
               sql: 'SELECT id, name, price, quantity FROM product WHERE id = ? LIMIT 1',
               args: [id]
           }).then((resultSet) => {
            resolve(resultSet.rows.map(this.mapRow).at(0));
           }).catch((reason) => reject(reason));
        })
    }

}