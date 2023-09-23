import Elysia from 'elysia';
import * as elements from 'typed-html';

import { BaseTemplate } from '../components/layout/base-template';
import {html} from '@elysiajs/html';

const homeRoutes = new Elysia().group(
    '/',
    app => app.use(html()).get(
        '',
        () => <BaseTemplate>
        </BaseTemplate>
    )
);

export default homeRoutes;