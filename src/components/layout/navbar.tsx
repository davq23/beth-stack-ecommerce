
import { addBaseUrl } from '../../config/utilities';
import { SearchBar } from '../generic/search-bar';

import * as elements from 'typed-html';

export const Navbar = () => {
    return <nav class="navbar navbar-expand navbar-light bg-light justify-content-between mx-1 mb-2">
        <ul class="nav navbar-nav" data-hx-boost="true">
            <li class="nav-item">
                <a class="nav-link" href={addBaseUrl('')}>BETH Stack E-commerce</a>
            </li>
        </ul>
        <div class="d-flex justify-content-center my-1 align-items-center">
            <SearchBar className="position-relative mb-0" swap='outerHTML' target='find .dropdown-menu' endpoint={addBaseUrl('products/search')} placeholder='Search for a product'>
                <div
                    class="dropdown"
                    data-hx-boost="true"
                    data-hx-target="#main"
                    data-hx-swap="innerHTML"
                    _="on click remove .show from .dropdown-menu in me send resetSearch to closest <form />"
                >
                    <input type="text" class="form-control dropdown-toggle" name="q" id="query" placeholder={'Search for a product'} data-bs-toggle="dropdown" aria-expanded="false"/>
                    <div class="dropdown-menu"></div>
                </div>
            </SearchBar>
        </div>
        <button
            id="cart-button"
            class="btn btn-primary text-end cart-button"
            data-hx-post={addBaseUrl('cart/checkout')}
            data-hx-modal="#shopping-cart"
            data-hx-target="#shopping-cart-body"
            type="button"
            _="
        on updateCartTotal(total, currency) put total into .total in me put currency into .currency in me end
            on showCartModal call bootstrap.Modal.getOrCreateInstance(@data-hx-modal).show() end

        on click toggle @disabled until htmx:afterOnLoad"
        >
            <i class="bi bi-cart"></i>
            <span class="currency"></span>
            <span class="total"></span>
        </button>
    </nav>
};