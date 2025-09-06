import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import Home from '../pages/Home';

const homeRouters: RouteObject[] = [
    {
        children: [
            {
                element: <Home />,
                index: true,
            },
        ],
        path: SCREEN_PATH.HOME,
    },
];

export default homeRouters;
