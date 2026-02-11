import React from 'react';
import { Brain } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-white/50 backdrop-blur-sm shadow-inner">
        <Brain className="w-16 h-16 text-blue-600" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
        Kuesioner DASS-21
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Penilaian untuk memahami tingkat Depresi, Kecemasan, dan Stres Anda. 
        Jawablah dengan jujur sesuai dengan apa yang Anda rasakan selama seminggu terakhir.
      </p>
      
      <div className="mt-6 flex justify-center gap-4">
        <CategoryBadge color="blue" label="Depresi" />
        <CategoryBadge color="purple" label="Kecemasan" />
        <CategoryBadge color="pink" label="Stres" />
      </div>
    </div>
  );
};

const CategoryBadge: React.FC<{ color: string; label: string }> = ({ color, label }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    pink: 'bg-pink-100 text-pink-700'
  };

  return (
    <span className={`px-4 py-2 rounded-full text-sm font-medium ${colorClasses[color]}`}>
      {label}
    </span>
  );
};