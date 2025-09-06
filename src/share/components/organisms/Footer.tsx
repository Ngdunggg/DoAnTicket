import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';

const Footer = () => {
    return (
        <div className="bg-footer">
            <div className="bg-black/40 w-full h-[250px] flex items-center px-10 py-4">
                <div className="flex flex-col gap-4">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        TicketBox
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                    >
                        Nền tảng bán vé sự kiện hàng đầu Việt Nam
                    </Text>
                    <div className="flex gap-6 mt-4">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[12]}
                            className="hover:opacity-80"
                        >
                            Về chúng tôi
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[12]}
                            className="hover:opacity-80"
                        >
                            Liên hệ
                        </Text>
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[12]}
                            className="hover:opacity-80"
                        >
                            Hỗ trợ
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
