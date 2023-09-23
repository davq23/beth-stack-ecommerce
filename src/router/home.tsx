import Elysia from 'elysia';
import * as elements from 'typed-html';

import { BaseTemplate } from '../components/layout/base-template';
import {html} from '@elysiajs/html';

const homeRoutes = new Elysia().group(
    '/',
    app => app.use(html()).get(
        '',
        () => <BaseTemplate>
            <div class="container">
                <div class="card">
                <div class="card-body">
                    <h4 class="card-title" safe>BETH Stack E-commerce</h4>
                    <p class="card-text" safe>
                        Page created using the BETH stack
                    </p>
                </div>
                </div>
            </div>
        </BaseTemplate>
    )
);

export default homeRoutes;