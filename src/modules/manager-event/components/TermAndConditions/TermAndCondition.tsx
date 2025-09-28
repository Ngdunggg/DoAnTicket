import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import { SCREEN_PATH } from '@share/constants/routers';

const TermAndCondition = () => {
    return (
        <div className="flex flex-col flex-1 max-h-screen overflow-hidden py-10 px-8">
            <div className="flex-1 flex flex-col bg-bg-gray-2 rounded-2xl px-6 py-4">
                <div className="flex flex-1 flex-col border border-white rounded-2xl items-center justify-between">
                    <DivClick
                        onClick={() => {
                            window.open(
                                SCREEN_PATH.MANAGER_LEGAL_BUSINESS,
                                '_blank'
                            );
                        }}
                        className="flex w-full items-center justify-between gap-2 px-6 py-5 hover:bg-bg-black-2/50 rounded-t-2xl"
                    >
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            1. Danh mục hàng hóa, dịch vụ cấm kinh doanh
                        </Text>
                        <ChevronIcon
                            mode={MODE_CHEVRON.WHITE}
                            direction={MODE_CHEVRON_DIRECTION.RIGHT}
                        />
                    </DivClick>
                    <DivClick
                        onClick={() => {
                            window.open(
                                SCREEN_PATH.MANAGER_LEGAL_IMAGE,
                                '_blank'
                            );
                        }}
                        className="flex w-full items-center justify-between gap-2 px-6 py-5 hover:bg-bg-black-2/50 rounded-b-2xl"
                    >
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            2. Quy định kiểm duyệt nội dung & hình ảnh
                        </Text>
                        <ChevronIcon
                            mode={MODE_CHEVRON.WHITE}
                            direction={MODE_CHEVRON_DIRECTION.RIGHT}
                        />
                    </DivClick>
                </div>
            </div>
        </div>
    );
};

export default TermAndCondition;
