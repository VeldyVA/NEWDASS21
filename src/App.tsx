import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { calculateResults } from './utils/scoring';
import { Layout } from './components/Layout';
import { Header } from './components/Header';

function App() {
  const { t } = useTranslation();
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(new Map(answers.set(questionId, score)));
  };

  const handleSubmit = async () => {
    if (answers.size === questions.length) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setAnswers(new Map());
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const results = isSubmitted ? calculateResults(answers) : [];

  return (
    <Layout>
      <Header />
      
      {!isSubmitted ? (
        <>
          <div className="space-y-6">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                value={answers.get(question.id) || 0}
                onChange={(score) => handleAnswer(question.id, score)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={handleSubmit}
              disabled={answers.size !== questions.length}
              className={`px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                answers.size === questions.length
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              {answers.size === questions.length
                ? t('submit_button')
                : t('submit_button_progress', { answered: answers.size, total: questions.length })}
            </button>
          </div>
        </>
      ) : (
        <Results results={results} onReset={handleReset} />
      )}
    </Layout>
  );
}

export default App;