/* eslint-disable @typescript-eslint/no-explicit-any */
import useAuthStoreSelector from '../../hooks/useAuthStoreSelector';
import useAuthStoreAction from '../../hooks/useAuthStoreAction';
import React, { useState, useRef, useEffect } from 'react';
import { authApi } from '@share/api/authApi';
import { RESULT_CODE } from '@share/constants/commons';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@configs/store';
import { setPreviousPopup } from '@share/auth/stores/authSlice';

const useVerifyOtpHandler = () => {
    const { emailVerify, isVerifyOtpPopupOpen } = useAuthStoreSelector();
    const {
        setIsAuthPopupOpenStore,
        setIsChangePasswordStore,
        setIsForgetPasswordPopupOpenStore,
        setIsLoginStore,
        setIsVerifyOtpPopupOpenStore,
    } = useAuthStoreAction();
    const { previousPopup } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState<number>(300); // 5 minutes = 300 seconds
    const [canResend, setCanResend] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleOtpChange = (index: number, value: string) => {
        // Chỉ cho phép nhập số
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Tự động chuyển sang ô tiếp theo khi nhập xong
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        // Xử lý phím Backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData('text')
            .replace(/\D/g, '')
            .slice(0, 6);
        const newOtp = [...otp];

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i];
        }

        setOtp(newOtp);

        // Focus vào ô cuối cùng được paste
        const focusIndex = Math.min(pastedData.length, 5);
        inputRefs.current[focusIndex]?.focus();
    };

    const handleVerifyOtp = async () => {
        setLoading(true);
        setError(''); // Clear previous errors
        const otpString = otp.join('');
        if (otpString.length === 6) {
            try {
                let data;

                if (previousPopup === 'forget_password') {
                    // Verify OTP cho forget password
                    data = await authApi.verifyPassword({
                        email: emailVerify,
                        otp: otpString,
                    });
                } else {
                    // Verify OTP cho register
                    data = await authApi.verifyOtp({
                        email: emailVerify,
                        otp: otpString,
                    });
                }

                if (data?.result.code === RESULT_CODE.SUCCESS) {
                    // Reset previous popup
                    dispatch(setPreviousPopup(null));
                    setIsAuthPopupOpenStore(true);
                    setIsLoginStore(true);
                    setIsVerifyOtpPopupOpenStore(false);
                    setIsChangePasswordStore(false);

                    if (previousPopup === 'forget_password') {
                        toast.success('Đặt lại mật khẩu thành công');
                    } else {
                        toast.success('Đăng ký thành công');
                    }
                } else {
                    setError(data?.result.error_msg_id || 'OTP không hợp lệ');
                }

                setLoading(false);
            } catch (error: any) {
                console.error('Verify OTP error:', error);
                setError(
                    error.response?.data?.result?.error_msg_id ||
                        'OTP không hợp lệ'
                );
                setLoading(false);
            }
        } else {
            setError('Vui lòng nhập đủ 6 số OTP');
            setLoading(false);
        }
    };

    const isOtpComplete = otp.every(digit => digit !== '');

    // Countdown timer effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    // Reset OTP when popup is closed
    useEffect(() => {
        if (!isVerifyOtpPopupOpen) {
            setOtp(['', '', '', '', '', '']);
            setTimeLeft(300);
            setCanResend(false);
            setError('');
            setLoading(false);
            // Reset previous popup khi popup đóng
            dispatch(setPreviousPopup(null));
        }
    }, [isVerifyOtpPopupOpen, dispatch]);

    // Format time as MM:SS
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleResendOtp = async () => {
        if (canResend) {
            setTimeLeft(300); // Reset to 5 minutes
            setCanResend(false);
            setOtp(['', '', '', '', '', '']); // Clear OTP inputs
            setError(''); // Clear previous errors
            try {
                await authApi.sendOtp({ email: emailVerify });
                toast.success('Mã OTP đã được gửi lại');
            } catch (error: any) {
                console.error('Resend OTP error:', error);
                setError(
                    error.response?.data?.result?.error_msg_id ||
                        'Gửi lại OTP thất bại'
                );
            }
        }
    };

    const handleBack = () => {
        setIsVerifyOtpPopupOpenStore(false);
        // Reset previous popup
        dispatch(setPreviousPopup(null));

        // Quay lại đúng trang dựa trên previous popup
        if (previousPopup === 'forget_password') {
            setIsForgetPasswordPopupOpenStore(true);
        } else {
            // Mặc định quay về auth popup
            setIsAuthPopupOpenStore(true);
        }
    };

    return {
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
        setIsAuthPopupOpenStore,
        setIsVerifyOtpPopupOpenStore,
        timeLeft,
    };
};

export default useVerifyOtpHandler;
