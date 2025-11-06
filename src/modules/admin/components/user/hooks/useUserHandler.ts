import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { RESULT_CODE, Role } from '@share/constants/commons';
import { toast } from 'react-toastify';
import useAdminStoreAction from '@modules/admin/hooks/useAdminStoreAction';
import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import { userApi } from '@share/api/userApi';
import { setUserInfo } from '@share/auth/stores/userSlice';
import { SortOrder } from '@share/components/organisms/DataTable';
import { useForm } from 'react-hook-form';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';

const useUserHandler = () => {
    //* Selector
    const { userList } = useAdminStoreSelector();
    const { setUserListStore } = useAdminStoreAction();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.user.user);

    //* State
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const [visibleRows, setVisibleRows] = useState<typeof userList>([]);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
    const [sortField, setSortField] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [search, setSearch] = useState<string>('');
    const pageSize = 10;

    //* Form
    const searchFormSchema = useForm<z.infer<typeof searchToolBarSchema>>({
        defaultValues: {
            search: search,
        },
        mode: 'onSubmit',
        resolver: zodResolver(searchToolBarSchema),
        reValidateMode: 'onSubmit',
    });

    const filteredList = useMemo(() => {
        let result = [...userList];
        if (search) {
            const searchLower = search.toLowerCase().trim();
            result = result.filter(
                user =>
                    user.email?.toLowerCase().includes(searchLower) ||
                    user.full_name?.toLowerCase().includes(searchLower)
            );
        }
        return result;
    }, [userList, search]);

    useEffect(() => {
        setVisibleRows(filteredList.slice(0, pageSize));
    }, [filteredList]);

    const hasMore = useMemo(
        () => visibleRows.length < filteredList.length,
        [visibleRows.length, filteredList.length]
    );

    const handleUpdateRole = async (userId: string, role: Role) => {
        setIsLoading(userId);
        try {
            const response = await userApi.updateUserInfo({ id: userId, role });
            if (response.result.code === RESULT_CODE.SUCCESS) {
                toast.success('Cập nhật quyền thành công');
                // Update user list in store
                const updatedList = userList.map(user =>
                    user.id === userId ? { ...user, role } : user
                );
                setUserListStore(updatedList);

                if (currentUser && currentUser.id === userId) {
                    dispatch(setUserInfo({ ...currentUser, role }));
                }
            } else {
                toast.error(
                    response.result.error_msg_id || 'Cập nhật quyền thất bại'
                );
            }
        } catch (error) {
            console.error('Update role error:', error);
            toast.error('Cập nhật quyền thất bại');
        } finally {
            setIsLoading(null);
        }
    };

    // const handleDeactivate = async (userId: string) => {
    //     setIsLoading(userId);
    //     try {
    //         const response = await adminApi.deactivateUser(userId);
    //         if (response.result.code === RESULT_CODE.SUCCESS) {
    //             toast.success('Khóa tài khoản thành công');
    //             // Update user status in store
    //             const updatedList = userList.map(user =>
    //                 user.id === userId
    //                     ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
    //                     : user
    //             );
    //             setUserListStore(updatedList);
    //         } else {
    //             toast.error(response.result.error_msg_id || 'Khóa tài khoản thất bại');
    //         }
    //     } catch (error) {
    //         console.error('Deactivate user error:', error);
    //         toast.error('Khóa tài khoản thất bại');
    //     } finally {
    //         setIsLoading(null);
    //     }
    // };

    return {
        filteredList,
        //handleDeactivate,
        handleUpdateRole,
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

export default useUserHandler;
