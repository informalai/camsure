import React, { useState, useEffect } from 'react';
import { X, Paperclip, MessageSquare, Send } from 'lucide-react';

const TaskModal = ({ task, onClose, onUpdateTask, columns }) => {
    const [updatedTask, setUpdatedTask] = useState(task);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        setUpdatedTask(task);
    }, [task]);

    const handleFieldChange = (field, value) => {
        setUpdatedTask({ ...updatedTask, [field]: value });
    };

    const handleAddComment = () => {
        if (newComment.trim()) {
            const comment = {
                user: 'Current User',
                timestamp: new Date().toISOString(),
                text: newComment
            };
            const comments = [...updatedTask.comments, comment];
            setUpdatedTask({ ...updatedTask, comments });
            setNewComment('');
        }
    };
    
    const handleSaveChanges = () => {
        onUpdateTask(updatedTask);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold">{updatedTask.title}</h2>
                    <button onClick={onClose}><X className="w-6 h-6" /></button>
                </div>
                <div className="p-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={updatedTask.column}
                                onChange={(e) => handleFieldChange('column', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                {columns.map(col => (
                                    <option key={col.id} value={col.id}>{col.title}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Priority</label>
                            <select
                                value={updatedTask.priority}
                                onChange={(e) => handleFieldChange('priority', parseInt(e.target.value, 10))}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            >
                                <option value={1}>High</option>
                                <option value={2}>Medium</option>
                                <option value={3}>Low</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Assigned To</label>
                            <input
                                type="text"
                                value={updatedTask.assignedTo}
                                onChange={(e) => handleFieldChange('assignedTo', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Deadline</label>
                            <input
                                type="date"
                                value={updatedTask.deadline}
                                onChange={(e) => handleFieldChange('deadline', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Evidence</h3>
                        <div className="p-4 border-2 border-dashed rounded-md text-center text-gray-500">
                            <Paperclip className="w-6 h-6 mx-auto mb-2" />
                            <p>Drag & drop or click to upload files</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Comments</h3>
                        <div className="space-y-4 mb-4">
                            {updatedTask.comments && updatedTask.comments.map((comment, index) => (
                                <div key={index} className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                                    <div>
                                        <p className="font-semibold text-sm">{comment.user}</p>
                                        <p className="text-gray-700">{comment.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <button onClick={handleAddComment} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-md">Cancel</button>
                    <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md">Save Changes</button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal; 