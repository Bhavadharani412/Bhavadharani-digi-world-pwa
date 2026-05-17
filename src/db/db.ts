import Dexie, { type Table } from 'dexie';

export interface Project {
  id?: number;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'archived';
  progress: number;
  deadline?: string;
  category: string;
  createdAt: number;
}

export interface Task {
  id?: number;
  projectId?: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate?: string;
  createdAt: number;
}

export interface Log {
  id?: number;
  type: 'journal' | 'thought' | 'analysis' | 'decision';
  content: string;
  mood?: string;
  tags: string[];
  timestamp: number;
}

export interface FinanceLog {
  id?: number;
  amount: number;
  category: string;
  type: 'income' | 'expense' | 'investment';
  note: string;
  date: number;
}

export interface TimeLog {
  id?: number;
  activity: string;
  duration: number; // in seconds
  startTime: number;
  category: 'deep-work' | 'learning' | 'consumption' | 'routine';
}

export interface LearningItem {
  id?: number;
  subject: string;
  mastery: number; // 0-100
  streak: number;
  lastStudy: number;
}

export interface VisionItem {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  priority: number;
  category: string;
}

export interface MoodItem {
  id?: number;
  url: string;
  title?: string;
  category?: string;
  timestamp: number;
  viewStyle: 'cinematic' | 'card' | 'polaroid' | 'grid';
}

export class AetherDatabase extends Dexie {
  projects!: Table<Project>;
  tasks!: Table<Task>;
  logs!: Table<Log>;
  finance!: Table<FinanceLog>;
  timeLogs!: Table<TimeLog>;
  learning!: Table<LearningItem>;
  vision!: Table<VisionItem>;
  mood!: Table<MoodItem>;

  constructor() {
    super('AetherOS');
    this.version(2).stores({
      projects: '++id, title, status, category',
      tasks: '++id, projectId, completed, priority, dueDate',
      logs: '++id, type, *tags, timestamp',
      finance: '++id, category, type, date',
      timeLogs: '++id, activity, category, startTime',
      learning: '++id, subject, mastery',
      vision: '++id, title, category',
      mood: '++id, category, timestamp'
    });
  }
}

export const db = new AetherDatabase();
