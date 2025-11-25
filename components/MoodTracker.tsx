import React, { useState } from 'react';
import { PenTool, Activity, Calendar } from 'lucide-react';
import { analyzeMood } from '../services/geminiService';
import { MoodEntry } from '../types';

const MoodTracker: React.FC = () => {
  const [note, setNote] = useState('');
  const [mood, setMood] = useState(7);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<{sentiment: string, suggestions: string[]} | null>(null);
  const [history, setHistory] = useState<MoodEntry[]>([
    { date: 'Today', mood: 7, energy: 6, notes: 'Feeling good, just a bit tired.' },
  ]);

  const handleSubmit = async () => {
    if (!note.trim()) return;
    setAnalyzing(true);
    
    const result = await analyzeMood(note);
    setAnalysis(result);
    setAnalyzing(false);

    const newEntry: MoodEntry = {
      date: new Date().toLocaleDateString(),
      mood: mood,
      energy: 8, // Simplified for demo
      notes: note
    };
    setHistory([newEntry, ...history]);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-earth-900">Check-In</h1>
          <p className="text-earth-600 mt-2">Take a moment to reflect on your being.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-200 space-y-6">
          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">How are you feeling? ({mood}/10)</label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={mood} 
              onChange={(e) => setMood(parseInt(e.target.value))}
              className="w-full h-2 bg-earth-100 rounded-lg appearance-none cursor-pointer accent-sage-600"
            />
            <div className="flex justify-between text-xs text-earth-400 mt-1">
              <span>Low</span>
              <span>Balanced</span>
              <span>Vibrant</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-earth-700 mb-2">Journal Entry</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind? How does your body feel?"
              className="w-full h-32 p-4 rounded-xl border border-earth-200 focus:ring-2 focus:ring-sage-400 outline-none resize-none bg-earth-50"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={analyzing || !note}
            className="w-full py-3 bg-earth-800 text-white rounded-xl font-medium hover:bg-earth-900 transition-colors disabled:opacity-50"
          >
            {analyzing ? 'Reflecting...' : 'Save Entry'}
          </button>
        </div>

        {analysis && (
          <div className="bg-sage-50 border border-sage-100 p-6 rounded-2xl animate-in fade-in duration-500">
            <h3 className="font-serif font-bold text-sage-800 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Insight
            </h3>
            <p className="text-sage-700 mb-4">{analysis.sentiment}</p>
            <div className="space-y-2">
              {analysis.suggestions.map((sug, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-sage-600">
                   <div className="w-1.5 h-1.5 rounded-full bg-sage-400 mt-1.5 flex-shrink-0"></div>
                   {sug}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
         <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-earth-900">Recent Reflections</h2>
            <Calendar className="w-5 h-5 text-earth-400" />
         </div>

         <div className="space-y-4">
           {history.map((entry, i) => (
             <div key={i} className="bg-white p-5 rounded-xl border border-earth-100 hover:border-sage-200 transition-colors">
               <div className="flex justify-between items-start mb-2">
                 <span className="text-sm font-medium text-sage-600 bg-sage-50 px-2 py-1 rounded-md">{entry.date}</span>
                 <div className="flex gap-1">
                    {[...Array(10)].map((_, idx) => (
                      <div 
                        key={idx} 
                        className={`w-1 h-3 rounded-full ${idx < entry.mood ? 'bg-sage-400' : 'bg-earth-100'}`}
                      />
                    ))}
                 </div>
               </div>
               <p className="text-earth-600 text-sm leading-relaxed">{entry.notes}</p>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};

export default MoodTracker;