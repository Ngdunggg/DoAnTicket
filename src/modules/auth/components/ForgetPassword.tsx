import DivClick from '@share/components/atoms/DivClick';
import WavyLineIcon, {
    MODE_WAVY_LINE,
} from '@share/components/atoms/icons/WavyLineIcon';
import {
    Text,
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import BackIcon from '@share/components/atoms/icons/BackIcon';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import InputValidate from '@share/components/molecules/InputValidate';
import useForgetPasswordHandler from './hooks/useForgetPasswordHandler';

const ForgetPassword = () => {
    const {
        error,
        forgetPasswordForm,
        forgetPasswordFormEmail,
        handleBack,
        handleClose,
        handleSubmit,
        isChangePassword,
        isForgetPasswordPopupOpen,
        loading,
        schemaEmail,
        schemaForgetPasswordForInput,
    } = useForgetPasswordHandler();
    if (!isForgetPasswordPopupOpen) return null;

    return (
        <div className="fixed inset-0 h-screen bg-black/70 flex items-center justify-center z-50">
            <div className="w-full max-w-[450px] flex flex-col items-center flex-1">
                {/* Header Container */}
                <div className="bg-bg-black-2 rounded-t-2xl w-full border border-bg-gray relative">
                    <div className="flex flex-col bg-bg-yellow rounded-t-2xl">
                        <div className="flex items-center gap-2 justify-between px-5 py-6">
                            <DivClick onClick={handleBack}>
                                <BackIcon size={24} />
                            </DivClick>
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[24]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                Đặt lại mật khẩu
                            </Text>
                            <DivClick onClick={handleClose}>
                                <XCircleIcon
                                    size={24}
                                    mode={MODE_X_CIRCLE_ICON.BLACK}
                                />
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
                    <div className="px-8 py-6 flex flex-col gap-4 mt-8">
                        {/* OTP Input */}
                        {!isChangePassword ? (
                            <div className="flex flex-col gap-4">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.WHITE}
                                    modeSize={MODE_SIZE[16]}
                                    modeWeight={MODE_WEIGHT.LARGE}
                                >
                                    Nhập email
                                </Text>
                                <InputValidate
                                    control={forgetPasswordFormEmail.control}
                                    inputName="email"
                                    schema={schemaEmail}
                                    placeholder="Nhập email"
                                    modeSize={MODE_SIZE[16]}
                                    className="w-full"
                                />
                            </div>
                        ) : (
                            <>
                                <div className="flex flex-col gap-4">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeSize={MODE_SIZE[16]}
                                        modeWeight={MODE_WEIGHT.LARGE}
                                    >
                                        Nhập mật khẩu
                                    </Text>
                                    <InputValidate
                                        control={forgetPasswordForm.control}
                                        inputName="password"
                                        schema={schemaForgetPasswordForInput}
                                        placeholder="Nhập mật khẩu"
                                        modeSize={MODE_SIZE[16]}
                                        className="w-full"
                                    />
                                </div>

                                <div className="flex flex-col gap-4">
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.WHITE}
                                        modeSize={MODE_SIZE[16]}
                                        modeWeight={MODE_WEIGHT.LARGE}
                                    >
                                        Nhập lại mật khẩu
                                    </Text>
                                    <InputValidate
                                        control={forgetPasswordForm.control}
                                        inputName="password_confirm"
                                        schema={schemaForgetPasswordForInput}
                                        placeholder="Nhập lại mật khẩu"
                                        modeSize={MODE_SIZE[16]}
                                        className="w-full"
                                    />
                                </div>
                            </>
                        )}
                        {error && (
                            <Text
                                modeColor={MODE_COLOR_TEXT.RED}
                                className="text-center"
                            >
                                {error}
                            </Text>
                        )}
                        {/* Verify Button */}
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            className="w-full"
                            onClick={handleSubmit}
                            loading={loading}
                            disabled={loading}
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.LARGE}
                            >
                                {!isChangePassword ? 'Gửi' : 'Đặt lại mật khẩu'}
                            </Text>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
