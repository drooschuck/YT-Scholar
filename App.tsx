import React, { useState, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomePage } from './components/HomePage';
import { VideoPage } from './components/VideoPage';
import type { VideoData } from './types';
import { parseYouTubeUrl, generateVideoInsights } from './services/youtubeService';

export default function App() {
  const [history, setHistory] = useState<VideoData[]>([]);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectVideo = useCallback((id: string) => {
    // When selecting from history, we assume data is already loaded.
    setIsLoading(false);
    setError(null);
    setCurrentVideoId(id);
  }, []);

  const handleGenerateInsights = useCallback(async (url: string) => {
    setError(null);
    const videoId = parseYouTubeUrl(url);

    if (!videoId) {
      setError("Invalid YouTube URL. Please try again.");
      return;
    }
    
    // Check if video is already in history to avoid re-adding
    const existingVideo = history.find(v => v.id === videoId);
    if(existingVideo) {
      setCurrentVideoId(videoId);
      return;
    }

    setIsLoading(true);
    setCurrentVideoId(videoId);

    // Add a temporary entry to history immediately
    const tempVideoData: VideoData = {
      id: videoId,
      title: 'Loading video title...',
      insights: null,
      transcript: null,
    };
    setHistory(prev => [tempVideoData, ...prev]);

    try {
      const data = await generateVideoInsights(videoId);
      
      const newVideoData: VideoData = {
        id: videoId,
        title: data.title,
        insights: data.insights,
        transcript: data.transcript,
      };

      setHistory(prev => 
        prev.map(video => video.id === videoId ? newVideoData : video)
      );
    } catch (err) {
      console.error(err);
      setError("Failed to generate insights. The AI could not process this video.");
      // Remove the temp entry if it failed
      setHistory(prev => prev.filter(video => video.id !== videoId));
      setCurrentVideoId(null);
    } finally {
      setIsLoading(false);
    }
  }, [history]);
  
  const handleGoHome = useCallback(() => {
    setCurrentVideoId(null);
    setError(null);
  }, []);

  const currentVideo = history.find(v => v.id === currentVideoId) || null;

  return (
    <div className="flex h-screen font-sans">
      <Sidebar 
        history={history} 
        currentVideoId={currentVideoId} 
        onSelectVideo={handleSelectVideo}
        onGoHome={handleGoHome}
      />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-900">
        {!currentVideoId ? (
          <HomePage onGenerate={handleGenerateInsights} error={error} />
        ) : (
          <VideoPage videoData={currentVideo} isLoading={isLoading} />
        )}
      </main>
    </div>
  );
}