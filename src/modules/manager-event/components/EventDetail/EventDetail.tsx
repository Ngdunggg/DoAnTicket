import {
    Text,
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import useEventDetail from './hooks/useEventDetail';
import DivClick from '@share/components/atoms/DivClick';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import EventInfoCard from './components/EventInfoCard';
import EventStatsCard from './components/EventStatsCard';
import TicketTypesList from './components/TicketTypesList';
import ChartsSection from './components/ChartsSection';
import LoadingContent from '@share/components/molecules/LoadingContent';

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
                <div className="flex items-center gap-4 mb-6">
                    <DivClick onClick={handleBack} className="mr-4">
                        <BackIcon mode={MODE_BACK.WHITE} />
                    </DivClick>
                    <Text
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.WHITE}
                    >
                        Không tìm thấy sự kiện
                    </Text>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 gap-6 p-6 max-h-screen overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4">
                <DivClick onClick={handleBack} className="mr-4">
                    <BackIcon mode={MODE_BACK.WHITE} />
                </DivClick>
                <Text
                    modeSize={MODE_SIZE[24]}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeColor={MODE_COLOR_TEXT.WHITE}
                >
                    Chi tiết sự kiện
                </Text>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
                <EventInfoCard event={eventDetail.event} />

                <div className="flex gap-6">
                    <TicketTypesList ticketTypes={eventDetail.ticketTypes} />
                    <EventStatsCard stats={eventDetail.stats} />
                </div>
            </div>

            {/* Biểu đồ */}
            <ChartsSection
                stats={eventDetail.stats}
                ticketTypes={eventDetail.ticketTypes}
            />
        </div>
    );
};

export default EventDetail;
