import { BaseHttpResponse } from '../common/response';
import { ImageType, TicketStatus } from '@share/constants/commons';
import { PaymentMethod } from '@share/constants/paymentMethod';

// Interface cho Upload Image
export interface UploadImageRequest {
    // Base64 string hoặc file buffer
    image_type: ImageType; image_url: string;
}

// Interface cho Event Date
export interface CreateEventDateRequest {
    end_at?: Date;
    start_at: Date;
}

// Interface cho Ticket
export interface CreateTicketRequest {
    description?: string;
    initial_quantity: number;
    name: string;
    price: number;
    status: TicketStatus;
}

// Interface cho Organizer Profile
export interface CreateOrganizerProfileRequest {
    contact_email: string;
    contact_phone: string;
    description_organization: string;
    full_name: string;
    logo_url: string;
    organization_name: string;
    website?: string;
}

// Interface cho Payment Method
export interface CreatePaymentMethodRequest {
    account_holder_name: string;
    account_number: string;
    bank_branch?: string;
    bank_name: string;
    payment_method: PaymentMethod;
}

// Interface chính cho Create Event Request
export interface CreateEventRequest {
    category_id: string[];
    description: string;
    end_time: Date;
    event_dates?: CreateEventDateRequest[];
    images: UploadImageRequest[];
    is_online: boolean;
    location?: string;
    organizer_profile: CreateOrganizerProfileRequest;
    payment_method: CreatePaymentMethodRequest;
    start_time: Date;
    tickets?: CreateTicketRequest[];
    title: string;
}

// Interface cho Create Event Response
export interface CreateEventResponse extends BaseHttpResponse {
    data: {
        eventId: string;
        message: string;
    };
}

// Interface cho Create Event Error Response
export interface CreateEventErrorResponse extends BaseHttpResponse {
    data: {
        errors?: string[];
        message: string;
    };
}
