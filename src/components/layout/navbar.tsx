
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
            <SearchBar className="position-relative mb-0" swap='outerHTML' target='find .dropdown-menu' endpoint={addBaseUrl('products/search')} placeholder='Search for a product' inputDelayMs={300}>
                <div
                    class="dropdown form-floating"
                    data-hx-boost="true"
                    data-hx-target="#main"
                    data-hx-swap="innerHTML"
                    _="on click remove .show from .dropdown-menu in me send resetSearch to closest <form />"
                >
                    <input type="text" class="form-control dropdown-toggle" name="q" id="query" placeholder={'...'} data-bs-toggle="dropdown" aria-expanded="false"/>
                    <label for="query">Search for a product</label>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <span class="currency"></span>
            <span class="total">My Cart</span>
        </button>
    </nav>
};