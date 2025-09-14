import { ReactNode } from 'react';
import LoadingSpinnerIcon, {
    MODE_LOADING_SPINNER,
} from '@share/components/atoms/icons/LoadingSpinnerIcon';
import { MODE_COLOR_TEXT, MODE_SIZE, Text } from '@share/components/atoms/Text';

interface ILoadingContentProps {
    body?: ReactNode;
    className?: string;
    contentId?: string;
    message?: string;
    size?: number;
    spinnerMode?: keyof typeof MODE_LOADING_SPINNER;
    textColor?: keyof typeof MODE_COLOR_TEXT;
}

const LoadingContent = ({
    body: _body,
    className = '',
    contentId,
    message = 'Đang tải...',
    size = 32,
    spinnerMode = 'WHITE',
    textColor = 'WHITE',
}: ILoadingContentProps) => {
    return (
        <div
            id={contentId}
            className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${className}`}
        >
            <div className="bg-bg-black-2 rounded-lg p-6 flex flex-col items-center gap-4 min-w-[200px]">
                <LoadingSpinnerIcon
                    mode={MODE_LOADING_SPINNER[spinnerMode]}
                    size={size}
                />
                <Text
                    modeColor={MODE_COLOR_TEXT[textColor]}
                    modeSize={MODE_SIZE[14]}
                    className="text-center"
                >
                    {message}
                </Text>
            </div>
        </div>
    );
};

export default LoadingContent;
