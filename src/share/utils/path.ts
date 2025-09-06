import { EVENT_PATH_PATTERNS } from '@share/constants/routers';
import { isNotNullOrUndefined } from '@share/utils/validate';

/**
 * Utility function to create a regex from a path
 * @param path - The path to create a regex from
 * @returns An object containing the keys and regex
 */
export function createRegexFromPath(path: string): {
    keys: string[];
    regex: RegExp;
} {
    const termList = path.split('/');
    const keys: string[] = [];

    const regexList = termList.map(term => {
        if (term.startsWith(':')) {
            keys.push(term.slice(1));
            return '([^/]+)';
        }
        return term;
    });

    const regexString = regexList.join('/');

    return { keys, regex: new RegExp(`^${regexString}$`) };
}

/**
 * Utility function to check if a current path matches a format path
 * @param formatPath - The format path to match against
 * @param currentPath - The current path to check
 * @returns True if the current path matches the format path, false otherwise
 */
export function matchPathToPatterns(
    formatPath: string,
    currentPath: string
): boolean {
    const { regex } = createRegexFromPath(formatPath);
    const match = currentPath.match(regex);

    return !!(match && match.length);
}

/**
 * Utility function to extract a key from a path
 * @param formatPath - The format path to extract the key from
 * @param currentPath - The current path to extract the key from
 * @param key - The key to extract
 * @returns The value of the key or null if not found
 */
export function extractKeyFromPath(
    formatPath: string,
    currentPath: string,
    key: string
): string | null {
    const { keys, regex } = createRegexFromPath(formatPath);
    const match = currentPath.match(regex);

    if (match) {
        const index = keys.indexOf(key);
        if (index !== -1) {
            return match[index + 1];
        }
    }

    return null;
}

/**
 * Utility function to extract event_id from current URL pathname
 * @param pathname - Current URL pathname
 * @returns event_id as string or null if not found
 */
export const getCurrentEventId = (pathname: string): string | null => {
    // Try to extract worksite_id from all patterns
    for (const pattern of EVENT_PATH_PATTERNS) {
        const eventId = extractKeyFromPath(pattern, pathname, 'event_id');
        if (isNotNullOrUndefined(eventId)) {
            return eventId;
        }
    }

    return null;
};

// /**
//  * Utility function to update tenant name in the current pathname
//  * @param pathname - Current URL pathname
//  * @param newTenantName - New tenant name to replace in the path
//  * @returns Updated pathname with new tenant name or original pathname if no tenant pattern matches
//  */
// export const updateTenantNameInPath = (
//     pathname: string,
//     newTenantName: string
// ): string => {
//     // Check if current path matches any tenant name pattern
//     for (const pattern of TENANT_NAME_PATH_PATTERNS) {
//         if (matchPathToPatterns(pattern, pathname)) {
//             // Extract current tenant name
//             const currentTenantName = extractKeyFromPath(
//                 pattern,
//                 pathname,
//                 'tenant_name'
//             );
//             if (isNotNullOrUndefined(currentTenantName)) {
//                 // Replace the current tenant name with the new one
//                 return pathname.replace(
//                     `/${currentTenantName}/`,
//                     `/${newTenantName}/`
//                 );
//             }
//         }
//     }

//     // Return original pathname if no tenant pattern matches
//     return pathname;
// };
