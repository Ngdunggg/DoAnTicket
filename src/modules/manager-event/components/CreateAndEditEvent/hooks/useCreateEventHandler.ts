import useCreateEventStoreAction from './useCreateEventStoreAction';
import useCreateEventStoreSelector from './useCreateEventStoreSelector';

const useCreateEventHandler = () => {
    const { activeTab, isOpenCreateEvent } = useCreateEventStoreSelector();
    const { setActiveTabStore, setIsOpenCreateEventStore } =
        useCreateEventStoreAction();

    return {
        activeTab,
        isOpenCreateEvent,
        setActiveTabStore,
        setIsOpenCreateEventStore,
    };
};

export default useCreateEventHandler;
