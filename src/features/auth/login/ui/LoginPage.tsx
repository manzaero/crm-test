import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('https://back-ui.fly.dev/login', {  // ← правильный эндпоинт
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}));
                throw new Error(errData.message || 'Неверный email или пароль');
            }

            const data = await res.json();

            const token = data.accessToken;  // ← camelCase, как в твоём Postman

            if (!token) {
                throw new Error('Токен не вернулся от сервера');
            }

            localStorage.setItem('admin_token', token);

            window.location.replace('/');
        } catch (err: any) {
            setError(err.message || 'Ошибка при входе');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
                    Вход в админ-панель
                </h1>

                {error && (
                    <div
                        className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 rounded text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label htmlFor="email"
                               className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                            className="
                                w-full px-4 py-3 rounded-lg
                                border border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-700               // ← фон
                                text-gray-900 dark:text-gray-100        // ← вот это главное!
                                placeholder:text-gray-400 dark:placeholder:text-gray-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                disabled:opacity-60
                              "
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="password"
                               className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Пароль
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                            className="
                                w-full px-4 py-3 rounded-lg
                                border border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-700
                                text-gray-900 dark:text-gray-100        // ← обязательно
                                placeholder:text-gray-400 dark:placeholder:text-gray-500
                                focus:outline-none focus:ring-2 focus:ring-indigo-500
                                disabled:opacity-60
                              "
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Входим...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
}