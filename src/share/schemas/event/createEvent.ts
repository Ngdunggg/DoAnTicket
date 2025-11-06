import { z } from 'zod';
import { validateMaxLength } from '@share/utils/zodUtils';
import { IMAGE_TYPE, TICKET_STATUS } from '@share/constants/commons';
import { CreateEventRequest } from '@share/models/event/createEvent';
import { PAYMENT_METHOD } from '@share/constants/paymentMethod';

/**
 * Schema validation cho create event form
 */
export const createEventSchema = () =>
    z.object({
        account_holder_name: validateMaxLength(
            'Tên chủ tài khoản không quá 100 ký tự',
            100
        )
            .min(1, { message: 'Tên chủ tài khoản là bắt buộc' })
            .min(2, { message: 'Tên chủ tài khoản phải có ít nhất 2 ký tự' }),

        account_number: validateMaxLength('Số tài khoản không quá 20 ký tự', 20)
            .min(1, { message: 'Số tài khoản là bắt buộc' })
            .min(8, { message: 'Số tài khoản phải có ít nhất 8 ký tự' }),

        bank_branch: validateMaxLength(
            'Chi nhánh không quá 100 ký tự',
            100
        ).optional(),

        bank_name: validateMaxLength('Tên ngân hàng không quá 100 ký tự', 100)
            .min(1, { message: 'Tên ngân hàng là bắt buộc' })
            .min(2, { message: 'Tên ngân hàng phải có ít nhất 2 ký tự' }),

        category_id: z
            .string()
            .min(1, { message: 'Thể loại sự kiện là bắt buộc' })
            .refine(
                value => {
                    // Kiểm tra nếu có dấu phẩy thì split và validate từng phần
                    if (value.includes(',')) {
                        const categories = value
                            .split(',')
                            .map(cat => cat.trim());
                        return categories.every(cat => cat.length >= 2);
                    }
                    // Nếu không có dấu phẩy thì validate như string đơn
                    return value.length >= 2;
                },
                { message: 'Mỗi thể loại sự kiện phải có ít nhất 2 ký tự' }
            ),

        city: validateMaxLength('Tỉnh/Thành không quá 100 ký tự', 100)
            .min(2, { message: 'Tỉnh/Thành phải có ít nhất 2 ký tự' })
            .optional(),

        contact_email: z
            .string()
            .min(1, { message: 'Email liên hệ là bắt buộc' })
            .email({ message: 'Email không hợp lệ' }),

        contact_phone: validateMaxLength('Số điện thoại không quá 15 ký tự', 15)
            .min(1, { message: 'Số điện thoại là bắt buộc' })
            .min(10, { message: 'Số điện thoại phải có ít nhất 10 ký tự' }),

        description: z
            .string()
            .min(1, { message: 'Mô tả sự kiện là bắt buộc' })
            .min(10, { message: 'Mô tả sự kiện phải có ít nhất 10 ký tự' }),

        description_organization: z
            .string()
            .min(10, { message: 'Mô tả ban tổ chức phải có ít nhất 10 ký tự' }),

        district: validateMaxLength(
            'Quận/Huyện không quá 100 ký tự',
            100
        ).optional(),

        end_time: z
            .string()
            .min(1, { message: 'Thời gian kết thúc là bắt buộc' }),

        full_name: validateMaxLength('Họ và tên không quá 100 ký tự', 100)
            .min(1, { message: 'Họ và tên là bắt buộc' })
            .min(2, { message: 'Họ và tên phải có ít nhất 2 ký tự' }),

        images: z
            .array(
                z.object({
                    description: z.string().optional(),
                    filename: z.string().optional(),
                    image_data: z
                        .instanceof(File)
                        .refine(file => file instanceof File, {
                            message: 'Dữ liệu hình ảnh phải là một file',
                        }),
                    image_type: z.enum([IMAGE_TYPE.BANNER, IMAGE_TYPE.CARD], {
                        required_error: 'Loại hình ảnh là bắt buộc',
                    }),
                })
            )
            .min(1, { message: 'Ít nhất một hình ảnh là bắt buộc' }),

        is_online: z.boolean({
            required_error: 'Vui lòng chọn loại sự kiện',
        }),

        location: validateMaxLength('Địa điểm không quá 200 ký tự', 200)
            .min(5, { message: 'Địa điểm phải có ít nhất 5 ký tự' })
            .optional(),

        logo_data: z.instanceof(File).optional(),
        logo_url: z.string().optional(),
        organization_name: validateMaxLength(
            'Tên ban tổ chức không quá 200 ký tự',
            200
        )
            .min(1, { message: 'Tên ban tổ chức là bắt buộc' })
            .min(2, { message: 'Tên ban tổ chức phải có ít nhất 2 ký tự' }),

        payment_method: z.enum(
            [PAYMENT_METHOD.VNPAY, PAYMENT_METHOD.MOMO, PAYMENT_METHOD.ZALOPAY],
            {
                required_error: 'Phương thức thanh toán là bắt buộc',
            }
        ),

        start_time: z
            .string()
            .min(1, { message: 'Thời gian bắt đầu là bắt buộc' }),

        street_address: validateMaxLength(
            'Số nhà, đường không quá 200 ký tự',
            200
        )
            .min(5, { message: 'Số nhà, đường là bắt buộc' })
            .optional(),

        tickets: z
            .array(
                z.object({
                    description: z.string().optional(),
                    initial_quantity: z.coerce
                        .number({ required_error: 'Số lượng vé là bắt buộc' })
                        .min(1, { message: 'Số lượng vé phải lớn hơn 0' })
                        .max(10000, {
                            message: 'Số lượng vé không được vượt quá 10000',
                        }),
                    name: validateMaxLength(
                        'Tên loại vé không quá 100 ký tự',
                        100
                    )
                        .min(1, { message: 'Tên loại vé là bắt buộc' })
                        .min(2, {
                            message: 'Tên loại vé phải có ít nhất 2 ký tự',
                        }),
                    price: z.coerce
                        .number({ required_error: 'Giá vé là bắt buộc' })
                        .min(0, { message: 'Giá vé phải lớn hơn hoặc bằng 0' }),
                    status: z.enum(
                        [
                            TICKET_STATUS.ACTIVE,
                            TICKET_STATUS.HIDDEN,
                            TICKET_STATUS.SOLD_OUT,
                        ],
                        {
                            required_error: 'Trạng thái vé là bắt buộc',
                        }
                    ),
                })
            )
            .min(1, { message: 'Ít nhất một loại vé là bắt buộc' }),

        title: validateMaxLength('Tiêu đề sự kiện không quá 200 ký tự', 200)
            .min(1, { message: 'Tiêu đề sự kiện là bắt buộc' })
            .min(5, { message: 'Tiêu đề sự kiện phải có ít nhất 5 ký tự' }),

        ward: validateMaxLength(
            'Phường/Xã không quá 100 ký tự',
            100
        ).optional(),

        website: z.string().optional(),
    });

