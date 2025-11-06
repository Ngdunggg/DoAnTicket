import { useEffect, useState } from 'react';
import useUpdateInfoUser from './hooks/useUpdateInfoUser';
import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import DivClick from '@share/components/atoms/DivClick';
import XCircleIcon, {
    MODE_X_CIRCLE_ICON,
} from '@share/components/atoms/icons/XCircleIcon';
import Button from '@share/components/atoms/Button';
import { InputText } from 'primereact/inputtext';
import { useAppSelector } from '@configs/store';

const UpdateInfoUser = () => {
    const {
        handleCloseUpdateInfoUser,
        handleUpdateInfoUser,
        isOpenUpdateInfoUser,
    } = useUpdateInfoUser();
    const user = useAppSelector(state => state.user.user);
    const [address, setAddress] = useState(user?.address || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [fullName, setFullName] = useState(user?.full_name || '');

    // Sync form values whenever popup opens or user changes
    useEffect(() => {
        if (isOpenUpdateInfoUser) {
            setAddress(user?.address || '');
            setPhone(user?.phone || '');
            setFullName(user?.full_name || '');
        }
    }, [isOpenUpdateInfoUser, user?.address, user?.phone, user?.full_name]);

    if (!isOpenUpdateInfoUser) {
        return null;
    }

    return (
        <div className="fixed z-20 inset-0 bg-black/30 flex justify-center items-center">
            <div className="bg-white rounded-lg p-6 max-w-[800px] w-full box-shadow-ticket">
                <div className="flex items-center justify-between mb-6">
                    <Text
                        modeColor={MODE_COLOR_TEXT.BLACK}
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                    >
                        Cập nhật thông tin nhận vé
                    </Text>
                    <DivClick onClick={handleCloseUpdateInfoUser}>
                        <XCircleIcon
                            size={24}
                            mode={MODE_X_CIRCLE_ICON.BLACK}
                        />
                    </DivClick>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Họ và tên
                        </Text>
                        <InputText
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Số điện thoại
                        </Text>
                        <InputText
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.BLACK}
                            modeSize={MODE_SIZE[16]}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Địa chỉ
                        </Text>
                        <InputText
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </div>
                    <Button
                        onClick={() => {
                            console.log(address, fullName, phone);
                            handleUpdateInfoUser({
                                address,
                                full_name: fullName,
                                id: user?.id || '',
                                phone,
                            });
                        }}
                    >
                        Cập nhật
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default UpdateInfoUser;
