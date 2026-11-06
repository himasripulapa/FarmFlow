import React, { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { User, UserRole } from '../../types';
import { Users, ShieldCheck, UserCheck, UserX } from 'lucide-react';

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    apiService.getUsers().then(setUsers);
  }, []);

  const handleRoleChange = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
  };

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
          User & Role Management
        </h1>
        <p className="text-xs text-slate-500">
          Approve, suspend, or update permissions for registered farmers, hubs, distributors, and retailers.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
          <Users className="w-5 h-5 text-slate-700" />
          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
            Registered System Users ({users.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold uppercase text-[10px]">
                <th className="p-3">User ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Village / District</th>
                <th className="p-3">Current Role</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
                  <td className="p-3 font-mono font-bold text-slate-700">{u.id}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">{u.name}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{u.village}, {u.district}</td>
                  <td className="p-3">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole)}
                      className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold dark:bg-slate-800"
                    >
                      <option value="farmer">Farmer</option>
                      <option value="collectionCenter">Collection Center</option>
                      <option value="distributor">Distributor</option>
                      <option value="retailer">Retailer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button className="px-2 py-1 bg-emerald-100 text-emerald-800 hover:bg-emerald-200 font-bold rounded-md">
                      Approve
                    </button>
                    <button className="px-2 py-1 bg-rose-100 text-rose-800 hover:bg-rose-200 font-bold rounded-md">
                      Suspend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
