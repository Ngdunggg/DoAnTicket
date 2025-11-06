import EventsPage from '../components/event/Events';
import UsersPage from '../components/user/Users';
import AdminDashboardPage from '../components/dashboard/Dashboard';
import useAdminStoreSelector from '../hooks/useAdminStoreSelector';
import { ADMIN_TAB, RESULT_CODE } from '@share/constants/commons';
import useAdminStoreAction from '../hooks/useAdminStoreAction';
import useGetListDataQuery from '../hooks/useGetListDataQuery';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@configs/store';
import Image from '@share/components/atoms/Image';
import DivClick from '@share/components/atoms/DivClick';
import { MODE_COLOR_TEXT, MODE_SIZE, Text } from '@share/components/atoms/Text';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import { clearToken, setLoggingOut } from '@share/auth/stores/authSlice';
import { clearUserInfo } from '@share/auth/stores/userSlice';
import { useAppDispatch } from '@configs/store';
import { authApi } from '@share/api/authApi';
import { toast } from 'react-toastify';
import CategoryContainer from '../components/categories/CategoryContainer';

const AdminPage = () => {
    const { activeTab } = useAdminStoreSelector();
    const userInfo = useAppSelector(state => state.user.user);
    const { setEventListStore, setOrderListStore, setUserListStore } =
        useAdminStoreAction();
    const { data: listData } = useGetListDataQuery();
    const [isOpenUserInfo, setIsOpenUserInfo] = useState(false);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        // Set logout flag first
        dispatch(setLoggingOut(true));

        try {
            // Call logout API first (Backend sẽ xử lý cookies)
            const response = await authApi.logout();

            // Clear Redux store
            dispatch(clearToken());
            dispatch(clearUserInfo());

            // Clear localStorage
            localStorage.removeItem('token');

            if (response.result.code === RESULT_CODE.SUCCESS) {
                toast.success('Đăng xuất thành công');
            } else {
                toast.error('Có lỗi xảy ra khi đăng xuất');
            }
        } catch (error) {
            dispatch(clearToken());
            dispatch(clearUserInfo());
            localStorage.removeItem('token');

            console.error('Logout error:', error);
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }

        // Navigate to home
        navigate(SCREEN_PATH.HOME);
    };

    useEffect(() => {
        if (listData) {
            setEventListStore(listData.events ?? []);
            setUserListStore(listData.users ?? []);
            setOrderListStore(listData.orders ?? []);
        }
    }, [listData]);

    return (
        <div className="flex flex-col min-h-screen max-h-screen">
            <div className="sticky top-0 z-20 py-2 px-4 bg-black/5 backdrop-blur-sm flex justify-end items-center">
                <DivClick
                    onClick={() => setIsOpenUserInfo(!isOpenUserInfo)}
                    className="h-14 w-14 rounded-full overflow-hidden box-shadow-ticket border-[2px] border-bg-black-2 relative z-30"
                >
                    <Image
                        src={userInfo?.avatar_url || ''}
                        alt="logo"
                        className="w-full h-full rounded-full object-cover"
                    />
                </DivClick>
                {isOpenUserInfo && (
                    <div className="absolute z-[100] top-17 right-5 bg-white rounded-lg p-4 shadow-lg">
                        <div className="flex flex-col gap-1">
                            <Text modeColor={MODE_COLOR_TEXT.BLACK}>
                                {userInfo?.full_name}
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[12]}
                            >
                                {userInfo?.email}
                            </Text>
                        </div>
                        <div className="mt-1 bg-bg-black-2 w-full h-px" />
                        <div className="flex flex-col items-center gap-2 mt-2">
                            <DivClick
                                onClick={() => navigate(SCREEN_PATH.HOME)}
                                className="py-2 hover:bg-bg-black-2/20 rounded-xl w-full"
                            >
                                <Text modeColor={MODE_COLOR_TEXT.BLACK}>
                                    Về trang Home
                                </Text>
                            </DivClick>
                            <DivClick
                                onClick={handleLogout}
                                className="py-2 hover:bg-bg-black-2/20 rounded-xl w-full"
                            >
                                <Text modeColor={MODE_COLOR_TEXT.BLACK}>
                                    Đăng xuất
                                </Text>
                            </DivClick>
                        </div>
                    </div>
                )}
            </div>
            {activeTab === ADMIN_TAB.EVENTS && <EventsPage />}
            {activeTab === ADMIN_TAB.USERS && <UsersPage />}
            {activeTab === ADMIN_TAB.DASHBOARD && <AdminDashboardPage />}
            {activeTab === ADMIN_TAB.CATEGORIES && <CategoryContainer />}
        </div>
    );
};

export default AdminPage;
