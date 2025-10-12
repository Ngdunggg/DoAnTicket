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
import useVerifyOtpHandler from './hooks/useVerifyOtpHanlder';

const VerifyOtpPopup = () => {
    const {
        canResend,
        error,
        formatTime,
        handleBack,
        handleKeyDown,
        handleOtpChange,
        handlePaste,
        handleResendOtp,
        handleVerifyOtp,
        inputRefs,
        isOtpComplete,
        isVerifyOtpPopupOpen,
        loading,
        otp,
        setIsVerifyOtpPopupOpenStore,
        timeLeft,
    } = useVerifyOtpHandler();

    if (!isVerifyOtpPopupOpen) return null;

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
                                Xác thực OTP
                            </Text>
                            <DivClick
                                onClick={() => {
                                    setIsVerifyOtpPopupOpenStore(false);
                                }}
                            >
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
                    <div className="px-8 py-6 flex flex-col gap-8 mt-8">
                        {/* OTP Input */}
                        <div className="flex flex-col gap-4">
                            <Text
                                modeColor={MODE_COLOR_TEXT.WHITE}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                className="text-center"
                            >
                                Nhập mã OTP đã được gửi đến email của bạn
                            </Text>

                            {/* Countdown Timer */}
                            <div className="text-center">
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    Mã OTP sẽ hết hạn sau:
                                </Text>
                                <Text
                                    modeColor={MODE_COLOR_TEXT.YELLOW}
                                    modeSize={MODE_SIZE[16]}
                                    modeWeight={MODE_WEIGHT.MEDIUM}
                                    className="ml-1"
                                >
                                    {formatTime(timeLeft)}
                                </Text>
                            </div>

                            <div className="flex justify-center gap-3">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={e =>
                                            handleOtpChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={e => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:border-yellow-500 focus:outline-none transition-colors"
                                        style={{
                                            backgroundColor: digit
                                                ? '#fbbf24'
                                                : '#ffffff',
                                            borderColor: digit
                                                ? '#fbbf24'
                                                : '#d1d5db',
                                            color: '#000',
                                        }}
                                    />
                                ))}
                            </div>
                            {error && (
                                <Text
                                    modeColor={MODE_COLOR_TEXT.RED}
                                    className="text-center"
                                >
                                    {error}
                                </Text>
                            )}
                        </div>

                        {/* Verify Button */}
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            className="w-full"
                            onClick={handleVerifyOtp}
                            loading={loading}
                            disabled={!isOtpComplete}
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Xác nhận OTP
                            </Text>
                        </Button>

                        {/* Resend OTP */}
                        <div className="text-center">
                            {!canResend ? (
                                <Text
                                    modeColor={MODE_COLOR_TEXT.GRAY}
                                    modeSize={MODE_SIZE[14]}
                                >
                                    Không nhận được mã? Vui lòng đợi{' '}
                                    {formatTime(timeLeft)} để gửi lại
                                </Text>
                            ) : (
                                <>
                                    <Text
                                        modeColor={MODE_COLOR_TEXT.GRAY}
                                        modeSize={MODE_SIZE[14]}
                                    >
                                        Không nhận được mã?
                                    </Text>
                                    <DivClick
                                        className="inline-block ml-1"
                                        onClick={handleResendOtp}
                                    >
                                        <Text
                                            modeColor={MODE_COLOR_TEXT.YELLOW}
                                            modeSize={MODE_SIZE[14]}
                                            modeWeight={MODE_WEIGHT.MEDIUM}
                                        >
                                            Gửi lại
                                        </Text>
                                    </DivClick>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpPopup;
