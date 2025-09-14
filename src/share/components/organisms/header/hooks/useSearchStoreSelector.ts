import { useAppSelector } from '@configs/store';

const useSearchStoreSelector = () => {
    return {
        isAccountPopupOpen: useAppSelector(
            state => state.search.is_account_popup_open
        ),
        isSearch: useAppSelector(state => state.search.is_search),
        isSearchPopupOpen: useAppSelector(
            state => state.search.is_search_popup_open
        ),
        searchText: useAppSelector(state => state.search.search_text),
    };
};

export default useSearchStoreSelector;
