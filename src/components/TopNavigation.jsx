import React from 'react'

const TopNavigation = ({ appTitle = "Dashboard" }) => {
    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="flex items-center">
                                {/* Logo placeholder */}
                                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-sm">M</span>
                                </div>
                                <h1 className="text-xl font-semibold text-gray-900">{appTitle}</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Navigation items */}
                        <div className="hidden md:flex items-center space-x-4">
                            <a
                                href="#"
                                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Home
                            </a>
                            <a
                                href="#"
                                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Analytics
                            </a>
                            <a
                                href="#"
                                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            >
                                Reports
                            </a>
                        </div>

                        {/* User menu */}
                        <div className="flex items-center">
                            <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 text-sm font-medium">U</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default TopNavigation 