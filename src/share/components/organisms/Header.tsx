import Button, { MODE_BUTTON } from "@share/components/atoms/Button";
import DivClick from "@share/components/atoms/DivClick";
import HeaderIcon from "@share/components/atoms/icons/HeaderIcon";
import TicketIcon, {
  MODE_TICKET,
} from "@share/components/atoms/icons/TicketIcon";
import SearchBar from "@share/components/molecules/SearchBar";
import {
  MODE_COLOR_TEXT,
  MODE_LEADING,
  MODE_SIZE,
  MODE_WEIGHT,
  Text,
} from "@share/components/atoms/Text";
import { useNavigate } from "react-router-dom";
import { Path } from "@share/constants/routers";
import { useAppSelector, useAppDispatch } from "@configs/store";
import { clearToken } from "@share/auth/stores/authSlice";
import { clearUserInfo } from "@share/auth/stores/userSlice";
import ChevronIcon, {
  MODE_CHEVRON,
  MODE_CHEVRON_DIRECTION,
} from "../atoms/icons/ChevronIcon";
import EventIcon from "../atoms/icons/EventIcon";
import UserIcon from "../atoms/icons/UserIcon";
import LogoutIcon from "../atoms/icons/LogoutIcon";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Lấy thông tin user và token từ Redux store
  const { user } = useAppSelector(state => state.user);

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // TODO: Implement search functionality
  };

  const handleLogout = () => {
    dispatch(clearToken());
    dispatch(clearUserInfo());
    navigate(Path.PathHome);
  };

  return (
    <div className="overflow-x-hidden fixed z-10 w-full top-0">
      <div className="bg-bg-black h-20 flex flex-1 items-center justify-between px-20 gap-10">
        <DivClick
          onClick={() => {
            navigate(Path.PathHome);
          }}
        >
          <Text
            modeColor={MODE_COLOR_TEXT.WHITE}
            modeSize={MODE_SIZE[32]}
            modeLeading={MODE_LEADING.LARGE}
            className="hover:text-text-yellow transition-colors duration-200"
          >
            TicketVN
          </Text>
        </DivClick>
        <SearchBar placeholder="Tìm kiếm sự kiện..." onSearch={handleSearch} />
        <div className="flex gap-12">
          <Button
            onClick={() => {}} //TODO
            mode={MODE_BUTTON.BLACK}
            className="!w-[155px] !h-[35px] !text-[15px]"
          >
            Tạo sự kiện
          </Button>
          <DivClick
            onClick={() => navigate(Path.PathMyTicket)}
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
          <DivClick className="flex items-center gap-2">
            <Text
              modeColor={MODE_COLOR_TEXT.WHITE}
              modeSize={MODE_SIZE[15]}
              className="hover:text-text-yellow transition-colors duration-200"
            >
              Thể loại
            </Text>
          </DivClick>
          {user ? (
            <div className="group relative">
              <DivClick className="flex items-center py-2 gap-2">
                <img
                  src={user.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full"
                />
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
              <div className="fixed top-17 right-20 w-48 bg-bg-black-2 border border-bg-gray rounded-lg shadow-lg z-[99999] opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="py-2">
                  <DivClick
                    onClick={() => {
                      navigate(Path.PathMyTicket);
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

                  <DivClick
                    onClick={() => {}} // TODO: Navigate to my events
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
                      navigate(Path.PathMyProfile);
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
                    onClick={() => {}} // TODO: Navigate to categories
                    className="flex items-center gap-3 px-4 py-3 hover:bg-bg-gray transition-colors duration-200"
                  >
                    <EventIcon />
                    <Text
                      modeColor={MODE_COLOR_TEXT.WHITE}
                      modeSize={MODE_SIZE[14]}
                    >
                      Thể loại
                    </Text>
                  </DivClick>

                  <DivClick
                    onClick={() => {
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
            </div>
          ) : (
            <DivClick
              onClick={() => {}} //TODO
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
      <HeaderIcon />
    </div>
  );
};

export default Header;
