import {QuoteBlock} from "@/widgets/quote-block/ui/QuoteBlock.tsx";

export const Footer = () => {
    return (
        <footer
            className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 py-8 mt-auto border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <ul className="flex justify-center space-x-8 mb-4 text-sm">
                    <li>
                        <a href="#" className="hover:text-indigo-400 transition-colors">GitHub</a>
                    </li>
                    <li>
                        <a href="#" className="hover:text-indigo-400 transition-colors">Twitter</a>
                    </li>
                </ul>
                <p className="text-sm opacity-80">
                    © {new Date().getFullYear()} Kotaro.
                </p>
                <QuoteBlock/>
            </div>
        </footer>
    )
}