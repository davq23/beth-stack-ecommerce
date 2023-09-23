import Cart from "../models/Cart";

export interface CartRepository {
    getCurrentById(id: string): Promise<Cart|undefined>;
    save(cart: Cart): Promise<Cart>;
};