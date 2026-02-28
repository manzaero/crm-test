import { useEffect, useState } from "react";

export function useThemeSwitcher() {
    const [theme, setTheme] = useState<"light" | "dark">(() => {
        if (typeof window !== "undefined" && "theme" in localStorage) {
            return localStorage.theme;
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.theme = newTheme;
    };

    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        root.style.colorScheme = theme;
        document.body.classList.remove("light", "dark");
        document.body.classList.add(theme);
    }, [theme]);
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            if (!("theme" in localStorage)) {
                setTheme(mediaQuery.matches ? "dark" : "light");
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, []);

    return [theme, toggleTheme] as const;
}