export const MODE_TICKET = {
    DEFAULT: 'default',
    WHITE: 'white',
} as const;

type ModeEditType = (typeof MODE_TICKET)[keyof typeof MODE_TICKET];

function SearchIcon({
    className = '',
    mode = MODE_TICKET.DEFAULT,
    size = 24,
}: Readonly<{ className?: string; mode?: ModeEditType; size?: number }>) {
    // Use mode to determine fill color
    const getFillColor = () => {
        switch (mode) {
            case MODE_TICKET.WHITE:
                return '#FFFFFF';
            default:
                return '#7E7E88';
        }
    };

    const fillColor = getFillColor();

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 16 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M11.3295 7.08823C11.3295 5.41176 10.4177 3.88235 8.97657 3.0294C7.50598 2.17646 5.71186 2.17646 4.27069 3.0294C2.8001 3.88235 1.91775 5.41176 1.91775 7.08823C1.91775 8.79411 2.8001 10.3235 4.27069 11.1765C5.71186 12.0294 7.50598 12.0294 8.97657 11.1765C10.4177 10.3235 11.3295 8.79411 11.3295 7.08823ZM10.4177 11.9118C9.35892 12.7353 8.03539 13.2059 6.62363 13.2059C3.24128 13.2059 0.505981 10.4706 0.505981 7.08823C0.505981 3.73529 3.24128 0.970581 6.62363 0.970581C9.97657 0.970581 12.7413 3.73529 12.7413 7.08823C12.7413 8.5294 12.2413 9.85293 11.4178 10.9118L15.3589 14.8236C15.6236 15.1176 15.6236 15.5588 15.3589 15.8235C15.0649 16.1177 14.6236 16.1177 14.359 15.8235L10.4177 11.9118Z"
                fill={fillColor}
                className="transition-colors duration-200"
            />
        </svg>
    );
}

export default SearchIcon;
