import {html} from "@elysiajs/html";
import Elysia, { Context, t } from "elysia";
import { BaseTemplate } from "../components/layout/base-template";
import { Navbar } from "../components/layout/navbar";
import { ShoppingCart } from "../components/shopping-cart/shopping-cart";
import { transformURLEncodedToJSObject } from "../libs/utils";
import { ShoppingCartSummary } from "../components/shopping-cart/shopping-cart-summary";
import { diContainer } from "../config/container";
import { GetItemsRequestBodyModel } from "../schema/schemas";
import { CartRepository } from "../repositories/cart.repository";
import Cart from "../models/Cart";
import cookie from "@elysiajs/cookie";

import * as elements from 'typed-html';

const cartRoutes = new Elysia().use(cookie()).get('/cart/checkout', ({set}) => {
    set.redirect = '/';
}).decorate({ diContainer }).group(
    '/cart',
    {
        body: GetItemsRequestBodyModel,
        transform: ({ body, headers, cookie }) => {
            if (body) {
                transformURLEncodedToJSObject({ body, headers } as Context);

                const cartParsed = JSON.parse(cookie.cart);
                if (!body.products) {
                    body.products = cartParsed.products ?? [];
                }
                if (!body.rushMode) {
                    body.rushMode = cartParsed.rushMode ?? 'off';
                }
                if (!body.currency) {
                    body.currency = cartParsed.currency ?? 'USD';
                }

                body.products = body.products.map((product) => {
                    if (product instanceof Object) {
                        if (!Number.isNaN(product.price)) {
                            product.price = Number.parseFloat(product.price.toString());
                        }
                        if (!Number.isNaN(product.quantity)) {
                            product.quantity = Number.parseFloat(product.quantity.toString());
                        }
                    } else {
                        product = JSON.parse(product);
                    }

                    return product;
                });
            }
        },
    },
    app => app.post('/checkout', ({ body, headers, set }) => {
        if (headers['hx-request']) {
            set.headers['HX-Trigger'] = 'showCartModal,updateResultFooter';
            return <ShoppingCart
                products={body.products}
                rushMode={body.rushMode}
                currency={body.currency}
                summary={<div></div>}
                footer={<div class="text-end">
                    <form action="/cart/checkout" method="post">
                        <button type="submit" class="btn btn-primary">Go to checkout</button>
                    </form>
                </div>}
            />;
        }

        set.headers['HX-Trigger'] = "updateResultFooter";
        return <BaseTemplate>
            <div class="container">
                <ShoppingCart
                    products={body.products}
                    rushMode={body.rushMode}
                    currency={body.currency}
                    summary={<ShoppingCartSummary
                        products={body.products}
                        rushMode={body.rushMode}
                        currency={body.currency}
                    />}
                    footer={
                        <div>
                            <div class="text-end">
                                <button class="btn btn-warning">Finish checkout</button>
                            </div>
                        </div>
                    }
                />
            </div>
        </BaseTemplate>
    }).post(
        '/get-totals',
        ({ body, set, path }) => {
            const total = Cart.getTotalFromCart(body as Cart);

            if (!body.currency) {
                body.currency = 'USD';
            }

            set.headers['HX-Trigger'] = JSON.stringify({
                updateCartTotal: {
                    total,
                    currency: body.currency,
                },
                updateCart: {
                    cart: JSON.stringify(body),
                },
            });

            return <ShoppingCartSummary
                products={body.products}
                currency={body.currency}
                rushMode={body.rushMode}
            />
        }
    ).post('/finish-checkout', ({ body, diContainer }) => {
        const cartRepository = diContainer.get<CartRepository>('cartRepository');

        // TODO: Create invoice

        cartRepository.save(body as Cart);
    })
);

export default cartRoutes;