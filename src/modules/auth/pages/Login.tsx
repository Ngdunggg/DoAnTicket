import PcLayout from "@share/components/templates/PcLayout";
import { MODE_COLOR_TEXT, MODE_SIZE, Text } from "@share/components/atoms/Text";
import Button from "@share/components/atoms/Button";
import { MODE_BUTTON } from "@share/components/atoms/Button";
import { useAuthPopup } from "../hooks/useAuthPopup";
import AuthPopup from "../components/AuthPopup";

const Login = () => {
  const { closeAuthPopup, isAuthPopupOpen, openAuthPopup } = useAuthPopup();

  return (
    <PcLayout>
      <div className="flex flex-col items-center justify-center h-full">
        <div className="bg-bg-yellow w-full h-[200px] flex items-center justify-center">
          <Text
            modeColor={MODE_COLOR_TEXT.BLACK}
            modeSize={MODE_SIZE[24]}
            className="font-bold"
          >
            Chào mừng đến với TicketBox
          </Text>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <Text modeColor={MODE_COLOR_TEXT.BLACK} modeSize={MODE_SIZE[18]}>
            Demo tính năng đăng nhập/đăng ký
          </Text>

          <div className="flex gap-4">
            <Button mode={MODE_BUTTON.YELLOW} onClick={openAuthPopup}>
              Mở Popup Đăng Nhập
            </Button>
          </div>

          <div className="text-center max-w-md">
            <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
              Nhấn nút trên để mở popup đăng nhập/đăng ký. Popup sẽ hiển thị ở
              giữa màn hình và có thể chuyển đổi giữa đăng nhập và đăng ký.
            </Text>
          </div>
        </div>

        {/* Auth Popup */}
        <AuthPopup isOpen={isAuthPopupOpen} onClose={closeAuthPopup} />
      </div>
    </PcLayout>
  );
};

export default Login;
