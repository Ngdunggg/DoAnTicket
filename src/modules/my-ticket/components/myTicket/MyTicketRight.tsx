import { MODE_COLOR_TEXT, MODE_SIZE, Text } from '@share/components/atoms/Text';
import { MODE_WEIGHT } from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import TicketCard from './TicketCard';
import useMyTicketHandler, {
    TicketWithEvent,
} from './hooks/useMyTicketHandler';
import { MY_TICKET_TAB } from '@share/constants/commons';

const MyTicketRight = () => {
    const { activeTab, pastTickets, setActiveTab, upcomingTickets } =
        useMyTicketHandler();

    return (
        <div className="flex flex-col flex-1 py-14 px-6">
            {/* Tabs */}
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeSize={MODE_SIZE[28]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                Vé của tôi
            </Text>
            <div className="h-px w-full bg-bg-gray mt-4 mb-4" />
            <div className="flex items-center justify-center mb-8">
                <div className="bg-white/10 rounded-full p-1 backdrop-blur-sm flex gap-1">
                    <Button
                        onClick={() => setActiveTab(MY_TICKET_TAB.UPCOMING)}
                        mode={
                            activeTab === MY_TICKET_TAB.UPCOMING
                                ? MODE_BUTTON.YELLOW
                                : MODE_BUTTON.NONE
                        }
                    >
                        <Text
                            modeColor={
                                activeTab === MY_TICKET_TAB.UPCOMING
                                    ? MODE_COLOR_TEXT.BLACK
                                    : MODE_COLOR_TEXT.WHITE
                            }
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Sắp diễn ra ({upcomingTickets.length})
                        </Text>
                    </Button>
                    <Button
                        onClick={() => setActiveTab(MY_TICKET_TAB.PAST)}
                        mode={
                            activeTab === MY_TICKET_TAB.PAST
                                ? MODE_BUTTON.YELLOW
                                : MODE_BUTTON.NONE
                        }
                    >
                        <Text
                            modeColor={
                                activeTab === MY_TICKET_TAB.PAST
                                    ? MODE_COLOR_TEXT.BLACK
                                    : MODE_COLOR_TEXT.WHITE
                            }
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Đã diễn ra ({pastTickets.length})
                        </Text>
                    </Button>
                </div>
            </div>

            {/* Ticket List */}
            <div className="flex flex-col gap-4 max-h-[calc(100vh-150px)] overflow-y-auto">
                <div className="min-h-[calc(100vh-150px)]">
                    <div className="flex flex-col gap-4">
                        {activeTab === MY_TICKET_TAB.UPCOMING ? (
                            upcomingTickets.length > 0 ? (
                                upcomingTickets.map((item: TicketWithEvent) => (
                                    <TicketCard
                                        key={item.ticket.id}
                                        ticket={item}
                                    />
                                ))
                            ) : (
                                <div className="flex-1 flex items-center justify-center">
                                    <Text
                                        modeColor={
                                            MODE_COLOR_TEXT.GRAY_SECONDARY
                                        }
                                        modeSize={MODE_SIZE[18]}
                                    >
                                        Bạn chưa có vé nào
                                    </Text>
                                </div>
                            )
                        ) : pastTickets.length > 0 ? (
                            pastTickets.map((item: TicketWithEvent) => (
                                <TicketCard
                                    key={item.ticket.id}
                                    ticket={item}
                                />
                            ))
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY}
                                    modeSize={MODE_SIZE[18]}
                                >
                                    Bạn chưa có vé nào
                                </Text>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyTicketRight;
