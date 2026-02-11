export const getRecommendation = (condition: string): string => {
  switch (condition) {
    case 'Normal':
      return 'Tidak memerlukan intervensi khusus.';
    case 'Ringan':
    case 'Sedang':
      return 'Disarankan untuk mendekatkan diri pada Allah SWT (meningkatkan ibadah), mempraktikkan teknik relaksasi seperti meditasi, pernapasan dalam, atau olahraga ringan. Konsultasi dengan teman atau keluarga juga bisa membantu.';
    case 'Parah':
    case 'Sangat Parah':
      return 'Sebaiknya berkonsultasi dengan profesional kesehatan mental seperti psikolog atau psikiater untuk penanganan lebih lanjut dan berdoa kepada Allah SWT';
    default:
      return '';
  }
};