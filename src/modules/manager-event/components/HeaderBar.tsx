import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import EventIcon from '@share/components/atoms/icons/EventIcon';
import LogoutIcon from '@share/components/atoms/icons/LogoutIcon';
import PlusIcon, { MODE_PLUS } from '@share/components/atoms/icons/PlusIcon';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';
import UserIcon from '@share/components/atoms/icons/UserIcon';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import useHeaderHandler from '@share/components/organisms/header/hooks/useHeaderHandler';
import useMenuManager from '@share/components/organisms/layout/hooks/useMenuManager';
import useCreateEventStoreAction from './CreateAndEditEvent/hooks/useCreateEventStoreAction';
import { SCREEN_PATH } from '@share/constants/routers';
import { useNavigate } from 'react-router-dom';
import Image from '@share/components/atoms/Image';
import { ROLE } from '@share/constants/commons';
import AdminIcon, { MODE_ADMIN } from '@share/components/atoms/icons/AdminIcon';

const HeaderBar = () => {
    const { isActive, menuItems } = useMenuManager();
    const {
        handleClickAdmin,
        handleClickMyEvents,
        handleClickMyProfile,
        handleClickMyTicket,
        handleLogout,
        isAccountPopupOpen,
        setIsAccountPopupOpenStore,
        user,
    } = useHeaderHandler();
    const { setIsEditModeStore, setIsOpenCreateEventStore } =
        useCreateEventStoreAction();
    const navigate = useNavigate();

    return (
        <div className="flex justify-between items-center bg-bg-gray py-3 px-4">
            <div className="flex items-center gap-2">
                {menuItems.map(
                    item =>
                        isActive(item.path) && (
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[26]}
                                modeWeight={MODE_WEIGHT.LARGE}
                                key={item.id}
                            >
                                {item.label}
                            </Text>
                        )
                )}
            </div>
            <div className="flex items-center gap-4">
                <Button
                    mode={MODE_BUTTON.YELLOW}
                    icon={<PlusIcon mode={MODE_PLUS.BLACK} />}
                    onClick={() => {
                        setIsOpenCreateEventStore(true);
                        setIsEditModeStore(false);
                        navigate(SCREEN_PATH.CREATE_EVENT);
                    }}
                >
                    Tạo sự kiện
                </Button>
                {user && (
                    <div className="relative">
                        <DivClick
                            className="flex items-center py-2 gap-2 cursor-pointer"
                            onMouseEnter={() =>
                                setIsAccountPopupOpenStore(true)
                            }
                            onMouseLeave={() =>
                                setIsAccountPopupOpenStore(false)
                            }
                        >
                            <div className="border border-white rounded-full">
                                <Image
                                    src={user.avatar_url || ''}
                                    alt="avatar"
                                    className="w-9 h-9 rounded-full object-cover p-0.5"
                                />
                            </div>
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[15]}
                                className="hover:text-text-yellow transition-colors duration-200"
                            >
                                Tài khoản
                            </Text>
                            <ChevronIcon
                                direction={MODE_CHEVRON_DIRECTION.DOWN}
                                mode={MODE_CHEVRON.WHITE}
                                size={18}
                            />
                        </DivClick>

                        {/* Account Popup */}
                        {isAccountPopupOpen && (
                            <div
                                className="fixed top-16 right-4 w-48 bg-bg-black-2 border border-bg-gray rounded-lg shadow-lg z-[99999] transition-all duration-200"
                                onMouseEnter={() =>
                                    setIsAccountPopupOpenStore(true)
                                }
                                onMouseLeave={() =>
                                    setIsAccountPopupOpenStore(false)
                                }
                            >
                                <div className="py-2">
                                    <DivClick
                                        onClick={() => {
                                            setIsAccountPopupOpenStore(false);
                                            handleClickMyTicket();
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                    >
                                        <TicketIcon mode={MODE_TICKET.WHITE} />
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[14]}
                                        >
                                            Vé của tôi
                                        </Text>
                                    </DivClick>
                                    {user?.role === ROLE.ADMIN && (
                                        <DivClick
                                            onClick={() => {
                                                setIsAccountPopupOpenStore(
                                                    false
                                                );
                                                handleClickAdmin();
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                        >
                                            <AdminIcon
                                                mode={MODE_ADMIN.WHITE}
                                            />
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                                modeSize={MODE_SIZE[14]}
                                            >
                                                Quản lý sự kiện
                                            </Text>
                                        </DivClick>
                                    )}
                                    <DivClick
                                        onClick={() => {
                                            setIsAccountPopupOpenStore(false);
                                            handleClickMyEvents();
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                    >
                                        <EventIcon />
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[14]}
                                        >
                                            Sự kiện của tôi
                                        </Text>
                                    </DivClick>

                                    <DivClick
                                        onClick={() => {
                                            setIsAccountPopupOpenStore(false);
                                            handleClickMyProfile();
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                    >
                                        <UserIcon />
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[14]}
                                        >
                                            Thông tin tài khoản
                                        </Text>
                                    </DivClick>

                                    <DivClick
                                        onClick={() => {
                                            setIsAccountPopupOpenStore(false);
                                            handleLogout();
                                        }}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                    >
                                        <LogoutIcon />
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.WHITE}
                                            modeSize={MODE_SIZE[14]}
                                        >
                                            Đăng xuất
                                        </Text>
                                    </DivClick>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeaderBar;
