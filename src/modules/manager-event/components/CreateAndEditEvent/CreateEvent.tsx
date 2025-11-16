import useCreateEventHandler from './hooks/useToolBarHeaderHandler';
import ToolBarHeader from './ToolBarHeader';
import InfoEventSection from './InfoEventSection';
import { CREATE_EVENT_TAB } from '@share/constants/commons';
import PaymentSection from './PaymentSection';
import PreviewSection from './PreviewSection';
import { FormProvider } from 'react-hook-form';
import useCreateEventForm from './hooks/useCreateEventForm';
import useGetOrganizerProfile from '@modules/event-detail/components/DetailEvent/hooks/useGetOrganizerProfile';
import { useAppSelector } from '@configs/store';
import { useEffect, useRef } from 'react';
import useCreateEventStoreAction from './hooks/useCreateEventStoreAction';
import { useLocation } from 'react-router-dom';
import { getCurrentEventId } from '@share/utils/path';
import { format } from 'date-fns';
import { DATE_TIME_FORMAT_ISO } from '@share/constants/dateTime';
import { TICKET_STATUS } from '@share/constants/commons';
import useEventListStoreSelector from '../EventList/hooks/useEventListStoreSelector';

const CreateEvent = () => {
    const location = useLocation();
    const eventId = getCurrentEventId(location.pathname);
    const { activeTab, isEditMode } = useCreateEventHandler(eventId || '');
    const createEventForm = useCreateEventForm();
    const userInfo = useAppSelector(state => state.user.user);
    const { setActiveTabStore, setOrganizerProfileStore } =
        useCreateEventStoreAction();
    const { allEventsByOrganizer } = useEventListStoreSelector();
    const { data: organizerProfile } = useGetOrganizerProfile(
        userInfo?.id || ''
    );

    const event = allEventsByOrganizer.find(event => event.id === eventId);
    const hasResetTabRef = useRef(false);
    const previousPathRef = useRef(location.pathname);
    const hasPopulatedFormRef = useRef(false);
    const previousEventIdRef = useRef<string | null>(null);

    const previousIsEditModeRef = useRef<boolean | null>(null);

    // Reset form when switching from edit mode to create mode
    useEffect(() => {
        // If switching from edit mode to create mode, reset only event info fields
        if (previousIsEditModeRef.current === true && !isEditMode) {
            // Save payment and organizer info before reset
            const currentValues = createEventForm.getValues();
            const paymentInfo = {
                account_holder_name: currentValues.account_holder_name,
                account_number: currentValues.account_number,
                bank_branch: currentValues.bank_branch,
                bank_name: currentValues.bank_name,
                payment_method: currentValues.payment_method,
            };
            const organizerInfo = {
                contact_email: currentValues.contact_email,
                contact_phone: currentValues.contact_phone,
                description_organization:
                    currentValues.description_organization,
                full_name: currentValues.full_name,
                logo_url: currentValues.logo_url,
                organization_name: currentValues.organization_name,
                website: currentValues.website,
            };

            // Reset form to default values
            createEventForm.reset();

            // Restore payment and organizer info
            const setValueOptions = { shouldDirty: false, shouldTouch: false };
            if (paymentInfo.account_holder_name) {
                createEventForm.setValue(
                    'account_holder_name',
                    paymentInfo.account_holder_name,
                    setValueOptions
                );
            }
            if (paymentInfo.account_number) {
                createEventForm.setValue(
                    'account_number',
                    paymentInfo.account_number,
                    setValueOptions
                );
            }
            if (paymentInfo.bank_branch !== undefined) {
                createEventForm.setValue(
                    'bank_branch',
                    paymentInfo.bank_branch,
                    setValueOptions
                );
            }
            if (paymentInfo.bank_name) {
                createEventForm.setValue(
                    'bank_name',
                    paymentInfo.bank_name,
                    setValueOptions
                );
            }
            if (paymentInfo.payment_method) {
                createEventForm.setValue(
                    'payment_method',
                    paymentInfo.payment_method,
                    setValueOptions
                );
            }
            if (organizerInfo.full_name) {
                createEventForm.setValue(
                    'full_name',
                    organizerInfo.full_name,
                    setValueOptions
                );
            }
            if (organizerInfo.contact_email) {
                createEventForm.setValue(
                    'contact_email',
                    organizerInfo.contact_email,
                    setValueOptions
                );
            }
            if (organizerInfo.contact_phone) {
                createEventForm.setValue(
                    'contact_phone',
                    organizerInfo.contact_phone,
                    setValueOptions
                );
            }
            if (organizerInfo.description_organization) {
                createEventForm.setValue(
                    'description_organization',
                    organizerInfo.description_organization,
                    setValueOptions
                );
            }
            if (organizerInfo.organization_name) {
                createEventForm.setValue(
                    'organization_name',
                    organizerInfo.organization_name,
                    setValueOptions
                );
            }
            if (organizerInfo.website) {
                createEventForm.setValue(
                    'website',
                    organizerInfo.website,
                    setValueOptions
                );
            }
            if (organizerInfo.logo_url) {
                createEventForm.setValue(
                    'logo_url',
                    organizerInfo.logo_url,
                    setValueOptions
                );
            }

            // Reset flags
            hasPopulatedFormRef.current = false;
            previousEventIdRef.current = null;
        }
        previousIsEditModeRef.current = isEditMode;
    }, [isEditMode, createEventForm]);

    // Reset activeTab to INFO only when entering edit mode for the first time
    useEffect(() => {
        // Only reset if pathname changed (new navigation) and we're in edit mode
        if (isEditMode && previousPathRef.current !== location.pathname) {
            setActiveTabStore(CREATE_EVENT_TAB.INFO);
            hasResetTabRef.current = true;
            previousPathRef.current = location.pathname;
        } else if (!isEditMode) {
            // Reset flag when leaving edit mode
            hasResetTabRef.current = false;
            previousPathRef.current = location.pathname;
        }
    }, [location.pathname, isEditMode, setActiveTabStore]);

    // Populate form with event data when in edit mode
    useEffect(() => {
        // Only populate once per event, or when eventId changes
        if (
            isEditMode &&
            event &&
            (previousEventIdRef.current !== eventId ||
                !hasPopulatedFormRef.current)
        ) {
            hasPopulatedFormRef.current = true;
            previousEventIdRef.current = eventId;
            const setValueOptions = { shouldDirty: false, shouldTouch: false };

            // Set basic event info
            if (event.title) {
                createEventForm.setValue('title', event.title, setValueOptions);
            }
            if (event.description) {
                createEventForm.setValue(
                    'description',
                    event.description,
                    setValueOptions
                );
            }
            if (event.categories && event.categories.length > 0) {
                const categoryIds = event.categories
                    .map(cat => cat.id)
                    .join(',');
                createEventForm.setValue(
                    'category_id',
                    categoryIds,
                    setValueOptions
                );
            }
            if (event.start_time) {
                const startTime = format(
                    new Date(event.start_time),
                    DATE_TIME_FORMAT_ISO
                );
                createEventForm.setValue(
                    'start_time',
                    startTime,
                    setValueOptions
                );
            }
            if (event.end_time) {
                const endTime = format(
                    new Date(event.end_time),
                    DATE_TIME_FORMAT_ISO
                );
                createEventForm.setValue('end_time', endTime, setValueOptions);
            }
            if (event.is_online !== undefined) {
                createEventForm.setValue(
                    'is_online',
                    event.is_online,
                    setValueOptions
                );
            }
            // Parse location string to separate fields
            // Format: "địa điểm, thành phố, quận, phường, số nhà"
            // Example: "Sân Vận Động Mỹ Đình, Hà Nội , Nam Từ Liêm, Mỹ Đình, 666aaa"
            if (event.location && !event.is_online) {
                const locationString = event.location.trim();

                // Split by comma and trim each part
                const parts = locationString
                    .split(',')
                    .map(part => part.trim())
                    .filter(part => part !== '');

                // Parse according to order: location, city, district, ward, street_address
                const locationName = parts[0] || '';
                const city = parts[1] || '';
                const district = parts[2] || '';
                const ward = parts[3] || '';
                const streetAddress = parts[4] || '';

                // Set values
                if (locationName) {
                    createEventForm.setValue(
                        'location',
                        locationName,
                        setValueOptions
                    );
                }
                if (city) {
                    createEventForm.setValue('city', city, setValueOptions);
                }
                if (district) {
                    createEventForm.setValue(
                        'district',
                        district,
                        setValueOptions
                    );
                }
                if (ward) {
                    createEventForm.setValue('ward', ward, setValueOptions);
                }
                if (streetAddress) {
                    createEventForm.setValue(
                        'street_address',
                        streetAddress,
                        setValueOptions
                    );
                }
            }
            if (event.images && event.images.length > 0) {
                // Convert existing images to form format
                // For edit mode, image_data is URL string (will be handled by InfoEventSection)
                const formImages = event.images.map(img => ({
                    description: '',
                    filename: '',
                    image_data: img.image_url, // URL string for edit mode
                    image_type: img.image_type,
                }));
                createEventForm.setValue('images', formImages, setValueOptions);
            }
            if (event.ticket_types && event.ticket_types.length > 0) {
                const formTickets = event.ticket_types.map(ticket => ({
                    description: '',
                    initial_quantity: ticket.initial_quantity || 0,
                    name: ticket.name || '',
                    price: ticket.price || 0,
                    status: ticket.status || TICKET_STATUS.ACTIVE,
                }));
                createEventForm.setValue(
                    'tickets',
                    formTickets,
                    setValueOptions
                );
            }
        } else if (!isEditMode) {
            // Reset flag when leaving edit mode
            hasPopulatedFormRef.current = false;
            previousEventIdRef.current = null;
        }
    }, [isEditMode, event, eventId]);

    const hasPopulatedOrganizerRef = useRef(false);

    useEffect(() => {
        // Chỉ set giá trị một lần khi có data và chưa set trước đó
        if (
            organizerProfile?.organizer_profile &&
            !hasPopulatedOrganizerRef.current
        ) {
            hasPopulatedOrganizerRef.current = true;
            setOrganizerProfileStore(organizerProfile);
            const profile = organizerProfile.organizer_profile;
            const paymentMethod = organizerProfile.payment_methods;

            // Set organizer profile data với shouldDirty để cho phép chỉnh sửa
            const setValueOptions = { shouldDirty: true, shouldTouch: false };

            if (profile.full_name) {
                createEventForm.setValue(
                    'full_name',
                    profile.full_name,
                    setValueOptions
                );
            }
            if (profile.contact_email) {
                createEventForm.setValue(
                    'contact_email',
                    profile.contact_email,
                    setValueOptions
                );
            }
            if (profile.contact_phone) {
                createEventForm.setValue(
                    'contact_phone',
                    profile.contact_phone,
                    setValueOptions
                );
            }
            if (profile.description_organization) {
                createEventForm.setValue(
                    'description_organization',
                    profile.description_organization,
                    setValueOptions
                );
            }
            if (profile.organization_name) {
                createEventForm.setValue(
                    'organization_name',
                    profile.organization_name,
                    setValueOptions
                );
            }
            if (profile.website) {
                createEventForm.setValue(
                    'website',
                    profile.website || '',
                    setValueOptions
                );
            }

            // Set logo_url nếu có (sẽ được dùng nếu không upload logo mới)
            if (profile.logo_url) {
                createEventForm.setValue(
                    'logo_url',
                    profile.logo_url,
                    setValueOptions
                );
            }

            // Set payment method values only if payment_methods exists
            if (paymentMethod) {
                if (paymentMethod.payment_method) {
                    createEventForm.setValue(
                        'payment_method',
                        paymentMethod.payment_method,
                        setValueOptions
                    );
                }
                if (paymentMethod.account_holder_name) {
                    createEventForm.setValue(
                        'account_holder_name',
                        paymentMethod.account_holder_name,
                        setValueOptions
                    );
                }
                if (paymentMethod.account_number) {
                    createEventForm.setValue(
                        'account_number',
                        paymentMethod.account_number,
                        setValueOptions
                    );
                }
                if (paymentMethod.bank_branch !== undefined) {
                    createEventForm.setValue(
                        'bank_branch',
                        paymentMethod.bank_branch || '',
                        setValueOptions
                    );
                }
                if (paymentMethod.bank_name) {
                    createEventForm.setValue(
                        'bank_name',
                        paymentMethod.bank_name,
                        setValueOptions
                    );
                }
            }
        }
    }, [organizerProfile]);

    return (
        <FormProvider {...createEventForm}>
            <div className="flex flex-col flex-1 max-h-screen overflow-hidden">
                <div className="relative">
                    <ToolBarHeader eventId={eventId || ''} />
                </div>
                {/* Info Event Section Tab 1 */}
                {activeTab === CREATE_EVENT_TAB.INFO && <InfoEventSection />}

                {/* Payment Section Tab 2 */}
                {activeTab === CREATE_EVENT_TAB.PAYMENT && <PaymentSection />}

                {/* Preview Section Tab 3 */}
                {activeTab === CREATE_EVENT_TAB.PREVIEW && <PreviewSection />}
            </div>
        </FormProvider>
    );
};

export default CreateEvent;
