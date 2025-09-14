export const MODE_LOADING_SPINNER = {
    BLACK: 'black',
    GRAY: 'gray',
    WHITE: 'white',
    YELLOW: 'yellow',
} as const;

type ModeLoadingSpinnerType =
    (typeof MODE_LOADING_SPINNER)[keyof typeof MODE_LOADING_SPINNER];

interface ILoadingSpinnerIconProps {
    className?: string;
    mode?: ModeLoadingSpinnerType;
    size?: number;
}

function LoadingSpinnerIcon({
    className = '',
    mode = MODE_LOADING_SPINNER.WHITE,
    size = 24,
}: ILoadingSpinnerIconProps) {
    const getColor = () => {
        switch (mode) {
            case MODE_LOADING_SPINNER.BLACK:
                return '#000000';
            case MODE_LOADING_SPINNER.YELLOW:
                return '#FCCB62';
            case MODE_LOADING_SPINNER.GRAY:
                return '#6B7280';
            case MODE_LOADING_SPINNER.WHITE:
            default:
                return '#FFFFFF';
        }
    };

    const color = getColor();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`animate-spin ${className}`}
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
                opacity="0.25"
            />
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="23.562"
            />
        </svg>
    );
}

export default LoadingSpinnerIcon;
