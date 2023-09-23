import Database from "bun:sqlite";
import Container, { ContainerInstance, Inject } from "typedi";
import ReadOnlyDIContainer from "../libs/di.container";
import { Client, createClient } from "@libsql/client";
import TursoProductRepository from "../repositories/turso/product.repository";
import { ProductRepository } from "../repositories/product.repository";

const container = new ContainerInstance('');

container.set('db_filename', process.env.db_filename);
container.set('db_turso_url', process.env.db_turso_url);
container.set('db_turso_auth', process.env.db_turso_auth);

container.set('productRepository', (diContainer: ReadOnlyDIContainer): ProductRepository => {
    //return new SQLiteProductRepository(diContainer.get('db'));
    return new TursoProductRepository(diContainer.get('dbTurso'));
});
container.set('db', (diContainer: ReadOnlyDIContainer): Database => {
    return new Database(diContainer.get('db_filename'));
});
container.set('dbTurso', (diContainer: ReadOnlyDIContainer): Client => {
    return createClient({
        url: diContainer.get('db_turso_url'),
        authToken: diContainer.get('db_turso_auth'),
    });
});

const diContainer = new ReadOnlyDIContainer(container);

export {diContainer};