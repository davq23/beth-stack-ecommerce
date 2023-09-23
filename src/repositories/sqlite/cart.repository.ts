import Cart from "../../models/Cart";
import { CartRepository } from "../cart.repository";
import SQLiteRepository from "./sqlite.repository";

export default class SQLiteCartRepository extends SQLiteRepository implements CartRepository {
    getCurrentById(id: string): Cart | undefined {
        throw new Error("Method not implemented.");
    }
    save(cart: Cart): Cart {
        throw new Error("Method not implemented.");
    }
}