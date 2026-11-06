import { create } from 'zustand';
import { User } from '../types';
import { apiService } from '../services/api';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  fetchMe: () => Promise<User | null>;
  login: (credentials: { email: string; password: string }) => Promise<User>;
  register: (data: {
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
  }) => Promise<User>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  // The database starts empty. No hardcoded or demo user!
  currentUser: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  fetchMe: async () => {
    try {
      set({ isLoading: true, error: null });
      const user = await apiService.getMe();
      set({ currentUser: user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err: any) {
      set({ currentUser: null, isAuthenticated: false, isLoading: false });
      return null;
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const user = await apiService.login(credentials);
      set({ currentUser: user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err: any) {
      set({ error: err.message || 'Login failed', isLoading: false });
      throw err;
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const user = await apiService.register(data);
      set({ currentUser: user, isAuthenticated: true, isLoading: false });
      return user;
    } catch (err: any) {
      set({ error: err.message || 'Registration failed', isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await apiService.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      set({ currentUser: null, isAuthenticated: false, isLoading: false, error: null });
    }
  }
}));
