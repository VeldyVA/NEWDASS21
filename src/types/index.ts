export type Category = 'depression' | 'anxiety' | 'stress';

export type Question = {
  id: number;
  text: string;
  category: Category;
};

export type Option = {
  value: number;
  label: string;
  baseClass: string;
  selectedClass: string;
};

export type Answer = {
  questionId: number;
  score: number;
};

export type Result = {
  category: Category;
  score: number;
  condition: string;
  recommendation: string;
};