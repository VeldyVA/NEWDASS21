import React, { useState, useEffect } from 'react';
import { questions } from './data/questions';
import { QuestionCard } from './components/QuestionCard';
import { Results } from './components/Results';
import { calculateResults } from './utils/scoring';
import { Layout } from './components/Layout';
import { Header } from './components/Header';
import { Auth } from './components/Auth';
import { UserMenu } from './components/UserMenu';
import { History } from './components/History';
import { supabase } from './lib/supabase';
import { Answer } from './types';

function App() {
  const [answers, setAnswers] = useState<Map<number, number>>(new Map());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [session, setSession] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [assessments, setAssessments] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user) {
      fetchAssessments();
    }
  }, [session]);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setAssessments(data || []);
    } catch (error) {
      console.error('Error fetching assessments:', error);
    }
  };

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers(new Map(answers.set(questionId, score)));
  };

  const handleSubmit = async () => {
    if (answers.size === questions.length) {
      setIsSubmitted(true);
      
      if (session?.user) {
        const results = calculateResults(answers);
        try {
          await supabase.from('assessments').insert([
            {
              user_id: session.user.id,
              answers: Object.fromEntries(answers),
              results: results,
              created_at: new Date().toISOString(),
            },
          ]);
          await fetchAssessments(); // Refresh assessments after submitting
        } catch (error) {
          console.error('Error saving results:', error);
        }
      }
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
      {!session ? (
        <Auth />
      ) : (
        <UserMenu 
          userEmail={session.user.email}
          onShowHistory={() => setShowHistory(true)}
        />
      )}
      
      {!isSubmitted ? (
        <>
          <Header />
          
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
                ? 'Lihat Hasil'
                : `Jawab semua pertanyaan (${answers.size}/${questions.length})`}
            </button>
          </div>
        </>
      ) : (
        <Results results={results} onReset={handleReset} />
      )}

      {showHistory && (
        <History
          assessments={assessments}
          onClose={() => setShowHistory(false)}
        />
      )}
    </Layout>
  );
}

export default App;