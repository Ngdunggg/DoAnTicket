import React, {
    ForwardedRef,
    forwardRef,
    ReactNode,
    useMemo,
    useRef,
} from 'react';
import {
    Dropdown,
    DropdownChangeEvent,
    DropdownProps,
} from 'primereact/dropdown';
import DivClick from '@share/components/atoms/DivClick';
import XCircleIcon, { MODE_X_CIRCLE_ICON } from './icons/XCircleIcon';

type ModeInputType = 'default' | 'solid' | 'outlined';

export interface IDropDownOption<T> {
    label: ReactNode;
    value: T;
}

export interface IDropDownProps<T>
    extends Omit<
        DropdownProps,
        'value' | 'options' | 'onChange' | 'className'
    > {
    appendTo?: 'self' | HTMLElement | null | undefined;
    className?: string;
    emptyMessage?: string;
    error?: string;
    errorClassName?: string;
    icon?: ReactNode;
    iconClassName?: string;
    mode?: ModeInputType;
    multiple?: boolean;
    onChange?: (_value: T | T[] | null) => void;
    onClear?: () => void;
    options: IDropDownOption<T>[];
    panelClassName?: string;
    ptClassName?: string;
    showClear?: boolean;
    value: T | T[] | null | undefined;
    wrapClassName?: string;
}

const baseStyle = 'w-full h-12 rounded-lg text-sm';
const modeStyles: Record<ModeInputType, string> = {
    default: 'bg-white border border-gray-300 focus:border-black',
    outlined: 'bg-transparent border border-gray-300 focus:border-black',
    solid: 'bg-gray-100 border border-transparent focus:border-black',
};

function DropDownInner<T>(
    {
        appendTo = 'self',
        className = '',
        emptyMessage = 'Không có dữ liệu',
        error,
        errorClassName = '',
        icon,
        iconClassName = '',
        mode = 'default',
        multiple = false,
        onChange,
        onClear,
        options,
        placeholder,
        ptClassName = '',
        showClear = false,
        value,
        wrapClassName = '',
        ...props
    }: IDropDownProps<T>,
    ref: ForwardedRef<HTMLDivElement>
) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isError = useMemo(
        () => Boolean(error && String(error).length > 0),
        [error]
    );

    const classNames = useMemo(
        () => `${baseStyle} ${modeStyles[mode]} ${className}`.trim(),
        [className, mode]
    );

    const appendTarget =
        appendTo ?? (wrapperRef.current as HTMLElement | null) ?? 'self';

    return (
        <div
            ref={node => {
                // keep both refs in sync
                if (typeof ref === 'function') ref(node as HTMLDivElement);
                else if (ref)
                    (
                        ref as React.MutableRefObject<HTMLDivElement | null>
                    ).current = node;
                wrapperRef.current = node as HTMLDivElement | null;
            }}
            className={`relative ${wrapClassName ?? ''}`}
        >
            <div className="relative">
                {icon && (
                    <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClassName}`}
                    >
                        {icon}
                    </div>
                )}
                <Dropdown
                    {...props}
                    className={`${isError ? 'input-invalid' : ''} ${classNames}`}
                    emptyMessage={emptyMessage}
                    appendTo={appendTarget}
                    multiple={multiple}
                    options={options}
                    placeholder={placeholder}
                    pt={{
                        item: {
                            className: 'hover:bg-gray-100',
                        },
                        list: {
                            className: 'bg-transparent',
                        },
                        panel: {
                            className: `shadow-2xl border border-gray-300 rounded-xl text-black ${props.panelClassName ?? ''}`,
                        },
                        root: {
                            className: `${ptClassName} ${icon ? '!pl-10' : ''}`,
                        },
                    }}
                    showClear={false}
                    value={value}
                    onChange={(e: DropdownChangeEvent) => onChange?.(e.value)}
                />
                {showClear && value != null && (
                    <DivClick
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10 focus:outline focus:outline-bg-yellow rounded-full"
                        onClick={onClear}
                    >
                        <XCircleIcon mode={MODE_X_CIRCLE_ICON.BLACK} />
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

const DropDown = forwardRef(DropDownInner) as <T>(
    _props: IDropDownProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof DropDownInner>;

export default DropDown;
