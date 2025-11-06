import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import DivClick from '../atoms/DivClick';
import Image from '../atoms/Image';
import CalendarIcon from '../atoms/icons/CalendarIcon';
import { MODE_CALENDAR } from '../atoms/icons/CalendarIcon';

interface EventCardProps {
    date: string;
    image?: string;
    onViewEvent?: () => void;
    price: string | null;
    title: string;
}

const EventCard = ({
    date,
    image,
    onViewEvent,
    price,
    title,
}: EventCardProps) => {
    return (
        <DivClick
            className="rounded-lg overflow-hidden duration-300 hover:scale-105"
            onClick={onViewEvent}
        >
            <div className="h-50 flex items-center justify-center">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover rounded-lg"
                />
            </div>
            <div className="p-4">
                <div className="h-[2.5rem] mb-2">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeSize={MODE_SIZE[18]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        className="line-clamp-2"
                    >
                        {title}
                    </Text>
                </div>
                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[14]}
                            className="flex items-center gap-2"
                        >
                            <CalendarIcon mode={MODE_CALENDAR.WHITE} /> {date}
                        </Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            {price ? `Chỉ từ ${price}` : 'Liên hệ'}
                        </Text>
                    </div>
                </div>
            </div>
        </DivClick>
    );
};

export default EventCard;
