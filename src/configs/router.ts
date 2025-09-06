import mainRoutes from "@modules/main/router/Routers";
import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from "react-router-dom";
import envConfig from "@configs/env";

/**
 * The array of route objects.
 */
export const routes: RouteObject[] = [...mainRoutes];

/**
 * The router configuration.
 */
export const routerConfig = envConfig.isBrowserMode
  ? createBrowserRouter(routes)
  : createHashRouter(routes);
