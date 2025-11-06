import DataTable, {
    DataTableColumn,
} from '@share/components/organisms/DataTable';
import { formatDateTime } from '@share/utils/dateTime';
import { DATE_FORMAT_ISO } from '@share/constants/dateTime';
import {
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
    Text,
} from '@share/components/atoms/Text';
import InputValidate from '@share/components/molecules/InputValidate';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import SearchIcon from '@share/components/atoms/icons/SearchIcon';
import { MODE_INPUT } from '@share/components/atoms/Input';
import useUserHandler from './hooks/useUserHandler';
import { ROLE, Role } from '@share/constants/commons';

const UsersPage = () => {
    const {
        filteredList,
        handleUpdateRole,
        hasMore,
        isLoading,
        isLoadingMore,
        pageSize,
        searchFormSchema,
        setIsLoadingMore,
        setSearch,
        setSortField,
        setSortOrder,
        setVisibleRows,
        sortField,
        sortOrder,
        visibleRows,
    } = useUserHandler();

    const columns: Array<DataTableColumn<(typeof filteredList)[number]>> = [
        { header: 'Email', key: 'email', sortable: true },
        { header: 'Họ và tên', key: 'full_name', sortable: true },
        {
            header: 'Ngày sinh',
            key: 'date_of_birth',
            render: user => formatDateTime(user.date_of_birth, DATE_FORMAT_ISO),
            sortable: true,
        },
        {
            header: 'Giới tính',
            key: 'gender',
            render: user => (user.gender ? 'Nam' : 'Nữ'),
            sortable: true,
        },
        { header: 'Số điện thoại', key: 'phone', sortable: true },
        { header: 'Quyền', key: 'role', sortable: true },
        {
            header: 'Thao tác',
            key: 'actions',
            render: user => (
                <div className="flex gap-2 items-center">
                    <select
                        value={user.role}
                        onChange={e =>
                            handleUpdateRole(user.id, e.target.value as Role)
                        }
                        disabled={isLoading === user.id}
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        <option value={ROLE.USER}>User</option>
                        <option value={ROLE.ORGANIZER}>Organizer</option>
                        <option value={ROLE.ADMIN}>Admin</option>
                    </select>
                    {/* <button
                        onClick={() => handleDeactivate(user.id)}
                        disabled={isLoading === user.id}
                        className="rounded-md border border-red-300 px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {user.status === 'active' ? 'Khóa' : 'Mở khóa'}
                    </button> */}
                </div>
            ),
            sortable: false,
        },
    ];

    return (
        <div className="p-6 md:p-10 h-full overflow-y-auto">
            <div className="flex items-center justify-between">
                <Text
                    modeSize={MODE_SIZE[28]}
                    modeWeight={MODE_WEIGHT.LARGE}
                    modeColor={MODE_COLOR_TEXT.BLACK}
                >
                    Users
                </Text>
                <InputValidate
                    control={searchFormSchema.control}
                    mode={MODE_INPUT.ROUNDED}
                    inputName="search"
                    schema={searchToolBarSchema}
                    placeholder="Search"
                    className="!h-11.5 !w-[450px] flex items-center justify-center rounded-full"
                    iconClassName="bottom-2.5"
                    icon={<SearchIcon />}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            setSearch(
                                searchFormSchema.getValues('search') || ''
                            );
                            console.log(searchFormSchema.getValues('search'));
                        }
                    }}
                    onBlur={() => {
                        setSearch(searchFormSchema.getValues('search') || '');
                        console.log(searchFormSchema.getValues('search'));
                    }}
                />
            </div>
            <div className="mt-6">
                <DataTable
                    columns={columns}
                    data={visibleRows}
                    maxHeight="72vh"
                    hasMore={hasMore}
                    isLoadingMore={isLoadingMore}
                    onLoadMore={() => {
                        if (isLoadingMore || !hasMore) return;
                        setIsLoadingMore(true);
                        const next = filteredList.slice(
                            visibleRows.length,
                            visibleRows.length + pageSize
                        );
                        setVisibleRows(prev => [...prev, ...next]);
                        setIsLoadingMore(false);
                    }}
                    sortField={sortField}
                    sortOrder={sortOrder}
                    onSortChange={({ field, order }) => {
                        setSortField(field);
                        setSortOrder(order);
                    }}
                />
            </div>
        </div>
    );
};

export default UsersPage;
