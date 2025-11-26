import InputValidate from '@share/components/molecules/InputValidate';
import SearchIcon from '@share/components/atoms/icons/SearchIcon';
import { isNotNullOrUndefinedOrBlank } from '@share/utils/validate';
import { MODE_WEIGHT, Text } from '@share/components/atoms/Text';
import DivClick from '@share/components/atoms/DivClick';
import useToolBarEvent from './hooks/useToolBarEvent';
import { FILTER_STATUS } from '@share/constants/commons';
import useDetectMobile from '@share/hooks/useDetectMobile';

const ToolBar = () => {
    const {
        activeFilter,
        schemaSearch,
        searchForm,
        setActiveFilterStore,
        setSearchTextStore,
    } = useToolBarEvent();
    const isMobile = useDetectMobile();

    return (
        <div className="flex items-center justify-between px-8 mt-8">
            <InputValidate
                control={searchForm.control}
                inputName="search"
                schema={schemaSearch}
                placeholder="Tìm kiếm sự kiện"
                className="!h-10.5 !w-full md:!w-[400px] flex items-center justify-center"
                iconClassName="bottom-2.5"
                icon={<SearchIcon />}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        const searchValue = searchForm.getValues('search');
                        setSearchTextStore?.(searchValue || '');
                    }
                }}
                onBlurIgnoreClearIcon={() => {
                    const searchValue = searchForm.getValues('search');
                    setSearchTextStore?.(searchValue || '');
                }}
                onFocus={() => {
                    // When focusing on search input, ensure we're in SEARCH view if there's search text
                    const currentSearchText = searchForm.getValues('search');
                    if (currentSearchText?.trim()) {
                        // Set search text to store to trigger search
                        setSearchTextStore?.(currentSearchText);
                    }
                }}
                isShowClear={isNotNullOrUndefinedOrBlank(
                    searchForm.watch('search')
                )}
                onClearInput={() => {
                    searchForm.setValue('search', '');
                    setSearchTextStore?.('');
                }}
                // TODO
            />

            <div
                className={`${!isMobile ? 'flex' : 'hidden'} items-center gap-2 bg-white rounded-full p-1`}
            >
                <DivClick
                    className={`flex items-center px-3 py-3 rounded-full transition-all duration-200 ${
                        activeFilter === FILTER_STATUS.ALL
                            ? 'bg-bg-yellow'
                            : 'hover:bg-bg-gray-2'
                    }`}
                    onClick={() => {
                        setActiveFilterStore(FILTER_STATUS.ALL);
                    }}
                >
                    <Text
                        modeWeight={MODE_WEIGHT.MEDIUM}
                        className="text-nowrap"
                    >
                        Tất cả
                    </Text>
                </DivClick>
                <DivClick
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                        activeFilter === FILTER_STATUS.UPCOMING
                            ? 'bg-bg-yellow'
                            : 'hover:bg-bg-gray-2'
                    }`}
                    onClick={() => {
                        setActiveFilterStore(FILTER_STATUS.UPCOMING);
                    }}
                >
                    <Text modeWeight={MODE_WEIGHT.MEDIUM}>Sắp tới</Text>
                </DivClick>
                <DivClick
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                        activeFilter === FILTER_STATUS.PAST
                            ? 'bg-bg-yellow'
                            : 'hover:bg-bg-gray-2'
                    }`}
                    onClick={() => {
                        setActiveFilterStore(FILTER_STATUS.PAST);
                    }}
                >
                    <Text modeWeight={MODE_WEIGHT.MEDIUM}>Đã qua</Text>
                </DivClick>
                <DivClick
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                        activeFilter === FILTER_STATUS.PENDING
                            ? 'bg-bg-yellow'
                            : 'hover:bg-bg-gray-2'
                    }`}
                    onClick={() => {
                        setActiveFilterStore(FILTER_STATUS.PENDING);
                    }}
                >
                    <Text modeWeight={MODE_WEIGHT.MEDIUM}>Chờ phê duyệt</Text>
                </DivClick>
                <DivClick
                    className={`flex items-center px-6 py-3 rounded-full transition-all duration-200 ${
                        activeFilter === FILTER_STATUS.REJECTED
                            ? 'bg-bg-yellow'
                            : 'hover:bg-bg-gray-2'
                    }`}
                    onClick={() => {
                        setActiveFilterStore(FILTER_STATUS.REJECTED);
                    }}
                >
                    <Text modeWeight={MODE_WEIGHT.MEDIUM}>Đã từ chối</Text>
                </DivClick>
            </div>
        </div>
    );
};

export default ToolBar;
