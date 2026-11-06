import {
  Batch,
  BatchStatus,
  Buyer,
  InventoryItem,
  MandiPrice,
  StageHistoryItem,
  Transaction,
  User,
  WeatherInfo
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  };

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: 'include' // Required for sending/receiving session cookies
  });

  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Body is not JSON
    }
    const error: any = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json();
}

export const apiService = {
  // --- AUTHENTICATION ---
  async register(data: {
    name: string;
    phone: string;
    email: string;
    password: string;
    role?: string;
    city?: string;
    village?: string;
    district?: string;
    state?: string;
    adminCode?: string;
  }): Promise<User> {
    return request<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async login(credentials: { email: string; password: string }): Promise<User> {
    return request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  },

  async logout(): Promise<{ message: string }> {
    return request<{ message: string }>('/auth/logout', {
      method: 'POST'
    });
  },

  async getMe(): Promise<User> {
    return request<User>('/auth/me');
  },

  // --- BATCHES ---
  async getBatches(filters?: {
    status?: string;
    crop?: string;
    farmerId?: string;
    search?: string;
  }): Promise<Batch[]> {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.status && filters.status !== 'All') params.append('status', filters.status);
      if (filters.crop && filters.crop !== 'All') params.append('crop', filters.crop);
      if (filters.farmerId) params.append('farmerId', filters.farmerId);
      if (filters.search) params.append('search', filters.search);
    }
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return request<Batch[]>(`/batches${queryString}`);
  },

  async getBatchById(batchId: string): Promise<Batch | null> {
    try {
      return await request<Batch>(`/batches/${encodeURIComponent(batchId)}`);
    } catch (err: any) {
      if (err.status === 404) return null;
      throw err;
    }
  },

  async createBatch(
    newBatchData: Omit<Batch, 'batchId' | 'stageHistory' | 'carbonFootprint' | 'qrCode'>
  ): Promise<Batch> {
    return request<Batch>('/batches', {
      method: 'POST',
      body: JSON.stringify(newBatchData)
    });
  },

  async updateBatchStatus(
    batchId: string,
    newStatus: BatchStatus,
    stageData: Omit<StageHistoryItem, 'status' | 'timestamp'>
  ): Promise<Batch> {
    return request<Batch>(`/batches/${encodeURIComponent(batchId)}/status`, {
      method: 'PUT',
      body: JSON.stringify({ newStatus, stageData })
    });
  },

  async addBatchRating(
    batchId: string,
    rating: number,
    comment: string,
    userLocation: string
  ): Promise<Batch> {
    return request<Batch>(`/batches/${encodeURIComponent(batchId)}/ratings`, {
      method: 'POST',
      body: JSON.stringify({ rating, comment, userLocation })
    });
  },

  // --- TRANSACTIONS ---
  async getTransactions(status?: string): Promise<Transaction[]> {
    const queryString = status && status !== 'All' ? `?status=${encodeURIComponent(status)}` : '';
    return request<Transaction[]>(`/transactions${queryString}`);
  },

  // --- BUYERS ---
  async getBuyers(): Promise<Buyer[]> {
    return request<Buyer[]>('/buyers');
  },

  async addBuyer(
    buyer: Omit<Buyer, 'id' | 'totalPurchases' | 'totalAmountSpent' | 'rating'>
  ): Promise<Buyer> {
    return request<Buyer>('/buyers', {
      method: 'POST',
      body: JSON.stringify(buyer)
    });
  },

  // --- INVENTORY ---
  async getInventory(): Promise<InventoryItem[]> {
    // Derive live inventory items from existing batches
    try {
      const batches = await this.getBatches();
      return batches.map((b) => ({
        id: b.batchId,
        batchId: b.batchId,
        cropName: b.crop.name,
        category: b.crop.category,
        locationName: b.currentLocation ? b.currentLocation.name : 'Storage',
        quantity: b.quantity,
        unit: b.unit,
        qualityGrade: b.qualityGrade,
        expiryDate: b.expiryDate || '',
        isLowStock: b.quantity < 200,
        isNearExpiry: false,
        pricePerUnit: b.pricePerUnit
      }));
    } catch {
      return [];
    }
  },

  // --- MANDI & WEATHER ---
  async getMandiPrices(state?: string, crop?: string): Promise<MandiPrice[]> {
    const params = new URLSearchParams();
    if (state && state !== 'All') params.append('state', state);
    if (crop && crop !== 'All') params.append('crop', crop);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return request<MandiPrice[]>(`/mandi-prices${queryString}`);
  },

  async getWeather(lat?: number, lng?: number): Promise<WeatherInfo> {
    const params = new URLSearchParams();
    if (lat !== undefined) params.append('lat', String(lat));
    if (lng !== undefined) params.append('lng', String(lng));
    const queryString = params.toString() ? `?${params.toString()}` : '';
    return request<WeatherInfo>(`/weather${queryString}`);
  },

  // --- USERS ---
  async getUsers(): Promise<User[]> {
    return request<User[]>('/users');
  }
};
