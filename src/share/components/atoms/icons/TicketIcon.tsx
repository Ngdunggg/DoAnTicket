export const MODE_TICKET = {
    DEFAULT: "default",
    WHITE: "white",
    YELLOW: "yellow",
} as const;

type ModeEditType = (typeof MODE_TICKET)[keyof typeof MODE_TICKET];

function TicketIcon({
    mode = MODE_TICKET.DEFAULT,
    size = 24,
    className = "",
}: Readonly<{ mode?: ModeEditType; size?: number; className?: string }>) {
    // Use mode to determine fill color
    const getFillColor = () => {
        switch (mode) {
            case MODE_TICKET.WHITE:
                return "#FFFFFF";
            case MODE_TICKET.YELLOW:
                return "#FCCB62";
            default:
                return "#01060F";
        }
    };

    const fillColor = getFillColor();

    return (
        <svg
            width={size}
            height={Math.round((size * 17) / 21)}
            viewBox="0 0 21 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                d="M14.08 12.9619L10.5 10.6619L6.92 12.9619L8 8.84187L4.71 6.16187L8.96 5.90187L10.5 1.96187L12.04 5.90187L16.29 6.16187L13 8.84187M18.5 8.16187C18.5 7.63143 18.7107 7.12273 19.0858 6.74765C19.4609 6.37258 19.9696 6.16187 20.5 6.16187V2.16187C20.5 1.63143 20.2893 1.12272 19.9142 0.747652C19.5391 0.372579 19.0304 0.161865 18.5 0.161865H2.5C1.96957 0.161865 1.46086 0.372579 1.08579 0.747652C0.710714 1.12272 0.5 1.63143 0.5 2.16187V6.16187C1.03043 6.16187 1.53914 6.37258 1.91421 6.74765C2.28929 7.12273 2.5 7.63143 2.5 8.16187C2.5 8.6923 2.28929 9.20101 1.91421 9.57608C1.53914 9.95115 1.03043 10.1619 0.5 10.1619V14.1619C0.5 14.6923 0.710714 15.201 1.08579 15.5761C1.46086 15.9512 1.96957 16.1619 2.5 16.1619H18.5C19.0304 16.1619 19.5391 15.9512 19.9142 15.5761C20.2893 15.201 20.5 14.6923 20.5 14.1619V10.1619C19.9696 10.1619 19.4609 9.95115 19.0858 9.57608C18.7107 9.20101 18.5 8.6923 18.5 8.16187Z"
                fill={fillColor}
                className="transition-colors duration-200"
            />
        </svg>
    );
}

export default TicketIcon;
