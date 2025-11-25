import React, { useState } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Leaf, Heart, MessageCircle, ChefHat, LayoutDashboard, Menu, X } from 'lucide-react';
import Dashboard from './components/Dashboard';
import RecipeGenerator from './components/RecipeGenerator';
import WellnessChat from './components/WellnessChat';
import MoodTracker from './components/MoodTracker';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Overview' },
    { path: '/recipes', icon: ChefHat, label: 'Nourish' },
    { path: '/chat', icon: MessageCircle, label: 'Coach' },
    { path: '/mood', icon: Heart, label: 'Balance' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-earth-50 border-b border-earth-200 sticky top-0 z-50">
        <div className="flex items-center gap-2 text-sage-700 font-serif font-bold text-xl">
          <Leaf className="w-6 h-6" />
          <span>Life Alive</span>
        </div>
        <button onClick={toggleMenu} className="text-earth-800 p-2">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation (Desktop) & Mobile Drawer */}
      <nav className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-earth-100 border-r border-earth-200 transform transition-transform duration-300 ease-in-out
        md:translate-x-0 md:static md:block
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="hidden md:flex items-center gap-2 p-8 text-sage-700 font-serif font-bold text-2xl">
            <Leaf className="w-8 h-8" />
            <span>Life Alive</span>
          </div>

          <div className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive 
                      ? 'bg-sage-600 text-white shadow-md' 
                      : 'text-earth-700 hover:bg-sage-100 hover:text-sage-800'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="p-6 border-t border-earth-200">
            <div className="bg-sage-50 p-4 rounded-xl border border-sage-100">
              <p className="text-xs text-sage-600 font-medium uppercase tracking-wider mb-1">Daily Wisdom</p>
              <p className="text-sm text-sage-800 italic font-serif">"Let food be thy medicine and medicine be thy food."</p>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-earth-50">
        <Navigation />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto h-screen">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/recipes" element={<RecipeGenerator />} />
            <Route path="/chat" element={<WellnessChat />} />
            <Route path="/mood" element={<MoodTracker />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;