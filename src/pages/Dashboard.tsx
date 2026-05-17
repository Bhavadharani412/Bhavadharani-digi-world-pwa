import { useState, useEffect } from 'react';
import { useAether } from '../hooks/useAether';
import { Sparkles, Brain, TrendingUp, Clock, History, ArrowRight, Target } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { projects, activeTasks, timeLogs, resetData } = useAether();
  const [insight, setInsight] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset your digital sanctuary? This will clear all data.")) {
      await resetData();
      window.location.reload();
    }
  };

  useEffect(() => {
    // Generate initial insight
    if (projects.length > 0 && !insight) {
      handleGetInsight();
    }
  }, [projects]);

  const handleGetInsight = async () => {
    setLoadingInsight(true);
    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: "Analyze my current status and give me a tactical recommendation for the next 24 hours.",
          context: { projects, activeTasks, timeLogs }
        })
      });
      const data = await response.json();
      setInsight(data.text);
    } catch (e) {
      console.error(e);
      setInsight("Focus on the highest priority initiative. System offline.");
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div className="py-8 space-y-8 animate-in fade-in duration-700 pb-32">
      <header>
        <span className="label-mono">Sanctuary Control</span>
        <h2 className="text-4xl serif-display text-[--color-warm-deep]">Deep Flow</h2>
      </header>

      {/* AI Insight Module */}
      <section className="relative group">
        <div className="warm-card relative flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles size={80} />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-amber-700/60">
              <Sparkles size={16} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Intuitive Guidance</span>
            </div>
            <button 
              onClick={handleGetInsight}
              disabled={loadingInsight}
              className="text-amber-900/20 hover:text-amber-700 transition-colors"
            >
              <History size={14} className={loadingInsight ? "animate-spin" : ""} />
            </button>
          </div>
          
          <div className="min-h-[60px]">
            {loadingInsight ? (
              <div className="space-y-2">
                <div className="h-3 bg-amber-900/5 rounded w-full animate-pulse" />
                <div className="h-3 bg-amber-900/5 rounded w-2/3 animate-pulse" />
              </div>
            ) : (
              <p className="text-amber-950 font-serif italic text-lg leading-relaxed">
                "{insight || "The system is silent. Initiate protocol to receive guidance."}"
              </p>
            )}
          </div>
          
          <div className="flex gap-2 mt-6">
            <span className="px-3 py-1 bg-white/40 border border-white/60 rounded-full text-[8px] uppercase text-amber-900/60 tracking-widest font-bold">Attuned</span>
            <span className="px-3 py-1 bg-white/40 border border-white/60 rounded-full text-[8px] uppercase text-amber-900/60 tracking-widest font-bold">Synchronized</span>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          icon={<Brain size={14} />} 
          label="Neural Growth" 
          value="82%" 
          sub="Consistent +5%" 
        />
        <StatCard 
          icon={<Clock size={14} />} 
          label="Deep Work" 
          value="18h" 
          sub="In Orbit" 
        />
      </div>

      {/* Priority Focus */}
      <section className="space-y-6">
        <h3 className="label-mono ml-1">Current Vibrations</h3>
        <div className="space-y-3">
          {activeTasks.slice(0, 3).map((task) => (
            <div key={task.id} className="bg-white/30 backdrop-blur-sm border border-white/50 rounded-2xl p-5 flex items-center justify-between hover:border-amber-500/20 transition-all cursor-pointer group shadow-sm">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${task.priority === 'high' ? 'bg-amber-600' : 'bg-amber-300'}`} />
                <p className="text-sm font-medium text-amber-950/80 group-hover:text-amber-950 transition-colors uppercase tracking-tight">{task.title}</p>
              </div>
              <ArrowRight size={14} className="text-amber-900/20 group-hover:text-amber-700" />
            </div>
          ))}
          {activeTasks.length === 0 && (
            <div className="py-12 bg-white/20 border-2 border-dashed border-white/40 rounded-[2.5rem] flex flex-col items-center justify-center text-amber-900/20">
              <Target size={24} className="mb-3 opacity-40" />
              <p className="label-mono">Stillness maintained.</p>
            </div>
          )}
        </div>
      </section>

      {/* Momentum Indicator */}
      <section className="warm-card space-y-4">
        <div className="flex items-center justify-between">
          <span className="label-mono">Energy Flow</span>
          <TrendingUp size={14} className="text-amber-600" />
        </div>
        <div className="flex items-end gap-2 h-16">
          {[40, 60, 30, 90, 70, 50, 80].map((val, i) => (
            <div 
              key={i} 
              className="flex-1 bg-amber-900/5 border border-white/20 rounded-full hover:bg-amber-500/20 transition-all cursor-crosshair h-full overflow-hidden relative"
            >
               <motion.div 
                 initial={{ height: 0 }}
                 animate={{ height: `${val}%` }}
                 transition={{ delay: i * 0.1, duration: 0.8 }}
                 className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-amber-600/40 to-amber-400/20"
               />
            </div>
          ))}
        </div>
      </section>

      {/* Reset Utility */}
      <section className="flex justify-center pt-8 opacity-30 hover:opacity-100 transition-opacity">
        <button 
          onClick={handleReset}
          className="text-[9px] font-bold uppercase tracking-[0.3em] text-red-900/60 hover:text-red-900 transition-colors py-4 px-8 border border-red-900/10 rounded-full"
        >
          Reset Digital Sanctuary
        </button>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value, sub }: { icon: any, label: string, value: string, sub: string }) {
  return (
    <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-5 space-y-1 shadow-sm">
      <div className="flex items-center gap-2 text-amber-900/40 mb-1">
        {icon}
        <span className="label-mono !text-amber-900/40">{label}</span>
      </div>
      <p className="text-3xl font-serif italic text-amber-950 tracking-tight">{value}</p>
      <p className="text-[10px] font-bold text-amber-900/20 uppercase tracking-widest flex items-center gap-1">
        {sub}
      </p>
    </div>
  );
}
