import { clearToken } from '@share/auth/stores/authSlice';
import { clearUserInfo } from '@share/auth/stores/userSlice';
import useSearchForm from './useSearchForm';
import { SCREEN_PATH } from '@share/constants/routers';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { useNavigate } from 'react-router-dom';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import { useAuthPopup } from '@modules/auth/hooks/useAuthPopup';
import useSearchStoreAction from './useSearchStoreAction';
import useSearchStoreSelector from './useSearchStoreSelector';
import { useEffect } from 'react';

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
    useEffect(() => {
        console.log('searchText', searchText);
    }, [searchText]);

    const handleLogout = () => {
        dispatch(clearToken());
        dispatch(clearUserInfo());
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
        // TODO: Implement create event functionality
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
        // TODO: Implement my events functionality
    };

    const handleClickMyProfile = () => {
        if (!token || !user) {
            openAuthPopup();
            return;
        }
        navigate(SCREEN_PATH.MY_TICKET_PROFILE);
    };

    const handleClickCategory = () => {
        // TODO: Implement category functionality
    };

    return {
        handleClickCategory,
        handleClickCreateEvent,
        handleClickLogo,
        handleClickMyEvents,
        handleClickMyProfile,
        handleClickMyTicket,
        handleLogout,
        isAccountPopupOpen,
        isSearchPopupOpen,
        openAuthPopup,
        schemaSearch,
        searchForm,
        setIsAccountPopupOpenStore,
        setIsSearchPopupOpenStore,
        setIsSearchStore,
        setSearchTextStore,
        user,
    };
};

export default useHeaderHandler;
