import React, { useState, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { Leaf, Heart, MessageCircle, ChefHat, LayoutDashboard, Menu, X, Loader2 } from 'lucide-react';

// Lazy load components to split chunks and reduce initial bundle size
const Dashboard = lazy(() => import('./components/Dashboard'));
const RecipeGenerator = lazy(() => import('./components/RecipeGenerator'));
const WellnessChat = lazy(() => import('./components/WellnessChat'));
const MoodTracker = lazy(() => import('./components/MoodTracker'));

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
                  <span className="font-medium tracking-wide">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="p-6 border-t border-earth-200">
            <div className="bg-sage-50 p-6 rounded-xl border border-sage-100 text-center">
              <p className="text-xs text-sage-600 font-bold uppercase tracking-widest mb-2">Daily Mantra</p>
              <p className="text-sm text-sage-800 italic font-serif leading-relaxed">"Let food be thy medicine and medicine be thy food."</p>
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

const PageLoader = () => (
  <div className="h-full w-full flex flex-col items-center justify-center text-sage-600 min-h-[60vh]">
    <Loader2 className="w-8 h-8 animate-spin mb-2" />
    <span className="font-serif text-earth-600">Preparing your space...</span>
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="flex flex-col md:flex-row min-h-screen bg-earth-50 font-sans">
        <Navigation />
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 overflow-y-auto h-screen scroll-smooth">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recipes" element={<RecipeGenerator />} />
              <Route path="/chat" element={<WellnessChat />} />
              <Route path="/mood" element={<MoodTracker />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
};

export default App;