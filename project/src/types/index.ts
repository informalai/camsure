export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'manager' | 'developer' | 'tester';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  key: string;
  createdAt: Date;
  members: User[];
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'backlog' | 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assigneeId?: string;
  reporterId: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  comments: Comment[];
  tags: string[];
  attachments?: string[];
  estimatedHours?: number;
  loggedHours?: number;
}

export interface Activity {
  id: string;
  type: 'created' | 'updated' | 'assigned' | 'commented' | 'status_changed';
  ticketId: string;
  userId: string;
  description: string;
  createdAt: Date;
}