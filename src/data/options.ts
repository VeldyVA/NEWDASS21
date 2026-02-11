import { Option } from '../types';

export const questionOptions: Option[] = [
  { 
    value: 0, 
    label: 'Tidak pernah',
    baseClass: 'bg-white border-2 border-green-500 text-green-700 hover:bg-green-50',
    selectedClass: 'bg-white border-2 border-green-500 text-green-700 font-bold shadow-lg'
  },
  { 
    value: 1, 
    label: 'Kadang-kadang',
    baseClass: 'bg-white border-2 border-blue-200 text-blue-700 hover:bg-blue-50',
    selectedClass: 'bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-transparent text-white font-medium shadow-lg'
  },
  { 
    value: 2, 
    label: 'Sering',
    baseClass: 'bg-white border-2 border-purple-200 text-purple-700 hover:bg-purple-50',
    selectedClass: 'bg-gradient-to-r from-purple-500 to-purple-600 border-2 border-transparent text-white font-medium shadow-lg'
  },
  { 
    value: 3, 
    label: 'Sangat sering',
    baseClass: 'bg-white border-2 border-pink-200 text-pink-700 hover:bg-pink-50',
    selectedClass: 'bg-gradient-to-r from-pink-500 to-pink-600 border-2 border-transparent text-white font-medium shadow-lg'
  }
];