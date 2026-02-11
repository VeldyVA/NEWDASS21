import React from 'react';
import { Brain, Heart, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 py-12">
        {children}
        
        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          by veldyva
        </footer>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      {/* Decorative elements */}
      <div className="fixed -z-10 top-20 left-10 text-blue-200 opacity-20 transform -rotate-12">
        <Brain size={120} />
      </div>
      <div className="fixed -z-10 bottom-20 right-10 text-pink-200 opacity-20 transform rotate-12">
        <Heart size={120} />
      </div>
      <div className="fixed -z-10 top-1/2 right-1/4 text-purple-200 opacity-20 transform rotate-45">
        <Sparkles size={80} />
      </div>
    </div>
  );
};