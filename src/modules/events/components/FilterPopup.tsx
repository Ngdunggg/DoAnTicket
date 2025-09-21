import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
    Text,
} from '@share/components/atoms/Text';
import useEventListHandler from '../hooks/useEventListHandler';
import { useState, useEffect, RefObject } from 'react';
import RadioButton from '@share/components/atoms/RaddioButton';
import DivClick from '@share/components/atoms/DivClick';
import ToggleButton from '@share/components/atoms/ToggleButton';
import Button, { MODE_BUTTON } from '@share/components/atoms/Button';

interface FilterPopupProps {
    filterButtonRef: RefObject<HTMLDivElement>;
}

const FilterPopup = ({ filterButtonRef }: FilterPopupProps) => {
    const {
        filterOptions,
        handleFilter,
        handleResetFilter,
        isOpenFilterPopup,
        OPTIONS_LOCATION,
        OPTIONS_TYPE,
        setFilterOptions,
    } = useEventListHandler();

    const [position, setPosition] = useState({ right: 0, top: 0 });

    useEffect(() => {
        if (isOpenFilterPopup && filterButtonRef.current) {
            const rect = filterButtonRef.current.getBoundingClientRect();
            setPosition({
                right: window.innerWidth - rect.right - 10,
                top: rect.bottom + window.scrollY + 8,
            });
        }
    }, [isOpenFilterPopup, filterButtonRef]);

    if (!isOpenFilterPopup) return null;

    return (
        <div
            className="absolute z-50"
            style={{
                right: `${position.right}px`,
                top: `${position.top}px`,
            }}
        >
            <div className="w-fit h-fit bg-white rounded-2xl pb-4 shadow-lg">
                <div className="flex flex-col flex-1 gap-4 p-4">
                    {/* Location */}
                    <div className="flex flex-col gap-2 border-b border-dashed border-bg-gray pb-4">
                        <Text modeWeight={MODE_WEIGHT.MEDIUM}>Vị trí</Text>
                        <div className="flex flex-col gap-2">
                            {OPTIONS_LOCATION.map(option => (
                                <DivClick
                                    key={option.value}
                                    className="flex items-center gap-2"
                                    onClick={() => {
                                        setFilterOptions({
                                            ...filterOptions,
                                            location: option.value,
                                        });
                                        // TODO
                                    }}
                                >
                                    <RadioButton
                                        inputId={option.value}
                                        name="location"
                                        value={filterOptions.location}
                                        checked={
                                            option.value ===
                                            filterOptions.location
                                        }
                                    />
                                    <Text modeSize={MODE_SIZE[15]}>
                                        {option.label}
                                    </Text>
                                </DivClick>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col mt-4 gap-2 border-b border-dashed border-bg-gray pb-4">
                        <Text modeWeight={MODE_WEIGHT.MEDIUM}>Giá tiền</Text>
                        <div className="flex items-center justify-between gap-2">
                            <Text modeSize={MODE_SIZE[15]}>Miễn phí</Text>
                            <ToggleButton
                                key={`toggle-${filterOptions.priceFree}`}
                                defaultValue={filterOptions.priceFree}
                                onChange={() => {
                                    setFilterOptions({
                                        ...filterOptions,
                                        priceFree: !filterOptions.priceFree,
                                    });
                                    // TODO
                                }}
                            />
                        </div>
                    </div>

                    {/* Type */}
                    <div className="flex flex-col mt-4 gap-2 border-b border-dashed border-bg-gray pb-4">
                        <Text modeWeight={MODE_WEIGHT.MEDIUM}>Thể loại</Text>
                        <div className="flex gap-2">
                            {OPTIONS_TYPE.map(option => (
                                <DivClick
                                    className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 box-shadow-ticket border border-bg-gray ${
                                        option.value === filterOptions.type
                                            ? 'bg-bg-yellow border-bg-yellow'
                                            : ''
                                    }`}
                                    key={option.value}
                                    onClick={() => {
                                        setFilterOptions({
                                            ...filterOptions,
                                            type: option.value,
                                        });
                                        // TODO
                                    }}
                                >
                                    <Text
                                        modeSize={MODE_SIZE[15]}
                                        modeColor={MODE_COLOR_TEXT.BLACK}
                                    >
                                        {option.label}
                                    </Text>
                                </DivClick>
                            ))}
                        </div>
                    </div>

                    {/* Button */}
                    <div className="flex gap-4">
                        <Button
                            mode={MODE_BUTTON.WHITE}
                            className="w-full"
                            onClick={() => {
                                handleResetFilter();
                            }}
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Thiết lập lại
                            </Text>
                        </Button>
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            className="w-full"
                            onClick={() => {
                                handleFilter(
                                    filterOptions.location,
                                    filterOptions.priceFree,
                                    filterOptions.type
                                );
                            }}
                        >
                            <Text
                                modeColor={MODE_COLOR_TEXT.BLACK}
                                modeSize={MODE_SIZE[16]}
                                modeWeight={MODE_WEIGHT.MEDIUM}
                            >
                                Áp dụng
                            </Text>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;
