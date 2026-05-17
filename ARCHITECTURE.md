# Aether OS Architecture

## 1. Core Philosophy
- **Local-First**: Primary data resides in IndexedDB (via Dexie.js).
- **Tactical UX**: Mobile-first, thumb-friendly, one-handed navigation.
- **Intelligent**: Gemini-powered insights layer.

## 2. Technology Stack
- **Frontend**: React + TypeScript + Tailwind CSS + Framer Motion (motion).
- **Backend**: Express (Gemini Proxy).
- **Storage**: IndexedDB (Dexie).
- **AI**: Gemini 2.0 Flash.

## 3. Data Schema (Dexie)
- `projects`: { id, title, status, progress, deadline, tags }
- `tasks`: { id, projectId, title, completed, priority, dueDate }
- `logs`: { id, type, content, timestamp, mood, metadata }
- `finance`: { id, amount, category, type, date, note }
- `time_logs`: { id, activity, duration, startTime, category }
- `learning`: { id, subject, status, streak, heatmapData }
- `vision`: { id, title, image, priority, category }

## 4. UI/UX Hierarchy
- **Home**: Command Center.
- **Focus**: Active timers and priorities.
- **Execute**: Project Kanban & Timeline.
- **Grow**: Learning & Habit heatmaps.
- **Reflect**: Journaling & Spending analysis.
- **Vault**: Vision Board & Thinking space.
