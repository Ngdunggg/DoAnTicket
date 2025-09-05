import HomeLayout from "../components/HomeLayout";
import { useNavigate } from "react-router-dom";
import { Path } from "@share/constants/routers";

const Home = () => {
    const navigate = useNavigate();
    
    // Mock data cho sự kiện
    const mockEvents = [
        {
            id: "1",
            title: "Concert Nhạc Pop 2024",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "15/12/2024",
            location: "Nhà hát Hòa Bình, TP.HCM",
            price: "500,000 VNĐ",
        },
        {
            id: "2",
            title: "Workshop Marketing Digital",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "20/12/2024",
            location: "Trung tâm Hội nghị, Hà Nội",
            price: "200,000 VNĐ",
        },
        {
            id: "3",
            title: "Triển lãm Nghệ thuật Đương đại",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "25/12/2024",
            location: "Bảo tàng Mỹ thuật, TP.HCM",
            price: "100,000 VNĐ",
        },
        {
            id: "4",
            title: "Hội thảo Startup",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "30/12/2024",
            location: "Trung tâm Khởi nghiệp, Đà Nẵng",
            price: "300,000 VNĐ",
        },
        {
            id: "5",
            title: "Festival Âm nhạc Quốc tế",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "05/01/2025",
            location: "Công viên Tao Đàn, TP.HCM",
            price: "800,000 VNĐ",
        },
        {
            id: "6",
            title: "Hội thảo AI & Machine Learning",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "10/01/2025",
            location: "Trung tâm Công nghệ, Hà Nội",
            price: "400,000 VNĐ",
        },
        {
            id: "7",
            title: "Triển lãm Thời trang Xuân 2025",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "15/01/2025",
            location: "Trung tâm Triển lãm, TP.HCM",
            price: "150,000 VNĐ",
        },
        {
            id: "8",
            title: "Workshop Nghệ thuật Nhiếp ảnh",
            image: "https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75",
            date: "20/01/2025",
            location: "Studio Nghệ thuật, Đà Nẵng",
            price: "250,000 VNĐ",
        },
    ];

    const handleBookNow = (eventId: string) => {
        console.log("Booking event:", eventId);
        // TODO: Implement booking functionality
        navigate(`${Path.PathEventDetail.replace(":id", eventId)}`);
    };

    return <HomeLayout events={mockEvents} onBookNow={handleBookNow} />;
};

export default Home;
