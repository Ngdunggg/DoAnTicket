import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
    MODE_SIZE,
    MODE_WEIGHT,
    MODE_COLOR_TEXT,
    Text,
} from '@share/components/atoms/Text';
import InputValidate from '@share/components/molecules/InputValidate';
import Button from '@share/components/atoms/Button';
import { MODE_BUTTON } from '@share/components/atoms/Button';
import { Category, categoriesApi } from '@share/api/categoriesApi';
import { RESULT_CODE } from '@share/constants/commons';
import { toast } from 'react-toastify';
import useAdminStoreAction from '@modules/admin/hooks/useAdminStoreAction';
import useAdminStoreSelector from '@modules/admin/hooks/useAdminStoreSelector';
import useFetchCategoriesQuery from '../hooks/useFetchCategoriesQuery';

const categorySchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Tên thể loại là bắt buộc' })
        .min(2, { message: 'Tên thể loại phải có ít nhất 2 ký tự' })
        .max(100, { message: 'Tên thể loại không quá 100 ký tự' }),
});

type CategoryFormInput = z.infer<typeof categorySchema>;

interface CategoryFormPopupProps {
    category: Category | null;
    isOpen: boolean;
    onClose: () => void;
}

const CategoryFormPopup = ({
    category,
    isOpen,
    onClose,
}: CategoryFormPopupProps) => {
    const { categoryList } = useAdminStoreSelector();
    const { setCategoryListStore } = useAdminStoreAction();
    const { refetch } = useFetchCategoriesQuery();
    const isEditMode = !!category;

    const form = useForm<CategoryFormInput>({
        defaultValues: {
            name: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(categorySchema),
        reValidateMode: 'onSubmit',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && category) {
                form.reset({ name: category.name });
            } else {
                form.reset({ name: '' });
            }
        }
    }, [isOpen, isEditMode, category, form]);

    const handleSubmit = async (data: CategoryFormInput) => {
        try {
            if (isEditMode && category) {
                const response = await categoriesApi.updateCategory({
                    id: category.id,
                    name: data.name,
                });
                if (response.result.code === RESULT_CODE.SUCCESS) {
                    toast.success('Cập nhật thể loại thành công');
                    const updatedList = categoryList.map(cat =>
                        cat.id === category.id
                            ? { ...cat, name: data.name }
                            : cat
                    );
                    setCategoryListStore(updatedList);
                    await refetch();
                    onClose();
                } else {
                    toast.error(
                        response.result.error_msg_id ||
                            'Cập nhật thể loại thất bại'
                    );
                }
            } else {
                const response = await categoriesApi.createCategory({
                    name: data.name,
                });
                if (response.result.code === RESULT_CODE.SUCCESS) {
                    toast.success('Tạo thể loại thành công');
                    if (response.data) {
                        setCategoryListStore([...categoryList, response.data]);
                    }
                    await refetch();
                    onClose();
                } else {
                    toast.error(
                        response.result.error_msg_id || 'Tạo thể loại thất bại'
                    );
                }
            }
        } catch (error) {
            console.error('Category form error:', error);
            toast.error(
                isEditMode
                    ? 'Cập nhật thể loại thất bại'
                    : 'Tạo thể loại thất bại'
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <div className="flex items-center justify-between mb-6">
                    <Text
                        modeSize={MODE_SIZE[24]}
                        modeWeight={MODE_WEIGHT.LARGE}
                        modeColor={MODE_COLOR_TEXT.BLACK}
                    >
                        {isEditMode
                            ? 'Chỉnh sửa thể loại'
                            : 'Thêm mới thể loại'}
                    </Text>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        ×
                    </button>
                </div>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="flex flex-col gap-4"
                >
                    <InputValidate
                        control={form.control}
                        inputName="name"
                        schema={categorySchema}
                        placeholder="Nhập tên thể loại"
                        className="w-full"
                    />
                    <div className="flex gap-4 justify-end mt-4">
                        <Button
                            mode={MODE_BUTTON.OUTLINE}
                            type="button"
                            onClick={onClose}
                        >
                            Hủy
                        </Button>
                        <Button
                            mode={MODE_BUTTON.YELLOW}
                            type="submit"
                            loading={form.formState.isSubmitting}
                        >
                            {isEditMode ? 'Cập nhật' : 'Tạo mới'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryFormPopup;
