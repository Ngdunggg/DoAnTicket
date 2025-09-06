import React, { useState } from "react";
import {
  MODE_COLOR_TEXT,
  MODE_SIZE,
  MODE_WEIGHT,
  Text,
} from "@share/components/atoms/Text";
import Button, { MODE_BUTTON } from "@share/components/atoms/Button";
import { useAppDispatch } from "@configs/store";
import { setToken } from "@share/auth/stores/authSlice";
import { setUserInfo } from "@share/auth/stores/userSlice";
import DivClick from "@share/components/atoms/DivClick";
import WavyLineIcon, {
  MODE_WAVY_LINE,
} from "@share/components/atoms/icons/WavyLineIcon";
import GoogleIcon from "@share/components/atoms/icons/GoogleIcon";

interface AuthPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPopup: React.FC<AuthPopupProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      // Xử lý đăng nhập
      console.log("Đăng nhập:", { email, password });
      // Giả lập đăng nhập thành công
      const fakeToken = "fake-token-123";
      const fakeUser = {
        email: email,
        full_name: email.split("@")[0],
        id: "user-123", // Lấy tên từ email
      };

      dispatch(setToken(fakeToken));
      dispatch(setUserInfo(fakeUser));
      onClose();
    } else {
      // Xử lý đăng ký
      if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp!");
        return;
      }
      console.log("Đăng ký:", { email, name, password });
      // Giả lập đăng ký thành công
      const fakeToken = "fake-token-456";
      const fakeUser = {
        email: email,
        full_name: name,
        id: "user-456",
      };

      dispatch(setToken(fakeToken));
      dispatch(setUserInfo(fakeUser));
      onClose();
    }
  };

  const handleGoogleLogin = () => {
    console.log("Đăng nhập bằng Google");
    // Xử lý đăng nhập Google
    const googleToken = "google-token-123";
    const googleUser = {
      avatar: "https://static.ticketbox.vn/avatar.png",
      email: "user@gmail.com",
      full_name: "Google User",
      id: "google-user-123",
    };

    dispatch(setToken(googleToken));
    dispatch(setUserInfo(googleUser));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 h-screen bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-[450px] flex flex-col items-center flex-1">
        {/* Header Container */}
        <div className="bg-bg-black-2 rounded-t-2xl w-full border border-bg-gray relative">
          <div className="flex flex-col bg-bg-yellow rounded-t-2xl">
            <div className="flex items-center gap-2 justify-between px-5 py-6">
              <Text
                modeColor={MODE_COLOR_TEXT.BLACK}
                modeSize={MODE_SIZE[24]}
                modeWeight={MODE_WEIGHT.LARGE}
              >
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </Text>
              <DivClick onClick={onClose}>
                <Text
                  modeColor={MODE_COLOR_TEXT.BLACK}
                  modeSize={MODE_SIZE[24]}
                >
                  ×
                </Text>
              </DivClick>
            </div>
          </div>
          {/* Wavy line outside the container */}
          <WavyLineIcon
            mode={MODE_WAVY_LINE.YELLOW}
            className="w-[927px] bottom-[-20px] h-10 absolute"
          />
        </div>

        {/* Content Container */}
        <div className="bg-bg-black-2 rounded-b-2xl w-full border border-bg-gray border-t-0">
          <div className="p-8 flex flex-col gap-6">
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-yellow focus:border-transparent text-white placeholder-gray-400"
                    placeholder="Nhập họ và tên"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-yellow focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Nhập email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-yellow focus:border-transparent text-white placeholder-gray-400 pr-12"
                    placeholder="Nhập mật khẩu"
                    required
                  />
                  <DivClick
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </DivClick>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-3 bg-bg-black border border-bg-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-bg-yellow focus:border-transparent text-white placeholder-gray-400 pr-12"
                      placeholder="Nhập lại mật khẩu"
                      required
                    />
                    <DivClick
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </DivClick>
                  </div>
                </div>
              )}
            </form>
            <Button mode={MODE_BUTTON.YELLOW} className="w-full" type="submit">
              <Text
                modeColor={MODE_COLOR_TEXT.BLACK}
                modeSize={MODE_SIZE[16]}
                modeWeight={MODE_WEIGHT.MEDIUM}
              >
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </Text>
            </Button>
            {/* Toggle between login and register */}
            <div className="text-center">
              <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[14]}>
                {isLogin ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
              </Text>
              <DivClick
                onClick={() => setIsLogin(!isLogin)}
                className="inline-block"
              >
                <Text
                  modeColor={MODE_COLOR_TEXT.YELLOW}
                  modeSize={MODE_SIZE[14]}
                  modeWeight={MODE_WEIGHT.MEDIUM}
                >
                  {isLogin ? "Đăng ký ngay" : "Đăng nhập"}
                </Text>
              </DivClick>
            </div>

            {isLogin && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-px bg-bg-gray"></div>
                  <Text
                    modeColor={MODE_COLOR_TEXT.GRAY}
                    modeSize={MODE_SIZE[14]}
                  >
                    hoặc
                  </Text>
                  <div className="flex-1 h-px bg-bg-gray"></div>
                </div>
                {/* Google Login Button */}
                <Button
                  mode={MODE_BUTTON.WHITE}
                  className="w-full py-4 flex items-center justify-center gap-3"
                  onClick={handleGoogleLogin}
                  icon={<GoogleIcon />}
                >
                  <Text
                    modeColor={MODE_COLOR_TEXT.BLACK}
                    modeSize={MODE_SIZE[16]}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                  >
                    Tiếp tục với Google
                  </Text>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
