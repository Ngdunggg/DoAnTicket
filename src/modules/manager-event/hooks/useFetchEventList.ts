import { Event } from '@share/types/event';
import useEventListStoreAction from '../components/EventList/hooks/useEventListStoreAction';
import { useEffect } from 'react';

const useFetchEventList = () => {
    const { setAllEventsStore } = useEventListStoreAction();
    // Mock data - thay thế bằng API call thực tế
    const allEvents: Event[] = [
        {
            dateEnd: '15/12/2024 12:00',
            dateStart: '15/12/2024 10:00',
            description: 'Workshop React Native 2024',
            id: '1',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 1250,
        },
        {
            dateEnd: '10/01/2025 12:00',
            dateStart: '10/01/2025 10:00',
            description: 'Workshop React Native 2024',
            id: '2',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'pending',
            title: 'Hội thảo AI & Machine Learning',
            viewCount: 890,
        },
        {
            dateEnd: '20/11/2024 12:00',
            dateStart: '20/11/2024 10:00',
            description: 'Workshop React Native 2024',
            id: '3',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Nhà hát Hòa Bình, TP.HCM',
            status: 'past',
            title: 'Concert Nhạc Pop 2024',
            viewCount: 2100,
        },
        {
            dateEnd: '25/12/2024 12:00',
            dateStart: '25/12/2024 10:00',
            description: 'Workshop React Native 2024',
            id: '4',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Bảo tàng Mỹ thuật, TP.HCM',
            status: 'upcoming',
            title: 'Triển lãm Nghệ thuật Đương đại',
            viewCount: 650,
        },
        {
            dateEnd: '25/12/2024 12:00',
            dateStart: '25/12/2024 10:00',
            description: 'Workshop React Native 2024',
            id: '5',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 450,
        },
        {
            dateEnd: '30/12/2024 12:00',
            dateStart: '30/12/2024 10:00',
            description: 'Workshop React Native 2024',
            id: '6',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 320,
        },
        {
            dateEnd: '05/01/2025 12:00',
            dateStart: '05/01/2025 10:00',
            description: 'Workshop React Native 2024',
            id: '7',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 780,
        },
        {
            dateEnd: '10/01/2025 12:00',
            dateStart: '10/01/2025 10:00',
            description: 'Workshop React Native 2024',
            id: '8',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 560,
        },
        {
            dateEnd: '15/01/2025 12:00',
            dateStart: '15/01/2025 10:00',
            description: 'Workshop React Native 2024',
            id: '9',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 420,
        },
        {
            dateEnd: '20/01/2025 12:00',
            dateStart: '20/01/2025 10:00',
            description: 'Workshop React Native 2024',
            id: '10',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Công nghệ, Hà Nội',
            status: 'upcoming',
            title: 'Workshop React Native 2024',
            viewCount: 380,
        },
    ];

    useEffect(() => {
        setAllEventsStore(allEvents);
    }, []);
};

export default useFetchEventList;
