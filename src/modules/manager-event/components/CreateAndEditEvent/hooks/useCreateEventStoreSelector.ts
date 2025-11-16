import { useAppSelector } from '@configs/store';

const useCreateEventStoreSelector = () => {
    return {
        activeTab: useAppSelector(state => state.create_event.active_tab),
        eventTypes: useAppSelector(state => state.create_event.event_types),
        isEditMode: useAppSelector(state => state.create_event.is_edit_mode),
        isLoading: useAppSelector(state => state.create_event.is_loading),
        isOpenCreateEvent: useAppSelector(
            state => state.create_event.is_open_create_event
        ),
        organizerProfile: useAppSelector(
            state => state.create_event.organizer_profile
        ),
    };
};

export default useCreateEventStoreSelector;
