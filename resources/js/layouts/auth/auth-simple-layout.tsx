import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="w-full max-w-md">
                <div className="flex flex-col gap-8">
                    {/* Brand Logo and Header */}
                    <div className="flex flex-col items-center gap-4">
                        <Link href={route('home')} className="flex items-center gap-3 font-medium group transition-transform hover:scale-105">
                            <img
                                src="/logo.png"
                                alt="Jiftek Logo"
                                width={48}
                                height={48}
                                className="h-12 w-12 object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                }}
                            />
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">Jiftek</span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Digital Solutions</span>
                            </div>
                        </Link>

                        <div className="space-y-2 text-center w-full">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h1>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
                        </div>
                    </div>
                    
                    {/* Form Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
