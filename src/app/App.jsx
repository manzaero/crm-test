import React, { useEffect, useState } from 'react';
import { Header } from '@/widgets/header/index.ts';
import { Footer } from '@/widgets/footer/index.ts';
import LoginPage from '@/features/auth/login/ui/LoginPage';

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        setIsAuthenticated(!!token);
        setChecking(false);
    }, []);

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-100">
                Загрузка...
            </div>
        );
    }

    if (!isAuthenticated) {
        return <LoginPage />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <Header />
            <main className="flex-grow flex items-center justify-center">
                <div className="max-w-4xl w-full px-4 py-12 text-center text-lg">
                    <p>Biba!</p>
                </div>
            </main>
            <Footer />
        </div>
    );
}