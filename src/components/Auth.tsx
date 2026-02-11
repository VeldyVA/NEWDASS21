import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, LogOut, History } from 'lucide-react';

export const Auth: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error);
      setError('Gagal masuk dengan Google. Silakan coba lagi.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: window.location.origin,
          scopes: 'email,public_profile'
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Facebook:', error);
      setError('Gagal masuk dengan Facebook. Silakan coba lagi.');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error logging out:', error);
      setError('Gagal keluar. Silakan coba lagi.');
    }
  };

  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 mb-4">
        <LogIn className="w-5 h-5" />
        <span className="text-lg font-medium">Masuk untuk melihat riwayat penilaian</span>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleGoogleLogin}
          className="inline-flex items-center gap-2 px-6 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Masuk dengan Google
        </button>
        <button
          onClick={handleFacebookLogin}
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#1877F2] text-white rounded-lg shadow-sm hover:bg-[#1666d4] transition-colors"
        >
          <img src="https://www.facebook.com/favicon.ico" alt="Facebook" className="w-5 h-5" />
          Masuk dengan Facebook
        </button>
      </div>
    </div>
  );
};