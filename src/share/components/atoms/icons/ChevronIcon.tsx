export const MODE_CHEVRON = {
    BLACK: 'black',
    WHITE: 'white',
} as const;
type ModeChevronType = (typeof MODE_CHEVRON)[keyof typeof MODE_CHEVRON];

export const MODE_CHEVRON_DIRECTION = {
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    UP: 'up',
} as const;
type ModeChevronDirectionType =
    (typeof MODE_CHEVRON_DIRECTION)[keyof typeof MODE_CHEVRON_DIRECTION];

function ChevronIcon({
    className = '',
    direction = MODE_CHEVRON_DIRECTION.DOWN,
    mode = MODE_CHEVRON.BLACK,
    size = 24,
}: {
    className?: string;
    direction?: ModeChevronDirectionType;
    mode?: ModeChevronType;
    size?: number;
}) {
    const getRotation = () => {
        switch (direction) {
            case MODE_CHEVRON_DIRECTION.UP:
                return 'rotate-180';
            case MODE_CHEVRON_DIRECTION.LEFT:
                return 'rotate-90';
            case MODE_CHEVRON_DIRECTION.RIGHT:
                return '-rotate-90';
            case MODE_CHEVRON_DIRECTION.DOWN:
            default:
                return 'rotate-0';
        }
    };

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-transform duration-300 ease-in-out ${getRotation()} ${className}`}
        >
            <path
                d="M12 18L24 30L36 18"
                stroke={mode === MODE_CHEVRON.BLACK ? '#1E1E1E' : '#FFFFFF'}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default ChevronIcon;
