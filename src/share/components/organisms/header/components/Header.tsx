import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import HeaderIcon from '@share/components/atoms/icons/HeaderIcon';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';
import {
    MODE_COLOR_TEXT,
    MODE_LEADING,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '../../../atoms/icons/ChevronIcon';
import EventIcon from '../../../atoms/icons/EventIcon';
import UserIcon from '../../../atoms/icons/UserIcon';
import LogoutIcon from '../../../atoms/icons/LogoutIcon';
import AuthPopup from '@modules/auth/components/AuthPopup';
import InputValidate from '@share/components/molecules/InputValidate';
import useHeaderHandler from '../hooks/useHeaderHandler';
import SearchIcon from '@share/components/atoms/icons/SearchIcon';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import SuggestSearchPopup from './SuggestSearchPopup';

const Header = () => {
    const {
        handleClickCreateEvent,
        handleClickLogo,
        handleClickMyEvents,
        handleClickMyProfile,
        handleClickMyTicket,
        handleLogout,
        isAccountPopupOpen,
        isSearchPopupOpen,
        openAuthPopup,
        schemaSearch,
        searchForm,
        setIsAccountPopupOpenStore,
        setIsSearchPopupOpenStore,
        setSearchTextStore,
        user,
    } = useHeaderHandler();

    return (
        <div className="overflow-x-hidden fixed z-10 w-full top-0">
            <div className="bg-bg-black h-20 flex flex-1 items-center justify-between px-20 gap-10">
                <DivClick onClick={handleClickLogo}>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[32]}
                        modeLeading={MODE_LEADING.LARGE}
                        className="hover:text-text-yellow transition-colors duration-200"
                    >
                        TicketVN
                    </Text>
                </DivClick>
                <div className="w-full max-w-[calc(100%-950px)] min-w-[300px]">
                    <InputValidate
                        control={searchForm.control}
                        inputName="search"
                        schema={schemaSearch}
                        placeholder="Hôm nay có gì ..."
                        // onSubmit={searchForm.handleSubmit(handleSearch)}
                        className="!h-10.5 flex items-center justify-center"
                        iconClassName="bottom-2.5"
                        icon={<SearchIcon />}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                const searchValue =
                                    searchForm.getValues('search');
                                setSearchTextStore?.(searchValue || '');
                            }
                        }}
                        onBlurIgnoreClearIcon={() => {
                            const searchValue = searchForm.getValues('search');
                            setSearchTextStore?.(searchValue || '');
                        }}
                        onFocus={() => {
                            // When focusing on search input, ensure we're in SEARCH view if there's search text
                            const currentSearchText =
                                searchForm.getValues('search');
                            setIsSearchPopupOpenStore(true);
                            if (currentSearchText?.trim()) {
                                // Set search text to store to trigger search
                                setSearchTextStore?.(currentSearchText);
                            }
                        }}
                        isShowClear={isNotNullOrUndefinedOrBlank(
                            searchForm.watch('search')
                        )}
                        onClearInput={() => {
                            searchForm.setValue('search', '');
                            setSearchTextStore?.('');
                        }}
                        // TODO
                    />
                </div>
                <div className="flex gap-12">
                    <Button
                        onClick={handleClickCreateEvent}
                        mode={MODE_BUTTON.BLACK}
                        className="!w-[155px] !h-[35px] !text-[15px]"
                    >
                        Tạo sự kiện
                    </Button>
                    <DivClick
                        onClick={handleClickMyTicket}
                        className="flex items-center gap-2"
                    >
                        <TicketIcon mode={MODE_TICKET.WHITE} />
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[15]}
                            className="hover:text-text-yellow transition-colors duration-200"
                        >
                            Vé của tôi
                        </Text>
                    </DivClick>
                    {user ? (
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
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        className="w-9 h-9 rounded-full p-0.5"
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
                                    className="fixed top-17 right-20 w-48 bg-bg-black-2 border border-bg-gray rounded-lg shadow-lg z-[99999] transition-all duration-200"
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
                                                setIsAccountPopupOpenStore(
                                                    false
                                                );
                                                handleClickMyTicket();
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                        >
                                            <TicketIcon
                                                mode={MODE_TICKET.WHITE}
                                            />
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                                modeSize={MODE_SIZE[14]}
                                            >
                                                Vé của tôi
                                            </Text>
                                        </DivClick>

                                        <DivClick
                                            onClick={() => {
                                                setIsAccountPopupOpenStore(
                                                    false
                                                );
                                                handleClickMyEvents();
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                        >
                                            <EventIcon />
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                                modeSize={MODE_SIZE[14]}
                                            >
                                                Sự kiện của tôi
                                            </Text>
                                        </DivClick>

                                        <DivClick
                                            onClick={() => {
                                                setIsAccountPopupOpenStore(
                                                    false
                                                );
                                                handleClickMyProfile();
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                        >
                                            <UserIcon />
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                                modeSize={MODE_SIZE[14]}
                                            >
                                                Thông tin tài khoản
                                            </Text>
                                        </DivClick>

                                        <DivClick
                                            onClick={() => {
                                                setIsAccountPopupOpenStore(
                                                    false
                                                );
                                                handleLogout();
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                                        >
                                            <LogoutIcon />
                                            <Text
                                                modeColor={
                                                    MODE_COLOR_TEXT.WHITE
                                                }
                                                modeSize={MODE_SIZE[14]}
                                            >
                                                Đăng xuất
                                            </Text>
                                        </DivClick>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <DivClick
                            onClick={() => {
                                openAuthPopup();
                            }}
                            className="flex items-center py-2 gap-2"
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.LARGE}
                                modeSize={MODE_SIZE[15]}
                                className="hover:text-text-yellow transition-colors duration-200"
                            >
                                Đăng nhập
                            </Text>
                            <div className="w-[1px] h-full bg-white hover:bg-bg-yellow" />
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeWeight={MODE_WEIGHT.LARGE}
                                modeSize={MODE_SIZE[15]}
                                className="hover:text-text-yellow transition-colors duration-200"
                            >
                                Đăng ký
                            </Text>
                        </DivClick>
                    )}
                </div>
            </div>
            <HeaderIcon className="!h-10" />
            <AuthPopup />
            <SuggestSearchPopup isOpen={isSearchPopupOpen} />
        </div>
    );
};

export default Header;
