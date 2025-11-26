export const MODE_MAIL_ICON = {
    DEFAULT: 'DEFAULT',
    WHITE: 'WHITE',
} as const;
export type ModeMailIconType =
    (typeof MODE_MAIL_ICON)[keyof typeof MODE_MAIL_ICON];

const MailIcon = ({
    mode = MODE_MAIL_ICON.DEFAULT,
    size = 24,
}: {
    mode?: ModeMailIconType;
    size?: number;
}) => {
    const getFillColor = () => {
        switch (mode) {
            case MODE_MAIL_ICON.DEFAULT:
                return '#1E1E1E';
            case MODE_MAIL_ICON.WHITE:
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
                d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6M22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6M22 6L12 13L2 6"
                stroke={getFillColor()}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MailIcon;
