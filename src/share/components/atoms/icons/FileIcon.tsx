export const MODE_FILE = {
    BLACK: 'BLACK',
    DEFAULT: 'DEFAULT',
};

export type ModeFileType = (typeof MODE_FILE)[keyof typeof MODE_FILE];

const FileIcon = ({
    mode = MODE_FILE.DEFAULT,
    size = 24,
}: {
    mode?: ModeFileType;
    size?: number;
}) => {
    const getFillColor = () => {
        switch (mode) {
            case MODE_FILE.BLACK:
                return '#01060F';
            default:
                return '#FFFFFF';
        }
    };
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M28 4H12C10.9391 4 9.92172 4.42143 9.17157 5.17157C8.42143 5.92172 8 6.93913 8 8V40C8 41.0609 8.42143 42.0783 9.17157 42.8284C9.92172 43.5786 10.9391 44 12 44H36C37.0609 44 38.0783 43.5786 38.8284 42.8284C39.5786 42.0783 40 41.0609 40 40V16M28 4L40 16M28 4V16H40M32 26H16M32 34H16M20 18H16"
                stroke={getFillColor()}
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default FileIcon;
