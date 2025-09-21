export interface Event {
    category?: string;
    dateEnd?: string;
    dateStart?: string;
    description?: string;
    highlights?: string[];
    id: string;
    image?: string;
    location: string;
    organizer?: string;
    price?: string;
    status: string;
    title: string;
    viewCount?: number; // Số lượt truy cập
}
