import * as elements from "typed-html";
import { Product } from "../../models/Product";
import { ProductListItem } from "./product-list-item";

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({products}: ProductListProps) => {
    return <ul class="list-group">
        {products.map((product: Product, index) => <ProductListItem product={product} index={index}/>)}
    </ul>
};