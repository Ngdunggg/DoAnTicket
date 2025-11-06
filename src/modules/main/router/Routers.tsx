import authRouters from '@modules/auth/router/Routers';
import {
    eventDetailPublicRouters,
    eventDetailPrivateRouters,
} from '@modules/event-detail/router/Routers';
import eventsRouters from '@modules/events/router/Routers';
import homeRouters from '@modules/home/router/Routers';
import myTicketRouters from '@modules/my-ticket/router/Routers';
import PrivateRoute from '@share/auth/PrivateRoute';
import managerEventRouters from '@modules/manager-event/router/Routers';
import adminRouters from '@modules/admin/router/Routers';
// import LoadingModal from "@share/components/organisms/LoadingModal";
import PcLayout from '@share/components/templates/PcLayout';
import ManagerLayoutComponent from '@share/components/templates/ManagerLayout';
import AdminLayout from '@share/components/templates/AdminLayout';
import ScrollToTop from '@share/components/ScrollToTop';
import { SCREEN_PATH } from '@share/constants/routers';
import { Outlet, RouteObject } from 'react-router-dom';
import { ROLE } from '@share/constants/commons';
// import ErrorBoundary from "../components/ErrorBoundary";
// import { ErrorHandler } from "../components/ErrorHandler";
// import { GlobalErrorHandler } from "../components/GlobalErrorHandler";
// import ErrorPage from "../pages/ErrorPage";

const Layout = PcLayout;
const ManagerLayout = ManagerLayoutComponent;

/**
 * Represents the main layout wrapper.
 */
const MainLayoutWrapper = () => {
    return (
        <PrivateRoute>
            {/* <ErrorHandler>
                <GlobalErrorHandler> */}
            <Layout>
                {/* <ErrorBoundary> */}
                <ScrollToTop />
                <Outlet />
                {/* <LoadingModal /> */}
                {/* </ErrorBoundary> */}
            </Layout>
            {/* </GlobalErrorHandler>
            </ErrorHandler> */}
        </PrivateRoute>
    );
};

/**
 * Represents the public layout wrapper.
 */
const PublicLayoutWrapper = () => {
    return (
        <Layout>
            <ScrollToTop />
            <Outlet />
        </Layout>
    );
};

const ManagerEventLayoutWrapper = () => {
    return (
        <PrivateRoute>
            <ManagerLayout>
                <ScrollToTop />
                <Outlet />
            </ManagerLayout>
        </PrivateRoute>
    );
};

const AdminLayoutWrapper = () => {
    return (
        <PrivateRoute allowedRoles={[ROLE.ADMIN]}>
            <AdminLayout>
                <ScrollToTop />
                <Outlet />
            </AdminLayout>
        </PrivateRoute>
    );
};
/**
 * Represents the main routes configuration.
 */
const mainRoutes: RouteObject[] = [
    {
        children: [
            // Public routes - không cần đăng nhập
            {
                children: [
                    ...homeRouters,
                    ...authRouters,
                    ...eventDetailPublicRouters,
                    ...eventsRouters,
                ],
                element: <PublicLayoutWrapper />,
                path: SCREEN_PATH.ROOT,
            },
            // Private routes - cần đăng nhập
            {
                children: [...myTicketRouters, ...eventDetailPrivateRouters],
                element: <MainLayoutWrapper />,
                path: SCREEN_PATH.ROOT,
            },
            {
                children: [...adminRouters],
                element: <AdminLayoutWrapper />,
                path: SCREEN_PATH.ROOT,
            },
            {
                children: [...managerEventRouters],
                element: <ManagerEventLayoutWrapper />,
                path: SCREEN_PATH.ROOT,
            },
        ],
        // errorElement: <ErrorPage />,
        path: SCREEN_PATH.ROOT,
    },
];

export default mainRoutes;
export { MainLayoutWrapper };
