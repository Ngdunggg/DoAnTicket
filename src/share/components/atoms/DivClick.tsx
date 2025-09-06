import React, {
    ComponentPropsWithoutRef,
    KeyboardEvent,
    useCallback,
} from 'react';

type IDivClickProps = {
    children: React.ReactNode;
    className?: string;
    disabled?: boolean;
    onClick?: (e?: React.MouseEvent<HTMLDivElement>) => void;
    ref?: React.Ref<HTMLDivElement>;
    tabIndex?: number;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onKeyDown' | 'role' | 'tabIndex'>;

/**
 * DivClick component - An accessible div that behaves like a button.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The content of the div.
 * @param {string} [props.className=""] - The additional class name for the div.
 * @param {Function} [props.onClick] - The click event handler for the div.

} & Omit<ComponentPropsWithoutRef<"div">, "onKeyDown" | "role">;

/**
 */
const DivClick: React.FC<IDivClickProps> = ({
    children,
    className = '',
    disabled = false,
    onClick,
    tabIndex = 0,
    ...rest
}) => {
    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (disabled) {
                return;
            }

            onClick?.(e);
        },
        [disabled, onClick]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (disabled) {
                e.preventDefault();
                return;
            }
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
            }
        },
        [disabled, onClick]
    );

    return (
        <div
            className={`cursor-pointer ${disabled ? 'opacity-30 pointer-events-none' : ''} ${className}`}
            role="button"
            tabIndex={disabled ? -1 : tabIndex}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-disabled={disabled}
            {...rest}
        >
            {children}
        </div>
    );
};

export default DivClick;
