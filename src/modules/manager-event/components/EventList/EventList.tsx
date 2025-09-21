import ToolBar from './ToolBar';
import EventListCard from './EventListCard';
import useToolBarEvent from './hooks/useToolBarEvent';
import useEventList from './hooks/useEventList';

const EventList = () => {
    const { searchText } = useToolBarEvent();
    const { filteredEvents } = useEventList();

    const handleEdit = (eventId: string) => {
        console.log('Edit event:', eventId);
        // TODO: Navigate to edit page
    };

    const handleView = (eventId: string) => {
        console.log('View event:', eventId);
        // TODO: Navigate to event detail page
    };

    const handleDelete = (eventId: string) => {
        console.log('Delete event:', eventId);
        // TODO: Show confirmation dialog and delete
    };

    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
            <ToolBar />
            <div className="px-8 py-6 mt-6 overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-4">
                    {filteredEvents.length > 0 ? (
                        filteredEvents
                            .filter(event =>
                                event.title
                                    .trim()
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase().trim())
                            )
                            .map(event => (
                                <EventListCard
                                    key={event.id}
                                    event={event}
                                    onEdit={handleEdit}
                                    onView={handleView}
                                    onDelete={handleDelete}
                                />
                            ))
                    ) : (
                        <div className="text-center py-12">
                            không có sự kiện nào
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventList;
