import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Sparkles, Image as ImageIcon, LayoutGrid, Folders, Maximize2, Trash2, Plus, X, Upload } from 'lucide-react';
import { useAether } from '../hooks/useAether';

export default function MoodFlow() {
  const { moodItems, addMoodItem, deleteMoodItem } = useAether();
  const [viewStyle, setViewStyle] = useState<'cinematic' | 'card' | 'polaroid' | 'grid'>('cinematic');
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;
    await addMoodItem({
      url: newUrl,
      category: newCategory || 'Atmosphere',
      viewStyle: viewStyle
    });
    setNewUrl('');
    setNewCategory('');
    setShowAdd(false);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex items-end justify-between px-1">
        <div>
          <span className="label-mono">Digital Sanctuary</span>
          <h2 className="text-4xl serif-display text-[--color-warm-deep]">Mood Flow</h2>
        </div>
        <div className="flex bg-white/40 p-1 rounded-2xl border border-white/50 shadow-sm">
          <button 
            onClick={() => setViewStyle('cinematic')}
            className={`p-2 rounded-xl transition-all ${viewStyle === 'cinematic' ? 'bg-[--color-warm-deep] text-white shadow-md' : 'text-amber-900/40'}`}
          >
            <Folders size={18} />
          </button>
          <button 
            onClick={() => setViewStyle('grid')}
            className={`p-2 rounded-xl transition-all ${viewStyle === 'grid' ? 'bg-[--color-warm-deep] text-white shadow-md' : 'text-amber-900/40'}`}
          >
            <LayoutGrid size={18} />
          </button>
        </div>
      </header>

      {/* Viewport */}
      <div 
        ref={containerRef}
        className={`relative rounded-[3rem] overflow-hidden bg-white/20 border border-white/40 shadow-2xl shadow-amber-900/5 no-scrollbar ${
          viewStyle === 'cinematic' ? 'h-[60vh] overflow-y-auto snap-y snap-mandatory' : 'min-h-[50vh]'
        }`}
      >
        <AnimatePresence mode="wait">
          {moodItems.length === 0 ? (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4"
            >
              <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-amber-900/20">
                <ImageIcon size={32} />
              </div>
              <p className="label-mono text-amber-900/40">Sanctuary Vacuum. <br/>Upload your first fragment.</p>
              <button 
                onClick={() => setShowAdd(true)}
                className="px-6 py-2.5 bg-[--color-warm-deep] text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-amber-900/20 active:scale-95 transition-all"
              >
                Initiate Flow
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key={viewStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewStyle === 'grid' ? 'grid grid-cols-2 gap-4 p-6' : 'space-y-0'}
            >
              {moodItems.map((item, index) => (
                <MoodCard 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  viewStyle={viewStyle}
                  onDelete={() => deleteMoodItem(item.id!)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Add Button */}
        {moodItems.length > 0 && (
          <button 
            onClick={() => setShowAdd(true)}
            className="fixed bottom-32 right-10 w-14 h-14 rounded-full bg-[--color-warm-deep] text-white flex items-center justify-center shadow-2xl shadow-amber-900/40 active:scale-90 transition-all z-10"
          >
            <Plus size={24} />
          </button>
        )}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-amber-900/40 backdrop-blur-md"
            />
            <motion.form 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onSubmit={handleAdd}
              className="relative w-full max-w-sm bg-[--bg-warm] p-8 rounded-[2.5rem] shadow-2xl border border-white/50 space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="serif-display text-2xl">Capture Moment</h3>
                <button type="button" onClick={() => setShowAdd(false)} className="text-amber-900/40">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input 
                    autoFocus
                    placeholder="Image Fragment URL..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="flex-1 bg-white/50 border border-amber-900/10 rounded-2xl p-4 text-sm outline-none focus:border-amber-900/30 transition-all placeholder:text-amber-900/20"
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square bg-white/50 border border-amber-900/10 rounded-2xl p-4 flex items-center justify-center text-amber-900/40 hover:text-amber-700 transition-colors"
                  >
                    <Upload size={20} />
                  </button>
                  <input 
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileUpload}
                  />
                </div>
                {newUrl.startsWith('data:') && (
                  <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/50">
                    <img src={newUrl} className="w-full h-full object-cover" />
                  </div>
                )}
                <input 
                  placeholder="Designation (e.g. Dreamscape)..."
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-white/50 border border-amber-900/10 rounded-2xl p-4 text-sm outline-none focus:border-amber-900/30 transition-all placeholder:text-amber-900/20"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-[--color-warm-deep] text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-lg shadow-amber-900/20"
              >
                Commit to Memory
              </button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MoodCard({ item, index, viewStyle, onDelete }: { item: any, index: number, viewStyle: string, onDelete: () => void }) {
  if (viewStyle === 'cinematic') {
    return (
      <div className="h-full w-full snap-start relative group">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="h-full w-full"
        >
          <img 
            src={item.url} 
            alt={item.title} 
            className="h-full w-full object-cover transition-transform duration-[2s] group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-10 left-10 right-10">
            <span className="label-mono text-white/60 mb-2 block">{item.category}</span>
            <h4 className="text-3xl text-white serif-display">{item.title || 'Untitled Moment'}</h4>
          </div>
          <button 
            onClick={onDelete}
            className="absolute top-6 right-6 p-3 bg-black/20 backdrop-blur-md rounded-full text-white/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </motion.div>
      </div>
    );
  }

  if (viewStyle === 'grid') {
    return (
      <motion.div 
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="aspect-[3/4] relative rounded-3xl overflow-hidden shadow-xl border border-white/30 group"
      >
        <img 
          src={item.url} 
          alt={item.title} 
          className="h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-amber-950/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onDelete} className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white">
            <Trash2 size={14} />
          </button>
        </div>
      </motion.div>
    );
  }

  return null;
}
