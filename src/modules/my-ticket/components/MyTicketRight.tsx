import { MODE_COLOR_TEXT, MODE_SIZE, Text } from "@share/components/atoms/Text";
import { MODE_WEIGHT } from "@share/components/atoms/Text";
import Button, { MODE_BUTTON } from "@share/components/atoms/Button";
import TicketCard from "./TicketCard";
import { useMemo, useState } from "react";
import { TicketData } from "../types/ticket";

const MyTicketRight = () => {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

    // Mock data - tất cả vé trong một const
    const Tickets: TicketData[] = [
        {
            id: "1",
            eventName: "Lễ hội âm nhạc mùa hè 2024",
            eventDateTime: "2024-07-15T19:00:00",
            venue: "Sân vận động Quốc gia Mỹ Đình",
            ticketType: "VIP",
            seatNumber: "A12",
            price: 1500000,
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        },
        {
            id: "2",
            eventName: "Hội thảo công nghệ AI",
            eventDateTime: "2024-08-20T09:00:00",
            venue: "Trung tâm Hội nghị Quốc gia",
            ticketType: "Standard",
            seatNumber: "B25",
            price: 500000,
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
        },
        {
            id: "3",
            eventName: "Concert Rock Night",
            eventDateTime: "2024-05-10T20:00:00",
            venue: "Nhà hát Lớn Hà Nội",
            ticketType: "Premium",
            seatNumber: "C08",
            price: 800000,
            image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop",
        },
        {
            id: "4",
            eventName: "Workshop Marketing Digital",
            eventDateTime: "2024-04-25T14:00:00",
            venue: "Khách sạn Sheraton",
            ticketType: "Standard",
            seatNumber: "D15",
            price: 300000,
            image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop",
        },
        {
            id: "5",
            eventName: "Festival Ẩm thực Việt Nam",
            eventDateTime: "2024-12-25T18:00:00",
            venue: "Công viên Tao Đàn",
            ticketType: "Premium",
            seatNumber: "E20",
            price: 1200000,
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop",
        },
        {
            id: "6",
            eventName: "Triển lãm Nghệ thuật Đương đại",
            eventDateTime: "2024-03-15T10:00:00",
            venue: "Bảo tàng Mỹ thuật Việt Nam",
            ticketType: "Standard",
            seatNumber: "F08",
            price: 200000,
            image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        },
    ];

    // Phân loại vé dựa trên thời gian hiện tại và sắp xếp theo thời gian
    const { upcomingTickets, pastTickets } = useMemo(() => {
        const now = new Date();
        const upcoming: TicketData[] = [];
        const past: TicketData[] = [];

        Tickets.forEach((ticket) => {
            const eventDate = new Date(ticket.eventDateTime);
            if (eventDate > now) {
                upcoming.push(ticket);
            } else {
                past.push(ticket);
            }
        });

        // Sắp xếp sự kiện sắp diễn ra theo thời gian tăng dần (gần nhất trước)
        upcoming.sort(
            (a, b) => new Date(a.eventDateTime).getTime() - new Date(b.eventDateTime).getTime(),
        );

        // Sắp xếp sự kiện đã diễn ra theo thời gian giảm dần (mới nhất trước)
        past.sort(
            (a, b) => new Date(b.eventDateTime).getTime() - new Date(a.eventDateTime).getTime(),
        );

        return { upcomingTickets: upcoming, pastTickets: past };
    }, []);

    const formatDateTime = (dateTimeString: string) => {
        const date = new Date(dateTimeString);
        return {
            date: date.toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            }),
            time: date.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        };
    };

    return (
        <div className="flex flex-col flex-1 py-14 px-6">
            {/* Tabs */}
            <Text
                modeColor={MODE_COLOR_TEXT.WHITE}
                modeSize={MODE_SIZE[28]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                Vé của tôi
            </Text>
            <div className="h-px w-full bg-bg-gray mt-4 mb-4" />
            <div className="flex items-center justify-center mb-8">
                <div className="bg-white/10 rounded-full p-1 backdrop-blur-sm flex gap-1">
                    <Button
                        onClick={() => setActiveTab("upcoming")}
                        mode={activeTab === "upcoming" ? MODE_BUTTON.YELLOW : MODE_BUTTON.NONE}
                    >
                        <Text
                            modeColor={
                                activeTab === "upcoming"
                                    ? MODE_COLOR_TEXT.BLACK
                                    : MODE_COLOR_TEXT.WHITE
                            }
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Sắp diễn ra ({upcomingTickets.length})
                        </Text>
                    </Button>
                    <Button
                        onClick={() => setActiveTab("past")}
                        mode={activeTab === "past" ? MODE_BUTTON.YELLOW : MODE_BUTTON.NONE}
                    >
                        <Text
                            modeColor={
                                activeTab === "past" ? MODE_COLOR_TEXT.BLACK : MODE_COLOR_TEXT.WHITE
                            }
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Đã diễn ra ({pastTickets.length})
                        </Text>
                    </Button>
                </div>
            </div>

            {/* Ticket List */}
            <div className="space-y-4">
                {activeTab === "upcoming" ? (
                    upcomingTickets.length > 0 ? (
                        upcomingTickets.map((ticket) => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                formatDateTime={formatDateTime}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Text
                                modeColor={MODE_COLOR_TEXT.GRAY_SECONDARY}
                                modeSize={MODE_SIZE[18]}
                            >
                                Bạn chưa có vé nào
                            </Text>
                        </div>
                    )
                ) : pastTickets.length > 0 ? (
                    pastTickets.map((ticket) => (
                        <TicketCard
                            key={ticket.id}
                            ticket={ticket}
                            formatDateTime={formatDateTime}
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <Text modeColor={MODE_COLOR_TEXT.GRAY} modeSize={MODE_SIZE[18]}>
                            Bạn chưa có vé nào
                        </Text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyTicketRight;
