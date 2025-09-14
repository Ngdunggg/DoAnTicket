import { zodResolver } from '@hookform/resolvers/zod';
import { searchToolBarSchema } from '@share/schemas/header/searchToolBar';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function useSearchForm() {
    return useForm<z.infer<typeof searchToolBarSchema>>({
        defaultValues: {
            search: '',
        },
        mode: 'onSubmit',
        resolver: zodResolver(searchToolBarSchema),
        reValidateMode: 'onSubmit',
    });
}
