import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import CalendarIcon, {
    MODE_CALENDAR,
} from '@share/components/atoms/icons/CalendarIcon';
import MapPinIcon from '@share/components/atoms/icons/MapPinIcon';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';
import QRPopup from './QRPopup';
import MoreIcon from '@share/components/atoms/icons/MoreIcon';
import DivClick from '@share/components/atoms/DivClick';
import {
    formatPrice,
    getEventImage,
} from '@modules/event-detail/utils/eventUtils';
import useTicketCardHandler from './hooks/useTicketCardHandler';
import {
    IMAGE_TYPE,
    MY_TICKET_TAB,
    PURCHASED_TICKET_STATUS,
} from '@share/constants/commons';
import { TicketWithEvent } from './hooks/useMyTicketHandler';
import useMyTicketStoreSelector from '@modules/my-ticket/hooks/useMyTicketStoreSelector';

const TicketCard = ({ ticket }: { ticket: TicketWithEvent }) => {
    const { event, ticket: ticketData } = ticket;
    const { selectedTicketId } = useMyTicketStoreSelector();
    const {
        getDisplayStatusText,
        getStatus,
        handleCloseQrPopup,
        handleOpenQrPopup,
        handleViewTicketDetail,
        menuRef,
        setShowMenu,
        showMenu,
    } = useTicketCardHandler(ticketData.id);

    const isShowQrPopup = selectedTicketId === ticketData.id;

    return (
        <>
            <DivClick
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-bg-yellow/30 transition-all duration-300 group cursor-pointer"
                onClick={handleOpenQrPopup}
            >
                <div className="flex">
                    {/* Event Image */}
                    <div className="relative w-full md:w-76 h-50 rounded-l-lg overflow-hidden flex-shrink-0">
                        <img
                            src={getEventImage(event, IMAGE_TYPE.CARD)}
                            alt={event.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-1 right-1">
                            <div
                                className={`px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm ${
                                    getStatus(event) ===
                                        MY_TICKET_TAB.UPCOMING &&
                                    ticketData.status !==
                                        PURCHASED_TICKET_STATUS.USED
                                        ? 'text-green-400'
                                        : 'text-gray-400'
                                }`}
                            >
                                <Text
                                    modeColor={
                                        getStatus(event) ===
                                            MY_TICKET_TAB.UPCOMING &&
                                        ticketData.status !==
                                            PURCHASED_TICKET_STATUS.USED
                                            ? MODE_COLOR_TEXT.GREEN
                                            : MODE_COLOR_TEXT.YELLOW
                                    }
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {getDisplayStatusText(
                                        event,
                                        ticketData.status
                                    )}
                                </Text>
                            </div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="hidden md:flex flex-1 ml-4 pt-4 flex-col gap-4">
                        {/* Event Name */}
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[20]}
                        >
                            {event.title}
                        </Text>

                        {/* Date and Time */}
                        <div className="flex items-center gap-2">
                            <CalendarIcon mode={MODE_CALENDAR.YELLOW} />
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {formatDateTime(
                                    event.start_time || '',
                                    DATE_TIME_FORMAT_ISO
                                )}
                            </Text>
                        </div>

                        {/* Venue */}
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-6 h-6 text-bg-yellow" />
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {event.location}
                            </Text>
                        </div>

                        {/* Ticket Details */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <TicketIcon
                                    mode={MODE_TICKET.YELLOW}
                                    size={24}
                                />
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {ticketData.ticket_types?.name || ''}
                                </Text>
                            </div>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.LARGE}
                                modeSize={MODE_SIZE[18]}
                            >
                                •
                            </Text>
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                {Number(ticketData.price) === 0
                                    ? 'Miễn phí'
                                    : formatPrice(Number(ticketData.price))}
                            </Text>
                        </div>
                    </div>

                    {/* Three Dots Menu Button */}
                    <div
                        className="hidden md:block relative ml-4 mr-px top-1"
                        ref={menuRef}
                    >
                        <DivClick
                            onClick={e => {
                                e?.stopPropagation();
                                setShowMenu(!showMenu);
                            }}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <MoreIcon size={20} />
                        </DivClick>

                        {/* Dropdown Menu */}
                        {showMenu && (
                            <div className="absolute right-2 top-7 mt-2 w-48 bg-bg-black-2 border border-bg-gray rounded-lg shadow-lg z-10">
                                <DivClick
                                    onClick={e => {
                                        e?.stopPropagation();
                                        setShowMenu(false);
                                        handleViewTicketDetail(event.id);
                                    }}
                                    className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-bg-gray"
                                >
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        Xem chi tiết
                                    </Text>
                                </DivClick>
                            </div>
                        )}
                    </div>
                </div>
            </DivClick>

            {/* QR Popup */}
            <QRPopup
                isOpen={isShowQrPopup}
                onClose={handleCloseQrPopup}
                ticket={ticket}
            />
        </>
    );
};

export default TicketCard;
