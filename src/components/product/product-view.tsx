
import { Product } from '../../models/Product';
import * as elements from 'typed-html';

export const ProductView = ({product}: {product: Product}) => (
    <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>
                    {product.name}
                </h3>
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <table class="table">
                                <tbody>
                                    <tr>
                                        <td>Price</td>
                                        <td>{product.price}</td>
                                    </tr>
                                    <tr>
                                        <td>Quantity</td>
                                        <td>{product.quantity}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="row">
                        <div
                            class="col d-flex justify-content-end"
                        >
                            <button
                                type="button"
                                class="btn btn-success"
                                data-hx-post="/cart-items/add"
                                data-hx-vals={JSON.stringify({ id: product.id })}
                                data-hx-request='"credentials": true'
                                data-hx-swap="none"
                                data-hx-target="this"
                                _="on updateCartTotal send updateCartTotal(total: event.detail.total, currency: event.detail.currency) to #cart-button end"
                            >
                                <i class="bi bi-cart-plus"></i>    
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
);