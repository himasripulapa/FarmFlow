import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../store/useAuthStore';
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  Boxes,
  Truck,
  ShoppingBag,
  Search,
  HelpCircle,
  UserCheck
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuthStore();
  const location = useLocation();

  const role = currentUser?.role || 'farmer';

  // Bottom navigation items for mobile
  const getNavItems = () => {
    switch (role) {
      case 'farmer':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/farmer/my-batches', label: t('nav.myBatches'), icon: Package },
          { to: '/farmer/create-batch', label: t('nav.createBatch'), icon: PlusCircle, isMain: true },
          { to: '/search', label: t('nav.search'), icon: Search },
          { to: '/help', label: t('nav.help'), icon: HelpCircle },
        ];
      case 'collectionCenter':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/center/incoming', label: t('nav.incomingBatches'), icon: Package },
          { to: '/center/inventory', label: t('nav.inventory'), icon: Boxes },
          { to: '/search', label: t('nav.search'), icon: Search },
        ];
      case 'distributor':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/distributor/shipments', label: t('nav.shipments'), icon: Truck },
          { to: '/distributor/dispatch', label: 'Dispatch', icon: PlusCircle, isMain: true },
          { to: '/shared/buyers', label: t('nav.buyers'), icon: UserCheck },
        ];
      case 'retailer':
        return [
          { to: '/dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
          { to: '/retailer/inventory', label: t('nav.inventory'), icon: Boxes },
          { to: '/retailer/sales', label: t('nav.sales'), icon: ShoppingBag },
          { to: '/search', label: t('nav.search'), icon: Search },
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
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-emerald-100 dark:border-slate-800 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around h-14">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;

          if (item.isMain) {
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className="relative -top-4 bg-emerald-700 hover:bg-emerald-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-slate-900 transition-transform duration-200 active:scale-95"
              >
                <Icon className="w-7 h-7" />
              </NavLink>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-xl transition-colors ${
                isActive
                  ? 'text-emerald-800 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight truncate max-w-[64px]">
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
