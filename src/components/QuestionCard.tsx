import React from 'react';
import { Question } from '../types';
import { questionOptions } from '../data/options';
import { QuestionOption } from './QuestionOption';

interface QuestionCardProps {
  question: Question;
  value: number;
  onChange: (score: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, value, onChange }) => {
  const getCategoryColor = () => {
    switch (question.category) {
      case 'depression': return 'border-l-blue-500';
      case 'anxiety': return 'border-l-purple-500';
      case 'stress': return 'border-l-pink-500';
    }
  };

  return (
    <div className={`bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg mb-6 border-l-4 ${getCategoryColor()} transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}>
      <div className="mb-6">
        <span className="inline-block px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600 mb-3">
          Pertanyaan {question.id}
        </span>
        <p className="text-xl text-gray-800 leading-relaxed">{question.text}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {questionOptions.map((option) => (
          <QuestionOption
            key={option.value}
            option={option}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
};