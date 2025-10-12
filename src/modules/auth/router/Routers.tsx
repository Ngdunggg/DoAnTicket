import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import Login from '../pages/Login';
import AuthCallback from '../pages/AuthCallback';

const authRouters: RouteObject[] = [
    {
        children: [
            {
                element: <Login />,
                index: true,
            },
        ],
        path: SCREEN_PATH.AUTH_LOGIN,
    },
    {
        element: <AuthCallback />,
        path: SCREEN_PATH.AUTH_CALLBACK,
    },
];

export default authRouters;
