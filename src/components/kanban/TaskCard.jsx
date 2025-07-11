import React from 'react';
import { User, Calendar } from 'lucide-react';

const priorityClasses = {
    1: 'bg-red-500',
    2: 'bg-yellow-500',
    3: 'bg-green-500',
};

const TaskCard = ({ task, onSelectTask }) => {
    return (
        <div
            onClick={() => onSelectTask(task)}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-500 cursor-pointer transition-all duration-200"
        >
            <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-gray-800">{task.title}</p>
                <div className={`w-3 h-3 rounded-full ${priorityClasses[task.priority]}`} title={`Priority: ${task.priority}`}></div>
            </div>
            <p className="text-sm text-gray-600 mb-4">{task.leaseName}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{task.assignedTo}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{task.deadline}</span>
                </div>
            </div>
        </div>
    );
};

export default TaskCard; 