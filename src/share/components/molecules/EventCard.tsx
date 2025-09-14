import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import DivClick from '../atoms/DivClick';

interface EventCardProps {
    date: string;
    image?: string;
    location: string;
    onBookNow?: () => void;
    price: string;
    title: string;
}

const EventCard = ({
    date,
    image,
    location,
    onBookNow,
    price,
    title,
}: EventCardProps) => {
    return (
        <DivClick
            className="rounded-lg overflow-hidden duration-300 hover:scale-105"
            onClick={onBookNow}
        >
            <div className="h-50 flex items-center justify-center">
                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : (
                    <Text
                        modeColor={MODE_COLOR_TEXT.BLACK}
                        modeSize={MODE_SIZE[16]}
                        className="font-medium"
                    >
                        Hình ảnh sự kiện
                    </Text>
                )}
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
                            modeColor={MODE_COLOR_TEXT.GRAY}
                            modeSize={MODE_SIZE[14]}
                        >
                            📅 {date}
                        </Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.GRAY}
                            modeSize={MODE_SIZE[14]}
                        >
                            📍 {location}
                        </Text>
                    </div>
                    <div className="flex items-center gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.LARGE}
                        >
                            Từ {price}
                        </Text>
                    </div>
                </div>
            </div>
        </DivClick>
    );
};

export default EventCard;
