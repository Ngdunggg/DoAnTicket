import { useAppDispatch } from '@configs/store';
import {
    setIsAuthPopupOpen,
    setIsLogin,
    resetAuthState,
} from '../store/authSlice';

const useAuthStoreAction = () => {
    const dispatch = useAppDispatch();

    return {
        resetAuthStateStore: () => dispatch(resetAuthState()),
        setIsAuthPopupOpenStore: (data: boolean) =>
            dispatch(setIsAuthPopupOpen(data)),
        setIsLoginStore: (data: boolean) => dispatch(setIsLogin(data)),
    };
};

export default useAuthStoreAction;
