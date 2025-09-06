import { Button as Btn, ButtonProps } from "primereact/button";
import React, { ReactNode, useState } from "react";
/**
 * Const representing different button modes.
 */
export const MODE_BUTTON = {
  BLACK: "black",
  DECORATIVE_YELLOW: "decorativeYellow",
  NONE: "none",
  WHITE: "white",
  YELLOW: "yellow",
} as const;

export const SIZE_ICON = {
  LARGE: "large",
  MEDIUM: "medium",
  SMALL: "small",
  SUPER_LARGE: "superLarge",
} as const;

type ModeButtonType = (typeof MODE_BUTTON)[keyof typeof MODE_BUTTON];
type SizeIconType = (typeof SIZE_ICON)[keyof typeof SIZE_ICON];

/**
 * Custom button properties that extend PrimeReact's ButtonProps,
 * excluding some properties (icon, rounded, className) to allow custom styling.
 *
 * @property icon - Optional icon to display in the button.
 * @property mode - The display mode of the button, defined in MODE_BUTTON.
 * @property className - Additional custom CSS class names.
 */
interface IButtonProps
  extends Omit<ButtonProps, "icon" | "label" | "rounded" | "className"> {
  classChildren?: string;
  className?: string;
  icon?: ReactNode;
  isShadow?: boolean;
  mode?: ModeButtonType;
  sizeIcon?: SizeIconType;
}

/**
 * Custom Button component that wraps PrimeReact's Button.
 *
 * This component allows custom styling based on the specified mode,
 * supports rendering an icon along with the label, and adjusts its layout
 * when only an icon is provided.
 *
 * @param {IProps} props - The props for the Button component.
 * @returns A styled Button component.
 */
const Button = ({
  classChildren = "",
  className = "",
  disabled,
  icon,
  isShadow = false,
  loading,
  mode = MODE_BUTTON.BLACK,
  onClick,
  sizeIcon = SIZE_ICON.LARGE,
  ...restProps
}: IButtonProps) => {
  const [loadingOnClick, setLoadingOnClick] = useState(false);
  const renderIcon = () => {
    if (!icon) {
      return <></>;
    }

    return <>{icon}</>;
  };
  const modeButtonClasses: Record<ModeButtonType, string> = {
    black:
      "!bg-bg-black !border-white hover:!border-bg-yellow hover:!text-text-yellow !text-text-white transition-all duration-200",
    decorativeYellow: "decorative-yellow-btn",
    none: "!bg-transparent !border-none !text-text-white hover:!text-text-yellow",
    white:
      "!bg-white !border-bg-black-2 hover:!bg-white !text-text-black transition-all duration-200",
    yellow:
      "!bg-bg-yellow !border-bg-yellow hover:!border-bg-yellow hover:!text-text-black !text-text-black transition-all duration-300 ",
  };

  const sizeIconClasses: Record<SizeIconType, string> = {
    large: "!min-h-12 !min-w-12 h-12 w-12 !p-0 flex justify-center",
    medium:
      "!min-h-[44px] !min-w-[44px] h-[44px] w-[44px] !p-0 flex justify-center",
    small:
      "!min-h-[38px] !min-w-[38px] h-[38px] w-[38px] !p-0 flex justify-center",
    superLarge:
      "!min-h-[64px] !min-w-[64px] h-[64px] w-[64px] !p-0 flex justify-center",
  };

  const getModeButton = (mode: ModeButtonType): string => {
    return modeButtonClasses[mode] ?? modeButtonClasses.black;
  };

  const getSizeIcon = (sizeIcon: SizeIconType): string => {
    return sizeIconClasses[sizeIcon] ?? sizeIconClasses.large;
  };

  const getClassName = () => {
    const onlyIcon = !restProps?.children;
    const modeButton = getModeButton(mode);
    const sizeIconButton = getSizeIcon(sizeIcon);

    const shadowClass = isShadow ? "box-shadow" : "";
    const iconClass = onlyIcon ? sizeIconButton : "";

    return `min-h-10 px-2 ${modeButton} ${shadowClass} ${className} ${iconClass}`;
  };

  /**
   * Set loading for button prevent double click
   *
   * @param e action onClick
   */
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      return;
    }
    try {
      setLoadingOnClick(true);
      onClick(e);
    } finally {
      setLoadingOnClick(false);
    }
  };

  return (
    <Btn
      rounded
      {...restProps}
      className={getClassName()}
      onClick={handleClick}
      disabled={disabled || loading || loadingOnClick}
    >
      <div
        className={`flex justify-center items-center gap-[5px] w-full ${classChildren}`}
      >
        {/* {loading || loadingOnClick ? <ImSpinner8 className="animate-spin" /> : renderIcon()} */}
        {loading || loadingOnClick ? <></> : renderIcon()}
        {restProps?.children}
      </div>
    </Btn>
  );
};

export default Button;
