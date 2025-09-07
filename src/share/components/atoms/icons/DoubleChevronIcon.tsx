export const MODE_DOUBLE_CHEVRON = {
    BLACK: 'black',
    WHITE: 'white',
} as const;

type ModeDoubleChevronType =
    (typeof MODE_DOUBLE_CHEVRON)[keyof typeof MODE_DOUBLE_CHEVRON];

function DoubleChevronIcon({
    mode = MODE_DOUBLE_CHEVRON.BLACK,
    size = 24,
}: {
    mode?: ModeDoubleChevronType;
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
                d="M13 17L18 12L13 7M6 17L11 12L6 7"
                stroke={
                    mode === MODE_DOUBLE_CHEVRON.BLACK ? '#1E1E1E' : '#FFFFFF'
                }
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default DoubleChevronIcon;
