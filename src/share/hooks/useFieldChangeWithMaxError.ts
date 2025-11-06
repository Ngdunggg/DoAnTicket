/* eslint-disable no-unused-vars */
import { MAX_LENGTH_VALIDATE_ERROR_TYPE } from '@share/constants/commons';
import { useCallback, useRef, useState } from 'react';
import { Path } from 'react-hook-form';
import {
    z,
    ZodArray,
    ZodCatch,
    ZodDefault,
    ZodEffects,
    ZodNullable,
    ZodObject,
    ZodOptional,
    ZodPipeline,
    ZodRawShape,
    ZodString,
    ZodTypeAny,
} from 'zod';

/**
 * Get current schema type or innerType for some specifies type
 * @param schema
 * @returns
 */
function unwrap(schema: ZodTypeAny): ZodTypeAny {
    let current = schema;
    while (
        current instanceof ZodOptional ||
        current instanceof ZodNullable ||
        current instanceof ZodDefault ||
        current instanceof ZodCatch ||
        current instanceof ZodEffects ||
        current instanceof ZodPipeline
    ) {
        if (current instanceof ZodEffects) {
            current = current._def.schema;
        } else if (current instanceof ZodPipeline) {
            current = current._def.out;
        } else {
            current = current._def.innerType;
        }
    }
    return current;
}

/**
 * Get deep schema from base schema
 * Example: 
    const schema = z.object({
    sections: z
        .array(
        z.object({
            title: z.array(
            z.object({
                other: z.string()
            })
            )
        })
        )
        .default([])
    });

    const result = deepGetSchema(schema, "sections.0.title.1.other");
 * @param schema Base schema
 * @param path Input name
 * @param separator split separator input name
 * @returns 
 */
function deepGetSchema(
    schema: ZodTypeAny,
    path: string | string[],
    separator = '.'
): ZodTypeAny {
    if (!schema) throw new Error('Required base schema');
    const keys = Array.isArray(path) ? path : path.split(separator);
    let current: ZodTypeAny = schema;

    for (const key of keys) {
        current = unwrap(current);

        if (current instanceof ZodObject) {
            current = current.shape[key];
        } else if (current instanceof ZodArray) {
            if (/^\d+$/.test(key)) {
                current = current.element;
            } else {
                throw new Error(`Expected array index but got "${key}"`);
            }
        } else {
            throw new Error(
                `Cannot go deeper at "${key}", type is ${current._def?.typeName}`
            );
        }

        if (!current) throw new Error(`Key "${key}" not found`);
    }

    return current;
}

/**
 * Custom hook that handles field changes and tracks the maximum error.
 *
 * @template T - The shape of the base schema.
 * @param {ZodObject<T>} baseSchema - The base schema object.
 * @returns {Object} - An object containing the handleInputOnChange function and the maxError state.
 */
export default function useFieldChangeWithMaxError<T extends ZodRawShape>(
    baseSchema: ZodObject<T>,
    inputName?: Path<z.infer<ZodObject<T>>>,
    useCustomMaxError = false,
    useCustomMaxLengthSchema?: ZodString
) {
    const [maxError, setMaxError] = useState<string | null>(null);
    const innerMaxValidateSchemaRef = useRef<z.ZodTypeAny | null | undefined>(
        null
    );

    if (
        useCustomMaxError &&
        inputName &&
        baseSchema &&
        !useCustomMaxLengthSchema &&
        innerMaxValidateSchemaRef.current === null
    ) {
        try {
            innerMaxValidateSchemaRef.current = deepGetSchema(
                baseSchema,
                inputName
            );
        } catch (error) {
            innerMaxValidateSchemaRef.current = undefined;
        }
    }

    /**
     * set result max error
     */
    const setMaxErrorFn = useCallback(
        (value: unknown, maxSchema?: ZodTypeAny | null) => {
            if (maxSchema) {
                const fieldState = maxSchema.safeParse(value);

                setMaxError(
                    fieldState.success === false &&
                        fieldState.error.issues[0].code ===
                            MAX_LENGTH_VALIDATE_ERROR_TYPE
                        ? (fieldState.error.issues[0].message ?? null)
                        : null
                );
            }
        },
        []
    );

    /**
     * default handle input onChange
     */
    const handleInputOnChange = useCallback(
        <K extends keyof T>(value: z.infer<T[K]>, inputName: K) => {
            // Unwrap schema để lấy shape thực sự (xử lý trường hợp có superRefine)
            const unwrappedSchema = unwrap(baseSchema);
            if (unwrappedSchema instanceof ZodObject && unwrappedSchema.shape) {
                const fieldSchema = unwrappedSchema.shape[inputName] as ZodTypeAny;
                setMaxErrorFn(value, fieldSchema);
            }
        },
        [baseSchema, setMaxErrorFn]
    );

    /**
     * handle input onChange use custom get deep schema for max error
     */
    const handleInputOnChangeExtend = useCallback(
        <K extends keyof T>(value: z.infer<T[K]>) => {
            const schema =
                useCustomMaxLengthSchema ?? innerMaxValidateSchemaRef.current;
            setMaxErrorFn(value, schema);
        },
        [setMaxErrorFn]
    );

    return { handleInputOnChange, handleInputOnChangeExtend, maxError };
}
