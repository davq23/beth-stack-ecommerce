import * as elements from "typed-html";
import { Product } from "../../models/Product";
import { ProductList } from "../product/product-list";
import { ShoppingCartOptions } from "./shopping-cart-options";
import { ShoppingCartSummary } from "./shopping-cart-summary";
import { addBaseUrl } from "../../config/utilities";

export interface BaseShoppingCartProps {
    currency: string|undefined
    rushMode: string|undefined
    products: Product[]
};

interface ShoppingCartProps extends BaseShoppingCartProps {
    summary: string|undefined
    footer: string|undefined
}

export const ShoppingCart = ({
    products: productList,
    currency,
    rushMode,
    summary,
    footer,
}: ShoppingCartProps) => {

    return (<div class="container-fluid">
        <form
            class="row"
            _="
            on updateCartTotal send updateCartTotal(total: event.detail.total, currency: event.detail.currency) to #cart-button end
            "
            data-hx-post={addBaseUrl('cart/get-totals')}
            data-hx-trigger="change,updateResultFooter"
            data-hx-target="find .results"
            action={addBaseUrl("cart/checkout")}
            method="POST"
        >
            <section class="col">
                <ProductList products={productList}></ProductList>
            </section>
            <section class="col">
                <ShoppingCartOptions currency={currency ?? 'USD'} rushMode={rushMode ?? 'off'}/>
            </section>
            <noscript>
                <button type="submit" class="btn btn-warning">
                    Refresh options
                </button>
            </noscript>
            <section class="results">
                {summary}
            </section>
            <footer>
                {footer}
            </footer>
        </form>
    </div>);
};