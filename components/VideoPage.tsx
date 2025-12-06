import React, { useState } from 'react';
import type { VideoData } from '../types';
import { Loader } from './Loader';
import { LightbulbIcon, TranscriptIcon, ShareIcon, CheckIcon } from './Icons';

interface VideoPageProps {
  videoData: VideoData | null;
  isLoading: boolean;
}

export const VideoPage: React.FC<VideoPageProps> = ({ videoData, isLoading }) => {
  const [copied, setCopied] = useState(false);

  if (!videoData) {
    return <div className="text-center p-8">Video not found.</div>;
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoData.id}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
      // Fallback could be added here if needed, but modern browsers support clipboard API
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-100 truncate">{videoData.title}</h1>
      <div className="aspect-video mb-4">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoData.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg shadow-2xl"
        ></iframe>
      </div>
      
      <div className="flex justify-end mb-8">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-md transition-colors border border-gray-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-label="Share video"
        >
          {copied ? <CheckIcon className="w-4 h-4 text-green-500" /> : <ShareIcon className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Share'}
        </button>
      </div>

      {isLoading ? (
        <Loader message="Generating insights... this might take a few minutes" />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Insights Box */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-400">
              <LightbulbIcon className="w-6 h-6" />
              AI Insights
            </h2>
            <ul className="space-y-3 list-disc list-inside text-gray-300">
              {videoData.insights?.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </div>

          {/* Transcript Box */}
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-purple-400">
                <TranscriptIcon className="w-6 h-6" />
                Transcript
            </h2>
            <div className="max-h-96 overflow-y-auto space-y-4 pr-2">
              {videoData.transcript?.map((item, index) => (
                <div key={index} className="flex gap-4 text-sm">
                  <span className="font-mono text-gray-500">{item.timestamp}</span>
                  <p className="flex-1 text-gray-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};