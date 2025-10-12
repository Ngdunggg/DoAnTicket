/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import useAuthStoreAction from '../../hooks/useAuthStoreAction';
import useAuthStoreSelector from '../../hooks/useAuthStoreSelector';
import { validateMaxLength } from '@share/utils/zodUtils';
import { EMAIL_REGEX } from '@share/constants/regax';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useAppDispatch } from '@configs/store';
import { setPreviousPopup } from '@share/auth/stores/authSlice';
import { authApi } from '@share/api/authApi';
import { RESULT_CODE } from '@share/constants/commons';

const useForgetPasswordHandler = () => {
    const {
        setEmailVerifyStore,
        setIsAuthPopupOpenStore,
        setIsChangePasswordStore,
        setIsForgetPasswordPopupOpenStore,
        setIsVerifyOtpPopupOpenStore,
    } = useAuthStoreAction();
    const { isChangePassword, isForgetPasswordPopupOpen } =
        useAuthStoreSelector();
    const dispatch = useAppDispatch();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const schemaEmail = z.object({
        email: validateMaxLength('Email không quá 128 ký tự', 128)
            .min(1, { message: 'Email không được để trống' })
            .refine(email => EMAIL_REGEX.test(email), {
                message: 'Email không hợp lệ',
            }),
    });

    const schemaForgetPassword = z
        .object({
            password: z
                .string()
                .min(1, { message: 'Mật khẩu không được để trống' }),
            password_confirm: z
                .string()
                .min(1, { message: 'Mật khẩu xác nhận không được để trống' }),
        })
        .refine(data => data.password === data.password_confirm, {
            message: 'Mật khẩu xác nhận không khớp',
            path: ['password_confirm'],
        });

    const forgetPasswordFormEmail = useForm<z.infer<typeof schemaEmail>>({
        defaultValues: {
            email: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(schemaEmail),
        reValidateMode: 'onSubmit',
    });

    const forgetPasswordForm = useForm<z.infer<typeof schemaForgetPassword>>({
        defaultValues: {
            password: '',
            password_confirm: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(schemaForgetPassword),
        reValidateMode: 'onSubmit',
    });

    // Lấy ZodObject từ ZodEffects để InputValidate có thể sử dụng
    const schemaForgetPasswordForInput =
        'innerType' in schemaForgetPassword
            ? schemaForgetPassword.innerType()
            : schemaForgetPassword;

    const handleClose = () => {
        setIsForgetPasswordPopupOpenStore(false);
        forgetPasswordFormEmail.reset();
        setError(''); // Clear error when closing
    };

    const handleBack = () => {
        if (isChangePassword) {
            setIsChangePasswordStore(false);
            setError(''); // Clear error when going back
        } else {
            setIsVerifyOtpPopupOpenStore(false);
            setIsAuthPopupOpenStore(true);
            setIsForgetPasswordPopupOpenStore(false);
            forgetPasswordFormEmail.reset();
            setError(''); // Clear error when going back
        }
    };

    const handleCheckEmail = async (data: string) => {
        try {
            setLoading(true);
            setError('');
            const response = await authApi.checkEmail({ email: data });
            if (response?.result.code !== RESULT_CODE.SUCCESS) {
                setError(
                    response?.result.error_msg_id || 'Email không tồn tại'
                );
            } else {
                setEmailVerifyStore(data);
                setIsChangePasswordStore(true);
            }
        } catch (error: any) {
            console.error('Check email error:', error);
            setError(
                error.response?.data?.result?.error_msg_id ||
                    'Email không tồn tại'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (email: string, password: string) => {
        try {
            setLoading(true);
            setError('');
            const response = await authApi.changePassword({
                email: email,
                password: password,
            });
            if (response?.result.code !== RESULT_CODE.SUCCESS) {
                setError(
                    response?.result.error_msg_id || 'Mật khẩu không tồn tại'
                );
            } else {
                // Set previous popup để biết quay lại từ đâu
                dispatch(setPreviousPopup('forget_password'));
                setIsVerifyOtpPopupOpenStore(true);
                setIsForgetPasswordPopupOpenStore(false);
            }
        } catch (error: any) {
            console.error('Check password error:', error);
            setError(
                error.response?.data?.result?.error_msg_id ||
                    'Mật khẩu không hợp lệ'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (!isChangePassword) {
            handleCheckEmail(forgetPasswordFormEmail.getValues('email'));
        } else {
            forgetPasswordForm.handleSubmit(data => {
                handleChangePassword(
                    forgetPasswordFormEmail.getValues('email'),
                    data.password
                );
            })();
        }
    };
    return {
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
        schemaForgetPassword,
        schemaForgetPasswordForInput,
        setIsAuthPopupOpenStore,
        setIsChangePasswordStore,
        setIsForgetPasswordPopupOpenStore,
    };
};

export default useForgetPasswordHandler;
