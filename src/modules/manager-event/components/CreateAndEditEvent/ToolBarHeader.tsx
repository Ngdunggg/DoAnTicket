import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import useToolBarHeaderHandler from './hooks/useToolBarHeaderHandler';
import { CREATE_EVENT_TAB } from '@share/constants/commons';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';
import BackIcon, { MODE_BACK } from '@share/components/atoms/icons/BackIcon';

interface ToolBarHeaderProps {
    eventId?: string;
}

const ToolBarHeader = ({ eventId = '' }: ToolBarHeaderProps) => {
    const { activeTab, handleCreateEvent, isEditMode, setActiveTabStore } =
        useToolBarHeaderHandler(eventId);
    const navigate = useNavigate();

    const TabHeaderMenu = [
        {
            label: 'Thông tin sự kiện',
            value: CREATE_EVENT_TAB.INFO,
        },
        {
            label: 'Thông tin ban tổ chức',
            value: CREATE_EVENT_TAB.PAYMENT,
        },
        {
            label: 'Xem trước',
            value: CREATE_EVENT_TAB.PREVIEW,
        },
    ];

    return (
        <div className="flex flex-1 gap-18 justify-between items-center bg-black/30 backdrop-blur-3xl h-fit absolute top-0 left-0 right-0 z-50">
            {isEditMode && (
                <DivClick
                    onClick={() => navigate(SCREEN_PATH.MANAGER_EVENT)}
                    className="flex items-center gap-3 bg-bg-black-2/50 rounded-full px-4 py-2 hover:bg-bg-black-2/70 transition-colors ml-4"
                >
                    <BackIcon mode={MODE_BACK.WHITE} />
                </DivClick>
            )}
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
                onClick={handleCreateEvent}
                isShadow
                className="!rounded-xl !h-10 min-w-[130px] !mr-10"
            >
                <Text modeWeight={MODE_WEIGHT.LARGE}>
                    {activeTab === CREATE_EVENT_TAB.PREVIEW
                        ? isEditMode
                            ? 'Cập nhật'
                            : 'Tạo sự kiện'
                        : 'Tiếp tục'}
                </Text>
            </Button>
        </div>
    );
};

export default ToolBarHeader;
