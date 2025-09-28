import EventInfoCard from './EventInfoCard';
import EventStatsCard from './EventStatsCard';
import ChartsSection from './ChartsSection';
import TicketTypesList from './TicketTypesList';
import useFetchEventDetail from '@modules/manager-event/hooks/useFetchEventDetail';
import LoadingContent from '@share/components/molecules/LoadingContent';
import DivClick from '@share/components/atoms/DivClick';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { SCREEN_PATH } from '@share/constants/routers';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentEventId } from '@share/utils/path';

const DetailReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = getCurrentEventId(location.pathname);
    const { eventDetail, loading } = useFetchEventDetail(eventId || '');
    if (loading) {
        return <LoadingContent />;
    }

    return (
        <div className="flex flex-col gap-6 max-h-screen overflow-y-auto py-8 pb-10 px-10">
            <DivClick
                onClick={() => {
                    navigate(SCREEN_PATH.MANAGER_REPORT);
                }}
                className="flex items-center w-fit gap-3 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-black/70 transition-colors"
            >
                <BackIcon mode={MODE_BACK.WHITE} />
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[14]}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                >
                    Quay lại danh sách sự kiện
                </Text>
            </DivClick>
            <div className="flex flex-col gap-6">
                <EventInfoCard
                    event={
                        eventDetail?.event || {
                            id: '',
                            location: '',
                            status: '',
                            title: '',
                        }
                    }
                />
                <div className="flex gap-6">
                    <TicketTypesList
                        ticketTypes={eventDetail?.ticketTypes || []}
                    />
                    <EventStatsCard
                        stats={
                            eventDetail?.stats || {
                                conversionRate: 0,
                                totalRevenue: 0,
                                totalTicketsAvailable: 0,
                                totalTicketsSold: 0,
                                viewCount: 0,
                            }
                        }
                    />
                </div>

                <ChartsSection
                    stats={
                        eventDetail?.stats || {
                            conversionRate: 0,
                            totalRevenue: 0,
                            totalTicketsAvailable: 0,
                            totalTicketsSold: 0,
                            viewCount: 0,
                        }
                    }
                />
            </div>
        </div>
    );
};

export default DetailReport;
