
import { Navbar } from './navbar';
import { Modal } from '../generic/modal';
import * as elements from 'typed-html';

const DOCTYPE_HTML = ({ children }: elements.Children) => {
    return `<!DOCTYPE html>${children}`;
}

export const BaseTemplate = ({ children }: elements.Children) => (
    <DOCTYPE_HTML>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="description" content="E-commerce page created with the BETH stack" />
                <title>Beth Stack</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css"></link>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous" />
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
                <script src="https://unpkg.com/htmx.org@1.9.5" integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO" crossorigin="anonymous"></script>
                <script src="https://unpkg.com/hyperscript.org@0.9.11"></script>
                <style>
                    {`#main.htmx-added {
                        opacity: 0;
                        transition: opacity 300ms ease-in;
                    }
                    #main.htmx-swapping {
                        opacity: 0;
                        transition: opacity 300ms ease-in;
                    }
                    #main {
                        opacity: 1;
                        transition: opacity 100ms ease-in;
                    }
                    .dropdown-menu.htmx-swapping {
                        opacity: 0;
                    }
                    .dropdown-menu {
                        opacity: 1;
                        transition: opacity 300ms ease-in;
                    }`}
                </style>
            </head>
            <body
                _="on load
    if cookies.cart then
        send setCart(cart: cookies.cart) to #cart-button
    else 
        set cookies.cart to {value: '{&quot;products&quot;: []}', maxAge: 0, path: '/'}
        send setCart(cart: cookies.cart) to #cart-button
    end
end

on updateCart(cart)
    set cookies.cart to {value: cart, maxAge: 0, path: '/'}
    then send setCart(cart: cart) to #cart-button
end"
        >
                <Navbar />
                <main id="main">
                    {children}
                </main>
                <Modal
                    id="shopping-cart"
                    title='My Cart'
                    bodyId='shopping-cart-body'
                    _="on shown.bs.modal send updateResultFooter to <form /> in me"
                >
                    <div></div>
                </Modal>
                {
                    process.env.NODE_ENV === 'development' ?
                    <script>
                        htmx.logAll();
                    </script> : ''
                }
            </body>
        </html>
    </DOCTYPE_HTML>
);
