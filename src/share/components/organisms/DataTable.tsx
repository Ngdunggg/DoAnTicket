import { ReactNode, useMemo, useState } from 'react';
import { MODE_SIZE, MODE_WEIGHT, Text } from '../atoms/Text';
import SortIcon, {
    MODE_SORT,
    ModeSortType,
} from '@share/components/atoms/icons/SortIcon';
import useInfiniteLoader from '@share/hooks/useInfiniteLoader';
import LoadingSpinnerIcon, {
    MODE_LOADING_SPINNER,
} from '@share/components/atoms/icons/LoadingSpinnerIcon';

export type SortOrder = 'asc' | 'desc' | null;

export type DataTableColumn<T> = {
    className?: string;
    header: string | ReactNode;
    headerClassName?: string;
    key: keyof T | string;
    render?: (_row: T) => ReactNode;
    sortable?: boolean;
    width?: string | number;
};

export type IColumn<T> = DataTableColumn<T> & {
    classNameContent?: string;
    colWidth?: number;
};

export type DataTableProps<T> = {
    className?: string;
    clientSort?: boolean;
    columns: Array<IColumn<T>>;
    data: T[];
    // Infinite loading
    hasMore?: boolean;
    // Sorting (uncontrolled by default)
    initialSortField?: string;
    initialSortOrder?: SortOrder;
    isLoadingMore?: boolean;
    maxHeight?: string | number;
    // controlled
    onLoadMore?: () => void;
    onRowClick?: (_row: T) => void;
    onSortChange?: (_payload: { field: string; order: SortOrder }) => void;
    sortField?: string;
    // controlled
    sortOrder?: SortOrder; // enable local sorting when possible (default true)
};

function getCellValue<T>(row: unknown, key: keyof T | string): unknown {
    const record = row as Record<string, unknown>;
    if (typeof key === 'string' && key in record) {
        return record[key];
    }
    return record[key as string];
}

function compareValues(a: unknown, b: unknown): number {
    if (a == null && b == null) return 0;
    if (a == null) return -1;
    if (b == null) return 1;
    const aNum = Number(a as never);
    const bNum = Number(b as never);
    if (!Number.isNaN(aNum) && !Number.isNaN(bNum)) {
        return aNum - bNum;
    }
    const aDate = new Date(String(a));
    const bDate = new Date(String(b));
    if (!Number.isNaN(aDate.getTime()) && !Number.isNaN(bDate.getTime())) {
        return aDate.getTime() - bDate.getTime();
    }
    return String(a).localeCompare(String(b));
}

// use common SortIcon (yellow brand) and map from local sort order
const mapSortToMode = (order: SortOrder): ModeSortType => {
    if (order === 'asc') return MODE_SORT.ASC;
    if (order === 'desc') return MODE_SORT.DESC;
    return MODE_SORT.DEFAULT;
};

export function DataTable<T extends object>({
    className,
    clientSort = true,
    columns,
    data,
    hasMore = false,
    initialSortField,
    initialSortOrder = null,
    isLoadingMore = false,
    maxHeight,
    onLoadMore,
    onRowClick,
    onSortChange,
    sortField: sortFieldProp,
    sortOrder: sortOrderProp,
}: DataTableProps<T>) {
    const [sortFieldState, setSortFieldState] = useState<string | undefined>(
        initialSortField
    );
    const [sortOrderState, setSortOrderState] =
        useState<SortOrder>(initialSortOrder);

    const sortField = sortFieldProp ?? sortFieldState;
    const sortOrder = sortOrderProp ?? sortOrderState;

    const handleHeaderClick = (col: DataTableColumn<T>) => {
        if (!col.sortable) return;
        const field = String(col.key);
        let nextOrder: SortOrder;
        if (sortField === field) {
            // cycle: null -> desc -> asc -> null
            nextOrder =
                sortOrder === null
                    ? 'desc'
                    : sortOrder === 'desc'
                      ? 'asc'
                      : null;
        } else {
            nextOrder = 'desc';
        }
        if (onSortChange)
            onSortChange({ field: nextOrder ? field : '', order: nextOrder });
        if (sortFieldProp === undefined)
            setSortFieldState(nextOrder ? field : undefined);
        if (sortOrderProp === undefined) setSortOrderState(nextOrder);
    };

    const sortedData = useMemo(() => {
        if (!clientSort || !sortField || !sortOrder) return data;
        const col = columns.find(c => String(c.key) === sortField);
        if (!col) return data;
        const cloned = [...data];
        cloned.sort((ra, rb) => {
            const va = getCellValue(ra, col.key);
            const vb = getCellValue(rb, col.key);
            const base = compareValues(va, vb);
            return sortOrder === 'asc' ? base : -base;
        });
        return cloned;
    }, [clientSort, data, columns, sortField, sortOrder]);

    const sentinelRef = useInfiniteLoader({
        disabled: isLoadingMore || !onLoadMore,
        hasMore,
        onLoadMore: () => onLoadMore?.(),
        root: undefined,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0,
    });

    return (
        <div className={className}>
            <div
                className="overflow-x-auto overflow-y-auto rounded-xl border border-gray-200 bg-white box-shadow-ticket"
                style={maxHeight ? { maxHeight } : undefined}
            >
                <table className="min-w-full text-left">
                    <thead className="bg-gray-50 text-sm text-gray-600">
                        <tr>
                            {columns.map(col => {
                                const isActive = sortField === String(col.key);
                                return (
                                    <th
                                        key={String(col.key)}
                                        className={`px-4 py-3 select-none sticky top-0 z-10 bg-gray-200 border-b border-gray-300 ${col.headerClassName ?? ''} ${
                                            col.sortable ? 'cursor-pointer' : ''
                                        }`}
                                        style={{ width: col.width }}
                                        onClick={() => handleHeaderClick(col)}
                                    >
                                        <div className="flex items-center">
                                            <Text
                                                modeSize={MODE_SIZE[18]}
                                                modeWeight={MODE_WEIGHT.LARGE}
                                            >
                                                {col.header}
                                            </Text>
                                            {col.sortable && (
                                                <div className="ml-2">
                                                    <SortIcon
                                                        mode={mapSortToMode(
                                                            isActive
                                                                ? sortOrder
                                                                : null
                                                        )}
                                                        sortable
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-gray-900">
                        {sortedData.length === 0 ? (
                            <tr>
                                <td
                                    className="px-4 py-4"
                                    colSpan={columns.length}
                                >
                                    No data
                                </td>
                            </tr>
                        ) : (
                            sortedData.map((row, idx) => (
                                <tr
                                    key={idx}
                                    className={
                                        onRowClick ? 'hover:bg-gray-50' : ''
                                    }
                                    onClick={() => onRowClick?.(row)}
                                >
                                    {columns.map(col => (
                                        <td
                                            key={String(col.key)}
                                            className={`px-4 py-3 ${col.className ?? ''}`}
                                        >
                                            {col.render
                                                ? col.render(row as T)
                                                : (getCellValue(
                                                      row as unknown,
                                                      col.key
                                                  ) as ReactNode)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {(hasMore || isLoadingMore) && (
                <div className="flex items-center justify-center py-4">
                    {isLoadingMore && (
                        <LoadingSpinnerIcon
                            mode={MODE_LOADING_SPINNER.YELLOW}
                        />
                    )}
                    {/* Sentinel for IntersectionObserver */}
                    <div ref={sentinelRef} />
                </div>
            )}
        </div>
    );
}

export default DataTable;
