import { useAppDispatch } from '@configs/store';
import {
    setIsAccountPopupOpen,
    setIsSearch,
    setIsSearchPopupOpen,
    setSearchText,
} from '../store/searchSlice';

const useSearchStoreAction = () => {
    const dispatch = useAppDispatch();

    return {
        setIsAccountPopupOpenStore: (data: boolean) =>
            dispatch(setIsAccountPopupOpen(data)),
        setIsSearchPopupOpenStore: (data: boolean) =>
            dispatch(setIsSearchPopupOpen(data)),
        setIsSearchStore: (data: boolean) => dispatch(setIsSearch(data)),
        setSearchTextStore: (data: string) => dispatch(setSearchText(data)),
    };
};

export default useSearchStoreAction;
