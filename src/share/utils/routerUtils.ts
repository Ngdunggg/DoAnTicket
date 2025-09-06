import { Capacitor } from '@capacitor/core';
import { useLocation } from 'react-router-dom';

/**
 * Get a query parameter from the URL.
 * Supports both BrowserRouter and HashRouter modes.
 *
 * @param key The name of the query parameter to retrieve.
 * @returns The value of the query parameter, or an empty string if not found.
 */
export function getQueryParam(key: string): string | null {
    let rawQuery = null;

    if (!Capacitor.isNativePlatform()) {
        // In BrowserRouter, query parameters are in window.location.search
        rawQuery = window.location.search.replace(/^\?/, '');
    } else {
        // In HashRouter, query parameters are after the '?' in the hash
        const [, query] = window.location.hash.replace(/^#/, '').split('?');
        rawQuery = query;
    }

    const searchParams = new URLSearchParams(rawQuery);
    return searchParams.get(key);
}

/**
 * Get the full URLSearchParams object from the current URL.
 * Supports both BrowserRouter and HashRouter.
 */
export function getSearchParams(): URLSearchParams {
    let rawQuery = null;

    if (!Capacitor.isNativePlatform()) {
        rawQuery = window.location.search.replace(/^\?/, '');
    } else {
        const [, query] = window.location.hash.replace(/^#/, '').split('?');
        rawQuery = query;
    }

    return new URLSearchParams(rawQuery);
}

/**
 * Get the current path from the URL, excluding query parameters.
 * Supports both BrowserRouter and HashRouter modes.
 * NOTE: This function is not recommended to use, because it will not trigger re-render when navigate.
 * Use getRouterPathname instead.
 *
 * @returns The current route path (e.g. "/qr-code")
 */
export function getWindowPathname(): string {
    if (!Capacitor.isNativePlatform()) {
        // In BrowserRouter, path is directly from pathname
        return window.location.pathname;
    } else {
        // In HashRouter, path is stored in the hash before the '?'
        const [path] = window.location.hash.replace(/^#/, '').split('?');
        return path || '/';
    }
}

/**
 * Get the current path from React Router.
 * Supports both BrowserRouter and HashRouter modes.
 * NOTE: This function is recommended to use
 * This is hook function, so it will trigger re-render when navigate.
 *
 * @returns The current route path (e.g. "/qr-code")
 */
export function getRouterPathname(): string {
    const { hash, pathname } = useLocation();
    if (!Capacitor.isNativePlatform()) {
        return pathname || window.location.pathname;
    } else {
        const _hash = hash || window.location.hash;
        const [path] = _hash.replace(/^#/, '').split('?');
        return path || '/';
    }
}

/**
 * Navigates to a given route based on the current environment.
 *
 * - In browser mode (HTTP/HTTPS), it uses `window.location.href`.
 * - In app/WebView mode (file:// or capacitor://), it uses `window.location.hash`.
 *
 * This ensures correct navigation behavior in both web and hybrid app contexts.
 *
 * @param path - The route path to navigate to (e.g. "/login")
 */
export function navigateToUrl(path: string) {
    if (!Capacitor.isNativePlatform()) {
        window.location.href = path;
    } else {
        window.location.hash = `#${path}`;
    }
}

/**
 * Navigates to a given path within a Single Page Application (SPA) without reloading the page.
 *
 * - In browser mode (typically on desktop), it uses `window.history.pushState` to update the URL
 *   without triggering a full page reload. It then dispatches a `popstate` event to notify any
 *   client-side routing system (e.g., React Router) to handle the route change.
 *
 * - In app mode (e.g., running inside a WebView), it falls back to hash-based navigation using
 *   `window.location.hash`, which is more compatible with older or constrained environments.
 *
 * @param path - The route path to navigate to (e.g. "/login")
 */
export function navigateToUrlSPA(path: string) {
    if (!Capacitor.isNativePlatform()) {
        window.history.pushState({}, '', path);
        window.dispatchEvent(new PopStateEvent('popstate'));
    } else {
        window.location.hash = `#${path}`;
    }
}
