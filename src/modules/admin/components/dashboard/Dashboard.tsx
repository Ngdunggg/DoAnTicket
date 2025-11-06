import {
    MODE_WEIGHT,
    MODE_SIZE,
    Text,
    MODE_COLOR_TEXT,
} from '@share/components/atoms/Text';
import VisitsAreaChart from '@modules/admin/components/dashboard/VisitsAreaChart';
import TopEventsBarChart from '@modules/admin/components/dashboard/TopEventsBarChart';
import RevenueMonthlyChart from '@modules/admin/components/dashboard/RevenueMonthlyChart';
import RevenueBarChart from '@modules/admin/components/dashboard/RevenueBarChart';
import TopEvents from './TopEvents';
import useDashboardHandler from './hooks/useDashboardHandler';

const AdminDashboardPage = () => {
    const {
        dailyVisits,
        eventList,
        revenueMonthly,
        stats,
        topRevenueEvents,
        topTen,
    } = useDashboardHandler();

    return (
        <div className="p-6 md:p-10 h-full overflow-y-auto">
            <div className="text-2xl font-semibold text-gray-900">
                Dashboard
            </div>
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-4">
                {stats.map(item => (
                    <div
                        key={item.label}
                        className="rounded-xl bg-white border border-gray-200 px-6 py-6 box-shadow-ticket flex flex-col gap-10"
                    >
                        <Text modeColor={MODE_COLOR_TEXT.BLACK}>
                            {item.label}
                        </Text>
                        <Text
                            modeSize={MODE_SIZE[40]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            modeColor={MODE_COLOR_TEXT.BLACK}
                        >
                            {item.value}
                        </Text>
                    </div>
                ))}
            </div>

            <div className="mt-6">
                <TopEvents events={eventList ?? []} />
            </div>

            <div className="mt-6">
                <VisitsAreaChart data={dailyVisits} />
            </div>

            <div className="mt-6">
                <TopEventsBarChart data={topTen} />
            </div>

            <div className="mt-6">
                <RevenueBarChart
                    data={topRevenueEvents}
                    title="Top 10 sự kiện có doanh thu cao nhất"
                />
            </div>

            <div className="mt-6">
                <RevenueMonthlyChart data={revenueMonthly} />
            </div>
        </div>
    );
};

export default AdminDashboardPage;
