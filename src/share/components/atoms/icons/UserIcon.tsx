export const MODE_USER = {
  DEFAULT: "default",
  YELLOW: "yellow",
} as const;

type ModeEditType = (typeof MODE_USER)[keyof typeof MODE_USER];

function UserIcon({
  mode = MODE_USER.DEFAULT,
  size = 24,
}: Readonly<{ mode?: ModeEditType; size?: number }>) {
  const getFillColor = () => {
    switch (mode) {
      case MODE_USER.YELLOW:
        return "#FCCB62";
      default:
        return "#FFFFFF";
    }
  };

  const fillColor = getFillColor();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.424 12.374a5 5 0 10-4.849 0 8.008 8.008 0 00-5.513 6.628c-.069.548.386.998.938.998h14c.552 0 1.007-.45.938-.998a8.009 8.009 0 00-5.514-6.628z"
        fill={fillColor}
      ></path>
    </svg>
  );
}

export default UserIcon;
