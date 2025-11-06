import { useMemo } from 'react';
import useHomeEventListStoreSelector from '@modules/home/hooks/useHomeEventListStoreSelector';

const useSuggestedKeywords = () => {
    const { allEvents } = useHomeEventListStoreSelector();

    // Extract keywords from events
    const eventKeywords = useMemo(() => {
        if (!allEvents.length) return [];

        const keywordCount = new Map<string, number>();

        allEvents.forEach(event => {
            // Extract from title
            event.title.split(' ').forEach(word => {
                if (word.length > 2) {
                    const normalized = word.toLowerCase();
                    keywordCount.set(
                        normalized,
                        (keywordCount.get(normalized) || 0) + 1
                    );
                }
            });

            // Extract from location
            if (event.location) {
                event.location.split(' ').forEach(word => {
                    if (word.length > 2) {
                        const normalized = word.toLowerCase();
                        keywordCount.set(
                            normalized,
                            (keywordCount.get(normalized) || 0) + 1
                        );
                    }
                });
            }
        });

        return Array.from(keywordCount.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([keyword]) => keyword);
    }, [allEvents]);

    return {
        eventKeywords,
    };
};

export default useSuggestedKeywords;
