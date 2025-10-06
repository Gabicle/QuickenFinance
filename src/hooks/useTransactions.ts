import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accKeys, txKeys } from '../api/keys';
import {
  type ListParams,
  listTransactions,
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  listAccounts,
} from '../api/transactions';
import type { Transaction } from '../features/transactions/model/transaction';
import { useEffect } from 'react';

const STALE_MS = 10_000;
const GC_MS = 5 * 60_000;

export function useTransactions(params: ListParams) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: txKeys.list(params),
    queryFn: ({ signal }) => listTransactions(params, { signal }),
    placeholderData: keepPreviousData,
    staleTime: STALE_MS,
    gcTime: GC_MS,
   
  });

useEffect(() => {
  if (query.isPlaceholderData) return;

  const nextPage = query.data?.nextPage ?? null;
  if (nextPage) {
    const nextParams = { ...params, page: nextPage };
    queryClient.prefetchQuery({
      queryKey: txKeys.list(nextParams),
      queryFn: ({ signal }) => listTransactions(nextParams, { signal }),
      staleTime: STALE_MS,
      gcTime: GC_MS,
    });
  }

  const prevPage = query.data?.prevPage ?? null;
  if (prevPage) {
    const prevParams = { ...params, page: prevPage };
    queryClient.prefetchQuery({
      queryKey: txKeys.list(prevParams),
      queryFn: ({ signal }) => listTransactions(prevParams, { signal }),
      staleTime: STALE_MS,
      gcTime: GC_MS,
    });
  }
}, [
  query.isPlaceholderData,
  query.data?.nextPage,
  query.data?.prevPage,
  params,           
  queryClient,
]);


  return query;
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: txKeys.detail(id),
    queryFn: ({ signal }) => getTransaction(id, { signal }),
    enabled: Boolean(id),
    staleTime: STALE_MS,
    gcTime: GC_MS,
  });
}

export function useCreateTransaction(listParams: ListParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: Partial<Transaction>) => createTransaction(input),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: txKeys.list(listParams) });
    },
  });
}

export function useUpdateTransaction(id: string, listParams?: ListParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Transaction>) => updateTransaction(id, patch),
    onSuccess: () => {
      if (listParams) {
       
        queryClient.invalidateQueries({ queryKey: txKeys.list(listParams) });
      }
      queryClient.invalidateQueries({ queryKey: txKeys.detail(id) });
    },
  });
}

export function useDeleteTransaction(listParams: ListParams) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteTransaction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: txKeys.list(listParams) });
    },
  });
}

export function useAccounts() {
  return useQuery({
    queryKey: accKeys.list(),
    queryFn: ({ signal }) => listAccounts({ signal }),
    select: (accounts) => {
      const totalBalance = accounts.reduce((sum, a) => sum + (a?.balance ?? 0), 0);
      return { accounts, totalBalance };
    },
    staleTime: STALE_MS,
    gcTime: GC_MS,
  });
}
