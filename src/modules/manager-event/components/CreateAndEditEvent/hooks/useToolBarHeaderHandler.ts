/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from '@tanstack/react-query';
import useCreateEventStoreAction from './useCreateEventStoreAction';
import useCreateEventStoreSelector from './useCreateEventStoreSelector';
import { organizerApi } from '@share/api/organizerApi';
import { CREATE_EVENT_TAB, RESULT_CODE } from '@share/constants/commons';
import { useAppSelector } from '@configs/store';
import { useEffect } from 'react';
import { categoriesApi, Category } from '@share/api/categoriesApi';
import { useFormContext } from 'react-hook-form';
import {
    convertToCreateEventRequest,
    CreateEventInput,
} from '@share/schemas/event/createEvent';
import useCreateEventMutation from '@modules/manager-event/hooks/useCreateEventMutation';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import useFetchEventList from '@modules/manager-event/hooks/useFetchEventList';
import { eventApi } from '@share/api/eventApi';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';

const useToolBarHeaderHandler = (eventId = '') => {
    const { activeTab, isEditMode, isLoading, isOpenCreateEvent } =
        useCreateEventStoreSelector();
    const {
        resetCreateEventStateStore,
        setActiveTabStore,
        setEventTypesStore,
        setIsLoadingStore,
        setIsOpenCreateEventStore,
        setOrganizerProfileStore,
    } = useCreateEventStoreAction();
    const userInfo = useAppSelector(state => state.user.user);
    const createEventForm = useFormContext<CreateEventInput>();
    const { refetch } = useFetchEventList();
    const navigate = useNavigate();

    const createEventMutation = useCreateEventMutation({
        onError: (error: AxiosError) => {
            toast.error(
                (error.response?.data as any).result.error_msg_id ||
                    'Có lỗi xảy ra khi tạo sự kiện'
            );
            setIsLoadingStore(false);
        },
        onSuccess: async () => {
            toast.success('Tạo sự kiện thành công!');
            navigate(SCREEN_PATH.MANAGER_EVENT);
            resetCreateEventStateStore();
            setIsOpenCreateEventStore(false);
            await refetchOrganizerProfile();
            await refetch();
            setIsLoadingStore(false);
        },
    });

    const updateEventMutation = useMutation({
        mutationFn: async (data: any) => {
            if (!eventId) throw new Error('Event ID is required');
            return await eventApi.updateEvent(eventId, data);
        },
        onError: (error: AxiosError) => {
            toast.error(
                (error.response?.data as any).result.error_msg_id ||
                    'Có lỗi xảy ra khi cập nhật sự kiện'
            );
            setIsLoadingStore(false);
        },
        onSuccess: async () => {
            toast.success('Cập nhật sự kiện thành công!');
            navigate(SCREEN_PATH.MANAGER_EVENT);
            await refetchOrganizerProfile();
            await refetch();
            setIsLoadingStore(false);
        },
    });

    const handleCreateEvent = async () => {
        if (activeTab === CREATE_EVENT_TAB.INFO) {
            // Validate InfoEventSection - chỉ validate các field bắt buộc
            // Note: Tickets sync is handled by InfoEventSection's useEffect
            // which syncs ticketTypes to form automatically
            const isOnline = createEventForm.watch('is_online');

            let isInfoValid: boolean;
            if (!isOnline) {
                // Validate với location fields khi sự kiện offline
                isInfoValid = await createEventForm.trigger([
                    'title',
                    'description',
                    'category_id',
                    'start_time',
                    'end_time',
                    'is_online',
                    'location',
                    'city',
                    'district',
                    'ward',
                    'street_address',
                    'images',
                    'tickets',
                ] as const);
            } else {
                // Validate không có location fields khi sự kiện online
                isInfoValid = await createEventForm.trigger([
                    'title',
                    'description',
                    'category_id',
                    'start_time',
                    'end_time',
                    'is_online',
                    'images',
                    'tickets',
                ] as const);
            }

            if (isInfoValid) {
                setActiveTabStore(CREATE_EVENT_TAB.PAYMENT);
            } else {
                toast.error('Vui lòng kiểm tra lại thông tin sự kiện');
            }
        } else if (activeTab === CREATE_EVENT_TAB.PAYMENT) {
            // Validate PaymentSection - chỉ validate các field bắt buộc
            const isPaymentValid = await createEventForm.trigger([
                'organization_name',
                'logo_data',
                'full_name',
                'contact_email',
                'contact_phone',
                'account_holder_name',
                'account_number',
                'bank_name',
                'payment_method',
            ] as const);

            if (isPaymentValid) {
                setActiveTabStore(CREATE_EVENT_TAB.PREVIEW);
            } else {
                toast.error('Vui lòng kiểm tra lại thông tin thanh toán');
            }
        } else if (activeTab === CREATE_EVENT_TAB.PREVIEW) {
            setIsLoadingStore(true);
            const isOnline = createEventForm.watch('is_online');
            // Nếu sự kiện online: clear các trường location để tránh bị validate
            if (isOnline) {
                createEventForm.setValue('city', undefined as any, {
                    shouldValidate: false,
                });
                createEventForm.setValue('district', undefined as any, {
                    shouldValidate: false,
                });
                createEventForm.setValue('ward', undefined as any, {
                    shouldValidate: false,
                });
                createEventForm.setValue('street_address', undefined as any, {
                    shouldValidate: false,
                });
                createEventForm.setValue('location', undefined as any, {
                    shouldValidate: false,
                });
            }
            // Validate toàn bộ form và tạo sự kiện
            const isFormValid = await createEventForm.trigger();

            // Validate logo: phải có logo_data hoặc logo_url
            const logoData = createEventForm.watch('logo_data');
            const logoUrl = createEventForm.watch('logo_url');
            if (!logoData && !logoUrl) {
                toast.error('Logo ban tổ chức là bắt buộc');
                setIsLoadingStore(false);
                return;
            }

            if (isFormValid) {
                // Sử dụng watch() để lấy data thay vì getValues()
                const isOnline = createEventForm.watch('is_online');
                const formData = {
                    account_holder_name: createEventForm.watch(
                        'account_holder_name'
                    ),
                    account_number: createEventForm.watch('account_number'),
                    bank_branch: createEventForm.watch('bank_branch'),
                    bank_name: createEventForm.watch('bank_name'),
                    category_id: createEventForm.watch('category_id'),
                    contact_email: createEventForm.watch('contact_email'),
                    contact_phone: createEventForm.watch('contact_phone'),
                    description: createEventForm.watch('description'),
                    description_organization: createEventForm.watch(
                        'description_organization'
                    ),
                    end_time: createEventForm.watch('end_time'),
                    full_name: createEventForm.watch('full_name'),
                    images: createEventForm.watch('images'),
                    is_online: isOnline,
                    logo_data: createEventForm.watch('logo_data'),
                    logo_url: createEventForm.watch('logo_url'),
                    organization_name:
                        createEventForm.watch('organization_name'),
                    payment_method: createEventForm.watch('payment_method'),
                    start_time: createEventForm.watch('start_time'),
                    tickets: createEventForm.watch('tickets'),
                    title: createEventForm.watch('title'),
                    website: createEventForm.watch('website'),
                    // Chỉ thêm location khi sự kiện offline
                    ...(isOnline
                        ? {}
                        : {
                              city: createEventForm.watch('city'),
                              district: createEventForm.watch('district'),
                              location: createEventForm.watch('location'),
                              street_address:
                                  createEventForm.watch('street_address'),
                              ward: createEventForm.watch('ward'),
                          }),
                };
                console.log(formData);

                try {
                    const requestData =
                        await convertToCreateEventRequest(formData);
                    if (isEditMode) {
                        await updateEventMutation.mutateAsync(requestData);
                    } else {
                        await createEventMutation.mutateAsync(requestData);
                    }
                } catch (error) {
                    console.error(
                        'Error uploading images or converting form data:',
                        error
                    );
                    toast.error(
                        'Có lỗi xảy ra khi upload ảnh hoặc xử lý dữ liệu'
                    );
                } finally {
                    setIsLoadingStore(false);
                }
            } else {
                toast.error('Vui lòng kiểm tra lại tất cả thông tin');
                setIsLoadingStore(false);
            }
        }
    };

    const { data: eventTypes } = useQuery<Category[] | null>({
        enabled: true,
        queryFn: async () => {
            const response = await categoriesApi.getAllEventTypes();
            if (response.result.code === RESULT_CODE.SUCCESS) {
                return response.data;
            }
            return null;
        },
        queryKey: ['event-types'],
    });

    const { data: organizerProfile, refetch: refetchOrganizerProfile } =
        useQuery({
            enabled: !!userInfo?.id,
            queryFn: async () => {
                const response = await organizerApi.getOrganizerProfile(
                    userInfo?.id || ''
                );
                if (response.result.code === RESULT_CODE.SUCCESS) {
                    return response.data;
                }
                return null;
            },
            queryKey: ['organizer-profile', userInfo?.id],
        });

    useEffect(() => {
        setOrganizerProfileStore(organizerProfile ?? null);
        setEventTypesStore(eventTypes ?? null);
    }, [organizerProfile, eventTypes]);

    return {
        activeTab,
        handleCreateEvent,
        isEditMode,
        isLoading,
        isOpenCreateEvent,
        setActiveTabStore,
        setIsOpenCreateEventStore,
    };
};

export default useToolBarHeaderHandler;
