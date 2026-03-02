import {useGetForismatic} from "@/widgets/quote-block/api";

export function QuoteBlock() {
    const {quote, loading, error} = useGetForismatic()

    if (loading) return <div className="quote-loading">Загружаем цитату...</div>;
    if (error)   return <div className="quote-error">{error}</div>;
    if (!quote)  return null;

    return (
        <div className="quote-block">
            <blockquote>{quote.quoteText}</blockquote>
            {quote.quoteAuthor && <cite> — {quote.quoteAuthor}</cite>}
        </div>
    );
}