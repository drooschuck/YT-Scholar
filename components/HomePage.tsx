import React, { useState } from 'react';
import { SparklesIcon } from './Icons';

interface HomePageProps {
  onGenerate: (url: string) => void;
  error: string | null;
}

export const HomePage: React.FC<HomePageProps> = ({ onGenerate, error }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onGenerate(url);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          Unlock YouTube Insights
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          Paste a YouTube link to get an AI-powered summary and a full transcript. Learn faster, not harder.
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="flex-grow px-4 py-3 bg-gray-800 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition disabled:opacity-50"
            disabled={!url.trim()}
          >
            <SparklesIcon className="w-5 h-5" />
            Generate Insights
          </button>
        </form>
        {error && (
            <p className="mt-4 text-red-400">{error}</p>
        )}
      </div>
    </div>
  );
};
