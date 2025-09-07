import { useFieldIgnoreOnBlur } from '@share/hooks/useFieldIgnoreOnBlur';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { forwardRef, ReactNode, RefObject, useRef } from 'react';
import DivClick from '@share/components/atoms/DivClick';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';

export const ICON_INPUT_POSITION = {
    LEFT: 'left',
    RIGHT: 'right',
} as const;
type IconInputPositionType =
    (typeof ICON_INPUT_POSITION)[keyof typeof ICON_INPUT_POSITION];

export const MODE_INPUT = {
    DEFAULT: 'default',
    ROUNDED: 'rounded',
} as const;
type ModeInputType = (typeof MODE_INPUT)[keyof typeof MODE_INPUT];

export const MODE_SIZE = {
    10: '10',
    11: '11',
    12: '12',
    13: '13',
    14: '14',
    15: '15',
    16: '16',
    17: '17',
    18: '18',
    19: '19',
    20: '20',
    22: '22',
    24: '24',
    26: '26',
    28: '28',
    32: '32',
} as const;
type ModeSizeType = (typeof MODE_SIZE)[keyof typeof MODE_SIZE];

/**
 * Custom InputText component that wraps PrimeReact's InputText.
 *
 * This component applies a default styling with a fixed height, full width,
 * and a custom class (`custom-input-text`). Additional class names can be appended
 * via the `className` prop.
 *
 * @param {IInputProps} props - The properties for the InputText component.
 */
export interface IInputProps extends Omit<InputTextProps, 'className'> {
    className?: string;
    error?: string;
    errorClassName?: string;
    eyeClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconClear?: ReactNode;
    iconPosition?: IconInputPositionType;
    isShowClear?: boolean;
    isShowIcon?: boolean;
    mode?: ModeInputType;
    modeSize?: ModeSizeType;
    onBlurIgnoreClearIcon?: () => void;
    onClearInput?: () => void;
    ptClassName?: string;
    refIgnoreOnBlur?: RefObject<HTMLDivElement | null>[];
    wrapClassName?: string;
}

const modeSizeClasses: Record<ModeSizeType, string> = {
    10: 'text-[10px]',
    11: 'text-[11px]',
    12: 'text-[12px]',
    13: 'text-[13px]',
    14: 'text-[14px]',
    15: 'text-[15px]',
    16: 'text-[16px]',
    17: 'text-[17px]',
    18: 'text-[18px]',
    19: 'text-[19px]',
    20: 'text-[20px]',
    22: 'text-[22px]',
    24: 'text-[24px]',
    26: 'text-[26px]',
    28: 'text-[28px]',
    32: 'text-[32px]',
};

const getModeSize = (mode: ModeSizeType): string => {
    return modeSizeClasses[mode] ?? modeSizeClasses[18];
};

const Input = forwardRef<HTMLInputElement, IInputProps>(
    (
        {
            className = '',
            error,
            errorClassName = '',
            icon,
            iconClassName = '',
            iconClear,
            iconPosition = ICON_INPUT_POSITION.LEFT,
            isShowClear = false,
            isShowIcon = true,
            mode = MODE_INPUT.DEFAULT,
            modeSize = MODE_SIZE[18],
            onBlurIgnoreClearIcon,
            onClearInput,
            ptClassName = '',
            refIgnoreOnBlur = [],
            wrapClassName = '',
            ...props
        }: IInputProps,
        ref
    ) => {
        const iconClearRef = useRef<HTMLDivElement | null>(null);

        const { handleBlur } = useFieldIgnoreOnBlur(
            onBlurIgnoreClearIcon ?? (() => {}),
            [iconClearRef, ...refIgnoreOnBlur]
        );

        const modeInputClasses: Record<ModeInputType, string> = {
            default: 'custom-input-text',
            rounded: '!rounded-[26px] box-shadow-spp custom-input-text',
        };

        const getModeInput = (mode: ModeInputType): string => {
            return modeInputClasses[mode] ?? modeInputClasses.default;
        };

        const isIcon = !!icon;
        const isError = !!error;

        const modeInput = getModeInput(mode);
        const sizeClasses = getModeSize(modeSize);
        const classNames = `h-11 w-full ${modeInput} ${className}`;
        const styledText = `font !${sizeClasses} leading-[26px] tracking-[0px] !font-[400]`;
        const wrapStyle = `w-full ${wrapClassName}`;

        if (isIcon) {
            return (
                <div className={wrapClassName ?? ''}>
                    <div className="relative">
                        <IconField iconPosition={iconPosition}>
                            <InputIcon
                                className={`flex items-center ml-2 ${iconClassName}`}
                            >
                                {icon}
                            </InputIcon>
                            <InputText
                                {...props}
                                ref={ref}
                                onBlur={
                                    onBlurIgnoreClearIcon
                                        ? handleBlur
                                        : props.onBlur
                                }
                                className={`${isShowIcon ? '!pl-12' : '!pl-0'}  ${isError && 'input-invalid'} ${classNames}`}
                                pt={{
                                    root: {
                                        className: `${styledText} ${isShowClear ? '!pr-10' : ''} ${ptClassName}`,
                                    },
                                }}
                            />
                        </IconField>
                        {isShowClear && (
                            <DivClick
                                data-testid="icon-clear-input"
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline rounded-full focus:outline-none focus:ring-1 focus:ring-bg-yellow"
                                onClick={onClearInput}
                                tabIndex={0}
                                ref={iconClearRef}
                            >
                                {iconClear ?? (
                                    <XCircleIcon
                                        mode={MODE_X_CIRCLE_ICON.ORANGE}
                                    />
                                )}
                            </DivClick>
                        )}
                    </div>
                    {isError && (
                        <div
                            className={`p-error-message truncate ${errorClassName}`}
                        >
                            {error}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className={wrapStyle}>
                <div className="relative">
                    <InputText
                        {...props}
                        ref={ref}
                        onBlur={
                            onBlurIgnoreClearIcon ? handleBlur : props.onBlur
                        }
                        className={`${isError && 'input-invalid'} ${classNames}`}
                        pt={{
                            root: {
                                className: `${styledText} ${isShowClear ? '!pr-10' : ''} ${ptClassName}`,
                            },
                        }}
                    />
                    {isShowClear && (
                        <DivClick
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline focus:outline-bg-yellow rounded-full"
                            onClick={onClearInput}
                            tabIndex={0}
                            ref={iconClearRef}
                            data-testid="input-clear-button"
                        >
                            {iconClear ?? (
                                <XCircleIcon mode={MODE_X_CIRCLE_ICON.ORANGE} />
                            )}
                        </DivClick>
                    )}
                </div>
                {isError && (
                    <div className={`p-error-message ${errorClassName}`}>
                        {error}
                    </div>
                )}
            </div>
        );
    }
);

export default Input;
