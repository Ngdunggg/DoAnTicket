import { useMediaQuery } from 'react-responsive';

/**
 * Custom hook to detect if the current device is a mobile device (max width: 1024px)
 */
export default function useDetectMobile() {
    return useMediaQuery({ maxWidth: 1024 });
}
