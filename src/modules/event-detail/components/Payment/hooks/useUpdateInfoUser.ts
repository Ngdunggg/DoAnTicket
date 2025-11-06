import useEventDetailStoreAction from '@modules/event-detail/hooks/useEventDetailStoreAction';
import useEventDetailStoreSelector from '@modules/event-detail/hooks/useEventDetailStoreSelector';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { userApi, UpdateUserInfoRequest } from '@share/api/userApi';
import { RESULT_CODE } from '@share/constants/commons';
import { setUserInfo } from '@share/auth/stores/userSlice';
import { User } from '@share/models/auth/user';
import { toast } from 'react-toastify';

const useUpdateInfoUser = () => {
    const { setIsOpenUpdateInfoUserStore } = useEventDetailStoreAction();
    const { isOpenUpdateInfoUser } = useEventDetailStoreSelector();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.user.user);

    const handleOpenUpdateInfoUser = () => {
        setIsOpenUpdateInfoUserStore(true);
    };

    const handleCloseUpdateInfoUser = () => {
        setIsOpenUpdateInfoUserStore(false);
    };

    const handleUpdateInfoUser = async (payload: UpdateUserInfoRequest) => {
        if (!currentUser) {
            handleCloseUpdateInfoUser();
            return;
        }
        if (
            currentUser.address === payload.address &&
            currentUser.phone === payload.phone &&
            currentUser.full_name === payload.full_name &&
            currentUser.gender === payload.gender &&
            currentUser.date_of_birth === payload.date_of_birth &&
            currentUser.avatar_url === payload.avatar_url
        ) {
            handleCloseUpdateInfoUser();
            return;
        }
        try {
            const response = await userApi.updateUserInfo(payload);
            console.log(response);
            if (response.result.code === RESULT_CODE.SUCCESS) {
                dispatch(setUserInfo(response.data as User));
                toast.success('Cập nhật thông tin thành công');
            } else {
                toast.error(response.result.error_msg_id);
            }
        } catch (error) {
            console.error(error);
            toast.error('Cập nhật thông tin thất bại');
        }
        handleCloseUpdateInfoUser();
    };

    return {
        handleCloseUpdateInfoUser,
        handleOpenUpdateInfoUser,
        handleUpdateInfoUser,
        isOpenUpdateInfoUser,
    };
};

export default useUpdateInfoUser;
