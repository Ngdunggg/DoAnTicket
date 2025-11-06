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
import { useEffect } from 'react';
import useCreateEventStoreAction from './hooks/useCreateEventStoreAction';

const CreateEvent = () => {
    const { activeTab } = useCreateEventHandler();
    const createEventForm = useCreateEventForm();
    const userInfo = useAppSelector(state => state.user.user);
    const { setOrganizerProfileStore } = useCreateEventStoreAction();
    const { data: organizerProfile } = useGetOrganizerProfile(
        userInfo?.id || ''
    );

    useEffect(() => {
        // Chỉ set giá trị một lần khi có data và chưa set trước đó
        if (organizerProfile?.organizer_profile) {
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
                    <ToolBarHeader />
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
