export interface TranscriptItem {
  timestamp: string;
  text: string;
}

export interface VideoData {
  id: string;
  title: string;
  insights: string[] | null;
  transcript: TranscriptItem[] | null;
}
