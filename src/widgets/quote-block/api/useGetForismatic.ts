import {useEffect, useState} from "react";

type Quote = {
    quoteText: string,
    quoteAuthor: string
}

export const useGetForismatic = () => {
    const [quote, setQuote] = useState<{ quoteText: string; quoteAuthor: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const callbackName = 'forismaticCallback_' + Math.random().toString(36).slice(2);

        (window as any)[callbackName] = (data: any) => {
            setQuote({
                quoteText: data.quoteText || 'Цитата не загрузилась',
                quoteAuthor: data.quoteAuthor || '',
            });
            setLoading(false);
            delete (window as any)[callbackName];
        };

        const script = document.createElement('script');
        script.src = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=ru&format=jsonp&jsonp=${callbackName}`;
        script.async = true;
        script.onerror = () => {
            setError('Ошибка загрузки цитаты');
            setLoading(false);
        };

        document.body.appendChild(script);

        return () => {
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
            if ((window as any)[callbackName]) {
                delete (window as any)[callbackName];
            }
        };
    }, []);
    return {quote, loading, error}
}