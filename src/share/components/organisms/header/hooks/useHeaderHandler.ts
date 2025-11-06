import { clearToken, setLoggingOut } from '@share/auth/stores/authSlice';
import { clearUserInfo } from '@share/auth/stores/userSlice';
import useSearchForm from './useSearchForm';
import { SCREEN_PATH } from '@share/constants/routers';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { useNavigate } from 'react-router-dom';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import { useAuthPopup } from '@modules/auth/components/hooks/useAuthPopup';
import useSearchStoreAction from './useSearchStoreAction';
import useSearchStoreSelector from './useSearchStoreSelector';
import { authApi } from '@share/api/authApi';
import { RESULT_CODE, ROLE } from '@share/constants/commons';
import { toast } from 'react-toastify';

const useHeaderHandler = () => {
    // #region Actions
    const {
        setIsAccountPopupOpenStore,
        setIsSearchPopupOpenStore,
        setIsSearchStore,
        setSearchTextStore,
    } = useSearchStoreAction();
    // #endregion

    // #region Selectors
    const { isAccountPopupOpen, isSearchPopupOpen, searchText } =
        useSearchStoreSelector();
    const { user } = useAppSelector(state => state.user);
    const { token } = useAppSelector(state => state.auth);
    // #endregion

    // #region Dependencies
    const searchForm = useSearchForm();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const schemaSearch = searchToolBarSchema;
    const { openAuthPopup } = useAuthPopup();
    // #endregion

    // #region Handlers

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
            // Even if API fails, still clear local data
            dispatch(clearToken());
            dispatch(clearUserInfo());
            localStorage.removeItem('token');

            console.error('Logout error:', error);
            toast.error('Có lỗi xảy ra khi đăng xuất');
        }

        // Navigate to home
        navigate(SCREEN_PATH.HOME);
    };

    const handleClickLogo = () => {
        navigate(SCREEN_PATH.HOME);
    };

    const handleClickCreateEvent = () => {
        if (!token || !user) {
            openAuthPopup();
            return;
        }
        navigate(SCREEN_PATH.CREATE_EVENT);
    };

    const handleClickMyTicket = () => {
        if (!token || !user) {
            openAuthPopup();
            return;
        }
        navigate(SCREEN_PATH.MY_TICKET);
    };

    const handleClickMyEvents = () => {
        if (!token || !user) {
            openAuthPopup();
            return;
        }
        navigate(SCREEN_PATH.MANAGER_EVENT);
    };

    const handleClickMyProfile = () => {
        if (!token || !user) {
            openAuthPopup();
            return;
        }
        navigate(SCREEN_PATH.MY_TICKET_PROFILE);
    };

    const handleSearchSubmit = (keyword: string) => {
        if (!keyword.trim()) return;

        // Chuyển đến EventList với filter
        navigate(SCREEN_PATH.EVENT_LIST, {
            state: { searchKeyword: keyword.trim() },
        });

        // Đóng popup và clear input
        setIsSearchPopupOpenStore(false);
        searchForm.setValue('search', '');
    };

    const handleClickAdmin = () => {
        if (!token || !user || user.role !== ROLE.ADMIN) {
            toast.error('Bạn không có quyền truy cập trang quản lý');
            return;
        }
        navigate(SCREEN_PATH.ADMIN_DASHBOARD);
    };

    return {
        handleClickAdmin,
        handleClickCreateEvent,
        handleClickLogo,
        handleClickMyEvents,
        handleClickMyProfile,
        handleClickMyTicket,
        handleLogout,
        handleSearchSubmit,
        isAccountPopupOpen,
        isSearchPopupOpen,
        openAuthPopup,
        schemaSearch,
        searchForm,
        searchText,
        setIsAccountPopupOpenStore,
        setIsSearchPopupOpenStore,
        setIsSearchStore,
        setSearchTextStore,
        user,
    };
};

export default useHeaderHandler;
