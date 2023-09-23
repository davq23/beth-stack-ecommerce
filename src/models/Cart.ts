import { Product } from "./Product";

export default class Cart {
    products: Product[] = [];
    rushMode: string = 'off';
    currency: string = 'USD';

    public static getTotalFromCart = (cart: Cart): number => {
        const multiplier = cart.rushMode === 'on' ? 1.5 : 1;

        return cart.products.reduce(
            (carry: number, { price, quantity }) => carry + (price * quantity * multiplier),
            0
        );
    }
}