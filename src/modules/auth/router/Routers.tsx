import { SCREEN_PATH } from '@share/constants/routers';
import { RouteObject } from 'react-router-dom';
import AuthCallback from '../pages/AuthCallback';

const authRouters: RouteObject[] = [
    {
        element: <AuthCallback />,
        path: SCREEN_PATH.AUTH_CALLBACK,
    },
];

export default authRouters;
