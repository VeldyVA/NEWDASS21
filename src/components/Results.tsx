import React from 'react';
import { Result } from '../types';
import { AlertTriangle, Brain, HeartPulse } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'depression':
      return <Brain className="w-6 h-6" />;
    case 'anxiety':
      return <HeartPulse className="w-6 h-6" />;
    case 'stress':
      return <AlertTriangle className="w-6 h-6" />;
    default:
      return null;
  }
};

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Normal':
    case 'condition_normal':
      return 'bg-green-100 text-green-800';
    case 'Ringan':
    case 'Mild':
    case 'condition_mild':
      return 'bg-yellow-100 text-yellow-800';
    case 'Sedang':
    case 'Moderate':
    case 'condition_moderate':
      return 'bg-orange-100 text-orange-800';
    case 'Parah':
    case 'Sangat Parah':
    case 'Severe':
    case 'Very Severe':
    case 'condition_severe':
    case 'condition_very_severe':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

interface ResultsProps {
  results: Result[];
  onReset: () => void;
}

export const Results: React.FC<ResultsProps> = ({ results, onReset }) => {
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          {t('results_title')}
        </h2>
        <p className="text-gray-600">
          {t('results_description')}
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {results.map((result) => (
          <div 
            key={result.category} 
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 border-t-4 transition-transform duration-300 hover:transform hover:scale-105"
            style={{
              borderColor: result.category === 'depression' 
                ? '#3B82F6' 
                : result.category === 'anxiety' 
                ? '#8B5CF6' 
                : '#EC4899'
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gray-50">
                {getCategoryIcon(result.category)}
              </div>
              <h3 className="text-xl font-semibold capitalize">
                {t(`${result.category}_category`)}
              </h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-600 mb-1">{t('score_label')}:</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{result.score}</span>
                  <span className="text-gray-500 text-sm mb-1">/ 21</span>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">{t('condition_label')}:</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(result.condition)}`}>
                  {t(result.condition)}
                </span>
              </div>
              
              <div>
                <p className="text-gray-600 mb-2">{t('recommendation_label')}:</p>
                <p className="text-sm leading-relaxed">{t(result.recommendation)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button
          onClick={onReset}
          className="px-8 py-3 rounded-full text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
        >
          {t('reset_button')}
        </button>
      </div>
    </div>
  );
};