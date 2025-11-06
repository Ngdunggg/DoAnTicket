import DivClick from '@share/components/atoms/DivClick';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import LayerIcon, { MODE_LAYER } from '@share/components/atoms/icons/LayerIcon';
import useMenuAdmin from '@share/components/organisms/layout/hooks/useMenuAdmin';

const MenuAdmin = () => {
    const { activeTab, menuItems } = useMenuAdmin();

    return (
        <div className="w-fit h-full min-w-[320px] min-h-screen flex flex-col py-8 gap-6 bg-white border-r border-gray-200 box-shadow-ticket rounded-r-2xl">
            <div className="flex items-center gap-4 px-4">
                <LayerIcon size={30} mode={MODE_LAYER.BLACK} />
                <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeSize={MODE_SIZE[24]}
                    modeWeight={MODE_WEIGHT.LARGE}
                >
                    Admin Dashboard
                </Text>
            </div>
            <div className="flex flex-col gap-2 mt-2 px-2 py-1">
                {menuItems.map(item => (
                    <DivClick
                        key={item.id}
                        className={`flex items-center gap-2 p-6 rounded-xl hover:bg-gray-100 ${
                            activeTab === item.id
                                ? 'bg-gray-100 box-shadow-ticket'
                                : ''
                        }`}
                        onClick={item.onClick}
                    >
                        {item.icon}
                        <Text modeColor={MODE_COLOR_TEXT.BLACK}>
                            {item.label}
                        </Text>
                    </DivClick>
                ))}
            </div>
        </div>
    );
};

export default MenuAdmin;
