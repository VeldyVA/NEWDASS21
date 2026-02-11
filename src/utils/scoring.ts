import { Category, Result } from '../types';
import { getRecommendation } from './recommendations';

const getDepressionCondition = (score: number): string => {
  if (score >= 14) return 'condition_very_severe';
  if (score >= 11) return 'condition_severe';
  if (score >= 7) return 'condition_moderate';
  if (score >= 5) return 'condition_mild';
  return 'condition_normal';
};

const getAnxietyCondition = (score: number): string => {
  if (score >= 10) return 'condition_very_severe';
  if (score >= 8) return 'condition_severe';
  if (score >= 6) return 'condition_moderate';
  if (score >= 4) return 'condition_mild';
  return 'condition_normal';
};

const getStressCondition = (score: number): string => {
  if (score >= 17) return 'condition_very_severe';
  if (score >= 13) return 'condition_severe';
  if (score >= 10) return 'condition_moderate';
  if (score >= 8) return 'condition_mild';
  return 'condition_normal';
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
    
    const conditionKey = getCondition(category, score);
    
    return {
      category,
      score,
      condition: conditionKey,
      recommendation: getRecommendation(conditionKey)
    };
  });
};