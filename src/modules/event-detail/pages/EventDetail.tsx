import EventDetailLayout from '../components/EventDetailLayout';

const EventDetail = () => {
    // Mock data cho sự kiện
    const mockEvent = {
        additionalInfo: {
            ageRestriction: '16+',
            dressCode: 'Thoải mái, dễ vận động',
            duration: '3 giờ',
            language: 'Tiếng Việt',
        },
        category: 'Âm nhạc & Nghệ thuật',
        dateEnd: '2024-12-18T22:00:00',
        dateStart: '2024-12-15T19:00:00',
        description:
            'Hãy tham gia cùng chúng tôi trong một buổi tối đặc biệt với âm nhạc chữa lành. Sự kiện này sẽ mang đến cho bạn trải nghiệm độc đáo với các loại nhạc cụ cổ xưa như singing bowls, gongs, và các nhạc cụ truyền thống khác. Âm nhạc sẽ giúp bạn thư giãn, giảm stress và tìm lại sự cân bằng trong cuộc sống.',
        highlights: [
            'Trải nghiệm âm nhạc chữa lành độc đáo',
            'Hướng dẫn thở và thiền định',
            'Không gian yên tĩnh, thư giãn',
            'Tặng kèm tài liệu hướng dẫn thực hành tại nhà',
        ],
        id: '1',
        image: 'https://images.discovery-prod.axs.com/2025/06/cut-copy-tickets_11-13-25_18_684b100eefe3f.png',
        location: 'Nhà hát Hòa Bình, TP.HCM',
        organizer: 'Sound Healing Vietnam',
        requirements: [
            'Độ tuổi từ 16 trở lên',
            'Mang theo thảm yoga hoặc gối ngồi (có thể thuê tại chỗ)',
            'Tắt điện thoại trong suốt buổi biểu diễn',
            'Mặc trang phục thoải mái',
        ],
        title: 'SOUND HEALING CONCERT - Hành trình chữa lành tâm hồn',
    };

    // Mock data cho các loại vé
    const mockTickets = [
        {
            date: '2024-12-15T19:00:00',
            id: 'date-1',
            tickets: [
                {
                    available: 50,
                    benefits: [
                        'Ghế ngồi tiêu chuẩn',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                    ],
                    description: 'Ghế ngồi tiêu chuẩn với view tốt',
                    id: 'ticket-1-day1',
                    isPopular: false,
                    name: 'Vé Standard',
                    originalPrice: 600000,
                    price: 500000,
                },
                {
                    available: 20,
                    benefits: [
                        'Ghế ngồi VIP',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                        'Quà tặng đặc biệt',
                        'Gặp gỡ nghệ sĩ',
                    ],
                    description:
                        'Ghế ngồi VIP với view tốt nhất và quà tặng đặc biệt',
                    id: 'ticket-2-day1',
                    isPopular: true,
                    name: 'Vé Premium',
                    originalPrice: 1000000,
                    price: 800000,
                },
                {
                    available: 15,
                    benefits: [
                        '2 ghế ngồi cạnh nhau',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                        'Quà tặng đôi',
                    ],
                    description: 'Dành cho 2 người với giá ưu đãi',
                    id: 'ticket-3-day1',
                    isPopular: false,
                    name: 'Vé Couple',
                    originalPrice: 1200000,
                    price: 900000,
                },
            ],
        },
        {
            date: '2024-12-16T19:00:00',
            id: 'date-2',
            tickets: [
                {
                    available: 40,
                    benefits: [
                        'Ghế ngồi tiêu chuẩn',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                    ],
                    description: 'Ghế ngồi tiêu chuẩn với view tốt',
                    id: 'ticket-1-day2',
                    isPopular: false,
                    name: 'Vé Standard',
                    originalPrice: 600000,
                    price: 450000,
                },
                {
                    available: 15,
                    benefits: [
                        'Ghế ngồi VIP',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                        'Quà tặng đặc biệt',
                        'Gặp gỡ nghệ sĩ',
                    ],
                    description:
                        'Ghế ngồi VIP với view tốt nhất và quà tặng đặc biệt',
                    id: 'ticket-2-day2',
                    isPopular: true,
                    name: 'Vé Premium',
                    originalPrice: 1000000,
                    price: 750000,
                },
            ],
        },
        {
            date: '2024-12-17T19:00:00',
            id: 'date-3',
            tickets: [
                {
                    available: 35,
                    benefits: [
                        'Ghế ngồi tiêu chuẩn',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                    ],
                    description: 'Ghế ngồi tiêu chuẩn với view tốt',
                    id: 'ticket-1-day3',
                    isPopular: false,
                    name: 'Vé Standard',
                    originalPrice: 600000,
                    price: 500000,
                },
                {
                    available: 10,
                    benefits: [
                        'Ghế ngồi VIP',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                        'Quà tặng đặc biệt',
                        'Gặp gỡ nghệ sĩ',
                    ],
                    description:
                        'Ghế ngồi VIP với view tốt nhất và quà tặng đặc biệt',
                    id: 'ticket-2-day3',
                    isPopular: true,
                    name: 'Vé Premium',
                    originalPrice: 1000000,
                    price: 800000,
                },
                {
                    available: 25,
                    benefits: [
                        'Ghế ngồi tiêu chuẩn',
                        'Tài liệu hướng dẫn',
                        'Nước uống miễn phí',
                        'Ưu đãi đặc biệt',
                    ],
                    description: 'Vé ưu đãi cho người đặt sớm',
                    id: 'ticket-3-day3',
                    isPopular: false,
                    name: 'Vé Early Bird',
                    originalPrice: 600000,
                    price: 400000,
                },
            ],
        },
    ];

    const handleBack = () => {
        console.log('Back to previous page');
        // TODO: Implement navigation
    };

    const handleShare = () => {
        console.log('Share event');
        // TODO: Implement share functionality
    };

    const handleBookNow = () => {
        console.log('Book now clicked');
        // TODO: Implement booking flow
    };

    const handleBuyTickets = (dateId: string) => {
        console.log('Buy tickets for date:', dateId);
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
