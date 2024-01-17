import 'reflect-metadata';
import {Elysia} from "elysia";
import productRoutes from "./router/products";
import cartRoutes from "./router/cart";
import homeRoutes from "./router/home";
import cartItemRoutes from './router/cart-item';
import authRoutes from './router/auth';
import {html} from '@elysiajs/html';

const app = new Elysia();

app.use(html());

app.use(homeRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(cartItemRoutes);
// app.use(authRoutes);

app.listen(3000, function () {
    // Check that this works
    console.log(`Elysia running at http://${app.server?.hostname}:${app.server?.port}`);
});