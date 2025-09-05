import { ComponentPropsWithoutRef, ReactNode } from "react";

/**
 * Const representing different text modes.
 */
export const MODE_WEIGHT = {
    LARGE: "large",
    MEDIUM: "medium",
    SMALL: "small",
} as const;
type ModeWeightType = (typeof MODE_WEIGHT)[keyof typeof MODE_WEIGHT];

export const MODE_LEADING = {
    EXTRA_LARGE: "extraLarge",
    LARGE: "large",
    LARGE_EXTREME: "largeExtreme",
    LARGE_SECONDARY: "largeSecondary",
    MEDIUM: "medium",
    MEDIUM_EXTRA: "mediumExtra",
    MEDIUM_EXTRA_SECONDARY: "mediumExtraSecondary",
    MEDIUM_SECONDARY: "mediumSecondary",
    NONE: "none",
    SMALL: "small",
    SMALL_SECONDARY: "smallSecondary",
    SMALL_TERTIARY: "smallTertiary",
    SUPER_TINY: "superTiny",
    TINY: "tiny",
    TINY_SMALL: "tinySmall",
    TINY_SMALL_SECONDARY: "tinySmallSecondary",
    VERY_LARGE: "veryLarge",
    VERY_TINY: "veryTiny",
} as const;
type ModeLeadingType = (typeof MODE_LEADING)[keyof typeof MODE_LEADING];

export const MODE_COLOR_TEXT = {
    BLACK: "black",
    GRAY: "gray",
    GRAY_SECONDARY: "graySecondary",
    GREEN: "green",
    RED: "red",
    WHITE: "white",
    YELLOW: "yellow",
} as const;
type ModeColorTextType = (typeof MODE_COLOR_TEXT)[keyof typeof MODE_COLOR_TEXT];

export const MODE_SIZE = {
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
    17: "17",
    18: "18",
    19: "19",
    20: "20",
    22: "22",
    24: "24",
    26: "26",
    28: "28",
    32: "32",
    40: "40",
    48: "48",
} as const;
export type ModeSizeType = (typeof MODE_SIZE)[keyof typeof MODE_SIZE];

type ITextProps = {
    autoTruncate?: boolean;
    children?: string | ReactNode;
    className?: string;
    id?: string;
    isAllowLineBreaks?: boolean;
    modeColor?: ModeColorTextType;
    modeLeading?: ModeLeadingType;
    modeSize?: ModeSizeType;
    modeWeight?: ModeWeightType;
} & ComponentPropsWithoutRef<"span">;

const modeWeightClasses: Record<ModeWeightType, string> = {
    large: "font-[700]",
    medium: "font-[500]",
    small: "font-[400]",
};

const modeLeadingClasses: Record<ModeLeadingType, string> = {
    extraLarge: "leading-[44px] tracking-[0px]",
    large: "leading-[28px] tracking-[0px]",
    largeExtreme: "leading-[32px] tracking-[0.25px]",
    largeSecondary: "leading-[28px] tracking-[0.25px]",
    medium: "leading-[26px] tracking-[0px]",
    mediumExtra: "leading-[22px] tracking-[0px]",
    mediumExtraSecondary: "leading-[24px] tracking-[0.25px]",
    mediumSecondary: "leading-[26px] tracking-[0.25px]",
    none: "leading-[100%] tracking-[0px]",
    small: "leading-[20px] tracking-[0.25px]",
    smallSecondary: "leading-[20px] tracking-[0.1px]",
    smallTertiary: "leading-[20px] tracking-[0px]",
    superTiny: "leading-[10px] tracking-[0px]",
    tiny: "leading-[16px] tracking-[0px]",
    tinySmall: "leading-[18px] tracking-[0px]",
    tinySmallSecondary: "leading-[18px] tracking-[0.25px]",
    veryLarge: "leading-[38px] tracking-[0px]",
    veryTiny: "leading-[14px] tracking-[0.25px]",
};

const modeColorClasses: Record<ModeColorTextType, string> = {
    black: "text-text-black",
    gray: "text-text-gray",
    graySecondary: "text-text-gray-2",
    green: "text-text-green",
    red: "text-text-red",
    white: "text-text-white",
    yellow: "text-text-yellow",
};

const modeSizeClasses: Record<ModeSizeType, string> = {
    10: "text-[10px]",
    11: "text-[11px]",
    12: "text-[12px]",
    13: "text-[13px]",
    14: "text-[14px]",
    15: "text-[15px]",
    16: "text-[16px]",
    17: "text-[17px]",
    18: "text-[18px]",
    19: "text-[19px]",
    20: "text-[20px]",
    22: "text-[22px]",
    24: "text-[24px]",
    26: "text-[26px]",
    28: "text-[28px]",
    32: "text-[32px]",
    40: "text-[40px]",
    48: "text-[48px]",
};

const getModeWeight = (mode: ModeWeightType): string => {
    return modeWeightClasses[mode] ?? modeWeightClasses.small;
};

const getModeLeading = (mode: ModeLeadingType): string => {
    return modeLeadingClasses[mode] ?? modeLeadingClasses.small;
};

const getModeColor = (mode: ModeColorTextType): string => {
    return modeColorClasses[mode] ?? modeColorClasses.black;
};

const getModeSize = (mode: ModeSizeType): string => {
    return modeSizeClasses[mode] ?? modeSizeClasses[16];
};

export function Text({
    children,
    className = "",
    isAllowLineBreaks = false,
    modeColor = MODE_COLOR_TEXT.BLACK,
    modeLeading = MODE_LEADING.SMALL,
    modeSize = MODE_SIZE[16],
    modeWeight = MODE_WEIGHT.SMALL,
    ...rest
}: ITextProps) {
    const weightClass = getModeWeight(modeWeight);
    const leadingClasses = getModeLeading(modeLeading);
    const colorClasses = getModeColor(modeColor);
    const sizeClasses = getModeSize(modeSize);

    return (
        <span
            className={`font ${isAllowLineBreaks ? "whitespace-pre-line" : ""} ${weightClass} ${leadingClasses} ${colorClasses} ${sizeClasses} ${className}`}
            {...rest}
        >
            {children}
        </span>
    );
}
