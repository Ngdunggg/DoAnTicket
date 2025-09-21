export const MODE_PLUS = {
    BLACK: 'BLACK',
    DEFAULT: 'DEFAULT',
    YELLOW: 'YELLOW',
};
type ModePlusType = (typeof MODE_PLUS)[keyof typeof MODE_PLUS];

const PlusIcon = ({
    mode = MODE_PLUS.DEFAULT,
    size = 24,
}: {
    mode?: ModePlusType;
    size?: number;
}) => {
    const getFillColor = () => {
        switch (mode) {
            case MODE_PLUS.YELLOW:
                return '#FCCB62';
            case MODE_PLUS.BLACK:
                return '#01060F';
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
            <path
                d="M12 5V19M5 12H19"
                stroke={getFillColor()}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default PlusIcon;
