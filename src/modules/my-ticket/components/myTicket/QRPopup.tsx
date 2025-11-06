import React from 'react';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { QRCodeSVG } from 'qrcode.react';
import DivClick from '@share/components/atoms/DivClick';
import WavyLineIcon, {
    MODE_WAVY_LINE,
} from '@share/components/atoms/icons/WavyLineIcon';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import XCircleIcon from '@share/components/atoms/icons/XCircleIcon';
import { MODE_X_CIRCLE_ICON } from '@share/components/atoms/icons/XCircleIcon';
import { formatPrice } from '@modules/event-detail/utils/eventUtils';
import CalendarIcon, {
    MODE_CALENDAR,
} from '@share/components/atoms/icons/CalendarIcon';
import MapPinIcon from '@share/components/atoms/icons/MapPinIcon';
import { TicketWithEvent } from './hooks/useMyTicketHandler';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';

interface QRPopupProps {
    isOpen: boolean;
    onClose: () => void;
    ticket: TicketWithEvent | null;
}

const QRPopup: React.FC<QRPopupProps> = ({ isOpen, onClose, ticket }) => {
    if (!isOpen || !ticket) return null;

    const { event, ticket: ticketData } = ticket;

    // Tạo qr_data giống hệt với backend để đảm bảo QR code khớp với email
    const qrData = JSON.stringify({
        qr_data: `ticket:${ticketData.id}:${ticketData.serial_number}`,
        ticketId: ticketData.id,
        ticketTypeName: ticketData.ticket_types?.name || '',
    });

    return (
        <div className="fixed inset-0 top-2 h-screen bg-bg-black-2/20 flex items-center justify-center z-50">
            <div className="bg-bg-black-2 rounded-2xl w-full max-w-[500px] border border-bg-gray">
                {/* Header */}
                <div className="flex flex-col bg-bg-yellow rounded-t-2xl relative">
                    <div className="flex items-center gap-2 justify-between px-6 py-6 ">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[24]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            Mã QR Vé
                        </Text>
                        <DivClick onClick={onClose}>
                            <XCircleIcon
                                mode={MODE_X_CIRCLE_ICON.BLACK}
                                size={24}
                            />
                        </DivClick>
                    </div>
                    <WavyLineIcon
                        mode={MODE_WAVY_LINE.YELLOW}
                        className="w-[1032px] absolute bottom-[-10px]"
                    />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col gap-6">
                    {/* Event Info */}
                    <div className="flex flex-col gap-4">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[20]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            {event.title}
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            className="flex items-center gap-2"
                        >
                            <CalendarIcon
                                mode={MODE_CALENDAR.YELLOW}
                                size={24}
                            />{' '}
                            {formatDateTime(
                                event.start_time || '',
                                DATE_TIME_FORMAT_ISO
                            )}
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            className="flex items-center gap-2"
                        >
                            <MapPinIcon className="w-6 h-6 text-bg-yellow" />{' '}
                            {event.location}
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            className="flex items-center gap-2"
                        >
                            <TicketIcon mode={MODE_TICKET.YELLOW} size={24} />{' '}
                            {ticketData.ticket_types?.name || ''}{' '}
                            <span className="text-bg-yellow font-bold">
                                • {formatPrice(Number(ticketData.price))}
                            </span>
                        </Text>
                    </div>

                    {/* QR Code */}
                    <div className="flex justify-center">
                        <div className="bg-white p-4 rounded-xl">
                            <QRCodeSVG
                                value={qrData}
                                size={300}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className="flex flex-col text-center">
                        <Text modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}>
                            Quét mã QR này tại cửa vào sự kiện
                        </Text>
                        <Text modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}>
                            Mã QR này chứa thông tin vé của bạn
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QRPopup;
