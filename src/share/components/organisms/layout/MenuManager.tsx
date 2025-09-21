import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import useMenuManager from './hooks/useMenuManager';
import LayerIcon, { MODE_LAYER } from '@share/components/atoms/icons/LayerIcon';

const MenuManager = () => {
    const { isActive, menuItems } = useMenuManager();

    return (
        <div className="w-fit h-full min-w-[320px] min-h-screen flex flex-col py-8 gap-6 bg-menu-manager">
            <div className="flex items-center gap-4 px-4">
                <LayerIcon size={30} mode={MODE_LAYER.YELLOW} />
                <Text
                    modeColor={MODE_COLOR_TEXT.YELLOW}
                    modeSize={MODE_SIZE[24]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Organizer Center
                </Text>
            </div>
            <div className="flex flex-col gap-2 mt-2">
                {menuItems.map(item => (
                    <DivClick
                        key={item.id}
                        className={`flex items-center gap-2 p-6 rounded-md hover:bg-bg-black/50 ${
                            isActive(item.path) ? 'bg-bg-black/50' : ''
                        }`}
                        onClick={item.onClick}
                    >
                        {item.icon}
                        <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                            {item.label}
                        </Text>
                    </DivClick>
                ))}
            </div>
        </div>
    );
};

export default MenuManager;
