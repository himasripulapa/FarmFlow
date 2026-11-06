import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import { useSettingsStore } from '../../store/useSettingsStore';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Truck,
  Boxes,
  ShoppingBag,
  Users,
  BarChart3,
  Search,
  Receipt,
  UserCheck,
  HelpCircle,
  Settings,
  ShieldAlert
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuthStore();
  const { lowLiteracyMode } = useSettingsStore();

  const role = currentUser?.role || 'farmer';

  // Role-based navigation item configuration
  const getNavItems = () => {
    switch (role) {
      case 'farmer':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/farmer/create-batch', label: t('nav.createBatch'), icon: PlusCircle, highlight: true },
          { to: '/farmer/my-batches', label: t('nav.myBatches'), icon: Package },
          { to: '/farmer/earnings', label: 'Earnings & Payments', icon: Receipt },
          { to: '/search', label: t('nav.search'), icon: Search },
          { to: '/help', label: t('nav.help'), icon: HelpCircle },
        ];
      case 'collectionCenter':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/center/incoming', label: t('nav.incomingBatches'), icon: Package },
          { to: '/center/inventory', label: t('nav.inventory'), icon: Boxes },
          { to: '/search', label: t('nav.search'), icon: Search },
          { to: '/help', label: t('nav.help'), icon: HelpCircle },
        ];
      case 'distributor':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/distributor/shipments', label: t('nav.shipments'), icon: Truck },
          { to: '/distributor/dispatch', label: 'Dispatch Vehicle', icon: PlusCircle, highlight: true },
          { to: '/shared/buyers', label: t('nav.buyers'), icon: UserCheck },
          { to: '/search', label: t('nav.search'), icon: Search },
        ];
      case 'retailer':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/retailer/inventory', label: t('nav.inventory'), icon: Boxes },
          { to: '/retailer/sales', label: t('nav.sales'), icon: ShoppingBag },
          { to: '/search', label: t('nav.search'), icon: Search },
        ];
      case 'admin':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/admin/batches', label: 'All Batches', icon: Package },
          { to: '/admin/users', label: t('nav.users'), icon: Users },
          { to: '/admin/analytics', label: t('nav.analytics'), icon: BarChart3 },
          { to: '/shared/transactions', label: t('nav.transactions'), icon: Receipt },
          { to: '/admin/settings', label: t('nav.settings'), icon: Settings },
        ];
      default:
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/search', label: t('nav.search'), icon: Search },
          { to: '/help', label: t('nav.help'), icon: HelpCircle },
        ];
    }
  };

  const items = getNavItems();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-[#FAFAF5] dark:bg-slate-900 border-r border-emerald-100 dark:border-slate-800 p-4 shrink-0 min-h-[calc(100vh-4rem)]">
      
      {/* Role Banner Badge */}
      <div className="bg-emerald-800 text-white rounded-2xl p-3.5 mb-6 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-emerald-950 flex items-center justify-center font-black text-sm">
            {role.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">Active Workspace</p>
            <h3 className="font-bold text-sm tracking-tight capitalize">{t(`roles.${role}`)}</h3>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 space-y-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20'
                    : item.highlight
                    ? 'bg-amber-400 text-emerald-950 font-bold hover:bg-amber-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-900'
                } ${lowLiteracyMode ? 'py-4 text-base font-bold' : ''}`
              }
            >
              <Icon className={`${lowLiteracyMode ? 'w-6 h-6' : 'w-5 h-5'} shrink-0`} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Shared Module Links */}
      <div className="pt-4 border-t border-emerald-100 dark:border-slate-800 space-y-1.5">
        <NavLink
          to="/shared/transactions"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 ${
              isActive ? 'bg-slate-200 text-slate-900 font-bold' : ''
            }`
          }
        >
          <Receipt className="w-4 h-4" />
          <span>{t('nav.transactions')}</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 ${
              isActive ? 'bg-slate-200 text-slate-900 font-bold' : ''
            }`
          }
        >
          <Settings className="w-4 h-4" />
          <span>{t('nav.profile')} & Settings</span>
        </NavLink>
      </div>

    </aside>
  );
};
