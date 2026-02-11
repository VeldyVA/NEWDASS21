export const getOptionClass = (
  isSelected: boolean,
  baseClass: string,
  selectedClass: string
): string => {
  const commonClasses = 'p-3 rounded-lg transition-all duration-200 transform hover:scale-105';
  return `${commonClasses} ${isSelected ? selectedClass : baseClass}`;
};