import React, { useEffect } from 'react';

function Toast({ message, onClose }) {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 2500);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);
    if (!message) return null;
    return (
        <div className="fixed bottom-8 right-8 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            {message}
        </div>
    );
}

export default Toast; 