import { PaymentMethod } from '@share/constants/paymentMethod';

export interface OrganizerPaymentMethod {
    account_holder_name: string;
    account_number: string;
    bank_branch: string | null;
    bank_name: string;
    created_at: Date;
    id: string;
    is_default: boolean;
    organizer_id: string;
    payment_method: PaymentMethod;
    updated_at: Date;
}

export interface OrganizerProfile {
    contact_email: string;
    contact_phone: string;
    description_organization: string;
    full_name: string;
    id: string;
    logo_url: string;
    organization_name: string;
    user_id: string;
    website: string;
}

export interface OrganizerProfileWithPaymentMethod {
    organizer_profile: OrganizerProfile;
    payment_methods: OrganizerPaymentMethod;
}
