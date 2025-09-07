export interface TicketType {
    available: number;
    description: string;
    id: string;
    maxPerOrder: number;
    name: string;
    price: number;
}

export interface SelectedTicket {
    quantity: number;
    ticketType: TicketType;
}

export interface TicketPurchaseState {
    eventId: string;
    eventTitle: string;
    selectedTickets: SelectedTicket[];
    totalAmount: number;
}

export interface PaymentInfo {
    email: string;
    fullName: string;
    paymentMethod: 'card' | 'bank_transfer' | 'momo';
    phone: string;
}
