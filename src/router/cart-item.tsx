import cookie from "@elysiajs/cookie";
import {Elysia} from "elysia";
import { diContainer } from "../config/container";
import { AddItemRequestBodyModel } from "../schema/schemas";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/Product";
import Cart from "../models/Cart";

const cartItemRoutes = new Elysia().use(cookie()).decorate({ diContainer }).group(
    '/cart-items',
    {
        body: AddItemRequestBodyModel,
        transform: ({ cookie, body }) => {
            if (cookie.cart) {
                body.cart = JSON.parse(cookie.cart);
            } else {
                body.cart = { products: [] };
            }
        },
    },
    app => app.post('/add', async ({ body, diContainer }) => {
        const productRepository = diContainer.get<ProductRepository>('productRepository');

        const product = await productRepository.getById(body.id);
        if (!product || !product.id) {
            return new Response(null, { status: 404 });
        }

        const productIndex = body.cart.products.findIndex(({ id }: Product) => id === product.id);
        if (productIndex > -1) {
            body.cart.products[productIndex].quantity++;
        } else {
            product.quantity = 1;
            body.cart.products.push(product);
        }

        return new Response(null, {
            headers: {
                'HX-Trigger': JSON.stringify({
                    'updateCart': {
                        cart: JSON.stringify(body.cart),
                    },
                    updateCartTotal: {
                        total: Cart.getTotalFromCart(body.cart as Cart),
                        currency: body.cart.currency ?? 'USD',
                    }
                }),
            }
        });
    })
);

export default cartItemRoutes;