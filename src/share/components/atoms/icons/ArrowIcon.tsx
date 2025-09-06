export const MODE_ARROW = {
    BLACK: 'black',
    WHITE: 'white',
} as const;

type ModeArrowType = (typeof MODE_ARROW)[keyof typeof MODE_ARROW];

function ArrowIcon({
    mode = MODE_ARROW.BLACK,
    size = 24,
}: {
    mode?: ModeArrowType;
    size?: number;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M16.175 13H4V11H16.175L10.575 5.4L12 4L20 12L12 20L10.575 18.6L16.175 13Z"
                fill={mode === MODE_ARROW.BLACK ? '#1D1B20' : '#FFFFFF'}
            />
        </svg>
    );
}

export default ArrowIcon;
