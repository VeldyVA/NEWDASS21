import React from 'react';
import { LogOut, History } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface UserMenuProps {
  userEmail: string;
  onShowHistory: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ userEmail, onShowHistory }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="flex items-center justify-between bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-sm mb-8">
      <div className="flex items-center gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Masuk sebagai</span>
          <span className="font-medium">{userEmail}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onShowHistory}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <History className="w-4 h-4" />
          Riwayat
        </button>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </div>
  );
};