export const MODE_FILTER = {
    DEFAULT: 'DEFAULT',
    WHITE: 'WHITE',
} as const;
type ModeFilterType = (typeof MODE_FILTER)[keyof typeof MODE_FILTER];

const FilterIcon = ({
    mode = MODE_FILTER.DEFAULT,
    size = 24,
}: {
    mode?: ModeFilterType;
    size?: number;
}) => {
    const getFillColor = () => {
        switch (mode) {
            case MODE_FILTER.WHITE:
                return '#FFFFFF';
            default:
                return '#01060F';
        }
    };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={getFillColor()}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                stroke={getFillColor()}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default FilterIcon;
