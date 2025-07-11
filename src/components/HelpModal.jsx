import React from 'react';
import { X } from 'lucide-react';

function HelpModal({ open, onClose }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
                <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={onClose}>
                    <X size={22} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Help & Support</h2>
                <div className="mb-4 text-gray-700 dark:text-gray-200">
                    <p className="mb-2">Need help? Here are some resources:</p>
                    <ul className="list-disc pl-5 mb-4">
                        <li>Check the <a href="#" className="text-blue-600 underline">Documentation</a></li>
                        <li>Contact support: <a href="mailto:support@yourcompany.com" className="text-blue-600 underline">support@yourcompany.com</a></li>
                        <li>FAQ: <a href="#" className="text-blue-600 underline">Frequently Asked Questions</a></li>
                    </ul>
                    <p>For urgent issues, reach out to your admin or product manager.</p>
                </div>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default HelpModal; 