import EventDetailLayout from "../components/EventDetailLayout";

const EventDetail = () => {
    // Mock data cho sự kiện
    const mockEvent = {
        id: "1",
        title: "SOUND HEALING CONCERT - Hành trình chữa lành tâm hồn",
        dateStart: "2024-12-15T19:00:00",
        dateEnd: "2024-12-18T22:00:00",
        location: "Nhà hát Hòa Bình, TP.HCM",
        organizer: "Sound Healing Vietnam",
        image: "https://images.discovery-prod.axs.com/2025/06/cut-copy-tickets_11-13-25_18_684b100eefe3f.png",
        category: "Âm nhạc & Nghệ thuật",
        description: "Hãy tham gia cùng chúng tôi trong một buổi tối đặc biệt với âm nhạc chữa lành. Sự kiện này sẽ mang đến cho bạn trải nghiệm độc đáo với các loại nhạc cụ cổ xưa như singing bowls, gongs, và các nhạc cụ truyền thống khác. Âm nhạc sẽ giúp bạn thư giãn, giảm stress và tìm lại sự cân bằng trong cuộc sống.",
        highlights: [
            "Trải nghiệm âm nhạc chữa lành độc đáo",
            "Hướng dẫn thở và thiền định",
            "Không gian yên tĩnh, thư giãn",
            "Tặng kèm tài liệu hướng dẫn thực hành tại nhà"
        ],
        requirements: [
            "Độ tuổi từ 16 trở lên",
            "Mang theo thảm yoga hoặc gối ngồi (có thể thuê tại chỗ)",
            "Tắt điện thoại trong suốt buổi biểu diễn",
            "Mặc trang phục thoải mái"
        ],
        additionalInfo: {
            duration: "3 giờ",
            language: "Tiếng Việt",
            ageRestriction: "16+",
            dressCode: "Thoải mái, dễ vận động"
        }
    };

    // Mock data cho các loại vé
    const mockTickets = [
        {
            id: "date-1",
            date: "2024-12-15T19:00:00",
            tickets: [
                {
                    id: "ticket-1-day1",
                    name: "Vé Standard",
                    description: "Ghế ngồi tiêu chuẩn với view tốt",
                    price: 500000,
                    originalPrice: 600000,
                    available: 50,
                    benefits: ["Ghế ngồi tiêu chuẩn", "Tài liệu hướng dẫn", "Nước uống miễn phí"],
                    isPopular: false
                },
                {
                    id: "ticket-2-day1",
                    name: "Vé Premium",
                    description: "Ghế ngồi VIP với view tốt nhất và quà tặng đặc biệt",
                    price: 800000,
                    originalPrice: 1000000,
                    available: 20,
                    benefits: ["Ghế ngồi VIP", "Tài liệu hướng dẫn", "Nước uống miễn phí", "Quà tặng đặc biệt", "Gặp gỡ nghệ sĩ"],
                    isPopular: true
                },
                {
                    id: "ticket-3-day1",
                    name: "Vé Couple",
                    description: "Dành cho 2 người với giá ưu đãi",
                    price: 900000,
                    originalPrice: 1200000,
                    available: 15,
                    benefits: ["2 ghế ngồi cạnh nhau", "Tài liệu hướng dẫn", "Nước uống miễn phí", "Quà tặng đôi"],
                    isPopular: false
                }
            ]
        },
        {
            id: "date-2",
            date: "2024-12-16T19:00:00",
            tickets: [
                {
                    id: "ticket-1-day2",
                    name: "Vé Standard",
                    description: "Ghế ngồi tiêu chuẩn với view tốt",
                    price: 450000,
                    originalPrice: 600000,
                    available: 40,
                    benefits: ["Ghế ngồi tiêu chuẩn", "Tài liệu hướng dẫn", "Nước uống miễn phí"],
                    isPopular: false
                },
                {
                    id: "ticket-2-day2",
                    name: "Vé Premium",
                    description: "Ghế ngồi VIP với view tốt nhất và quà tặng đặc biệt",
                    price: 750000,
                    originalPrice: 1000000,
                    available: 15,
                    benefits: ["Ghế ngồi VIP", "Tài liệu hướng dẫn", "Nước uống miễn phí", "Quà tặng đặc biệt", "Gặp gỡ nghệ sĩ"],
                    isPopular: true
                }
            ]
        },
        {
            id: "date-3",
            date: "2024-12-17T19:00:00",
            tickets: [
                {
                    id: "ticket-1-day3",
                    name: "Vé Standard",
                    description: "Ghế ngồi tiêu chuẩn với view tốt",
                    price: 500000,
                    originalPrice: 600000,
                    available: 35,
                    benefits: ["Ghế ngồi tiêu chuẩn", "Tài liệu hướng dẫn", "Nước uống miễn phí"],
                    isPopular: false
                },
                {
                    id: "ticket-2-day3",
                    name: "Vé Premium",
                    description: "Ghế ngồi VIP với view tốt nhất và quà tặng đặc biệt",
                    price: 800000,
                    originalPrice: 1000000,
                    available: 10,
                    benefits: ["Ghế ngồi VIP", "Tài liệu hướng dẫn", "Nước uống miễn phí", "Quà tặng đặc biệt", "Gặp gỡ nghệ sĩ"],
                    isPopular: true
                },
                {
                    id: "ticket-3-day3",
                    name: "Vé Early Bird",
                    description: "Vé ưu đãi cho người đặt sớm",
                    price: 400000,
                    originalPrice: 600000,
                    available: 25,
                    benefits: ["Ghế ngồi tiêu chuẩn", "Tài liệu hướng dẫn", "Nước uống miễn phí", "Ưu đãi đặc biệt"],
                    isPopular: false
                }
            ]
        }
    ];

    const handleBack = () => {
        console.log("Back to previous page");
        // TODO: Implement navigation
    };

    const handleShare = () => {
        console.log("Share event");
        // TODO: Implement share functionality
    };

    const handleBookNow = () => {
        console.log("Book now clicked");
        // TODO: Implement booking flow
    };

    const handleBuyTickets = (dateId: string) => {
        console.log("Buy tickets for date:", dateId);
        // TODO: Navigate to ticket selection and payment page
        // Example: navigate(`/booking/${eventId}/${dateId}`);
    };

    return (
        <EventDetailLayout
            event={mockEvent}
            tickets={mockTickets}
            onBack={handleBack}
            onShare={handleShare}
            onBookNow={handleBookNow}
            onBuyTickets={handleBuyTickets}
        />
    );
};

export default EventDetail;

