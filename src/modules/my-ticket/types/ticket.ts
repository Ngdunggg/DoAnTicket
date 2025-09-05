export interface TicketData {
    id: string;
    eventName: string;
    eventDateTime: string; // ISO 8601 format
    venue: string;
    ticketType: string;
    seatNumber: string;
    price: number;
    image: string;
}
