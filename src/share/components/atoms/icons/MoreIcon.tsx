export const MODE_MORE = {
    BLACK: 'black',
    DEFAULT: 'default',
    YELLOW: 'yellow',
} as const;

type ModeEditType = (typeof MODE_MORE)[keyof typeof MODE_MORE];

function MoreIcon({
    mode = MODE_MORE.DEFAULT,
    size = 24,
}: Readonly<{ mode?: ModeEditType; size?: number }>) {
    const getFillColor = () => {
        switch (mode) {
            case MODE_MORE.YELLOW:
                return '#FCCB62';
            case MODE_MORE.BLACK:
                return '#01060F';
            default:
                return '#FFFFFF';
        }
    };

    const fillColor = getFillColor();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M24 26C25.1046 26 26 25.1046 26 24C26 22.8954 25.1046 22 24 22C22.8954 22 22 22.8954 22 24C22 25.1046 22.8954 26 24 26Z"
                stroke={fillColor}
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M24 12C25.1046 12 26 11.1046 26 10C26 8.89543 25.1046 8 24 8C22.8954 8 22 8.89543 22 10C22 11.1046 22.8954 12 24 12Z"
                stroke={fillColor}
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M24 40C25.1046 40 26 39.1046 26 38C26 36.8954 25.1046 36 24 36C22.8954 36 22 36.8954 22 38C22 39.1046 22.8954 40 24 40Z"
                stroke={fillColor}
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
}

export default MoreIcon;
