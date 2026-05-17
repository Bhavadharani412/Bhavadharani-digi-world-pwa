import { useState, useEffect } from 'react';
import { useAether } from '../hooks/useAether';
import { Book, Play, Pause, RotateCcw, Brain, BarChart3, ChevronRight, Zap, Flower } from 'lucide-react';
import { motion } from 'motion/react';

export default function Grow() {
  const { learningItems, timeLogs, addTimeLog } = useAether();
  const [activeTimer, setActiveTimer] = useState<{ id: string; startTime: number } | null>(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    let interval: any;
    if (activeTimer) {
      interval = setInterval(() => {
        setElapsed(Math.floor((Date.now() - activeTimer.startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeTimer]);

  const toggleTimer = () => {
    if (activeTimer) {
      addTimeLog({
        activity: 'Deep Work Session',
        duration: elapsed,
        startTime: activeTimer.startTime,
        category: 'deep-work'
      });
      setActiveTimer(null);
      setElapsed(0);
    } else {
      setActiveTimer({ id: 'current', startTime: Date.now() });
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="py-8 space-y-8 pb-32">
      <header>
        <span className="label-mono">Neural Enrichment</span>
        <h2 className="text-4xl serif-display text-[--color-warm-deep]">Capacity Protocol</h2>
      </header>

      {/* Focus Timer */}
      <section className="warm-card p-12 flex flex-col items-center justify-center space-y-10 relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-10 transition-opacity rotate-12">
           <Zap size={240} />
        </div>
        <div className="text-center relative">
          <span className="label-mono block mb-4">Alignment Frequency</span>
          <p className="text-7xl serif-display text-amber-950 tabular-nums">
            {formatTime(elapsed)}
          </p>
        </div>
        <div className="flex items-center gap-10 relative">
          <button
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              activeTimer ? 'bg-amber-900/10 text-amber-900 border border-amber-900/20' : 'bg-[--color-warm-deep] text-white shadow-2xl shadow-amber-900/30 active:scale-90 px-1'
            }`}
          >
            {activeTimer ? <Pause size={32} /> : <Play size={32} className="ml-1" />}
          </button>
          {activeTimer && (
            <button onClick={() => { setActiveTimer(null); setElapsed(0); }} className="text-amber-900/30 hover:text-amber-900 transition-colors">
              <RotateCcw size={24} />
            </button>
          )}
        </div>
      </section>

      {/* Mastery Tracking */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h3 className="label-mono">Cognitive Modules</h3>
          <BarChart3 size={14} className="text-amber-900/20" />
        </div>
        <div className="grid gap-4">
          {learningItems.map((item) => (
            <div key={item.id} className="bg-white/40 backdrop-blur-sm border border-white/50 rounded-[2rem] p-6 flex items-center justify-between group cursor-pointer hover:border-amber-500/20 transition-all shadow-sm">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-amber-900/5 border border-amber-900/5 flex items-center justify-center text-amber-700">
                  <Brain size={24} />
                </div>
                <div>
                  <h4 className="text-md font-serif italic text-amber-950">{item.subject}</h4>
                  <p className="text-[10px] text-amber-900/30 uppercase tracking-[0.2em] font-bold mt-1">Consistency: {item.streak}D</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-serif italic text-amber-600 font-bold">{item.mastery}%</span>
                <ChevronRight size={14} className="text-amber-900/10 group-hover:text-amber-700 transition-colors" />
              </div>
            </div>
          ))}
          {learningItems.length === 0 && (
            <div className="py-24 border-2 border-dashed border-white/40 rounded-[3rem] text-center bg-white/10">
              <Flower size={32} className="mx-auto text-amber-900/10 mb-4" />
              <p className="label-mono">Stillness in growth.</p>
            </div>
          )}
        </div>
      </section>

      {/* History */}
      <section className="space-y-4">
        <h3 className="label-mono px-1">Chronicle of Focus</h3>
        <div className="space-y-3">
          {timeLogs.map(log => (
            <div key={log.id} className="flex items-center justify-between text-xs px-6 py-5 bg-white/20 rounded-2xl border border-white/40 group hover:border-amber-500/10 transition-all shadow-sm">
              <span className="text-amber-950/60 group-hover:text-amber-950 transition-colors uppercase tracking-tight font-bold">{log.activity}</span>
              <span className="text-amber-900/40 font-serif italic tabular-nums">{Math.floor(log.duration / 60)}M {log.duration % 60}S</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
