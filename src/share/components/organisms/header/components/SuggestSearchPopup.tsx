import Button, { MODE_BUTTON } from '@share/components/atoms/Button';
import DivClick from '@share/components/atoms/DivClick';
import TrendingUpIcon from '@share/components/atoms/icons/TrendingUpIcon';
import {
    MODE_COLOR_TEXT,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import EventCard from '@share/components/molecules/EventCard';
import { useEffect, useRef } from 'react';
import useSearchStoreAction from '../hooks/useSearchStoreAction';
import useSearchStoreSelector from '../hooks/useSearchStoreSelector';

type SuggestSearchPopupProps = {
    isOpen: boolean;
};

const SuggestSearchPopup = ({ isOpen }: SuggestSearchPopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const { isSearchPopupOpen } = useSearchStoreSelector();
    const { setIsSearchPopupOpenStore } = useSearchStoreAction();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setIsSearchPopupOpenStore(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, isSearchPopupOpen]);
    const hostSearch = [
        {
            id: 1,
            name: 'Trending',
        },
        {
            id: 2,
            name: 'Popular',
        },
        {
            id: 3,
            name: 'New',
        },
    ];

    const suggestEventsMock = [
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
    ];

    if (!isOpen) return null;

    return (
        <div
            ref={popupRef}
            className="fixed inset-0 top-18 left-62 [@media(min-width:1390px)]:left-76 min-w-[350px] max-h-[calc(100%-100px)] max-w-[calc(100%-550px)] rounded-2xl bg-bg-gray-2 z-20"
        >
            <div className="flex flex-col gap-4 px-6 py-4 w-full h-full overflow-y-auto scrollbar-hide">
                <div className="flex flex-col gap-2">
                    {hostSearch.map(item => (
                        <DivClick
                            className="flex items-center gap-6 px-4 py-2 hover:bg-bg-black/50 rounded-full transition-colors"
                            key={item.id}
                            onClick={() => {}}
                        >
                            <TrendingUpIcon size={22} />
                            <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                {item.name}
                            </Text>
                        </DivClick>
                    ))}
                </div>
                <div className="min-h-[1px] w-full bg-white my-2" />
                <div className="flex flex-col gap-3">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Gợi ý dành cho bạn
                    </Text>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {suggestEventsMock.map(item => (
                            <EventCard
                                {...item}
                                key={item.id}
                                onBookNow={() => {}}
                            />
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            onClick={() => {}}
                            className="w-[150px]"
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Xem thêm
                            </Text>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuggestSearchPopup;
