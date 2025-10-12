import { useAppSelector } from '@configs/store';

const useHomeEventListStoreSelector = () => {
    return {
        allEvents: useAppSelector(state => state.home_event_list.allEvents),
    };
};

export default useHomeEventListStoreSelector;
