export interface Task {
  id: string;
  text: string;
  assigneeName: string;
  assigneeInitials: string;
  assigneeColor: string; // Tailwind class
  deadline: string;
}

export interface Decision {
  id: string;
  title: string;
  description: string;
}

export interface MeetingResult {
  summary: string;
  tasks: Task[];
  decisions: Decision[];
}

export enum AppState {
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS'
}