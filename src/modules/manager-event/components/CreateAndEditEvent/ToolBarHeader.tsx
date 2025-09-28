import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import useCreateEventHandler from './hooks/useCreateEventHandler';
import { CREATE_EVENT_TAB } from '@share/constants/commons';
const ToolBarHeader = () => {
    const { activeTab, setActiveTabStore } = useCreateEventHandler();

    const TabHeaderMenu = [
        {
            label: 'Thông tin sự kiện',
            value: CREATE_EVENT_TAB.INFO,
        },
        {
            label: 'Thanh toán',
            value: CREATE_EVENT_TAB.PAYMENT,
        },
        {
            label: 'Xem trước',
            value: CREATE_EVENT_TAB.PREVIEW,
        },
    ];

    return (
        <div className="flex flex-1 gap-18 justify-between items-center bg-black/30 backdrop-blur-3xl h-fit absolute top-0 left-0 right-0 z-50">
            {TabHeaderMenu.map((item, index) => (
                <DivClick
                    key={item.value}
                    onClick={() => setActiveTabStore(item.value)}
                    className={`flex w-full h-full hover:bg-bg-black/50 items-center 
                        justify-center gap-4 border-b border-bg-yellow py-4 px-8 
                        ${activeTab === item.value ? '' : 'border-none'}
                    `}
                >
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center 
                            ${activeTab === item.value ? 'bg-bg-yellow' : 'bg-white'}
                        `}
                    >
                        <Text modeWeight={MODE_WEIGHT.LARGE}>{index + 1}</Text>
                    </div>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.MEDIUM}
                    >
                        {item.label}
                    </Text>
                </DivClick>
            ))}

            <Button
                mode={MODE_BUTTON.YELLOW}
                isShadow
                className="!rounded-xl !h-10 min-w-[130px] !mr-10"
            >
                {activeTab === CREATE_EVENT_TAB.PREVIEW
                    ? 'Tạo sự kiện'
                    : 'Tiếp tục'}
            </Button>
        </div>
    );
};

export default ToolBarHeader;
