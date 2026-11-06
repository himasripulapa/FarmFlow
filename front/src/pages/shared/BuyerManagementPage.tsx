import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { Buyer } from '../../types';
import { UserCheck, Plus, Star, Phone, Mail, MapPin, X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const BuyerManagementPage: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [type, setType] = useState<Buyer['type']>('Supermarket');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Telangana');

  useEffect(() => {
    apiService.getBuyers().then(setBuyers);
  }, []);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newB = await apiService.addBuyer({
      name,
      type,
      phone,
      email,
      city,
      state
    });
    setBuyers(prev => [newB, ...prev]);
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setCity('');
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Buyer & Offtaker Management
          </h1>
          <p className="text-xs text-slate-500">
            Maintain relationships with wholesalers, supermarkets, processors, and exporters.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-2xl shadow-sm flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Registered Buyer</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {buyers.map((b) => (
          <div
            key={b.id}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  {b.type}
                </span>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100 mt-1">{b.name}</h3>
              </div>
              <div className="flex items-center text-xs font-bold text-amber-500">
                <Star className="w-4 h-4 fill-amber-400 mr-0.5" />
                <span>{b.rating}</span>
              </div>
            </div>

            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-medium">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {b.city}, {b.state}</p>
              <p className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-400" /> {b.phone}</p>
              <p className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400" /> {b.email}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">Purchases</span>
                <span className="font-bold">{b.totalPurchases} Batches</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400 text-[10px] block">Total Spent</span>
                <span className="font-bold text-emerald-800 dark:text-emerald-400">{formatCurrency(b.totalAmountSpent, 'en-IN')}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Buyer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-bold text-lg text-slate-900 dark:text-slate-100">
              Add New Buyer / Business
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Business Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  placeholder="e.g. BigBasket Hyderabad Hub"
                  className="w-full px-3.5 py-2 rounded-xl border text-xs dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Business Type</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full px-3.5 py-2 rounded-xl border text-xs dark:bg-slate-800"
                >
                  <option value="Supermarket">Supermarket</option>
                  <option value="Wholesaler">Wholesaler</option>
                  <option value="Food Processor">Food Processor</option>
                  <option value="Export Business">Export Business</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border text-xs dark:bg-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-xl border text-xs dark:bg-slate-800"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-sm mt-2"
              >
                Register Buyer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
