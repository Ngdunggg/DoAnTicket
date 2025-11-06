import { ForwardedRef, forwardRef, ReactNode, useMemo, useRef } from 'react';
import {
    MultiSelect,
    MultiSelectChangeEvent,
    MultiSelectProps,
} from 'primereact/multiselect';
import DivClick from '@share/components/atoms/DivClick';
import XCircleIcon, { MODE_X_CIRCLE_ICON } from './icons/XCircleIcon';

type ModeInputType = 'default' | 'solid' | 'outlined';

export interface IMultiSelectOption<T> {
    label: ReactNode;
    value: T;
}

export interface IMultiSelectProps<T>
    extends Omit<
        MultiSelectProps,
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
    onChange?: (_value: T[] | null) => void;
    onClear?: () => void;
    options: IMultiSelectOption<T>[];
    panelClassName?: string;
    ptClassName?: string;
    showClear?: boolean;
    value: T[] | null | undefined;
    wrapClassName?: string;
}

const baseStyle = 'w-full h-12 rounded-lg text-sm';
const modeStyles: Record<ModeInputType, string> = {
    default: 'bg-white border border-gray-300 focus:border-black',
    outlined: 'bg-transparent border border-gray-300 focus:border-black',
    solid: 'bg-gray-100 border border-transparent focus:border-black',
};

function MultiSelectInner<T>(
    {
        appendTo: _appendTo = 'self',
        className = '',
        emptyMessage = 'Không có dữ liệu',
        error,
        errorClassName = '',
        icon,
        iconClassName = '',
        mode = 'default',
        onChange,
        onClear,
        options,
        placeholder,
        ptClassName = '',
        showClear = false,
        value,
        wrapClassName = '',
        ...props
    }: IMultiSelectProps<T>,
    ref: ForwardedRef<HTMLDivElement>
) {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const isError = useMemo(
        () => Boolean(error && String(error).length > 0),
        [error]
    );

    const classNames = useMemo(
        () => `${baseStyle} ${modeStyles[mode]} ${className}`,
        [mode, className]
    );

    // Remove unused appendTarget since we're using appendTo="self"

    return (
        <div className={`relative ${wrapClassName}`} ref={ref}>
            <div
                className="relative"
                ref={wrapperRef}
                style={{ position: 'relative' }}
            >
                {icon && (
                    <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 ${iconClassName}`}
                    >
                        {icon}
                    </div>
                )}
                <MultiSelect
                    {...props}
                    className={`${isError ? 'input-invalid' : ''} ${classNames}`}
                    emptyMessage={emptyMessage}
                    appendTo="self"
                    options={options}
                    placeholder={placeholder}
                    selectedItemsLabel={`{0} thể loại đã chọn`}
                    pt={{
                        checkbox: {
                            root: {
                                className: 'hidden',
                            },
                        },
                        checkboxContainer: {
                            className: 'hidden',
                        },
                        item: {
                            className: 'hover:bg-gray-100',
                        },
                        list: {
                            className: 'bg-transparent',
                        },
                        panel: {
                            className: `shadow-2xl border border-gray-300 rounded-xl text-black ${props.panelClassName ?? ''}`,
                            style: { zIndex: 10 },
                        },
                        root: {
                            className: `${ptClassName} ${icon ? '!pl-10' : ''}`,
                            style: { position: 'relative' },
                        },
                        token: {
                            className:
                                'bg-gray-100 text-gray-800 rounded-md px-2 py-1 mr-1 mb-1 text-xs',
                        },
                        tokenLabel: {
                            className: 'text-xs',
                        },
                    }}
                    showClear={false}
                    value={value}
                    onChange={(e: MultiSelectChangeEvent) =>
                        onChange?.(e.value)
                    }
                />
                {showClear && value && value.length > 0 && (
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

const MultiSelectComponent = forwardRef(MultiSelectInner) as <T>(
    _props: IMultiSelectProps<T> & { ref?: ForwardedRef<HTMLDivElement> }
) => ReturnType<typeof MultiSelectInner>;

export default MultiSelectComponent;
