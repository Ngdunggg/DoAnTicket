import EventInfoCard from './EventInfoCard';
import EventStatsCard from './EventStatsCard';
import ChartsSection from './ChartsSection';
import TicketTypesList from './TicketTypesList';
import useGetEventReport from '../../hooks/useGetEventReport';
import LoadingContent from '@share/components/molecules/LoadingContent';
import { SCREEN_PATH } from '@share/constants/routers';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentEventId } from '@share/utils/path';

const DetailReport = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const eventId = getCurrentEventId(location.pathname);
    const { data: eventReport, isLoading } = useGetEventReport(eventId || '');

    if (isLoading) {
        return <LoadingContent />;
    }

    if (!eventReport) {
        navigate(SCREEN_PATH.MANAGER_REPORT);
        return null;
    }

    return (
        <div className=" flex flex-col gap-6 max-h-screen overflow-y-auto py-8 pb-10 px-10">
            <div className="flex flex-col gap-6">
                <EventInfoCard event={eventReport.event} />

                <div className="flex gap-6">
                    <TicketTypesList ticketTypes={eventReport.ticket_types} />

                    <EventStatsCard stats={eventReport.summary} />
                </div>

                <ChartsSection
                    dailyStats={eventReport.daily_stats}
                    purchasedTickets={eventReport.purchased_tickets}
                    stats={eventReport.summary}
                />
            </div>
        </div>
    );
};

export default DetailReport;
