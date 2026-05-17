import { useState } from 'react';
import { useAether } from '../hooks/useAether';
import { Plus, CheckCircle2, Circle, Trophy, ArrowRight, Target, Flower } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Execute() {
  const { projects, activeTasks, addProject, addTask, toggleTask } = useAether();
  const [newProject, setNewProject] = useState('');
  const [showAddProject, setShowAddProject] = useState(false);

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.trim()) return;
    await addProject({
      title: newProject,
      description: '',
      status: 'active',
      progress: 0,
      category: 'General'
    });
    setNewProject('');
    setShowAddProject(false);
  };

  return (
    <div className="py-8 space-y-8 pb-32">
      <header className="flex items-end justify-between px-1">
        <div>
          <span className="label-mono">Aesthetic Productivity</span>
          <h2 className="text-4xl serif-display text-[--color-warm-deep]">Active Orbitals</h2>
        </div>
        <button
          onClick={() => setShowAddProject(!showAddProject)}
          className="w-12 h-12 rounded-2xl bg-[--color-warm-deep] flex items-center justify-center text-white hover:bg-amber-900 transition-all shadow-xl shadow-amber-900/20 active:scale-95"
        >
          <Plus size={24} />
        </button>
      </header>

      <AnimatePresence>
        {showAddProject && (
          <motion.form 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onSubmit={handleAddProject} 
            className="warm-card p-6 space-y-4"
          >
            <input
              autoFocus
              type="text"
              placeholder="Designate New Initiative..."
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="w-full bg-white/50 border border-amber-900/10 rounded-2xl px-5 py-4 text-sm text-amber-950 outline-none focus:border-amber-900/30 transition-all placeholder:text-amber-900/20"
            />
            <button type="submit" className="w-full py-4 bg-[--color-warm-deep] rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] text-white hover:bg-amber-900 transition-colors shadow-lg shadow-amber-900/10">
              Initiate Alignment
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Active Projects */}
      <section className="space-y-6">
        <h3 className="label-mono ml-1">Current Vibrations</h3>
        <div className="space-y-6">
          {projects.filter(p => p.status === 'active').map((project) => (
            <motion.div 
              layout
              key={project.id} 
              className="warm-card !p-8 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/20" />
              
              <div className="flex items-start justify-between mb-8">
                <div>
                  <h4 className="font-serif italic text-2xl text-amber-950 leading-tight tracking-tight">{project.title}</h4>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[9px] font-bold tracking-widest text-amber-700/60 uppercase">{project.category}</span>
                    <span className="w-1 h-1 bg-amber-900/10 rounded-full" />
                    <span className="text-[9px] font-bold text-amber-900/30 uppercase tracking-widest">{new Date(project.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-serif italic text-amber-600 font-bold">{project.progress}%</span>
                </div>
              </div>

              <div className="space-y-6">
                {/* Progress Bar Geometric */}
                <div className="flex gap-2 h-1">
                   {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-full transition-all duration-700 ${i < Math.ceil(project.progress / 20) ? 'bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.3)]' : 'bg-amber-900/5'}`}
                      />
                   ))}
                </div>
              
                {/* Tasks List */}
                <div className="space-y-4 pt-6 border-t border-amber-900/5 mt-6">
                  {activeTasks.filter(t => t.projectId === project.id).map(task => (
                    <button
                      key={task.id}
                      onClick={() => toggleTask(task.id!, true)}
                      className="flex items-center gap-4 w-full text-left text-amber-900/50 hover:text-amber-950 transition-all group/task"
                    >
                      <div className="w-5 h-5 border border-amber-900/10 rounded-full flex items-center justify-center group-hover/task:border-amber-600 transition-all bg-white/20">
                        <div className="w-1.5 h-1.5 bg-transparent rounded-full group-hover/task:bg-amber-600 transition-all" />
                      </div>
                      <span className="text-xs tracking-tight font-medium uppercase opacity-80 group-hover/task:opacity-100">{task.title}</span>
                    </button>
                  ))}
                  
                  <button
                    onClick={() => {
                      const title = prompt('Fragment Title:');
                      if (title) addTask({ title, projectId: project.id, completed: false, priority: 'medium' });
                    }}
                    className="flex items-center gap-2 text-[9px] uppercase font-bold tracking-[0.2em] text-amber-900/40 hover:text-amber-700 mt-6 px-4 py-2 bg-white/30 rounded-xl border border-white/50 transition-all active:scale-95"
                  >
                    <Plus size={12} /> Add Fragment
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          {projects.length === 0 && (
            <div className="py-24 text-center bg-white/20 rounded-[3rem] border-2 border-dashed border-white/40">
              <Flower size={32} className="mx-auto text-amber-900/10 mb-4" />
              <p className="label-mono">Stillness in the domain.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
