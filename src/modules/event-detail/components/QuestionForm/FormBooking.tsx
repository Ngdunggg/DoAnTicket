import { Text } from '@share/components/atoms/Text';
import {
    MODE_COLOR_TEXT,
    MODE_SIZE,
    MODE_WEIGHT,
} from '@share/components/atoms/Text';
import RaddioButton from '@share/components/atoms/RaddioButton';
import DivClick from '@share/components/atoms/DivClick';
import InputValidate from '@share/components/molecules/InputValidate';
import { UseFormReturn } from 'react-hook-form';
import {
    QuestionInput,
    questionSchema,
} from '@modules/event-detail/models/QuestionForm';

interface FormBookingProps {
    questionForm: UseFormReturn<QuestionInput>;
}

const FormBooking = ({ questionForm }: FormBookingProps) => {
    const schemaQuestion = questionSchema();
    const agreeToTerms = questionForm.watch('agreeToTerms');

    return (
        <div className="flex flex-col gap-8 px-6">
            <Text
                modeColor={MODE_COLOR_TEXT.YELLOW}
                modeSize={MODE_SIZE[24]}
                modeWeight={MODE_WEIGHT.LARGE}
            >
                BẢNG CÂU HỎI
            </Text>

            <div className="flex flex-col gap-5 px-4 py-6 bg-bg-gray border border-bg-gray rounded-lg">
                <Text
                    modeColor={MODE_COLOR_TEXT.WHITE}
                    modeSize={MODE_SIZE[18]}
                    modeWeight={MODE_WEIGHT.MEDIUM}
                >
                    Thông tin khác
                </Text>

                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Email *
                        </Text>
                        <InputValidate
                            control={questionForm.control}
                            inputName="email"
                            schema={schemaQuestion}
                            placeholder="Nhập email"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeWeight={MODE_WEIGHT.MEDIUM}
                        >
                            Số điện thoại *
                        </Text>
                        <InputValidate
                            control={questionForm.control}
                            inputName="phone"
                            schema={schemaQuestion}
                            placeholder="Nhập số điện thoại"
                        />
                    </div>
                </div>

                {/* Điều khoản */}
                <div className="flex flex-col gap-2 pt-4">
                    <Text modeColor={MODE_COLOR_TEXT.WHITE}>
                        Tôi đồng ý với{' '}
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            className="cursor-pointer hover:underline"
                        >
                            Điều khoản và Điều kiện
                        </Text>{' '}
                        và{' '}
                        <Text
                            modeColor={MODE_COLOR_TEXT.YELLOW}
                            className="cursor-pointer hover:underline"
                        >
                            Chính sách Bảo mật
                        </Text>{' '}
                        của sự kiện *
                    </Text>
                    <DivClick
                        className="flex items-center gap-2"
                        onClick={() => {
                            questionForm.setValue(
                                'agreeToTerms',
                                !agreeToTerms
                            );
                        }}
                    >
                        <RaddioButton
                            inputId="agreeToTerms"
                            name="agreeToTerms"
                            value={agreeToTerms}
                            checked={agreeToTerms}
                        />

                        <Text
                            modeColor={MODE_COLOR_TEXT.WHITE}
                            modeSize={MODE_SIZE[14]}
                        >
                            Đồng ý
                        </Text>
                    </DivClick>
                </div>
            </div>
        </div>
    );
};

export default FormBooking;
