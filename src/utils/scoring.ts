import { Category, Result } from '../types';
import { getRecommendation } from './recommendations';

const getDepressionCondition = (score: number): string => {
  if (score >= 14) return 'Sangat Parah';
  if (score >= 11) return 'Parah';
  if (score >= 7) return 'Sedang';
  if (score >= 5) return 'Ringan';
  return 'Normal';
};

const getAnxietyCondition = (score: number): string => {
  if (score >= 10) return 'Sangat Parah';
  if (score >= 8) return 'Parah';
  if (score >= 6) return 'Sedang';
  if (score >= 4) return 'Ringan';
  return 'Normal';
};

const getStressCondition = (score: number): string => {
  if (score >= 17) return 'Sangat Parah';
  if (score >= 13) return 'Parah';
  if (score >= 10) return 'Sedang';
  if (score >= 8) return 'Ringan';
  return 'Normal';
};

const getCondition = (category: Category, score: number): string => {
  switch (category) {
    case 'depression':
      return getDepressionCondition(score);
    case 'anxiety':
      return getAnxietyCondition(score);
    case 'stress':
      return getStressCondition(score);
  }
};

export const calculateResults = (answers: Map<number, number>): Result[] => {
  const categories: Category[] = ['depression', 'anxiety', 'stress'];
  
  return categories.map(category => {
    const startId = category === 'depression' ? 1 : category === 'anxiety' ? 8 : 15;
    const score = Array.from({ length: 7 }, (_, i) => answers.get(startId + i) || 0)
      .reduce((sum, score) => sum + score, 0);
    
    const condition = getCondition(category, score);
    
    return {
      category,
      score,
      condition,
      recommendation: getRecommendation(condition)
    };
  });
};