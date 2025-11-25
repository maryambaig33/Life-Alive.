import React, { useState } from 'react';
import { Loader2, ChefHat, Leaf, Clock, Flame } from 'lucide-react';
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
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-serif font-bold text-earth-900">Nourish Your Body</h1>
        <p className="text-earth-600 mt-2">Transform your available ingredients into a vibrant Life Alive bowl.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-200">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-earth-700">Ingredients on hand</label>
              <textarea
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., quinoa, kale, sweet potato, tahini..."
                className="w-full h-32 p-4 rounded-xl border border-earth-200 focus:ring-2 focus:ring-sage-400 focus:border-transparent outline-none resize-none bg-earth-50"
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-earth-700">Dietary Preferences</label>
                <select 
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full p-4 rounded-xl border border-earth-200 focus:ring-2 focus:ring-sage-400 outline-none bg-earth-50"
                >
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Paleo">Paleo</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading || !ingredients}
                className="w-full h-14 bg-sage-600 text-white rounded-xl font-medium hover:bg-sage-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="animate-spin" /> : <ChefHat />}
                Generate Recipe
              </button>
            </div>
          </div>
        </form>
      </div>

      {recipe && (
        <div className="bg-white rounded-2xl shadow-sm border border-earth-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-sage-50 p-6 border-b border-sage-100">
            <h2 className="text-2xl font-serif font-bold text-sage-800">{recipe.name}</h2>
            <p className="text-sage-600 mt-2">{recipe.description}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-sage-700 bg-white px-3 py-1 rounded-full border border-sage-200">
                <Clock className="w-4 h-4" />
                {recipe.prepTime}
              </div>
              <div className="flex items-center gap-2 text-sm text-sage-700 bg-white px-3 py-1 rounded-full border border-sage-200">
                <Flame className="w-4 h-4" />
                {recipe.calories} kcal
              </div>
              <div className="flex items-center gap-2 text-sm text-sage-700 bg-white px-3 py-1 rounded-full border border-sage-200">
                <Leaf className="w-4 h-4" />
                Plant-Based
              </div>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg text-earth-800 mb-4 border-b border-earth-100 pb-2">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="flex items-center gap-2 text-earth-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-sage-400"></span>
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-serif font-bold text-lg text-earth-800 mb-4 border-b border-earth-100 pb-2">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((inst, i) => (
                  <li key={i} className="flex gap-4 text-earth-700">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-earth-100 text-earth-600 flex items-center justify-center text-sm font-bold">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{inst}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="bg-earth-50 p-6 border-t border-earth-100">
            <div className="flex gap-3">
              <Leaf className="w-5 h-5 text-sage-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-earth-800 text-sm uppercase tracking-wide">Wellness Benefit</h4>
                <p className="text-earth-600 text-sm mt-1">{recipe.benefits}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeGenerator;