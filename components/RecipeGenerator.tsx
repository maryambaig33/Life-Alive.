import React, { useState } from 'react';
import { Loader2, ChefHat, Leaf, Clock, Flame, Info } from 'lucide-react';
import { generateRecipe } from '../services/geminiService';
import { Recipe } from '../types';

const RecipeGenerator: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [dietary, setDietary] = useState('Vegetarian');
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ingredients.trim()) return;

    setLoading(true);
    setRecipe(null);
    try {
      const result = await generateRecipe(ingredients, dietary);
      setRecipe(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-serif font-bold text-earth-900">The Organic Kitchen</h1>
        <p className="text-earth-600 text-lg">Curate a nourishing bowl from your pantry.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-earth-100">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-sm font-bold text-earth-800 uppercase tracking-wide flex items-center gap-2">
                <Leaf className="w-4 h-4 text-sage-500" />
                Available Ingredients
              </label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., quinoa, kale, sweet potato, tahini, lemon..."
                className="w-full h-40 p-5 rounded-xl border border-earth-200 focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none resize-none bg-earth-50/50 text-earth-700 placeholder:text-earth-300 transition-all"
              />
            </div>
            <div className="space-y-6 flex flex-col justify-between">
              <div className="space-y-3">
                <label className="text-sm font-bold text-earth-800 uppercase tracking-wide">Dietary Preference</label>
                <div className="relative">
                  <select 
                    value={dietary}
                    onChange={(e) => setDietary(e.target.value)}
                    className="w-full p-4 rounded-xl border border-earth-200 focus:ring-2 focus:ring-sage-400 outline-none bg-earth-50/50 text-earth-700 appearance-none cursor-pointer"
                  >
                    <option value="Vegan">Vegan</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Gluten-Free">Gluten-Free</option>
                    <option value="Paleo">Paleo</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-earth-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading || !ingredients}
                className="w-full h-14 bg-sage-700 text-white rounded-xl font-bold hover:bg-sage-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-sage-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <ChefHat className="w-5 h-5" />}
                <span>{loading ? 'Consulting Chef...' : 'Create My Bowl'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {recipe && (
        <div className="relative bg-[#F9F7F2] rounded-2xl shadow-lg border border-[#E6DCCA] overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Menu Card Styling */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sage-400 via-sage-600 to-sage-400"></div>
          
          <div className="p-8 md:p-10">
            <div className="text-center border-b-2 border-dashed border-[#dcd0bc] pb-8 mb-8">
              <span className="inline-block px-4 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-bold uppercase tracking-widest mb-4">
                Chef's Selection
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-earth-900 mb-4">{recipe.name}</h2>
              <p className="text-earth-600 italic text-lg max-w-2xl mx-auto">{recipe.description}</p>
              
              <div className="flex justify-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm font-medium text-earth-500">
                  <Clock className="w-4 h-4" />
                  {recipe.prepTime}
                </div>
                <div className="w-px h-4 bg-earth-300"></div>
                <div className="flex items-center gap-2 text-sm font-medium text-earth-500">
                  <Flame className="w-4 h-4" />
                  {recipe.calories} kcal
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-serif font-bold text-2xl text-earth-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-earth-300"></span>
                  Ingredients
                </h3>
                <ul className="space-y-3">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3 text-earth-700 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-sage-500 mt-2 group-hover:scale-125 transition-transform"></span>
                      <span className="font-medium">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-serif font-bold text-2xl text-earth-800 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-earth-300"></span>
                  Preparation
                </h3>
                <ol className="space-y-6">
                  {recipe.instructions.map((inst, i) => (
                    <li key={i} className="flex gap-4 text-earth-700">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full border-2 border-earth-200 text-earth-600 flex items-center justify-center text-sm font-serif font-bold">
                        {i + 1}
                      </span>
                      <span className="leading-relaxed mt-1">{inst}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-sage-600 p-6 text-white flex items-start gap-4">
            <Info className="w-6 h-6 flex-shrink-0 mt-1 opacity-80" />
            <div>
              <h4 className="font-bold font-serif text-lg">Why this nourishes you</h4>
              <p className="text-sage-100 mt-1 leading-relaxed opacity-90">{recipe.benefits}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;