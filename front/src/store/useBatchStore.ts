import { create } from 'zustand';
import { Batch, BatchStatus, StageHistoryItem } from '../types';
import { apiService } from '../services/api';

interface BatchFilterOptions {
  status?: string;
  crop?: string;
  farmerId?: string;
  search?: string;
}

interface BatchState {
  batches: Batch[];
  selectedBatch: Batch | null;
  loading: boolean;
  error: string | null;
  fetchBatches: (filters?: BatchFilterOptions) => Promise<void>;
  fetchBatchById: (batchId: string) => Promise<Batch | null>;
  createNewBatch: (data: Omit<Batch, 'batchId' | 'stageHistory' | 'carbonFootprint' | 'qrCode'>) => Promise<Batch>;
  updateStatus: (batchId: string, status: BatchStatus, stageData: Omit<StageHistoryItem, 'status' | 'timestamp'>) => Promise<Batch>;
  rateBatch: (batchId: string, rating: number, comment: string, location: string) => Promise<void>;
}

export const useBatchStore = create<BatchState>((set, get) => ({
  batches: [],
  selectedBatch: null,
  loading: false,
  error: null,

  fetchBatches: async (filters) => {
    set({ loading: true, error: null });
    try {
      const batches = await apiService.getBatches(filters);
      set({ batches, loading: false });
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch batches', loading: false });
    }
  },

  fetchBatchById: async (batchId) => {
    set({ loading: true, error: null });
    try {
      const batch = await apiService.getBatchById(batchId);
      set({ selectedBatch: batch, loading: false });
      return batch;
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch batch', loading: false });
      return null;
    }
  },

  createNewBatch: async (data) => {
    set({ loading: true, error: null });
    try {
      const created = await apiService.createBatch(data);
      const current = get().batches;
      set({ batches: [created, ...current], selectedBatch: created, loading: false });
      return created;
    } catch (err: any) {
      set({ error: err.message || 'Failed to create batch', loading: false });
      throw err;
    }
  },

  updateStatus: async (batchId, status, stageData) => {
    set({ loading: true, error: null });
    try {
      const updated = await apiService.updateBatchStatus(batchId, status, stageData);
      const batches = get().batches.map(b => b.batchId.toUpperCase() === batchId.toUpperCase() ? updated : b);
      set({ batches, selectedBatch: updated, loading: false });
      return updated;
    } catch (err: any) {
      set({ error: err.message || 'Failed to update batch status', loading: false });
      throw err;
    }
  },

  rateBatch: async (batchId, rating, comment, location) => {
    try {
      const updated = await apiService.addBatchRating(batchId, rating, comment, location);
      const batches = get().batches.map(b => b.batchId.toUpperCase() === batchId.toUpperCase() ? updated : b);
      set({ batches, selectedBatch: updated });
    } catch (err: any) {
      console.error('Rating failed', err);
    }
  }
}));
