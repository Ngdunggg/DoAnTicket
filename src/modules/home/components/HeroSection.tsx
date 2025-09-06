import {
  Text,
  MODE_COLOR_TEXT,
  MODE_LEADING,
  MODE_SIZE,
  MODE_WEIGHT,
} from "@share/components/atoms/Text";
import Button, { MODE_BUTTON } from "@share/components/atoms/Button";
import TicketIcon from "@share/components/atoms/icons/TicketIcon";
import DivClick from "@share/components/atoms/DivClick";
import BackIcon, { MODE_BACK } from "@share/components/atoms/icons/BackIcon";
import ArrowIcon, { MODE_ARROW } from "@share/components/atoms/icons/ArrowIcon";

const HeroSection = () => {
  return (
    <>
      <div className="bg-bg-black w-full h-[600px] flex justify-between py-10">
        <div className="flex flex-col max-w-[50%] items-start px-30 gap-4 justify-between">
          <div />
          <div className="flex flex-col gap-4">
            <Text modeColor={MODE_COLOR_TEXT.WHITE} modeSize={MODE_SIZE[20]}>
              08.15.25 <span className="text-text-yellow">Hà Nội</span>
            </Text>
            <Text
              modeColor={MODE_COLOR_TEXT.WHITE}
              modeSize={MODE_SIZE[48]}
              modeWeight={MODE_WEIGHT.LARGE}
              modeLeading={MODE_LEADING.LARGE_EXTREME}
              isAllowLineBreaks
              className="leading-[48px]"
            >
              SOUND HEALING CONCERT
            </Text>
            <Text
              modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
              modeLeading={MODE_LEADING.SMALL}
              modeSize={MODE_SIZE[18]}
              isAllowLineBreaks
            >
              Sự kiện sắp diễn ra với sự tham gia của các nhạc sĩ nổi tiếng
            </Text>
            <Button
              mode={MODE_BUTTON.DECORATIVE_YELLOW}
              className="!w-fit !h-12"
              icon={<TicketIcon />}
            >
              <Text
                modeWeight={MODE_WEIGHT.MEDIUM}
                modeColor={MODE_COLOR_TEXT.BLACK}
              >
                Đặt vé ngay
              </Text>
            </Button>
          </div>
          <div className="flex gap-4">
            <DivClick>
              <BackIcon mode={MODE_BACK.WHITE} />
            </DivClick>
            <DivClick>
              <ArrowIcon mode={MODE_ARROW.WHITE} />
            </DivClick>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center gap-10 px-10">
          <div className="w-[75%] h-full">
            <img
              src={
                "https://images.discovery-prod.axs.com/2025/06/cut-copy-tickets_11-13-25_18_684b100eefe3f.png"
              }
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-[15%] h-full py-10 opacity-50 overflow-hidden">
            <img
              src={
                "https://images.discovery-prod.axs.com/2025/06/cut-copy-tickets_11-13-25_18_684b100eefe3f.png"
              }
              alt="hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* <div className="w-full h-24 bg-bg-yellow top-[-1px] left-0 right-0 relative">
                <div className="w-full h-[30px] ">
                    <WavyLineIcon />
                </div>
                <div className="w-full h-[30px] mt-10 right-0 absolute left-0">
                    <WavyLineIcon mode={MODE_WAVY_LINE.YELLOW} />
                </div>
            </div> */}
    </>
  );
};

export default HeroSection;
