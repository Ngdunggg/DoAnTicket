export const MODE_MENU = {
    BLACK: 'black',
    DEFAULT: 'default',
} as const;
type ModeMenuType = (typeof MODE_MENU)[keyof typeof MODE_MENU];
const MenuIcon = ({
    mode = MODE_MENU.DEFAULT,
    size = 24,
}: {
    mode?: ModeMenuType;
    size?: number;
}) => {
    const getFillColor = () => {
        switch (mode) {
            case MODE_MENU.BLACK:
                return '#1E1E1E';
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
                d="M3 12H21M3 6H21M3 18H21"
                stroke={getFillColor()}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MenuIcon;
