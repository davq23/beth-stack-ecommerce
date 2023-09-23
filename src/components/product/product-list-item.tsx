import * as elements from "typed-html";
import { Product } from "../../models/Product";

interface ProductListItemProps {
    product: Product,
    index: number,
};

export const ProductListItem = ({product, index}: ProductListItemProps) => {
    return <li class="list-group-item justify-content-between">
        <span safe>
            {product.name}
        </span>
        <span>
            <input type="hidden" name={`products[][id]`} value={product.id ?? ''} />
            <input type="hidden" name={`products[][name]`} value={product.name} />
            <input type="hidden" name={`products[][price]`} value={product.price.toString()}  />
            <input type="number" step="0.1" class="form-control" min="0" name={`products[][quantity]`} value={product.quantity.toString()} />
        </span>
    </li>
};