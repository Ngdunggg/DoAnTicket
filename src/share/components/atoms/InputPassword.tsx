import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { InputText, InputTextProps } from 'primereact/inputtext';
import React, { forwardRef, ReactNode, useState } from 'react';
import DivClick from './DivClick';
import EyesIcon from './icons/EyesIcon';

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

/**
 * Custom InputText component that wraps PrimeReact's InputText.
 *
 * This component applies a default styling with a fixed height, full width,
 * and a custom class (`custom-input-text`). Additional class names can be appended
 * via the `className` prop.
 *
 * @param {IProps} props - The properties for the InputText component.
 */
interface IInputPasswordProps extends Omit<InputTextProps, 'className'> {
    className?: string;
    error?: string;
    errorClassName?: string;
    eyeClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    iconPosition?: IconInputPositionType;
    mode?: ModeInputType;
    ptClassName?: string;
}

const InputPassword = forwardRef<HTMLInputElement, IInputPasswordProps>(
    (
        {
            className = '',
            error,
            errorClassName = '',
            eyeClassName = '',
            icon,
            iconClassName = '',
            iconPosition = ICON_INPUT_POSITION.LEFT,
            mode = MODE_INPUT.DEFAULT,
            ptClassName = '',
            ...props
        }: IInputPasswordProps,
        ref
    ) => {
        const [showPassword, setShowPassword] = useState<boolean>(false);
        const modeInputClasses: Record<ModeInputType, string> = {
            default: 'custom-input-text',
            rounded: '!rounded-full box-shadow-spp custom-input-text',
        };
        const getModeInput = (mode: ModeInputType): string => {
            return modeInputClasses[mode] ?? modeInputClasses.default;
        };
        const isIcon = !!icon;
        const isError = !!error;

        const modeInput = getModeInput(mode);
        const classNames = `h-11 w-full ${modeInput} ${className}`;
        const styledText =
            'font text-[16px] leading-[26px] tracking-[0px] !font-[400] !text-spp-text !pr-[55px]';
        const styleEyeIcon =
            'absolute right-5 top-[22px] transform -translate-y-1/2 cursor-pointer text-gray-400';

        const togglePassword = () => {
            const inputEl = (ref as React.RefObject<HTMLInputElement>)?.current;
            let start = 0,
                end = 0;

            if (inputEl) {
                start = inputEl.selectionStart ?? 0;
                end = inputEl.selectionEnd ?? 0;
            }

            setShowPassword(prev => !prev);

            setTimeout(() => {
                if (inputEl) {
                    inputEl.setSelectionRange(start, end);
                }
            }, 0);
        };

        if (isIcon) {
            return (
                <IconField
                    iconPosition={iconPosition}
                    className="custom-password-input"
                >
                    <InputIcon
                        className={`flex items-center ml-2 ${iconClassName}`}
                    >
                        {icon}
                    </InputIcon>
                    <InputText
                        {...props}
                        ref={ref}
                        className={`!pl-12 ${isError && 'input-invalid'} ${classNames}`}
                        type={showPassword ? 'text' : 'password'}
                        pt={{
                            root: { className: `${styledText} ${ptClassName}` },
                        }}
                    />
                    <DivClick
                        className={`${styleEyeIcon} ${eyeClassName}`}
                        onClick={togglePassword}
                        onMouseDown={e => e.preventDefault()}
                    >
                        <EyesIcon isOpen={showPassword} />
                    </DivClick>
                    {isError ? (
                        <div
                            className={`absolute p-error-message ${errorClassName}`}
                        >
                            {error}
                        </div>
                    ) : (
                        <></>
                    )}
                </IconField>
            );
        }

        return (
            <div className="relative w-full custom-password-input">
                <InputText
                    {...props}
                    ref={ref}
                    className={`${isError && 'input-invalid'} ${classNames}`}
                    type={showPassword ? 'text' : 'password'}
                    pt={{ root: { className: `${styledText} ${ptClassName}` } }}
                />
                <DivClick
                    className={`${styleEyeIcon} ${eyeClassName}`}
                    onClick={togglePassword}
                    onMouseDown={e => e.preventDefault()}
                >
                    <EyesIcon isOpen={showPassword} />
                </DivClick>
                {isError && (
                    <div className={`p-error-message ${errorClassName}`}>
                        {error}
                    </div>
                )}
            </div>
        );
    }
);

export default InputPassword;
