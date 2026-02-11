export const getRecommendation = (conditionKey: string): string => {
  switch (conditionKey) {
    case 'condition_normal':
      return 'recommendation_normal';
    case 'condition_mild':
    case 'condition_moderate':
      return 'recommendation_mild_moderate';
    case 'condition_severe':
    case 'condition_very_severe':
      return 'recommendation_severe_very_severe';
    default:
      return '';
  }
};