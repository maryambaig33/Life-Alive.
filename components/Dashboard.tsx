import React, { useState } from 'react';
import { Sun, Droplets, Moon, Wind, ArrowRight } from 'lucide-react';
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
}> = ({ icon: Icon, label, value, subtext, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-earth-200 flex items-start space-x-4">
    <div className={`p-3 rounded-xl ${color} bg-opacity-20`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-earth-500 text-sm font-medium">{label}</p>
      <h3 className="text-2xl font-serif font-bold text-earth-900 mt-1">{value}</h3>
      <p className="text-xs text-earth-400 mt-1">{subtext}</p>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [hydration, setHydration] = useState(4);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-earth-900">Good Morning, Maryam</h1>
        <p className="text-earth-600 mt-2">Let's nurture your vitality today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={Droplets}
          label="Hydration"
          value={`${hydration} / 8`}
          subtext="Glasses of water"
          color="bg-blue-500 text-blue-600"
        />
        <StatCard 
          icon={Sun}
          label="Mindfulness"
          value="15 min"
          subtext="Morning meditation"
          color="bg-orange-500 text-orange-600"
        />
        <StatCard 
          icon={Moon}
          label="Sleep"
          value="7h 20m"
          subtext="Restful sleep"
          color="bg-indigo-500 text-indigo-600"
        />
         <StatCard 
          icon={Wind}
          label="Breath"
          value="Calm"
          subtext="Current state"
          color="bg-sage-500 text-sage-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-earth-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-serif font-bold text-earth-900">Weekly Vitality</h2>
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-sage-300"></span>
              <span className="text-xs text-earth-500">Wellness Score</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#967657'}} />
                <YAxis hide />
                <Tooltip 
                  cursor={{fill: '#f6f3ee'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="wellness" radius={[4, 4, 0, 0]}>
                  {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 5 ? '#568156' : '#dbccb8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-sage-600 p-6 rounded-2xl text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-sage-500 rounded-full opacity-50 blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-sage-700 rounded-full opacity-50 blur-xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-xl font-serif font-bold mb-2">Feeling hungry?</h2>
            <p className="text-sage-100 mb-6">Discover a nourishing bowl tailored to your body's needs today.</p>
            <NavLink 
              to="/recipes"
              className="inline-flex items-center gap-2 bg-white text-sage-700 px-4 py-2 rounded-lg font-medium hover:bg-sage-50 transition-colors"
            >
              Generate Meal <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;