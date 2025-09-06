import Input, { IInputProps } from '@share/components/atoms/Input';
import { MAX_LENGTH_VALIDATE_ERROR_TYPE } from '@share/constants/commons';
import useFieldChangeWithMaxError from '@share/hooks/useFieldChangeWithMaxError';
import { useFocusInputOnMobile } from '@share/hooks/useFocusInputOnMobile';
import { isEmpty } from 'lodash';
import React, { RefObject, useEffect, useMemo } from 'react';
import { Control, Path, useController } from 'react-hook-form';
import { ZodObject, ZodRawShape, ZodString, z } from 'zod';
import InputPassword from '../atoms/InputPassword';

type Props<T extends ZodObject<ZodRawShape>> = {
    autoTrim?: boolean;
    clearErrors?: (_name?: Path<z.infer<T>>) => void;
    control: Control<z.infer<T>>;
    inputName: Path<z.infer<T>>;
    inputRef?: RefObject<HTMLInputElement | null>;
    isPassword?: boolean;
    schema: T;
    useCustomMaxError?: boolean;
    useCustomMaxLengthSchema?: ZodString;
} & Omit<IInputProps, 'onChange'>;

export default function InputValidate<T extends ZodObject<ZodRawShape>>({
    autoTrim = true,
    clearErrors,
    control,
    inputName,
    inputRef,
    isPassword = false,
    schema,
    useCustomMaxError = false,
    useCustomMaxLengthSchema,
    ...props
}: Props<T>) {
    const { handleInputOnChange, handleInputOnChangeExtend, maxError } =
        useFieldChangeWithMaxError(
            schema,
            inputName,
            useCustomMaxError,
            useCustomMaxLengthSchema
        );
    const { field, fieldState } = useController({
        control,
        name: inputName,
    });

    const { handleFocus, resolvedRef } = useFocusInputOnMobile(inputRef);

    const errorMessage = useMemo(
        () =>
            isEmpty(field.value)
                ? fieldState.error?.message
                : (maxError ?? fieldState.error?.message),
        [maxError, fieldState.error, inputName, field.value]
    );

    useEffect(() => {
        if (field.value && !useCustomMaxError) {
            handleInputOnChange(field.value, inputName);
            if (
                clearErrors &&
                fieldState.error?.type === MAX_LENGTH_VALIDATE_ERROR_TYPE
            ) {
                clearErrors(inputName);
            }
        }
    }, [
        field.value,
        inputName,
        clearErrors,
        fieldState.error,
        handleInputOnChange,
        useCustomMaxError,
    ]);

    /**
     * Use custom handle input onChange
     */
    useEffect(() => {
        if (field.value && useCustomMaxError) {
            handleInputOnChangeExtend(field.value);
            if (
                clearErrors &&
                fieldState.error?.type === MAX_LENGTH_VALIDATE_ERROR_TYPE
            ) {
                clearErrors(inputName);
            }
        }
    }, [
        field.value,
        inputName,
        clearErrors,
        fieldState.error,
        handleInputOnChangeExtend,
        useCustomMaxError,
    ]);

    // Helper function to trim value if autoTrim is enabled
    const getTrimmedValue = (
        value: string | null | undefined
    ): string | null | undefined => {
        if (autoTrim && typeof value === 'string') {
            return value.trim();
        }
        return value;
    };

    // Override onKeyDown to handle Enter key with trim
    const handleKeyDown =
        props.onKeyDown &&
        ((e: React.KeyboardEvent<HTMLInputElement>) => {
            if (autoTrim && e.key === 'Enter') {
                const trimmedValue = getTrimmedValue(field.value);
                if (trimmedValue !== field.value) {
                    field.onChange(trimmedValue);
                }
            }
            props.onKeyDown?.(e);
        });

    // Override onBlurIgnoreClearIcon to handle blur with trim
    const handleBlurIgnoreClearIcon =
        props.onBlurIgnoreClearIcon &&
        (() => {
            if (autoTrim) {
                const trimmedValue = getTrimmedValue(field.value);
                if (trimmedValue !== field.value) {
                    field.onChange(trimmedValue);
                }
            }
            props.onBlurIgnoreClearIcon?.();
        });

    // Override onClearInput to handle clear with trim
    const handleClearInput =
        props.onClearInput &&
        (() => {
            if (autoTrim) {
                field.onChange('');
            }
            if (resolvedRef?.current) {
                resolvedRef.current.focus();
            }
            props.onClearInput?.();
        });

    // Override onBlur to handle blur with trim
    const handleBlur =
        props.onBlur &&
        ((e: React.FocusEvent<HTMLInputElement>) => {
            if (autoTrim) {
                const trimmedValue = getTrimmedValue(field.value);
                if (trimmedValue !== field.value) {
                    field.onChange(trimmedValue);
                }
            }
            props.onBlur?.(e);
        });

    const overrideProps = {
        ...props,
        onBlur: handleBlur,
        onBlurIgnoreClearIcon: handleBlurIgnoreClearIcon,
        onClearInput: handleClearInput,
        onKeyDown: handleKeyDown,
    };

    if (isPassword) {
        return (
            <InputPassword
                {...field}
                ref={resolvedRef}
                error={errorMessage}
                {...overrideProps}
            />
        );
    }
    return (
        <Input
            {...field}
            ref={resolvedRef}
            onFocus={handleFocus}
            error={errorMessage}
            {...overrideProps}
        />
    );
}
