import React from "react";
import {
  MODE_COLOR_TEXT,
  MODE_SIZE,
  MODE_WEIGHT,
  Text,
} from "@share/components/atoms/Text";
import { TicketData } from "../types/ticket";
import { QRCodeSVG } from "qrcode.react";
import DivClick from "@share/components/atoms/DivClick";
import WavyLineIcon, {
  MODE_WAVY_LINE,
} from "@share/components/atoms/icons/WavyLineIcon";

interface QRPopupProps {
  formatDateTime: (dateTimeString: string) => { date: string; time: string };
  isOpen: boolean;
  onClose: () => void;
  ticket: TicketData | null;
}

const QRPopup: React.FC<QRPopupProps> = ({
  formatDateTime,
  isOpen,
  onClose,
  ticket,
}) => {
  if (!isOpen || !ticket) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
      style: "currency",
    }).format(price);
  };

  const { date, time } = formatDateTime(ticket.eventDateTime);

  // Tạo dữ liệu cho QR code (có thể là JSON string chứa thông tin vé)
  const qrData = JSON.stringify({
    eventDateTime: ticket.eventDateTime,
    eventName: ticket.eventName,
    seatNumber: ticket.seatNumber,
    ticketId: ticket.id,
    ticketType: ticket.ticketType,
    venue: ticket.venue,
  });

  return (
    <div className="fixed inset-0 h-screen bg-black/70 flex items-center justify-center z-50">
      <div className="bg-bg-black-2 rounded-2xl w-full max-w-[500px] border border-bg-gray">
        {/* Header */}
        <div className="flex flex-col bg-bg-yellow rounded-t-2xl relative">
          <div className="flex items-center gap-2 justify-between px-6 py-6 ">
            <Text
              modeColor={MODE_COLOR_TEXT.BLACK}
              modeSize={MODE_SIZE[20]}
              modeWeight={MODE_WEIGHT.LARGE}
            >
              Mã QR Vé
            </Text>
            <DivClick onClick={onClose}>
              <Text modeColor={MODE_COLOR_TEXT.BLACK} modeSize={MODE_SIZE[20]}>
                ×
              </Text>
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
          <div className="flex flex-col gap-2">
            <Text
              modeColor={MODE_COLOR_TEXT.WHITE}
              modeSize={MODE_SIZE[18]}
              modeWeight={MODE_WEIGHT.LARGE}
            >
              {ticket.eventName}
            </Text>
            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
              📅 {date} • {time}
            </Text>
            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
              📍 {ticket.venue}
            </Text>
            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
              🎫 {ticket.ticketType} • Ghế {ticket.seatNumber}
            </Text>
            <Text
              modeColor={MODE_COLOR_TEXT.YELLOW}
              modeSize={MODE_SIZE[16]}
              modeWeight={MODE_WEIGHT.LARGE}
            >
              💰 {formatPrice(ticket.price)}
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
            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
              Quét mã QR này tại cửa vào sự kiện
            </Text>
            <Text
              modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
              modeSize={MODE_SIZE[12]}
            >
              Mã QR này chứa thông tin vé của bạn
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRPopup;
