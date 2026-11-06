import { create } from 'zustand';
import { AppNotification } from '../types';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notif: Omit<AppNotification, 'id' | 'timestamp' | 'read'>) => void;
}

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Batch Quality Verified',
    message: 'Batch FF-2026-000101 (Chilli) has been graded A by Guntur Hub Inspector.',
    type: 'success',
    timestamp: '10 mins ago',
    read: false,
    link: '/trace/FF-2026-000101'
  },
  {
    id: 'n2',
    title: 'Low Stock Alert',
    message: 'Tomato stock (Roma Red) is running low at More Supermarket shelf (85 kg remaining).',
    type: 'warning',
    timestamp: '1 hour ago',
    read: false
  },
  {
    id: 'n3',
    title: 'Near-Expiry Warning',
    message: 'Batch FF-2026-000103 (Alphonso Mango) is within 20 days of shelf-life expiry.',
    type: 'alert',
    timestamp: '3 hours ago',
    read: false
  },
  {
    id: 'n4',
    title: 'New Mandi Rate Alert',
    message: 'Guntur Chilli market price increased by +3.4% to ₹18,500 / Quintal today.',
    type: 'info',
    timestamp: '5 hours ago',
    read: false
  }
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  unreadCount: INITIAL_NOTIFICATIONS.filter(n => !n.read).length,

  markAsRead: (id) => set((state) => {
    const updated = state.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    return { notifications: updated, unreadCount: updated.filter(n => !n.read).length };
  }),

  markAllAsRead: () => set((state) => {
    const updated = state.notifications.map(n => ({ ...n, read: true }));
    return { notifications: updated, unreadCount: 0 };
  }),

  addNotification: (notif) => set((state) => {
    const newNotif: AppNotification = {
      ...notif,
      id: `n-${Date.now()}`,
      timestamp: 'Just now',
      read: false
    };
    const updated = [newNotif, ...state.notifications];
    return { notifications: updated, unreadCount: updated.filter(n => !n.read).length };
  })
}));
