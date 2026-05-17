import { useState } from 'react';
import { useAether } from '../hooks/useAether';
import { Image as ImageIcon, Lightbulb, Map, Star, Compass, Filter } from 'lucide-react';

export default function Vault() {
  const [activeTab, setActiveTab] = useState<'vision' | 'ideas'>('vision');

  const visionItems = [
    { id: 1, title: 'Sustainable Architecture Lab', category: 'Project', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400' },
    { id: 2, title: 'Mastery of Quantum Computing', category: 'Growth', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400' },
    { id: 3, title: 'Pacific Ridge Expedition', category: 'Life', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <div className="py-8 space-y-8 pb-32">
      <header className="flex items-center justify-between">
        <div>
          <span className="label-mono">Vision Vault</span>
          <h2 className="text-3xl font-light text-white italic tracking-tight">Aspirations</h2>
        </div>
        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 overflow-hidden">
          <button 
            onClick={() => setActiveTab('vision')}
            className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'vision' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Vision
          </button>
          <button 
            onClick={() => setActiveTab('ideas')}
            className={`px-3 py-1.5 rounded-lg text-[10px] uppercase font-bold tracking-widest transition-all ${activeTab === 'ideas' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Ideas
          </button>
        </div>
      </header>

      {activeTab === 'vision' ? (
        <section className="grid grid-cols-1 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {visionItems.map((item) => (
            <div key={item.id} className="group relative rounded-3xl overflow-hidden aspect-[16/10] border border-slate-800">
              <img 
                src={item.image} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {item.category}
                </span>
                <h3 className="text-xl font-medium text-white leading-tight">{item.title}</h3>
              </div>
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                <div className="w-10 h-10 rounded-full bg-slate-900/80 backdrop-blur-md flex items-center justify-center border border-slate-700/50">
                  <Star size={16} fill="white" className="text-white" />
                </div>
              </div>
            </div>
          ))}
          <button className="py-16 border-2 border-dashed border-slate-800 rounded-3xl flex flex-col items-center justify-center text-slate-600 hover:text-slate-400 hover:border-slate-700 transition-all group">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-all">
               <ImageIcon size={20} />
            </div>
            <p className="label-mono">Envision New Reality</p>
          </button>
        </section>
      ) : (
        <section className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="bg-[#151518] border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-6 py-24">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-slate-700">
                 <Lightbulb size={32} />
              </div>
              <div className="space-y-2">
                 <h4 className="font-medium text-slate-300">Idea Synthesis Active</h4>
                 <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono max-w-[240px] leading-relaxed">System ready to structure your next breakthrough idea.</p>
              </div>
              <button className="px-8 py-3 bg-indigo-600 rounded-xl text-[10px] font-bold tracking-widest uppercase text-white hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20">
                 Initiate Capture
              </button>
           </div>
        </section>
      )}

      {/* Global Explorer Button */}
      <div className="fixed bottom-24 right-6 pointer-events-none">
        <button className="w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40 flex items-center justify-center pointer-events-auto border border-white/10 active:scale-95 transition-all">
           <Compass size={24} />
        </button>
      </div>
    </div>
  );
}
