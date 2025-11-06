import { RouteObject } from 'react-router-dom';
import AdminPage from '@modules/admin/pages/AdminPage';
import { SCREEN_PATH } from '@share/constants/routers';

const adminRouters: RouteObject[] = [
    {
        element: <AdminPage />,
        path: SCREEN_PATH.ADMIN_DASHBOARD,
    },
];

export default adminRouters;
