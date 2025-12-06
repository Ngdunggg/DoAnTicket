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
import useDetectMobile from '@share/hooks/useDetectMobile';
import MenuIcon from '@share/components/atoms/icons/MenuIcon';
import { useState } from 'react';
import useCreateEventStoreSelector from './CreateAndEditEvent/hooks/useCreateEventStoreSelector';

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
    const { isEditMode, isOpenCreateEvent } = useCreateEventStoreSelector();
    const navigate = useNavigate();
    const isMobile = useDetectMobile();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex justify-between items-center bg-bg-gray py-3 px-4">
            <div>
                {isOpenCreateEvent ? (
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[26]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        className="max-w-[200px] md:max-w-full"
                        isAllowLineBreaks
                    >
                        {isEditMode ? 'Cập nhật sự kiện' : 'Tạo sự kiện'}
                    </Text>
                ) : isEditMode ? (
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[26]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        className="max-w-[200px] md:max-w-full"
                        isAllowLineBreaks
                    >
                        Cập nhật sự kiện
                    </Text>
                ) : (
                    menuItems.map(
                        item =>
                            isActive(item.path) && (
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[26]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                    key={item.id}
                                    className="max-w-[200px] md:max-w-full"
                                    isAllowLineBreaks
                                >
                                    {item.label}
                                </Text>
                            )
                    )
                )}
            </div>
            <div className="flex items-center gap-4">
                {!isMobile && !isOpenCreateEvent && !isEditMode && (
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
                )}

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
                            {!isMobile && (
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[15]}
                                    className="hover:text-text-yellow transition-colors duration-200"
                                >
                                    Tài khoản
                                </Text>
                            )}
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

                {isMobile && (
                    <>
                        <DivClick onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <MenuIcon size={26} />
                        </DivClick>

                        {/* Mobile Menu Drawer */}
                        {isMenuOpen && (
                            <div className="fixed right-0 left-0 top-18 bg-bg-black-2 z-50">
                                <div className="flex flex-1 flex-col w-full">
                                    {/* Menu Items */}
                                    <div className="flex flex-col w-full gap-2 mt-2 px-4 py-4">
                                        {menuItems.map(item => (
                                            <DivClick
                                                key={item.id}
                                                className={`flex w-full items-center gap-2 p-6 rounded-md hover:bg-bg-black/50 ${
                                                    isActive(item.path)
                                                        ? 'bg-bg-black/50'
                                                        : ''
                                                }`}
                                                onClick={() => {
                                                    item.onClick?.();
                                                    setIsMenuOpen(false);
                                                }}
                                            >
                                                {item.icon}
                                                <Text
                                                    modeColor={
                                                        MODE_COLOR_TEXT.WHITE
                                                    }
                                                >
                                                    {item.label}
                                                </Text>
                                            </DivClick>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderBar;
