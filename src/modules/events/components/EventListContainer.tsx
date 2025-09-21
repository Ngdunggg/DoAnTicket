import DivClick from '@share/components/atoms/DivClick';
import CalendarIcon, {
    MODE_CALENDAR,
} from '@share/components/atoms/icons/CalendarIcon';
import ChevronIcon, {
    MODE_CHEVRON,
} from '@share/components/atoms/icons/ChevronIcon';
import FilterIcon, {
    MODE_FILTER,
} from '@share/components/atoms/icons/FilterIcon';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import EventGrid from '@share/components/organisms/EventGrid';
import useEventListHandler from '../hooks/useEventListHandler';
import FilterPopup from './FilterPopup';
import { RefObject, useRef } from 'react';
import Button, { MODE_BUTTON, SIZE_ICON } from '@share/components/atoms/Button';
import XCircleIcon from '@share/components/atoms/icons/XCircleIcon';
import { LOCATION } from '@share/constants/commons';

interface Event {
    date: string;
    id: string;
    image: string;
    location: string;
    price: string;
    title: string;
}

const EventListContainer = () => {
    const mockEvents: Event[] = [
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
        {
            date: '25/01/2025',
            id: '9',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Triển lãm, TP.HCM',
            price: '150,000 VNĐ',
            title: 'Triển lãm Thời trang Xuân 2025',
        },
        {
            date: '30/01/2025',
            id: '10',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '05/02/2025',
            id: '11',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Triển lãm, TP.HCM',
            price: '150,000 VNĐ',
            title: 'Triển lãm Thời trang Xuân 2025',
        },
        {
            date: '10/02/2025',
            id: '12',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '15/02/2025',
            id: '13',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Trung tâm Triển lãm, TP.HCM',
            price: '150,000 VNĐ',
            title: 'Triển lãm Thời trang Xuân 2025',
        },
        {
            date: '20/02/2025',
            id: '14',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '25/02/2025',
            id: '15',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '30/02/2025',
            id: '16',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '05/03/2025',
            id: '17',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '10/03/2025',
            id: '18',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '15/03/2025',
            id: '19',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
        {
            date: '20/03/2025',
            id: '20',
            image: 'https://ticketbox.vn/_next/image?url=https%3A%2F%2Fimages.tkbcdn.com%2F2%2F360%2F479%2Fts%2Fds%2F3b%2F36%2F58%2Fb9085b00c469d727db9ee8857ee49b8d.jpg&w=640&q=75',
            location: 'Studio Nghệ thuật, Đà Nẵng',
            price: '250,000 VNĐ',
            title: 'Workshop Nghệ thuật Nhiếp ảnh',
        },
    ];

    const {
        filterLocation,
        filterPriceFree,
        filterType,
        isOpenFilterPopup,
        setFilterLocationStore,
        setFilterPriceFreeStore,
        setFilterTypeStore,
        setIsOpenFilterPopupStore,
    } = useEventListHandler();
    const filterButtonRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <div className="w-full min-h-screen bg-bg-black-2 py-16 px-12">
                <div className="flex items-center w-full gap-2 justify-end mb-8">
                    <DivClick
                        onClick={() => {}}
                        className="flex items-center gap-2 py-3 px-4 bg-bg-gray rounded-full hover:bg-bg-gray-2 transition-all duration-200"
                    >
                        <CalendarIcon size={22} mode={MODE_CALENDAR.WHITE} />
                        <Text
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            className="hover:text-text-yellow transition-colors duration-200"
                        >
                            Tất cả các ngày
                        </Text>
                        <ChevronIcon size={22} mode={MODE_CHEVRON.WHITE} />
                    </DivClick>
                    <DivClick
                        ref={filterButtonRef}
                        onClick={() => {
                            setIsOpenFilterPopupStore(!isOpenFilterPopup);
                        }}
                        className="flex items-center gap-2 py-3 px-4 bg-bg-gray rounded-full hover:bg-bg-gray-2 transition-all duration-200"
                    >
                        <FilterIcon size={22} mode={MODE_FILTER.WHITE} />
                        <Text
                            modeSize={MODE_SIZE[18]}
                            modeWeight={MODE_WEIGHT.LARGE}
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            className="hover:text-text-yellow transition-colors duration-200"
                        >
                            Bộ lọc
                        </Text>
                        <ChevronIcon size={22} mode={MODE_CHEVRON.WHITE} />
                    </DivClick>
                    {filterLocation !== LOCATION.ALL && (
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            icon={<XCircleIcon size={18} />}
                            sizeIcon={SIZE_ICON.SMALL}
                            onClick={() => {
                                setFilterLocationStore(LOCATION.ALL);
                            }}
                        >
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                            >
                                {filterLocation}
                            </Text>
                        </Button>
                    )}
                    {filterPriceFree && (
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            icon={<XCircleIcon size={18} />}
                            sizeIcon={SIZE_ICON.SMALL}
                            onClick={() => {
                                setFilterPriceFreeStore(false);
                            }}
                        >
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                            >
                                Miễn phí
                            </Text>
                        </Button>
                    )}
                    {filterType !== '' && (
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            icon={<XCircleIcon size={18} />}
                            sizeIcon={SIZE_ICON.SMALL}
                            onClick={() => {
                                setFilterTypeStore('');
                            }}
                        >
                            <Text
                                modeWeight={MODE_WEIGHT.MEDIUM}
                                modeColor={MODE_COLOR_TEXT.WHITE}
                            >
                                {filterType}
                            </Text>
                        </Button>
                    )}
                </div>
                <div className="h-full w-full">
                    <div>
                        <EventGrid events={mockEvents} />
                    </div>
                </div>
            </div>
            <FilterPopup
                filterButtonRef={filterButtonRef as RefObject<HTMLDivElement>}
            />
        </>
    );
};

export default EventListContainer;
