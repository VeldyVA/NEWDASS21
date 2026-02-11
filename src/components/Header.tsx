import React from 'react';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="text-center mb-12">
      <div className="flex justify-end mb-4">
        <button 
          onClick={() => changeLanguage('id')} 
          className={`px-3 py-1 rounded-l-md text-sm font-medium ${i18n.language === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          ID
        </button>
        <button 
          onClick={() => changeLanguage('en')} 
          className={`px-3 py-1 rounded-r-md text-sm font-medium ${i18n.language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
        >
          EN
        </button>
      </div>

      <div className="inline-flex items-center justify-center p-4 mb-6 rounded-full bg-white/50 backdrop-blur-sm shadow-inner">
        <Brain className="w-16 h-16 text-blue-600" />
      </div>
      
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
        {t('header_title')}
      </h1>
      
      <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
        {t('header_description')}
      </p>
      
      <div className="mt-6 flex justify-center gap-4">
        <CategoryBadge color="blue" label={t('depression_category')} />
        <CategoryBadge color="purple" label={t('anxiety_category')} />
        <CategoryBadge color="pink" label={t('stress_category')} />
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