import React, { useState, useRef, useEffect } from "react";
import { MODE_COLOR_TEXT, MODE_SIZE, MODE_WEIGHT, Text } from "@share/components/atoms/Text";
import { TicketData } from "../types/ticket";
import CalendarIcon from "@share/components/atoms/icons/CalendarIcon";
import MapPinIcon from "@share/components/atoms/icons/MapPinIcon";
import TicketIcon, { MODE_TICKET } from "@share/components/atoms/icons/TicketIcon";
import QRPopup from "./QRPopup";
import MoreIcon from "@share/components/atoms/icons/MoreIcon";
import DivClick from "@share/components/atoms/DivClick";

interface TicketCardProps {
    ticket: TicketData;
    formatDateTime: (dateTimeString: string) => { date: string; time: string };
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket, formatDateTime }) => {
    const [showQR, setShowQR] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price);
    };

    // Đóng menu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Tính toán status dựa trên thời gian hiện tại
    const getStatus = () => {
        const now = new Date();
        const eventDate = new Date(ticket.eventDateTime);
        return eventDate > now ? "upcoming" : "past";
    };

    const getStatusColor = (status: string) => {
        return status === "upcoming" ? "text-green-400" : "text-gray-400";
    };

    const getStatusText = (status: string) => {
        return status === "upcoming" ? "Sắp diễn ra" : "Đã diễn ra";
    };

    const status = getStatus();
    const { date, time } = formatDateTime(ticket.eventDateTime);

    return (
        <>
            <DivClick
                className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-bg-yellow/30 transition-all duration-300 group cursor-pointer"
                onClick={() => setShowQR(true)}
            >
                <div className="flex">
                    {/* Event Image */}
                    <div className="relative w-76 h-50 rounded-l-lg overflow-hidden flex-shrink-0">
                        <img
                            src={ticket.image}
                            alt={ticket.eventName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-1 right-1">
                            <div
                                className={`px-2 py-1 rounded-full bg-white/20 backdrop-blur-sm ${getStatusColor(status)}`}
                            >
                                <Text
                                    modeColor={
                                        status === "upcoming"
                                            ? MODE_COLOR_TEXT.GREEN
                                            : MODE_COLOR_TEXT.GRAY
                                    }
                                    modeSize={MODE_SIZE[12]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {getStatusText(status)}
                                </Text>
                            </div>
                        </div>
                    </div>

                    {/* Event Info */}
                    <div className="flex-1 ml-4 pt-4 flex flex-col gap-2.5">
                        {/* Event Name */}
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            {ticket.eventName}
                        </Text>

                        {/* Date and Time */}
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-3 h-3 text-bg-yellow" />
                            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
                                {date} • {time}
                            </Text>
                        </div>

                        {/* Venue */}
                        <div className="flex items-center gap-2">
                            <MapPinIcon className="w-3 h-3 text-bg-yellow" />
                            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
                                {ticket.venue}
                            </Text>
                        </div>

                        {/* Ticket Details */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <TicketIcon mode={MODE_TICKET.YELLOW} className="w-3 h-3" />
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {ticket.ticketType} • Ghế {ticket.seatNumber}
                                </Text>
                            </div>
                            <Text
                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                modeSize={MODE_SIZE[14]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                {formatPrice(ticket.price)}
                            </Text>
                        </div>
                    </div>

                    {/* Three Dots Menu Button */}
                    <div className="relative ml-4 mr-px top-1" ref={menuRef}>
                        <DivClick
                            onClick={(e) => {
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
                                {status === "upcoming" ? (
                                    <>
                                        <DivClick
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                setShowMenu(false);
                                                console.log("Xem chi tiết vé:", ticket.id);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-bg-gray"
                                        >
                                            <Text
                                                modeColor={MODE_COLOR_TEXT.WHITE}
                                                modeSize={MODE_SIZE[14]}
                                                modeWeight={MODE_WEIGHT.MEDIUM}
                                            >
                                                Xem chi tiết
                                            </Text>
                                        </DivClick>
                                        <DivClick
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                setShowMenu(false);
                                                setShowQR(true);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                                        >
                                            <Text
                                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                                modeSize={MODE_SIZE[14]}
                                                modeWeight={MODE_WEIGHT.MEDIUM}
                                            >
                                                Xem QR Code
                                            </Text>
                                        </DivClick>
                                    </>
                                ) : (
                                    <>
                                        <DivClick
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                setShowMenu(false);
                                                console.log("Xem lại sự kiện:", ticket.id);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors border-b border-bg-gray"
                                        >
                                            <Text
                                                modeColor={MODE_COLOR_TEXT.WHITE}
                                                modeSize={MODE_SIZE[14]}
                                                modeWeight={MODE_WEIGHT.MEDIUM}
                                            >
                                                Xem lại sự kiện
                                            </Text>
                                        </DivClick>
                                        <DivClick
                                            onClick={(e) => {
                                                e?.stopPropagation();
                                                setShowMenu(false);
                                                console.log("Đánh giá sự kiện:", ticket.id);
                                            }}
                                            className="w-full px-4 py-3 text-left hover:bg-white/5 transition-colors"
                                        >
                                            <Text
                                                modeColor={MODE_COLOR_TEXT.YELLOW}
                                                modeSize={MODE_SIZE[14]}
                                                modeWeight={MODE_WEIGHT.MEDIUM}
                                            >
                                                Đánh giá
                                            </Text>
                                        </DivClick>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </DivClick>

            {/* QR Popup */}
            <QRPopup
                isOpen={showQR}
                onClose={() => setShowQR(false)}
                ticket={ticket}
                formatDateTime={formatDateTime}
            />
        </>
    );
};

export default TicketCard;
