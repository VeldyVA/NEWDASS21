import React from 'react';
import { Option } from '../types';

interface QuestionOptionProps {
  option: Option;
  isSelected: boolean;
  onClick: () => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> = ({
  option,
  isSelected,
  onClick,
}) => {
  const baseClasses = 'min-h-[60px] flex items-center justify-center text-center p-3 rounded-lg transition-all duration-200 transform hover:scale-105';
  
  const getOptionClasses = () => {
    if (option.value === 0) { // "Tidak pernah" option
      return `${baseClasses} bg-white border-2 border-green-500 text-green-700 hover:bg-green-50 ${
        isSelected ? 'font-bold shadow-lg' : ''
      }`;
    }
    
    return `${baseClasses} ${isSelected ? option.selectedClass : option.baseClass}`;
  };

  return (
    <button
      onClick={onClick}
      className={getOptionClasses()}
    >
      {option.label}
    </button>
  );
};