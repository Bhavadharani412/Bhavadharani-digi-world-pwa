import { useState } from 'react';
import { useAether } from '../hooks/useAether';
import { DollarSign, PenBox, MessageSquare, TrendingDown, TrendingUp, Calendar, Trash2, Flower } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function Reflect() {
  const { recentLogs, financeLogs, addLog, addFinance } = useAether();
  const [entry, setEntry] = useState('');
  const [showEntry, setShowEntry] = useState(false);

  const handleSaveEntry = async () => {
    if (!entry.trim()) return;
    await addLog({
      type: 'journal',
      content: entry,
      tags: ['reflection'],
      mood: 'balanced'
    });
    setEntry('');
    setShowEntry(false);
  };

  const totalExpense = financeLogs.reduce((acc, curr) => curr.type === 'expense' ? acc + curr.amount : acc, 0);

  return (
    <div className="py-8 space-y-8 pb-32">
      <header>
        <span className="label-mono">Deep Processing</span>
        <h2 className="text-4xl serif-display text-[--color-warm-deep]">Self Reflection</h2>
      </header>

      {/* Finance Snapshot */}
      <section className="grid grid-cols-1 gap-4">
        <div className="warm-card relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <DollarSign size={80} />
          </div>
          <span className="label-mono mb-4 block">Resource Tracking</span>
          <div className="flex items-baseline gap-2 mt-1">
            <p className="text-5xl serif-display text-amber-950">${totalExpense.toLocaleString()}</p>
            <span className="text-[9px] text-amber-600 font-bold flex items-center gap-1 uppercase tracking-widest">
              <TrendingUp size={12} /> Flux +12%
            </span>
          </div>
          <div className="mt-8 flex gap-3">
            <button 
              onClick={() => {
                const amt = prompt('Amount:');
                const cat = prompt('Category:');
                if (amt && cat) addFinance({ amount: Number(amt), category: cat, type: 'expense', note: '', date: Date.now() });
              }}
              className="flex-1 py-3 bg-white/40 border border-white/60 rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] text-amber-900/60 hover:bg-white/60 transition-all shadow-sm"
            >
              Add Expense
            </button>
            <button className="flex-1 py-3 bg-white/40 border border-white/60 rounded-2xl text-[9px] font-bold uppercase tracking-[0.2em] text-amber-900/60 hover:bg-white/60 transition-all shadow-sm">
              Insights
            </button>
          </div>
        </div>
      </section>

      {/* Journaling / Reflection Prompt */}
      <section className="bg-amber-600 rounded-[2.5rem] p-8 flex flex-col shadow-2xl shadow-amber-900/20 space-y-6 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="space-y-4 relative">
          <span className="text-amber-100/60 text-[9px] uppercase font-bold tracking-[0.2em]">Cognitive Prompt</span>
          <blockquote className="text-2xl font-serif italic text-white leading-tight">
            "What is the primary constraint blocking your progress on current projects?"
          </blockquote>
          
          <div className="relative pt-4">
             <textarea
                value={entry}
                onChange={(e) => setEntry(e.target.value)}
                placeholder="Type to capture thought..."
                className="w-full h-40 bg-white/10 border-none rounded-3xl p-6 text-md text-white placeholder-white/30 focus:ring-2 focus:ring-white/20 transition-all resize-none font-serif italic"
             />
          </div>
        </div>
        <button 
          onClick={handleSaveEntry}
          className="w-full bg-white text-amber-700 font-bold py-4 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-amber-50 active:scale-95 transition-all shadow-lg"
        >
          Commit Entry
        </button>
      </section>

      {/* History */}
      <section className="space-y-6">
        <h3 className="label-mono px-1">Thinking History</h3>
        <div className="space-y-6">
          {recentLogs.map((log) => (
            <div key={log.id} className="warm-card !p-8 group relative transition-all overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                 <Flower size={16} className="text-amber-900/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <header className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest tabular-nums">
                    {new Date(log.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {log.tags.map(t => (
                    <span key={t} className="text-[8px] bg-amber-900/5 text-amber-900/40 px-3 py-1 rounded-full uppercase font-bold tracking-widest border border-amber-900/5">{t}</span>
                  ))}
                </div>
              </header>
              <div className="prose prose-sm max-w-none text-amber-950/80 font-serif italic text-lg leading-relaxed mix-blend-multiply">
                <ReactMarkdown>{log.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {recentLogs.length === 0 && (
            <div className="py-24 bg-white/20 border-2 border-dashed border-white/40 rounded-[3rem] text-center">
               <PenBox size={32} className="mx-auto text-amber-900/10 mb-4" />
              <p className="label-mono text-amber-900/30 uppercase tracking-widest">Vacuum detected. Engage reflection.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
