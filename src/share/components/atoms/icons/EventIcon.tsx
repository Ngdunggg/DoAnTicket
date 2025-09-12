export const MODE_EVENT = {
    DEFAULT: 'default',
    YELLOW: 'yellow',
} as const;
type ModeEditType = (typeof MODE_EVENT)[keyof typeof MODE_EVENT];

function EventIcon({
    mode = MODE_EVENT.DEFAULT,
    size = 24,
}: Readonly<{ mode?: ModeEditType; size?: number }>) {
    const getFillColor = () => {
        switch (mode) {
            case MODE_EVENT.YELLOW:
                return '#FCCB62';
            default:
                return '#FFFFFF';
        }
    };

    const fillColor = getFillColor();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#events_icon_svg__clip0_20910_351)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1h1a4 4 0 014 4v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a4 4 0 014-4h1V3a1 1 0 011-1zm4.514 8.32a.573.573 0 00-1.028 0l-.792 1.604a.573.573 0 01-.432.314l-1.77.257a.573.573 0 00-.318.978l1.281 1.25a.573.573 0 01.165.506l-.302 1.764a.573.573 0 00.831.605l1.584-.833a.573.573 0 01.534 0l1.584.832a.573.573 0 00.831-.604l-.302-1.763a.573.573 0 01.165-.508l1.281-1.249a.573.573 0 00-.318-.978l-1.77-.257a.573.573 0 01-.432-.314l-.792-1.604z"
                    fill={fillColor}
                ></path>
            </g>
            <defs>
                <clipPath id="events_icon_svg__clip0_20910_351">
                    <path
                        fill="#fff"
                        transform="translate(2 2)"
                        d="M0 0h20v20H0z"
                    ></path>
                </clipPath>
            </defs>
        </svg>
    );
}

export default EventIcon;
