import { categoriesApi } from '@share/api/categoriesApi';
import { useQuery } from '@tanstack/react-query';

const useFetchCategoriesQuery = () => {
    return useQuery({
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            const response = await categoriesApi.getAllEventTypes();
            return response.data;
        },
        queryKey: ['categories'],
        staleTime: 5 * 60 * 1000,
    });
};

export default useFetchCategoriesQuery;

