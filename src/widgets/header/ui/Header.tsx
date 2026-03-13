import { ThemeSwitcherButton } from "@/shared/lib/ui/ThemeSwitcherButton";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("admin_token");
        window.location.replace('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                <ul className="flex space-x-8 text-ms font-medium">
                    <li>
                        <a
                            href="#"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            Home
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            Docs
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                            Blog
                        </a>
                    </li>
                </ul>

                <div className="flex items-center space-x-4">
                    <ThemeSwitcherButton />

                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                        >
                            Выйти
                        </button>
                    )}
                </div>
            </nav>
        </header>
    );
};