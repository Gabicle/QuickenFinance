import type { ListParams } from './transactions';
export const txKeys = {
  all: ['transactions'] as const,
  list: (p: ListParams) => [...txKeys.all, 'list', p] as const,
  detail: (id: string) => [...txKeys.all, 'detail', id] as const,
};

export const accKeys = {
  all: ['accounts'] as const,
  list: () => [...accKeys.all, 'list'] as const,
  detail: (id: string) => [...accKeys.all, 'detail', id] as const,
}
