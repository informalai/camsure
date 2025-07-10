"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { RefreshCw, ExternalLink, AlertCircle } from "lucide-react"

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [frameBlocked, setFrameBlocked] = useState(false)
    const [supersetUrl, setSupersetUrl] = useState('https://sail.governagent.com/')

    // Cookie management utility
    const handleCookieSync = () => {
        try {
            // Request storage access for third-party cookies (Safari/Webkit)
            if (document.requestStorageAccess) {
                document.requestStorageAccess().then(() => {
                    console.log('Storage access granted')
                }).catch((err) => {
                    console.log('Storage access denied:', err)
                })
            }
        } catch (error) {
            console.log('Storage access API not supported:', error)
        }
    }

    useEffect(() => {
        // Handle cookie synchronization
        handleCookieSync()

        // Add message listener for cross-frame communication
        const handleMessage = (event) => {
            // Verify origin for security
            if (event.origin !== new URL(supersetUrl).origin) {
                return
            }

            // Handle authentication state messages
            if (event.data && event.data.type) {
                switch (event.data.type) {
                    case 'auth_success':
                        console.log('Authentication successful in iframe')
                        setError(null)
                        // You can sync authentication state here
                        break
                    case 'auth_failed':
                        console.log('Authentication failed in iframe')
                        setError('Authentication failed. Please try logging in again.')
                        break
                    case 'csrf_error':
                        console.log('CSRF error detected in iframe')
                        handleIframeError('csrf', 'CSRF token validation failed')
                        break
                    case 'cookie_sync':
                        // Handle cookie synchronization if needed
                        console.log('Cookie sync requested')
                        handleCookieSync()
                        break
                    default:
                        // Check if the message contains error information
                        if (event.data.error && typeof event.data.error === 'string') {
                            if (event.data.error.toLowerCase().includes('csrf')) {
                                handleIframeError('csrf', event.data.error)
                            } else {
                                handleIframeError('general', event.data.error)
                            }
                        }
                        break
                }
            }
        }

        window.addEventListener('message', handleMessage)

        // Check for iframe blocking
        const timer = setTimeout(() => {
            setIsLoading(false)
            // Check if iframe failed to load due to X-Frame-Options
            const iframe = document.getElementById('superset-iframe')
            if (iframe) {
                try {
                    // This will throw an error if blocked by X-Frame-Options
                    iframe.contentWindow?.location
                } catch (e) {
                    setFrameBlocked(true)
                    setError("Apache Superset is blocking iframe embedding due to security settings (X-Frame-Options). Please use the 'Open in New Tab' button or configure Superset to allow iframe embedding.")
                }
            }
        }, 3000)

        return () => {
            clearTimeout(timer)
            window.removeEventListener('message', handleMessage)
        }
    }, [supersetUrl])

    const handleRefresh = () => {
        setIsLoading(true)
        setError(null)
        setFrameBlocked(false)

        // Refresh the iframe
        const iframe = document.getElementById('superset-iframe')
        if (iframe) {
            iframe.src = iframe.src
        }

        setTimeout(() => {
            setIsLoading(false)
        }, 2000)
    }

    const handleExternalOpen = () => {
        window.open(supersetUrl, '_blank')
    }

    // Enhanced CSRF error detection and handling
    const handleIframeError = (errorType, errorMessage) => {
        setIsLoading(false)

        if (errorMessage && errorMessage.includes('CSRF')) {
            setError(
                "CSRF token error detected. This usually happens with cross-domain iframe embedding. " +
                "Please try refreshing or use the 'Open in New Tab' button. " +
                "Server configuration may need to be updated for iframe compatibility."
            )
        } else {
            setError(errorMessage || "Failed to load Apache Superset. Please check if the service is running and accessible.")
        }
    }

    return (

        <>
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-gray-900">Dashboard</p>

                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={handleRefresh}
                            disabled={isLoading}
                            className="flex items-center gap-2"
                        >
                            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
                            Refresh
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleExternalOpen}
                            className="flex items-center gap-2"
                        >
                            <ExternalLink className="h-4 w-4" />
                            Open in New Tab
                        </Button>
                    </div>
                </div>
            </div>

            <Card className="h-[calc(100vh-200px)]">

                <CardContent className="p-0">
                    <div className="relative h-full">
                        {isLoading && (
                            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                                <div className="flex flex-col items-center gap-4">
                                    <RefreshCw className="h-8 w-8 animate-spin text-blue-500" />
                                    <p className="text-gray-600">Loading Dashboard...</p>
                                </div>
                            </div>
                        )}

                        {frameBlocked ? (
                            <div className="flex flex-col items-center justify-center h-full bg-gray-50 rounded-b-lg">
                                <div className="text-center p-8">
                                    <AlertCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        Iframe Embedding Blocked
                                    </h3>
                                    <p className="text-gray-600 mb-6 max-w-md">
                                        Dashboard is preventing iframe embedding due to security settings.
                                        Click the button below to access it in a new tab.
                                    </p>
                                    <Button onClick={handleExternalOpen} className="mx-auto">
                                        <ExternalLink className="h-4 w-4 mr-2" />
                                        Open Dashboard
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <iframe
                                id="superset-iframe"
                                src={supersetUrl}
                                className="w-full h-screen border-0 rounded-b-lg"
                                title="Apache Superset Dashboard"
                                onLoad={() => {
                                    setIsLoading(false)
                                    // Additional check for iframe accessibility
                                    setTimeout(() => {
                                        try {
                                            const iframe = document.getElementById('superset-iframe')
                                            if (iframe && iframe.contentWindow) {
                                                iframe.contentWindow.location
                                            }
                                        } catch (e) {
                                            setFrameBlocked(true)
                                            setError("Apache Superset is blocking iframe embedding due to security settings (X-Frame-Options).")
                                        }
                                    }, 1000)
                                }}
                                onError={(event) => {
                                    setIsLoading(false)
                                    handleIframeError(event.type, event.message)
                                }}
                                referrerPolicy="strict-origin-when-cross-origin"
                                allow="fullscreen; storage-access"
                                allowFullScreen
                                credentials="include"
                            />
                        )}
                    </div>
                </CardContent>
            </Card>

        </>
    )
} 