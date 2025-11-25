import React, { useState } from 'react';
import { Sun, Droplets, Moon, Wind, ArrowRight, UtensilsCrossed } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
  { name: 'Mon', wellness: 70 },
  { name: 'Tue', wellness: 85 },
  { name: 'Wed', wellness: 60 },
  { name: 'Thu', wellness: 90 },
  { name: 'Fri', wellness: 75 },
  { name: 'Sat', wellness: 95 },
  { name: 'Sun', wellness: 80 },
];

const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string;
  subtext: string;
  color: string;
  bgClass: string;
}> = ({ icon: Icon, label, value, subtext, color, bgClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-earth-100 flex items-start space-x-4 hover:border-sage-200 transition-colors">
    <div className={`p-3 rounded-full ${bgClass}`}>
      <Icon className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <p className="text-earth-500 text-xs font-bold uppercase tracking-wider">{label}</p>
      <h3 className="text-2xl font-serif font-bold text-earth-900 mt-1">{value}</h3>
      <p className="text-xs text-earth-400 mt-1">{subtext}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [hydration, setHydration] = useState(4);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-earth-200 pb-6">
        <div>
          <h1 className="text-4xl font-serif font-bold text-earth-900">Good Morning, Maryam</h1>
          <p className="text-earth-600 mt-2 text-lg">Your daily ritual for vitality and balance.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-sage-700">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Droplets}
          label="Hydration"
          value={`${hydration} / 8`}
          subtext="Glasses of water"
          color="text-blue-600"
          bgClass="bg-blue-50"
        />
        <StatCard 
          icon={Sun}
          label="Mindfulness"
          value="15 min"
          subtext="Morning meditation"
          color="text-orange-600"
          bgClass="bg-orange-50"
        />
        <StatCard 
          icon={Moon}
          label="Sleep"
          value="7h 20m"
          subtext="Restful sleep"
          color="text-indigo-600"
          bgClass="bg-indigo-50"
        />
         <StatCard 
          icon={Wind}
          label="Breath"
          value="Calm"
          subtext="Current state"
          color="text-sage-600"
          bgClass="bg-sage-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-earth-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-serif font-bold text-earth-900">Weekly Vitality</h2>
            <div className="flex gap-3 items-center">
              <span className="w-2 h-2 rounded-full bg-sage-500"></span>
              <span className="text-xs font-medium text-earth-500 uppercase tracking-wide">Wellness Score</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#967657', fontSize: 12}} 
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f6f3ee', opacity: 0.4}}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '12px', 
                    border: '1px solid #e3ebe3', 
                    boxShadow: '0 4px 20px -5px rgba(0,0,0,0.1)',
                    fontFamily: 'Inter',
                    color: '#554335'
                  }}
                />
                <Bar dataKey="wellness" radius={[6, 6, 6, 6]} barSize={32}>
                  {mockData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={index === 5 ? '#568156' : '#dbccb8'} 
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-sage-700 p-8 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden shadow-lg group">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-sage-600 rounded-full opacity-50 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-sage-800 rounded-full opacity-50 blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
          
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 backdrop-blur-sm">
               <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-serif font-bold mb-3 leading-tight">Hungry for<br/>something real?</h2>
            <p className="text-sage-100 mb-8 leading-relaxed opacity-90">Craft a custom Life Alive bowl using ingredients you already have.</p>
            <NavLink 
              to="/recipes"
              className="inline-flex items-center gap-2 bg-white text-sage-800 px-6 py-3 rounded-xl font-bold hover:bg-sage-50 transition-all transform hover:translate-x-1 shadow-md"
            >
              Open Kitchen <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;