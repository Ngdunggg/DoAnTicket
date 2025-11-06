import useEventDetail from './hooks/useEventDetail';
import EventPreviewHero from '@modules/manager-event/components/EventDetail/components/EventPreviewHero';
import EventPreviewDescription from '@modules/manager-event/components/EventDetail/components/EventPreviewDescription';
import EventPreviewTickets from '@modules/manager-event/components/EventDetail/components/EventPreviewTickets';
import EventPreviewOrganizer from '@modules/manager-event/components/EventDetail/components/EventPreviewOrganizer';
import DivClick from '@share/components/atoms/DivClick';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';

type EventDetailProps = {
    eventId: string;
    onBack: () => void;
};

const EventDetailPreview = ({ eventId, onBack }: EventDetailProps) => {
    const { eventDetail, organizerProfile } = useEventDetail(eventId);

    if (!eventDetail) {
        return (
            <div className="flex flex-col flex-1 p-10">
                <div className="text-center">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[20]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Không tìm thấy sự kiện
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex flex-col flex-1 max-h-screen overflow-y-auto gap-14 pb-10 bg-gray-200">
            {/* Back Button Header */}
            <div className="absolute top-4 left-4 z-50">
                <DivClick
                    onClick={onBack}
                    className="flex items-center gap-3 bg-bg-black-2/50 rounded-full px-4 py-2 hover:bg-bg-black-2/70 transition-colors"
                >
                    <BackIcon mode={MODE_BACK.WHITE} />
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        Quay lại danh sách
                    </Text>
                </DivClick>
            </div>

            {/* Hero Section */}
            <EventPreviewHero event={eventDetail} />

            {/* Description Section */}
            <EventPreviewDescription description={eventDetail.description} />

            {/* Ticket Section */}
            <EventPreviewTickets event={eventDetail} />

            {/* Organizer Section */}
            <EventPreviewOrganizer
                organizerProfile={organizerProfile?.organizer_profile || null}
            />
        </div>
    );
};

export default EventDetailPreview;
