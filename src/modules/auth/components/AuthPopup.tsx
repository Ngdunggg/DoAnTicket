import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import WavyLineIcon, {
    MODE_WAVY_LINE,
} from '@share/components/atoms/icons/WavyLineIcon';
import GoogleIcon from '@share/components/atoms/icons/GoogleIcon';
import InputValidate from '@share/components/molecules/InputValidate';
import { CreateAccountRequest } from '@share/models/auth/createAccount';
import { useAuthPopup } from './hooks/useAuthPopup';

const AuthPopup = () => {
    const {
        authForm,
        closeAuthPopup,
        handleLogin,
        handleLoginWithGoogle,
        handleNavigateToAdmin,
        handleRegister,
        isAdmin,
        isAuthPopupOpen,
        isLoading,
        isLogin,
        schemaCreateAccount,
        setIsAuthPopupOpenStore,
        setIsForgetPasswordPopupOpenStore,
        setIsLoginStore,
    } = useAuthPopup();

    const handleSubmit = authForm.handleSubmit(
        data => {
            // Form validation đã pass, xử lý logic
            if (isLogin) {
                handleLogin(data);
            } else {
                handleRegister(data as CreateAccountRequest);
            }
        },
        errors => {
            // Form validation failed
            console.log('Validation errors:', errors);
        }
    );

    const handleToggleMode = () => {
        setIsLoginStore(!isLogin);
        authForm.reset();
    };

    if (!isAuthPopupOpen) return null;

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
                                {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                            </Text>
                            <DivClick onClick={closeAuthPopup}>
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
                        className="w-[927px] bottom-[-18px] h-10 absolute"
                    />
                </div>

                {/* Content Container */}
                <div className="bg-bg-black-2 rounded-b-2xl w-full border border-bg-gray border-t-0">
                    <div className="px-8 py-4 flex flex-col gap-2">
                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <div className="flex flex-col gap-4">
                                {!isLogin && (
                                    <div className="flex flex-col gap-2">
                                        <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                            Họ và tên
                                        </Text>
                                        <InputValidate
                                            control={authForm.control}
                                            inputName={'full_name' as never}
                                            schema={schemaCreateAccount}
                                            placeholder="Nhập họ và tên"
                                        />
                                    </div>
                                )}

                                {!isLogin && (
                                    <div className="flex flex-col gap-2">
                                        <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                            Số điện thoại
                                        </Text>
                                        <InputValidate
                                            control={authForm.control}
                                            inputName={'phone' as never}
                                            schema={schemaCreateAccount}
                                            placeholder="Nhập số điện thoại"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col gap-2">
                                    <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                        Email
                                    </Text>
                                    <InputValidate
                                        control={authForm.control}
                                        inputName="email"
                                        schema={schemaCreateAccount}
                                        placeholder="Nhập email"
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                        Mật khẩu
                                    </Text>
                                    <InputValidate
                                        control={authForm.control}
                                        inputName="password"
                                        schema={schemaCreateAccount}
                                        placeholder="Nhập mật khẩu"
                                        isPassword
                                    />
                                </div>

                                {!isLogin && (
                                    <div className="flex flex-col gap-2">
                                        <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                            Xác nhận mật khẩu
                                        </Text>
                                        <InputValidate
                                            control={authForm.control}
                                            inputName={
                                                'password_confirm' as never
                                            }
                                            schema={schemaCreateAccount}
                                            placeholder="Nhập lại mật khẩu"
                                            isPassword
                                        />
                                    </div>
                                )}
                            </div>
                            {isLogin && (
                                <DivClick
                                    onClick={() => {
                                        setIsForgetPasswordPopupOpenStore(true);
                                        setIsAuthPopupOpenStore(false);
                                    }}
                                    className="flex flex-1 items-end justify-end"
                                >
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.YELLOW}
                                        modeWeight={MODE_WEIGHT.MEDIUM}
                                    >
                                        Quên mật khẩu
                                    </Text>
                                </DivClick>
                            )}
                            <Button
                                mode={MODE_BUTTON.YELLOW}
                                className="w-full"
                                loading={
                                    authForm.formState.isSubmitting || isLoading
                                }
                                type="submit"
                            >
                                <Text
                                    modeColor={MODE_COLOR_TEXT.BLACK}
                                    modeSize={MODE_SIZE[16]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {isLogin ? 'Đăng nhập' : 'Đăng ký'}
                                </Text>
                            </Button>
                        </form>
                        {/* Toggle between login and register */}
                        <div className="text-center">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY}
                                modeSize={MODE_SIZE[14]}
                            >
                                {isLogin
                                    ? 'Chưa có tài khoản? '
                                    : 'Đã có tài khoản? '}
                            </Text>
                            <DivClick
                                onClick={handleToggleMode}
                                className="inline-block"
                            >
                                <Text
                                    modeColor={MODE_COLOR_TEXT.YELLOW}
                                    modeSize={MODE_SIZE[14]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                >
                                    {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
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
                                    onClick={handleLoginWithGoogle}
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
            {isAdmin && (
                <div className="fixed inset-0 h-screen bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl border border-bg-gray flex flex-col items-center justify-center p-8 gap-6">
                        <Text>Bạn đã đăng nhập với tài khoản admin</Text>
                        <Text>Vui lòng đến trang để tiếp tục</Text>
                        <div className="flex items-center gap-4 mt-6">
                            <Button
                                mode={MODE_BUTTON.WHITE}
                                onClick={closeAuthPopup}
                            >
                                <Text>Đến trang home</Text>
                            </Button>
                            <Button
                                mode={MODE_BUTTON.YELLOW}
                                onClick={handleNavigateToAdmin}
                            >
                                <Text>Đến trang admin</Text>
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthPopup;
