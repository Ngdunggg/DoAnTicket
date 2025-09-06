import authRouters from "@modules/auth/router/Routers";
import eventDetailRouters from "@modules/event-detail/router/Routers";
import homeRouters from "@modules/home/router/Routers";
import myTicketRouters from "@modules/my-ticket/router/Routers";
import PrivateRoute from "@share/auth/PrivateRoute";
// import LoadingModal from "@share/components/organisms/LoadingModal";
import PcLayout from "@share/components/templates/PcLayout";
import ScrollToTop from "@share/components/ScrollToTop";
import { Path } from "@share/constants/routers";
import { Outlet, RouteObject } from "react-router-dom";
// import ErrorBoundary from "../components/ErrorBoundary";
// import { ErrorHandler } from "../components/ErrorHandler";
// import { GlobalErrorHandler } from "../components/GlobalErrorHandler";
// import ErrorPage from "../pages/ErrorPage";

const Layout = PcLayout;
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

const PublicLayoutWrapper = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Outlet />
    </Layout>
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
        children: [...homeRouters, ...authRouters, ...eventDetailRouters],
        element: <PublicLayoutWrapper />,
        path: Path.PathRoot,
      },
      // Private routes - cần đăng nhập
      {
        children: [...myTicketRouters],
        element: <MainLayoutWrapper />,
        path: Path.PathRoot,
      },
    ],
    // errorElement: <ErrorPage />,
    path: Path.PathRoot,
  },
];

export default mainRoutes;
export { MainLayoutWrapper };
