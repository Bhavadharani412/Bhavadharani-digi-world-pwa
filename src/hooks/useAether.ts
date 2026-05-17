import { useLiveQuery } from 'dexie-react-hooks';
import { db, type Project, type Task, type Log, type FinanceLog, type TimeLog, type LearningItem, type MoodItem } from '../db/db';

export function useAether() {
  const projects = useLiveQuery(() => db.projects.toArray()) || [];
  const activeTasks = useLiveQuery(() => db.tasks.where('completed').equals(0).toArray()) || [];
  const recentLogs = useLiveQuery(() => db.logs.orderBy('timestamp').reverse().limit(10).toArray()) || [];
  const financeLogs = useLiveQuery(() => db.finance.orderBy('date').reverse().limit(20).toArray()) || [];
  const timeLogs = useLiveQuery(() => db.timeLogs.orderBy('startTime').reverse().limit(10).toArray()) || [];
  const learningItems = useLiveQuery(() => db.learning.toArray()) || [];
  const moodItems = useLiveQuery(() => db.mood.orderBy('timestamp').reverse().toArray()) || [];

  const addProject = (project: Omit<Project, 'id' | 'createdAt'>) => {
    return db.projects.add({ ...project, createdAt: Date.now() });
  };

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    return db.tasks.add({ ...task, createdAt: Date.now() });
  };

  const addLog = (log: Omit<Log, 'id' | 'timestamp'>) => {
    return db.logs.add({ ...log, timestamp: Date.now() });
  };

  const addFinance = (entry: Omit<FinanceLog, 'id'>) => {
    return db.finance.add(entry);
  };

  const addTimeLog = (entry: Omit<TimeLog, 'id'>) => {
    return db.timeLogs.add(entry);
  };

  const toggleTask = (id: number, completed: boolean) => {
    return db.tasks.update(id, { completed });
  };

  const addMoodItem = (item: Omit<MoodItem, 'id' | 'timestamp'>) => {
    return db.mood.add({ ...item, timestamp: Date.now() });
  };

  const deleteMoodItem = (id: number) => {
    return db.mood.delete(id);
  };

  const resetData = async () => {
    await Promise.all([
      db.projects.clear(),
      db.tasks.clear(),
      db.logs.clear(),
      db.finance.clear(),
      db.timeLogs.clear(),
      db.learning.clear(),
      db.vision.clear(),
      db.mood.clear()
    ]);
  };

  return {
    projects,
    activeTasks,
    recentLogs,
    financeLogs,
    timeLogs,
    learningItems,
    moodItems,
    addProject,
    addTask,
    addLog,
    addFinance,
    addTimeLog,
    toggleTask,
    addMoodItem,
    deleteMoodItem,
    resetData
  };
}
