import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import useGetOrganizerProfile from '@modules/event-detail/components/DetailEvent/hooks/useGetOrganizerProfile';

const useEventDetail = (eventId: string | null) => {
    const { eventList } = useAdminStoreSelector();

    const eventDetail = eventList.find(event => event.id === eventId);

    const { data: organizerProfile } = useGetOrganizerProfile(
        eventDetail?.organizer_id
    );

    return {
        eventDetail,
        organizerProfile,
    };
};

export default useEventDetail;