/**
 * Type cho create event input
 */
export type CreateEventInput = z.infer<ReturnType<typeof createEventSchema>>;

import { uploadFile } from '@share/hooks/cloudinaryUploader';

/**
 * Convert form data to CreateEventRequest format
 */
export const convertToCreateEventRequest = async (
    formData: CreateEventInput
): Promise<CreateEventRequest> => {
    // Upload images to Cloudinary first
    const uploadedImages = await Promise.all(
        formData.images.map(async image => {
            if (image.image_data instanceof File) {
                const uploadedUrl = await uploadFile(
                    image.image_data as unknown as File
                );
                return {
                    image_type: image.image_type,
                    image_url: uploadedUrl,
                };
            }
            return {
                image_type: image.image_type,
                image_url: image.image_data,
            };
        })
    );

    // Upload logo to Cloudinary if it's a File, otherwise use logo_url if provided
    let uploadedLogoUrl: string;
    if (formData.logo_data instanceof File && formData.logo_data.size > 0) {
        // Upload file mới nếu có
        uploadedLogoUrl = await uploadFile(
            formData.logo_data as unknown as File
        );
    } else if (formData.logo_url) {
        // Use existing logo_url if no new file uploaded
        uploadedLogoUrl = formData.logo_url;
    } else {
        // Fallback: throw error nếu không có logo
        throw new Error('Logo is required');
    }

    // Build location only for offline events
    const locationParts = [
        formData.location,
        formData.city,
        formData.district,
        formData.ward,
        formData.street_address,
    ].filter(part => !!part && String(part).trim() !== '');
    const locationString = locationParts.join(' ').trim();

    return {
        category_id: formData.category_id
            .split(',')
            .map(id => id.trim())
            .filter(id => id !== ''), // Convert comma-separated string to array of strings
        description: formData.description,
        end_time: new Date(formData.end_time),
        event_dates: [{
            end_at: new Date(formData.end_time),
            start_at: new Date(formData.start_time)
        }], 
        images: uploadedImages, // Cloudinary URLs
        is_online: formData.is_online,
        ...(formData.is_online
            ? {}
            : locationString
            ? { location: locationString }
            : {}),
        organizer_profile: {
            contact_email: formData.contact_email,
            contact_phone: formData.contact_phone,
            description_organization: formData.description_organization,
            full_name: formData.full_name,
            logo_url: uploadedLogoUrl, // Cloudinary URL
            organization_name: formData.organization_name,
            website: formData.website,
        },
        payment_method: {
            account_holder_name: formData.account_holder_name,
            account_number: formData.account_number,
            bank_branch: formData.bank_branch,
            bank_name: formData.bank_name,
            payment_method: formData.payment_method,
        },
        start_time: new Date(formData.start_time),
        tickets: formData.tickets,
        title: formData.title,
    };
};
