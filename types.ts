export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  benefits: string;
  prepTime: string;
  calories: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface MoodEntry {
  date: string;
  mood: number; // 1-10
  energy: number; // 1-10
  notes: string;
}

export interface DailyStats {
  hydration: number; // glasses
  mindfulness: number; // minutes
  sleep: number; // hours
}