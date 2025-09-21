import { useState } from 'react';

type ToggleButtonProps = {
    className?: string;
    defaultValue?: boolean;
    onChange?: (_isOn: boolean) => void;
};

const ToggleButton = ({
    className = '',
    defaultValue = false,
    onChange,
}: ToggleButtonProps) => {
    const [isOn, setIsOn] = useState(defaultValue);

    const handleToggle = () => {
        const newValue = !isOn;
        setIsOn(newValue);
        onChange?.(newValue);
    };

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <div
                className={`w-12 h-7 rounded-full relative cursor-pointer 
                    transition-all duration-300 ease-in-out ${
                        isOn ? 'bg-bg-yellow' : 'bg-bg-gray'
                    }`}
                onClick={handleToggle}
            >
                <div
                    className={`w-5 h-5 bg-white rounded-full absolute top-1/2 left-1
                        transition-all duration-300 ease-in-out box-shadow-ticket
                        transform -translate-y-1/2 ${
                            isOn ? 'translate-x-5' : 'translate-x-0'
                        }`}
                ></div>
            </div>
        </div>
    );
};

export default ToggleButton;
