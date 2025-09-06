export interface TicketData {
    eventDateTime: string;
    eventName: string;
    id: string;
    image: string;
    price: number;
    seatNumber: string;
    ticketType: string;
    // ISO 8601 format
    venue: string;
}
