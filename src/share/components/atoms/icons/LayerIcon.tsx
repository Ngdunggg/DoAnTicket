export const MODE_LAYER = {
    BLACK: 'BLACK',
    DEFAULT: 'DEFAULT',
    YELLOW: 'YELLOW',
};

export type ModeLayerType = (typeof MODE_LAYER)[keyof typeof MODE_LAYER];

const LayerIcon = ({
    mode = MODE_LAYER.DEFAULT,
    size = 24,
}: {
    mode?: ModeLayerType;
    size?: number;
}) => {
    const getFillColor = () => {
        switch (mode) {
            case MODE_LAYER.BLACK:
                return '#01060F';
            case MODE_LAYER.YELLOW:
                return '#FCCB62';
            default:
                return '#FFFFFF';
        }
    };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_353_333)">
                <path
                    d="M2 17L12 22L22 17M2 12L12 17L22 12M12 2L2 7L12 12L22 7L12 2Z"
                    stroke={getFillColor()}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_353_333">
                    <rect width={size} height={size} fill={getFillColor()} />
                </clipPath>
            </defs>
        </svg>
    );
};

export default LayerIcon;
