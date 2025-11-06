import DivClick from '@share/components/atoms/DivClick';
import TrendingUpIcon from '@share/components/atoms/icons/TrendingUpIcon';
import {
    MODE_COLOR_TEXT,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import { useEffect, useRef } from 'react';
import useSearchStoreAction from '../hooks/useSearchStoreAction';
import useSearchStoreSelector from '../hooks/useSearchStoreSelector';
import SuggestEvent, { SUGGEST_EVENT_MODE } from '../../SuggestEvent/SuggestEvent';
import useSuggestedKeywords from '@share/hooks/useSuggestedKeywords';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from '@share/constants/routers';

type SuggestSearchPopupProps = {
    isOpen: boolean;
};

const SuggestSearchPopup = ({ isOpen }: SuggestSearchPopupProps) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { isSearchPopupOpen } = useSearchStoreSelector();
    const { setIsSearchPopupOpenStore } = useSearchStoreAction();
    const { eventKeywords } = useSuggestedKeywords();

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

    // Lấy từ khóa từ events và user history

    const handleKeywordClick = (keyword: string) => {
        // Chuyển đến EventList với filter
        navigate(SCREEN_PATH.EVENT_LIST, {
            state: { searchKeyword: keyword }
        });
        
        // Đóng popup
        setIsSearchPopupOpenStore(false);
    };

    if (!isOpen) return null;

    return (
        <div
            ref={popupRef}
            className="fixed inset-0 top-18 left-62 lg:left-66 xl:left-80 [@media(min-width:1390px)]:left-90 min-w-[350px] max-h-[calc(100%-100px)] max-w-[calc(100%-550px)] rounded-2xl bg-bg-gray-2 z-20"
        >
            <div className="flex flex-col gap-4 px-6 py-4 w-full h-full overflow-y-auto scrollbar-hide">
                {/* Từ khóa từ sự kiện */}
                {eventKeywords.length > 0 && (
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                            className="px-2"
                        >
                            Tìm kiếm nhiều nhất
                        </Text>
                        {eventKeywords.map((keyword, index) => (
                            <DivClick
                                className="flex items-center gap-6 px-4 py-2 hover:bg-bg-black/50 rounded-full transition-colors"
                                key={`event-${keyword}-${index}`}
                                onClick={() => {
                                    handleKeywordClick(keyword);
                                }}
                            >
                                <TrendingUpIcon size={22} />
                                <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                                    {keyword}
                                </Text>
                            </DivClick>
                        ))}
                    </div>
                )}
                <div className="min-h-[1px] w-full bg-white my-2" />
                <div className="flex flex-col px-3">
                    <Text
                        modeColor={MODE_COLOR_TEXT.WHITE}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Gợi ý dành cho bạn
                    </Text>

                    <SuggestEvent mode={SUGGEST_EVENT_MODE.POPUP} limit={6} />
                </div>
            </div>
        </div>
    );
};

export default SuggestSearchPopup;
