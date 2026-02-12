export enum AppStage {
  WELCOME = 'WELCOME',
  NARRATIVE = 'NARRATIVE',
  CAKE = 'CAKE',
  MEMORY_LANE = 'MEMORY_LANE',
  FINAL_MESSAGE = 'FINAL_MESSAGE'
}

export interface SlideData {
  id: number;
  title: string;
  description: string;
  image: string;
  bgGradient: string;
  theme: 'shinchan' | 'geet' | 'motivation' | 'ca';
}

declare global {
  interface Window {
    confetti: any;
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}