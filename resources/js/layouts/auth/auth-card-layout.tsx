import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href={route('home')} className="flex items-center gap-3 self-center font-medium group transition-transform hover:scale-105">
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

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl shadow-lg border-gray-200 dark:border-gray-700">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
                            <CardDescription className="text-base mt-2">{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
