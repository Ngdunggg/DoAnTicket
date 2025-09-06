import { Path } from '@share/constants/routers';
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
        path: Path.PathHome,
    },
];

export default homeRouters;
