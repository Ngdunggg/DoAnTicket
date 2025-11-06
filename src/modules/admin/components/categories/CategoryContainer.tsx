import DataTable, {
    DataTableColumn,
} from '@share/components/organisms/DataTable';
import {
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
    Text,
} from '@share/components/atoms/Text';
import InputValidate from '@share/components/molecules/InputValidate';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import SearchIcon from '@share/components/atoms/icons/SearchIcon';
import { MODE_INPUT } from '@share/components/atoms/Input';
import useCategoryHandler from './hooks/useCategoryHandler';
import Button from '@share/components/atoms/Button';
import { MODE_BUTTON } from '@share/components/atoms/Button';
import { useState } from 'react';
import CategoryFormPopup from './components/CategoryFormPopup';
import { Category } from '@share/api/categoriesApi';

const CategoryContainer = () => {
    const {
        filteredList,
        handleDelete,
        hasMore,
        isLoading,
        isLoadingMore,
        pageSize,
        searchFormSchema,
        setIsLoadingMore,
        setSearch,
        setSortField,
        setSortOrder,
        setVisibleRows,
        sortField,
        sortOrder,
        visibleRows,
    } = useCategoryHandler();

    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );

    const handleEdit = (category: Category) => {
        setSelectedCategory(category);
        setIsOpenPopup(true);
    };

    const handleAdd = () => {
        setSelectedCategory(null);
        setIsOpenPopup(true);
    };

    const handleClosePopup = () => {
        setIsOpenPopup(false);
        setSelectedCategory(null);
    };

    const columns: Array<DataTableColumn<(typeof filteredList)[number]>> = [
        { header: 'ID', key: 'id', sortable: true },
        { header: 'Tên thể loại', key: 'name', sortable: true },
        {
            header: 'Thao tác',
            key: 'actions',
            render: category => (
                <div className="flex gap-2 items-center">
                    <button
                        onClick={() => handleEdit(category)}
                        disabled={isLoading === category.id}
                        className="rounded-md border border-blue-300 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Chỉnh sửa
                    </button>
                    <button
                        onClick={() => handleDelete(category.id)}
                        disabled={isLoading === category.id}
                        className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Xóa
                    </button>
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <>
            <div className="p-6 md:p-10 h-full overflow-y-auto">
                <div className="flex items-center justify-between">
                    <Text
                        modeSize={MODE_SIZE[28]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.BLACK}
                    >
                        Thể loại sự kiện
                    </Text>
                    <div className="flex items-center gap-4">
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            onClick={handleAdd}
                            className="whitespace-nowrap"
                        >
                            Thêm mới
                        </Button>
                        <InputValidate
                            control={searchFormSchema.control}
                            mode={MODE_INPUT.ROUNDED}
                            inputName="search"
                            schema={searchToolBarSchema}
                            placeholder="Search"
                            className="!h-11.5 !w-[450px] flex items-center justify-center rounded-full"
                            iconClassName="bottom-2.5"
                            icon={<SearchIcon />}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    setSearch(
                                        searchFormSchema.getValues('search') ||
                                            ''
                                    );
                                }
                            }}
                            onBlur={() => {
                                setSearch(
                                    searchFormSchema.getValues('search') || ''
                                );
                            }}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <DataTable
                        columns={columns}
                        data={visibleRows}
                        maxHeight="72vh"
                        hasMore={hasMore}
                        isLoadingMore={isLoadingMore}
                        onLoadMore={() => {
                            if (isLoadingMore || !hasMore) return;
                            setIsLoadingMore(true);
                            const next = filteredList.slice(
                                visibleRows.length,
                                visibleRows.length + pageSize
                            );
                            setVisibleRows(prev => [...prev, ...next]);
                            setIsLoadingMore(false);
                        }}
                        sortField={sortField}
                        sortOrder={sortOrder}
                        onSortChange={({ field, order }) => {
                            setSortField(field);
                            setSortOrder(order);
                        }}
                    />
                </div>
            </div>
            <CategoryFormPopup
                category={selectedCategory}
                isOpen={isOpenPopup}
                onClose={handleClosePopup}
            />
        </>
    );
};

export default CategoryContainer;
