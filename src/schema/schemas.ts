import { t } from "elysia";

const ProductModel = t.Object({
    id: t.String(),
    name: t.String(),
    price: t.Numeric({
        minimum: 0,
    }),
    quantity: t.Numeric({
        minimum: 0,
    }),
});


const GetItemsRequestBodyModel = t.Object({
    products: t.Array(ProductModel),
    currency: t.Optional(t.String()),
    rushMode: t.Optional(t.String()),
});


const AddItemRequestBodyModel = t.Object({
    id: t.String(),
    cart: GetItemsRequestBodyModel,
});

export {
    GetItemsRequestBodyModel,
    AddItemRequestBodyModel
};