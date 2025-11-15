// src/hooks/usePublicItems.ts
import { useQuery } from '@tanstack/react-query';
import api from '../lib/axiosBase';
import { Item } from '../types/index';

export function usePublicItems() {
    return useQuery<Item[], Error>({
        queryKey: ['publicItems'],
        queryFn: async () => {
            const { data } = await api.get<Item[]>('/api/v1/products');
            return data;
        }
    });
}
