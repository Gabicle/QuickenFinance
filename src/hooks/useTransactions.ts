import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { accKeys, txKeys } from '../api/keys';
import { type ListParams, listTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction, listAccounts } from '../api/transactions';
import type { Transaction } from '../features/transactions/model/transaction';
import type { Page } from '../mocks/store';


export function useTransactions(params: ListParams) {
  return useQuery({
    queryKey: txKeys.list(params),
    queryFn: () => listTransactions(params),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: txKeys.detail(id),
    queryFn: () => getTransaction(id),
  });
}

export function useCreateTransaction(listParams: ListParams) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: txKeys.list(listParams) });
    },
  });
}

export function useUpdateTransaction(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Transaction>) => updateTransaction(id, patch),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: txKeys.detail(id) });
      qc.invalidateQueries({ queryKey: txKeys.all });
    },
  });
}

export function useDeleteTransaction(id: string, listParams: ListParams) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTransaction(id),
    onMutate: async () => {
      await qc.cancelQueries({ queryKey: txKeys.list(listParams) });
      const key = txKeys.list(listParams);
      const prev = qc.getQueryData<Page<Transaction>>(key);
      if (prev) {
        qc.setQueryData<Page<Transaction>>(key, {
          ...prev,
          data: prev.data.filter(t => t.id !== id),
          total: Math.max(0, prev.total - 1),
        });
      }
      return { key, prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.key && ctx.prev) (qc.setQueryData as any)(ctx.key, ctx.prev);
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: txKeys.all });
    },
  });
}


export function useAccounts() {
  return useQuery({
    queryKey: accKeys.list(),
    queryFn: () => listAccounts(),
    select: (accounts) => {
      const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
      return { accounts, totalBalance };
    },
  });
}


