import { routerConfig } from '@configs/router';
// import { useNetworkStatus } from "@share/hooks/useNetworkStatus";
import { RouterProvider } from 'react-router-dom';

/**
 * Renders the NavigationApp component.
 * @returns The rendered RouterProvider component.
 */
export default function NavigationApp() {
    // useNetworkStatus();
    return <RouterProvider router={routerConfig} />;
}
