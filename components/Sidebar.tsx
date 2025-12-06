import React from 'react';
import type { VideoData } from '../types';
import { HomeIcon, HistoryIcon, YouTubeIcon } from './Icons';

interface SidebarProps {
  history: VideoData[];
  currentVideoId: string | null;
  onSelectVideo: (id: string) => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ history, currentVideoId, onSelectVideo, onGoHome }) => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col h-full border-r border-gray-700">
      <div className="flex items-center gap-3 mb-8">
        <YouTubeIcon className="w-8 h-8 text-red-500" />
        <h1 className="text-xl font-bold">YT Scholar</h1>
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        <button
          onClick={onGoHome}
          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            !currentVideoId ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
          }`}
        >
          <HomeIcon className="w-5 h-5" />
          Home
        </button>
        <div className="mt-6">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 flex items-center gap-3">
            <HistoryIcon className="w-5 h-5" />
            History
          </h2>
          <div className="mt-2 space-y-1 flex-grow overflow-y-auto max-h-[calc(100vh-200px)]">
            {history.map((video) => (
              <button
                key={video.id}
                onClick={() => onSelectVideo(video.id)}
                className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  video.id === currentVideoId
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <span className="truncate flex-1">{video.title}</span>
              </button>
            ))}
            {history.length === 0 && (
                <p className="px-3 py-2 text-sm text-gray-500">No videos yet.</p>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};
