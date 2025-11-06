/* eslint-disable @typescript-eslint/no-explicit-any */
import ToolBar from './ToolBar';
import EventListCard from '@share/components/organisms/EventListCard';
import useToolBarEvent from './hooks/useToolBarEvent';
import useEventList from './hooks/useEventList';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import { organizerApi } from '@share/api/organizerApi';
import { RESULT_CODE } from '@share/constants/commons';
import { toast } from 'react-toastify';
import useFetchEventList from '@modules/manager-event/hooks/useFetchEventList';

const EventList = () => {
    const navigate = useNavigate();
    const { searchText } = useToolBarEvent();
    const { filteredEvents } = useEventList();
    const { refetch } = useFetchEventList();

    const handleDeleteEventClick = async (eventId: string) => {
        try {
            const response = await organizerApi.deleteMyEvent(eventId);
            if (response.result.code === RESULT_CODE.SUCCESS) {
                toast.success('Xóa sự kiện thành công');
                await refetch();
            }
        } catch (error: any) {
            console.log(
                'Delete event error:',
                error.response.data.result.error_msg_id
            );
            toast.error(
                error.response.data.result.error_msg_id ||
                    'Xóa sự kiện thất bại'
            );
        }
    };

    const handleViewEventClick = (eventId: string) => {
        navigate(
            SCREEN_PATH.MANAGER_EVENT_DETAIL.replace(':event_id', eventId)
        );
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
                                    onViewEvent={() =>
                                        handleViewEventClick(event.id)
                                    }
                                    onDeleteEvent={() =>
                                        handleDeleteEventClick(event.id)
                                    }
                                />
                            ))
                    ) : (
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[20]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            className="text-center"
                        >
                            không có sự kiện nào
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventList;
