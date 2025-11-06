import { useEffect, useMemo, useState } from 'react';
import { RESULT_CODE } from '@share/constants/commons';
import { toast } from 'react-toastify';
import useAdminStoreAction from '@modules/admin/hooks/useAdminStoreAction';
import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import { categoriesApi } from '@share/api/categoriesApi';
import { SortOrder } from '@share/components/organisms/DataTable';
import { useForm } from 'react-hook-form';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import useFetchCategoriesQuery from './useFetchCategoriesQuery';

const useCategoryHandler = () => {
    const { categoryList } = useAdminStoreSelector();
    const { setCategoryListStore } = useAdminStoreAction();
    const { data: categoriesData, refetch } = useFetchCategoriesQuery();

    useEffect(() => {
        if (categoriesData) {
            setCategoryListStore(categoriesData);
        }
    }, [categoriesData, setCategoryListStore]);

    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [visibleRows, setVisibleRows] = useState<typeof categoryList>([]);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [search, setSearch] = useState<string>('');
    const pageSize = 10;

    const searchFormSchema = useForm<z.infer<typeof searchToolBarSchema>>({
        defaultValues: {
            search: search,
        },
        mode: 'onSubmit',
        resolver: zodResolver(searchToolBarSchema),
        reValidateMode: 'onSubmit',
    });

    const filteredList = useMemo(() => {
        let result = [...categoryList];
        if (search) {
            const searchLower = search.toLowerCase().trim();
            result = result.filter(category =>
                category.name?.toLowerCase().includes(searchLower)
            );
        }
        return result;
    }, [categoryList, search]);

    useEffect(() => {
        setVisibleRows(filteredList.slice(0, pageSize));
    }, [filteredList]);

    const hasMore = useMemo(
        () => visibleRows.length < filteredList.length,
        [visibleRows.length, filteredList.length]
    );

    const handleDelete = async (categoryId: string) => {
        setIsLoading(categoryId);
        try {
            const response = await categoriesApi.deleteCategory(categoryId);
            if (response.result.code === RESULT_CODE.SUCCESS) {
                toast.success('Xóa thể loại thành công');
                const updatedList = categoryList.filter(
                    cat => cat.id !== categoryId
                );
                setCategoryListStore(updatedList);
                await refetch();
            } else {
                toast.error(
                    response.result.error_msg_id || 'Xóa thể loại thất bại'
                );
            }
        } catch (error) {
            console.error('Delete category error:', error);
            toast.error('Xóa thể loại thất bại');
        } finally {
            setIsLoading(null);
        }
    };

    return {
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
    };
};

export default useCategoryHandler;
