export interface TicketType {
    id: string;
    name: string;
    price: number;
    description: string;
    available: number;
    maxPerOrder: number;
}

export interface SelectedTicket {
    ticketType: TicketType;
    quantity: number;
}

export interface TicketPurchaseState {
    selectedTickets: SelectedTicket[];
    totalAmount: number;
    eventId: string;
    eventTitle: string;
}

export interface PaymentInfo {
    fullName: string;
    email: string;
    phone: string;
    paymentMethod: 'card' | 'bank_transfer' | 'momo';
}
