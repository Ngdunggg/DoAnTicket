import HomeLayout from '../components/HomeLayout';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';

const Home = () => {
    const navigate = useNavigate();

    // Mock data cho sự kiện
    const mockEvents = [
        {
            date: '15/12/2024',
            id: '1',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Nhà hát Hòa Bình, TP.HCM',
            price: '500,000 VNĐ',
            title: 'Concert Nhạc Pop 2024',
        },
        {
            date: '20/12/2024',
            id: '2',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Hội nghị, Hà Nội',
            price: '200,000 VNĐ',
            title: 'Workshop Marketing Digital',
        },
        {
            date: '25/12/2024',
            id: '3',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Bảo tàng Mỹ thuật, TP.HCM',
            price: '100,000 VNĐ',
            title: 'Triển lãm Nghệ thuật Đương đại',
        },
        {
            date: '30/12/2024',
            id: '4',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Khởi nghiệp, Đà Nẵng',
            price: '300,000 VNĐ',
            title: 'Hội thảo Startup',
        },
        {
            date: '05/01/2025',
            id: '5',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Công viên Tao Đàn, TP.HCM',
            price: '800,000 VNĐ',
            title: 'Festival Âm nhạc Quốc tế',
        },
        {
            date: '10/01/2025',
            id: '6',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            price: '400,000 VNĐ',
            title: 'Hội thảo AI & Machine Learning',
        },
        {
            date: '15/01/2025',
            id: '7',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Triển lãm, TP.HCM',
            price: '150,000 VNĐ',
            title: 'Triển lãm Thời trang Xuân 2025',
        },
        {
            date: '20/01/2025',
            id: '8',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
    ];

    const handleBookNow = (eventId: string) => {
        console.log('Booking event:', eventId);
        // TODO: Implement booking functionality
        navigate(`${SCREEN_PATH.EVENT_DETAIL.replace(':event_id', eventId)}`);
    };

    return <HomeLayout events={mockEvents} onBookNow={handleBookNow} />;
};

export default Home;
