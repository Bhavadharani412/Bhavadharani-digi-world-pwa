import { type ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Zap, BookOpen, PenTool, Sparkles, Heart, Flower } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ShellProps {
  children: ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-[--color-warm-bg] text-[--color-warm-ink] font-sans selection:bg-amber-200">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/20 bg-white/20 backdrop-blur-xl z-40 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-900/20 overflow-hidden">
            <img 
  src="/img.png"
  className="w-full h-full object-cover"
  alt="App Icon"
/>
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-bold tracking-[0.2em] text-amber-900/40 uppercase">DIGI-WORLD</span>
            <span className="text-sm font-light italic serif-display text-[--color-warm-ink]">Bhava Core</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/30 rounded-full border border-white/40 shadow-sm">
          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <span className="text-[8px] uppercase tracking-widest font-bold text-amber-900/60">Sanctuary Active</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-32 pt-16 max-w-lg mx-auto min-h-screen px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-6 left-6 right-6 h-20 bg-white/40 backdrop-blur-2xl border border-white/50 rounded-[2.5rem] shadow-2xl shadow-amber-900/10 z-50 flex items-center justify-around px-2 overflow-hidden">
        <TabItem to="/" icon={<LayoutDashboard size={22} />} label="Today" />
        <TabItem to="/mood" icon={<Sparkles size={22} />} label="Mood" />
        <TabItem to="/execute" icon={<Zap size={22} />} label="Execute" />
        <TabItem to="/grow" icon={<BookOpen size={22} />} label="Grow" />
        <TabItem to="/reflect" icon={<PenTool size={22} />} label="Reflect" />
      </nav>
    </div>
  );
}

function TabItem({ to, icon, label }: { to: string; icon: ReactNode; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-col items-center gap-1 px-3 py-2 transition-all duration-500 relative ${
          isActive ? 'text-[--color-warm-deep]' : 'text-amber-900/30 hover:text-amber-900/60'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <div className={`transition-transform duration-500 ${isActive ? 'scale-110 -translate-y-1' : ''}`}>
            {icon}
          </div>
          <span className={`text-[8px] font-bold tracking-widest uppercase transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
            {label}
          </span>
          {isActive && (
            <motion.div 
              layoutId="nav-dot"
              className="absolute -bottom-1 w-1 h-1 bg-[--color-warm-deep] rounded-full"
            />
          )}
        </>
      )}
    </NavLink>
  );
}
