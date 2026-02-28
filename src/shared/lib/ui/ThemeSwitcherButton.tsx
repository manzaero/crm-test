import {useThemeSwitcher} from "@/shared/lib/model/useThemeSwitcher.ts";

export const ThemeSwitcherButton = () => {
    const [theme, toggleTheme] = useThemeSwitcher();
    return (
        <button
            onClick={toggleTheme}
            className="text-sm cursor-pointer px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors capitalize"
        >
            {theme}
        </button>
    )
}