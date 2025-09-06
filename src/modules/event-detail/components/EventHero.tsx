import { MODE_BUTTON } from "@share/components/atoms/Button";
import {
  MODE_COLOR_TEXT,
  MODE_SIZE,
  MODE_WEIGHT,
  Text,
} from "@share/components/atoms/Text";
import Button from "@share/components/atoms/Button";
import CalendarIcon from "@share/components/atoms/icons/CalendarIcon";
import MapPinIcon from "@share/components/atoms/icons/MapPinIcon";
import ArrowRightIcon from "@share/components/atoms/icons/ArrowRightIcon";
import { useAppSelector } from "@configs/store";
import { useAuthPopup } from "@modules/auth/hooks/useAuthPopup";
import AuthPopup from "@modules/auth/components/AuthPopup";
import TicketIcon from "@share/components/atoms/icons/TicketIcon";

const EventHero = (event: any) => {
  const token = useAppSelector(state => state.auth.token);
  const { closeAuthPopup, isAuthPopupOpen, openAuthPopup } = useAuthPopup();

  const handleBuyTicket = () => {
    if (!token) {
      openAuthPopup();
    } else {
      // Xử lý mua vé khi đã đăng nhập
      console.log("Xử lý mua vé...");
    }
  };

  return (
    <div className="bg-bg-black w-full min-h-[600px] flex items-center justify-center px-10">
      <div className="flex w-full h-[450px] relative">
        {/* Left Panel - Event Information */}
        <div className="w-1/3 flex flex-col justify-between bg-bg-gray p-10 rounded-l-2xl relative ticket-cut-left">
          <div className="flex flex-col gap-6">
            {/* Event Title */}
            <Text
              modeColor={MODE_COLOR_TEXT.WHITE}
              modeSize={MODE_SIZE[24]}
              className="font-bold leading-tight"
            >
              VALLEY RHYTHM SEASON CHAPTER 1
            </Text>

            {/* Date and Time */}
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-6 h-6 text-white" />
              <Text modeColor={MODE_COLOR_TEXT.YELLOW} modeSize={MODE_SIZE[16]}>
                17:00, 30 Tháng 08, 2025 - 03:00, 31 Tháng 08, 2025
              </Text>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-10 h-10 text-white mt-1" />
              <div className="flex flex-col gap-1">
                <Text
                  modeColor={MODE_COLOR_TEXT.YELLOW}
                  modeSize={MODE_SIZE[16]}
                >
                  Valley Beach Club
                </Text>
                <Text
                  modeColor={MODE_COLOR_TEXT.WHITE}
                  modeSize={MODE_SIZE[14]}
                >
                  Bãi tắm Sungroup, Khu B, Phường Bãi Cháy, Thành Phố Hạ Long,
                  Tỉnh Quảng Ninh
                </Text>
              </div>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Text modeColor={MODE_COLOR_TEXT.WHITE} modeSize={MODE_SIZE[16]}>
                Giá từ
              </Text>
              <Text
                modeColor={MODE_COLOR_TEXT.YELLOW}
                modeSize={MODE_SIZE[18]}
                className="font-bold"
              >
                299.000 ₫
              </Text>
              <ArrowRightIcon className=" text-white" />
            </div>

            <Button
              icon={<TicketIcon />}
              mode={MODE_BUTTON.DECORATIVE_YELLOW}
              onClick={handleBuyTicket}
            >
              <Text
                modeWeight={MODE_WEIGHT.MEDIUM}
                modeColor={MODE_COLOR_TEXT.BLACK}
                modeSize={MODE_SIZE[16]}
              >
                Mua vé ngay
              </Text>
            </Button>
          </div>
        </div>

        {/* Dashed Separator Line */}
        <div className="absolute left-1/3 top-10 bottom-10 w-2 z-5">
          <div className="h-full w-full custom-dashed-border-vertical" />
        </div>

        {/* Right Panel - Event Poster */}
        <div className="w-2/3 overflow-hidden rounded-r-2xl relative">
          <img
            src="https://images.discovery-prod.axs.com/2025/06/cut-copy-tickets_11-13-25_18_684b100eefe3f.png"
            alt="Valley Rhythm Season Chapter 1"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Auth Popup */}
      <AuthPopup isOpen={isAuthPopupOpen} onClose={closeAuthPopup} />
    </div>
  );
};

export default EventHero;
