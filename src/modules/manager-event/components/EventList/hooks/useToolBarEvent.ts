import useEventListStoreAction from '@modules/manager-event/components/EventList/hooks/useEventListStoreAction';
import useEventListStoreSelector from '@modules/manager-event/components/EventList/hooks/useEventListStoreSelector';
import useHeaderHandler from '@share/components/organisms/header/hooks/useHeaderHandler';

const useToolBarEvent = () => {
    const { schemaSearch, searchForm, searchText, setSearchTextStore } =
        useHeaderHandler();
    const { resetManagerEventListStateStore, setActiveFilterStore } =
        useEventListStoreAction();
    const { activeFilter } = useEventListStoreSelector();

    return {
        activeFilter,
        resetManagerEventListStateStore,
        schemaSearch,
        searchForm,
        searchText,
        setActiveFilterStore,
        setSearchTextStore,
    };
};

export default useToolBarEvent;
