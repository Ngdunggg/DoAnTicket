import { useQuery } from '@tanstack/react-query';
import { organizerApi } from '@share/api/organizerApi';

const useGetOrganizerProfile = (organizerId: string | undefined) => {
    return useQuery({
        enabled: !!organizerId,
        gcTime: 5 * 60 * 1000,
        queryFn: async () => {
            if (!organizerId) return null;
            const response =
                await organizerApi.getOrganizerProfile(organizerId);
            return response.data;
        },
        queryKey: ['organizer-profile', organizerId],
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export default useGetOrganizerProfile;
