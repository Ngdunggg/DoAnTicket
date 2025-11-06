export const MODE_SORT = {
    ASC: 'asc',
    DEFAULT: 'default',
    DESC: 'desc',
} as const;

export type ModeSortType = (typeof MODE_SORT)[keyof typeof MODE_SORT];

interface SortIconProps {
    mode?: ModeSortType;
    onClick?: () => void;
    sortable?: boolean;
}

function SortIcon({
    mode = MODE_SORT.DEFAULT,
    onClick,
    sortable,
}: Readonly<SortIconProps>) {
    if (mode === MODE_SORT.ASC || mode === MODE_SORT.DESC) {
        const isAsc = mode === MODE_SORT.ASC;

        return (
            <svg
                data-testid="sort-icon"
                width="10"
                height="11"
                viewBox="0 0 10 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    transform: isAsc ? 'rotate(180deg)' : 'none',
                }}
                onClick={onClick}
                className={`min-w-[10px] ${sortable ? 'cursor-pointer' : 'cursor-default'}`}
            >
                <g clipPath="url(#clip0_72429_3494)">
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.01009 10.5862C5.45242 11.1373 4.54787 11.1373 3.98968 10.5862L0.209142 6.85083C-0.0696951 6.57532 -0.069695 6.12819 0.209142 5.85268C0.487979 5.57717 0.94051 5.57717 1.21935 5.85268L4.28553 8.88227L4.28553 0.705599C4.28553 0.316016 4.60508 -0.000234122 4.99989 -0.000234087C5.39469 -0.000234053 5.71425 0.315507 5.71425 0.705599L5.71424 8.88227L8.78042 5.85268C9.05926 5.57717 9.51179 5.57717 9.79063 5.85268C10.0695 6.12819 10.0695 6.57532 9.79063 6.85083L6.01009 10.5862Z"
                        fill="#E6A800"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_72429_3494">
                        <rect
                            width="10"
                            height="11"
                            fill="white"
                            transform="translate(10 11) rotate(-180)"
                        />
                    </clipPath>
                </defs>
            </svg>
        );
    }

    return (
        <svg
            data-testid="sort-icon"
            onClick={onClick}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`min-w-[16px] ${sortable ? 'cursor-pointer' : 'cursor-default'}`}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.6746 14.2342C5.24085 14.6628 4.53731 14.6628 4.10316 14.2342L1.16271 11.3289C0.945835 11.1146 0.945835 10.7668 1.16271 10.5525C1.37959 10.3382 1.73156 10.3382 1.94843 10.5525L4.33326 12.9089L4.33326 6.54921C4.33326 6.24619 4.58181 6.00022 4.88888 6.00022C5.19596 6.00022 5.4445 6.2458 5.4445 6.54921L5.4445 12.9089L7.82933 10.5525C8.04621 10.3382 8.39818 10.3382 8.61505 10.5525C8.83193 10.7668 8.83193 11.1146 8.61505 11.3289L5.6746 14.2342Z"
                fill="#B2B2B2"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.3252 1.32143C10.7589 0.892856 11.4624 0.892856 11.8966 1.32143L14.837 4.22678C15.0539 4.44107 15.0539 4.78884 14.837 5.00313C14.6202 5.21742 14.2682 5.21742 14.0513 5.00313L11.6665 2.64676V9.00646C11.6665 9.30947 11.4179 9.55545 11.1109 9.55545C10.8038 9.55545 10.5553 9.30987 10.5553 9.00646V2.64676L8.17043 5.00313C7.95355 5.21742 7.60158 5.21742 7.3847 5.00313C7.16783 4.78884 7.16783 4.44107 7.3847 4.22678L10.3252 1.32143Z"
                fill="#B2B2B2"
            />
        </svg>
    );
}

export default SortIcon;
