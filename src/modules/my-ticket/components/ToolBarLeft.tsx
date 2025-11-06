import DivClick from '@share/components/atoms/DivClick';
import ChevronIcon, {
    MODE_CHEVRON,
    MODE_CHEVRON_DIRECTION,
} from '@share/components/atoms/icons/ChevronIcon';
import EventIcon from '@share/components/atoms/icons/EventIcon';
import TicketIcon, {
    MODE_TICKET,
} from '@share/components/atoms/icons/TicketIcon';
import UserIcon, { MODE_USER } from '@share/components/atoms/icons/UserIcon';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    Text,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import Image from '@share/components/atoms/Image';
import useToolBarLeftHandler from '../hooks/useToolBarLeftHandler';

const ToolBarLeft = () => {
    const {
        handleEventPage,
        handleHomePage,
        handleMyTicketPage,
        handleProfilePage,
        isProfilePage,
        userInfo,
    } = useToolBarLeftHandler();
    return (
        <div className="flex flex-col px-6 gap-10">
            <div className="flex items-center gap-1">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[16]}
                    className="cursor-pointer"
                    onClick={handleHomePage}
                >
                    Trang chủ
                </Text>
                <ChevronIcon
                    direction={MODE_CHEVRON_DIRECTION.RIGHT}
                    mode={MODE_CHEVRON.WHITE}
                    className="w-5 h-5"
                />
                <Text
                    modeColor={
                        !isProfilePage
                            ? MODE_COLOR_TEXT.YELLOW
                            : MODE_COLOR_TEXT.WHITE
                    }
                    modeSize={MODE_SIZE[16]}
                    className={`${!isProfilePage ? '' : 'cursor-pointer'}`}
                    onClick={handleMyTicketPage}
                >
                    Vé của tôi
                </Text>
                {isProfilePage && (
                    <>
                        <ChevronIcon
                            direction={MODE_CHEVRON_DIRECTION.RIGHT}
                            mode={MODE_CHEVRON.WHITE}
                            className="w-5 h-5"
                        />
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            modeSize={MODE_SIZE[16]}
                        >
                            Thông tin tài khoản
                        </Text>
                    </>
                )}
            </div>
            <div className="flex items-center gap-3">
                <Image
                    src={userInfo?.avatar_url || ''}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex flex-col gap-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[14]}
                    >
                        Tài khoản của
                    </Text>
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeSize={MODE_SIZE[16]}
                    >
                        {userInfo?.full_name || 'Nguyễn Văn A'}
                    </Text>
                </div>
            </div>
            <div className="flex flex-col px-14 gap-5">
                <DivClick
                    className={`flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
                        isProfilePage
                            ? 'text-text-yellow'
                            : 'text-white hover:text-text-yellow'
                    }`}
                    onClick={handleProfilePage}
                >
                    <UserIcon
                        mode={
                            isProfilePage ? MODE_USER.YELLOW : MODE_USER.DEFAULT
                        }
                    />
                    <Text
                        modeColor={
                            isProfilePage
                                ? MODE_COLOR_TEXT.YELLOW
                                : MODE_COLOR_TEXT.WHITE
                        }
                    >
                        Thông tin tài khoản
                    </Text>
                </DivClick>
                <DivClick
                    className="flex items-center gap-2"
                    onClick={handleMyTicketPage}
                >
                    <TicketIcon
                        mode={
                            !isProfilePage
                                ? MODE_TICKET.YELLOW
                                : MODE_TICKET.WHITE
                        }
                    />
                    <Text
                        modeColor={
                            !isProfilePage
                                ? MODE_COLOR_TEXT.YELLOW
                                : MODE_COLOR_TEXT.WHITE
                        }
                    >
                        Vé của tôi
                    </Text>
                </DivClick>
                <DivClick
                    className="flex items-center gap-2"
                    onClick={handleEventPage}
                >
                    <EventIcon />
                    <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                        Sự kiện của tôi
                    </Text>
                </DivClick>
            </div>
        </div>
    );
};

export default ToolBarLeft;
