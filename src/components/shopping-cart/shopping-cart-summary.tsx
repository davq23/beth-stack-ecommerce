import Cart from "../../models/Cart";
import { BaseShoppingCartProps } from "./shopping-cart";

import * as elements from 'typed-html';

interface ShoppingCartSummaryProps extends BaseShoppingCartProps {
} 

export const ShoppingCartSummary = ({ currency, products: productList, rushMode }: ShoppingCartSummaryProps) => {
    const multiplier = rushMode === 'on' ? 1.5 : 1;

    const total = Cart.getTotalFromCart({currency, products: productList, rushMode} as Cart);
    return <table class="table table-hover">
        <thead>
            <tr>
                <th>Name</th>
                <th>Pricing</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            {productList.map(({ name, price, quantity }) =>
                <tr>
                    <td safe>{name}</td>
                    <td class="text-center">
                        <i>
                            {quantity} x {price} {currency}/u
                            {rushMode === 'on' ? 'x 1.5 FD' : ''}
                        </i>
                    </td>
                    <td>{currency} {(price * quantity * multiplier).toFixed(2)}</td>
                </tr>
            )}
            <tr class="table-primary">
                <td></td>
                <td class="text-center">Total</td>
                <td class="fw-bold">{currency} {total.toFixed(2)}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan={3} class="text-end">
                </td>
            </tr>
        </tfoot>
    </table>
};