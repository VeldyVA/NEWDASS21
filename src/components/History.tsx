import React from 'react';
import { Result } from '../types';
import { X, Brain, HeartPulse, AlertTriangle } from 'lucide-react';

interface HistoryProps {
  assessments: {
    created_at: string;
    results: Result[];
  }[];
  onClose: () => void;
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'depression':
      return <Brain className="w-5 h-5" />;
    case 'anxiety':
      return <HeartPulse className="w-5 h-5" />;
    case 'stress':
      return <AlertTriangle className="w-5 h-5" />;
    default:
      return null;
  }
};

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Normal':
      return 'bg-green-100 text-green-800';
    case 'Ringan':
      return 'bg-yellow-100 text-yellow-800';
    case 'Sedang':
      return 'bg-orange-100 text-orange-800';
    case 'Parah':
    case 'Sangat Parah':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const History: React.FC<HistoryProps> = ({ assessments, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between bg-white sticky top-0 z-10">
          <h2 className="text-xl font-semibold">Riwayat Penilaian</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-4rem)]">
          {assessments.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              Belum ada riwayat penilaian
            </p>
          ) : (
            <div className="space-y-8">
              {assessments.map((assessment, index) => (
                <div
                  key={index}
                  className="border rounded-lg overflow-hidden bg-white"
                >
                  <div className="p-4 bg-gray-50 border-b">
                    <span className="text-sm text-gray-600">
                      {new Date(assessment.created_at).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  
                  <div className="p-4 space-y-6">
                    {assessment.results.map((result) => (
                      <div
                        key={result.category}
                        className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`p-2 rounded-lg ${
                            result.category === 'depression' 
                              ? 'bg-blue-50 text-blue-600'
                              : result.category === 'anxiety'
                              ? 'bg-purple-50 text-purple-600'
                              : 'bg-pink-50 text-pink-600'
                          }`}>
                            {getCategoryIcon(result.category)}
                          </div>
                          <h3 className="text-lg font-medium capitalize">
                            {result.category === 'depression' ? 'Depresi' :
                             result.category === 'anxiety' ? 'Kecemasan' : 'Stres'}
                          </h3>
                        </div>
                        
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-3">
                            <div>
                              <span className="text-gray-600 text-sm">Skor:</span>
                              <div className="flex items-end gap-1">
                                <span className="text-2xl font-bold">{result.score}</span>
                                <span className="text-gray-500 text-sm mb-1">/ 21</span>
                              </div>
                            </div>
                            
                            <div>
                              <span className="text-gray-600 text-sm">Kondisi:</span>
                              <div className="mt-1">
                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getConditionColor(result.condition)}`}>
                                  {result.condition}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <span className="text-gray-600 text-sm">Rekomendasi:</span>
                            <p className="mt-1 text-sm leading-relaxed text-gray-700">
                              {result.recommendation}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};