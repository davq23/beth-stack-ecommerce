import Elysia, { t } from "elysia";
import { ProductView } from "../components/product/product-view";
import { SearchResults } from "../components/generic/search-result";
import { ProductRepository } from "../repositories/product.repository";
import { BaseTemplate } from "../components/layout/base-template";

import * as elements from 'typed-html';

import { diContainer } from "../config/container";
import { html } from "@elysiajs/html";
import { addBaseUrl } from "../config/utilities";

const productSearchQuery = t.Object({
    q: t.String(),
});

const productRoutes = new Elysia().decorate({ diContainer }).group(
    '/products',
    app => app.get('/:id', async ({params, headers, diContainer}) => {
        const productRepository = diContainer.get<ProductRepository>('productRepository');
        
        const product = await productRepository.getById(params.id);
        
        if (!product) {
            return new Response(null, {status: 404});
        }

        if (headers['hx-boosted']) {
            return <ProductView product={product} />
        } else {
            return <BaseTemplate>
                <ProductView product={product} />
            </BaseTemplate>
        }
    }).get('/search', async ({query}) => {
        const productRepository = diContainer.get<ProductRepository>('productRepository');

        const productResults = await productRepository.search(query.q);

        return <SearchResults results={productResults.map(({name, id}) => ({name, href: addBaseUrl(`products/${id}`)}))} />
    }, {
        query: productSearchQuery,
    })
);


export default productRoutes;