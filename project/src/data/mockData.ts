import { User, Project, Ticket, Activity } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'manager'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'developer'
  },
  {
    id: '4',
    name: 'Emily Chen',
    email: 'emily@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'developer'
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=150',
    role: 'tester'
  }
];

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Next-generation e-commerce platform with advanced features',
    key: 'ECOM',
    createdAt: new Date('2024-01-01'),
    members: mockUsers
  }
];

export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Implement user authentication system',
    description: 'Create a secure authentication system with JWT tokens, password hashing, and user session management.',
    status: 'in-progress',
    priority: 'high',
    assigneeId: '3',
    reporterId: '2',
    projectId: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    dueDate: new Date('2024-02-01'),
    comments: [],
    tags: ['backend', 'security'],
    estimatedHours: 40,
    loggedHours: 15
  },
  {
    id: '2',
    title: 'Design product catalog UI',
    description: 'Create responsive and intuitive product catalog interface with filtering and search capabilities.',
    status: 'todo',
    priority: 'medium',
    assigneeId: '4',
    reporterId: '2',
    projectId: '1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    dueDate: new Date('2024-01-30'),
    comments: [],
    tags: ['frontend', 'ui'],
    estimatedHours: 25,
    loggedHours: 0
  },
  {
    id: '3',
    title: 'Setup payment gateway integration',
    description: 'Integrate Stripe payment gateway for secure payment processing.',
    status: 'todo',
    priority: 'high',
    assigneeId: '3',
    reporterId: '1',
    projectId: '1',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    dueDate: new Date('2024-02-15'),
    comments: [],
    tags: ['backend', 'payments'],
    estimatedHours: 30,
    loggedHours: 0
  },
  {
    id: '4',
    title: 'Write unit tests for API endpoints',
    description: 'Comprehensive unit testing for all REST API endpoints with edge cases.',
    status: 'backlog',
    priority: 'medium',
    assigneeId: '5',
    reporterId: '2',
    projectId: '1',
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16'),
    comments: [],
    tags: ['testing', 'api'],
    estimatedHours: 20,
    loggedHours: 0
  },
  {
    id: '5',
    title: 'Optimize database queries',
    description: 'Improve database performance by optimizing slow queries and adding proper indexes.',
    status: 'review',
    priority: 'low',
    assigneeId: '3',
    reporterId: '1',
    projectId: '1',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-20'),
    comments: [],
    tags: ['database', 'performance'],
    estimatedHours: 15,
    loggedHours: 12
  },
  {
    id: '6',
    title: 'Implement real-time notifications',
    description: 'Add real-time push notifications for order updates and system alerts.',
    status: 'done',
    priority: 'medium',
    assigneeId: '4',
    reporterId: '2',
    projectId: '1',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-18'),
    comments: [],
    tags: ['frontend', 'notifications'],
    estimatedHours: 18,
    loggedHours: 20
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'created',
    ticketId: '1',
    userId: '2',
    description: 'created ticket "Implement user authentication system"',
    createdAt: new Date('2024-01-10T09:00:00')
  },
  {
    id: '2',
    type: 'assigned',
    ticketId: '1',
    userId: '2',
    description: 'assigned ticket to Mike Johnson',
    createdAt: new Date('2024-01-10T09:05:00')
  },
  {
    id: '3',
    type: 'status_changed',
    ticketId: '1',
    userId: '3',
    description: 'changed status from "To Do" to "In Progress"',
    createdAt: new Date('2024-01-15T10:30:00')
  }
];