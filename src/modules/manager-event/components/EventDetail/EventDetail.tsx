import useEventDetail from '../ManagerReport/hooks/useEventDetail';
import LoadingContent from '@share/components/molecules/LoadingContent';
import EventPreviewHero from './components/EventPreviewHero';
import EventPreviewDescription from './components/EventPreviewDescription';
import EventPreviewTickets from './components/EventPreviewTickets';
import DivClick from '@share/components/atoms/DivClick';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';

interface TicketType {
    description?: string;
    id: string;
    name: string;
    price: number;
}

const EventDetail = () => {
    const { eventDetail, handleBack, loading } = useEventDetail();

    if (loading) {
        return (
            <div className="flex flex-col flex-1 p-10">
                <LoadingContent />
            </div>
        );
    }

    if (!eventDetail) {
        return (
            <div className="flex flex-col flex-1 p-10">
                <div className="text-center">
                    <h2 className="text-white text-xl">
                        Không tìm thấy sự kiện
                    </h2>
                </div>
            </div>
        );
    }

    // Calculate minimum price
    const minPrice =
        eventDetail.ticketTypes.length > 0
            ? Math.min(
                  ...eventDetail.ticketTypes.map(
                      (ticket: TicketType) => ticket.price
                  )
              )
            : 0;

    // Transform data for preview components
    const eventData = {
        dateEnd: eventDetail.event.dateEnd || new Date().toISOString(),
        dateStart: eventDetail.event.dateStart || new Date().toISOString(),
        image: eventDetail.event.image || '',
        location: eventDetail.event.location,
        title: eventDetail.event.title,
    };

    const descriptionData = {
        additionalInfo: {
            ageRestriction: 'Mọi lứa tuổi',
            dressCode: 'Thoải mái',
            duration: '2-3 giờ',
            language: 'Tiếng Việt',
        },
        description:
            eventDetail.event.description ||
            'Mô tả sự kiện sẽ được cập nhật...',
        highlights: eventDetail.event.highlights || [],
        requirements: [],
    };

    const ticketsData = eventDetail.ticketTypes.map((ticket: TicketType) => ({
        date: eventDetail.event.dateStart || new Date().toISOString(),
        id: ticket.id,
        tickets: [
            {
                available: 100,
                benefits: [],
                description: ticket.description || '',
                id: ticket.id,
                isPopular: false,
                name: ticket.name,
                originalPrice: ticket.price,
                price: ticket.price,
            },
        ],
    }));

    return (
        <div className="flex flex-col flex-1 relative max-h-screen overflow-y-auto">
            {/* Back Button Header */}
            <div className="absolute top-4 left-4 z-50">
                <DivClick
                    onClick={handleBack}
                    className="flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-black/70 transition-colors cursor-pointer"
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
            <EventPreviewHero event={eventData} minPrice={minPrice} />

            {/* Description Section */}
            <EventPreviewDescription
                additionalInfo={descriptionData.additionalInfo}
                description={descriptionData.description}
                highlights={descriptionData.highlights}
                requirements={descriptionData.requirements}
            />

            {/* Ticket Section */}
            <EventPreviewTickets ticketsData={ticketsData} />
        </div>
    );
};

export default EventDetail;
