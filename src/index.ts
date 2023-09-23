import 'reflect-metadata';
import {Elysia} from "elysia";
import productRoutes from "./router/products";
import cartRoutes from "./router/cart";
import homeRoutes from "./router/home";
import cartItemRoutes from './router/cart-item';

const app =  new Elysia().onAfterHandle(({set}) => {
    // This is a purely hypermedia app
    set.headers['Content-Type'] = 'text/html;charset=utf-8';
});

app.use(homeRoutes);
app.use(productRoutes);
app.use(cartRoutes);
app.use(cartItemRoutes);

app.listen(3000, function () {
    // Check that this works
    console.log(`Elysia running at http://${app.server?.hostname}:${app.server?.port}`);
});