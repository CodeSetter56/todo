import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const ThemeContext = createContext();

const THEMES = {
    light: "caramellatte",
    dark: "forest",
};

const DEFAULT_MODE = "light";

export const ThemeProvider = ({ children }) => {
    const { user, toggleDarkMode } = useAuth();
    const [mode, setMode] = useState(DEFAULT_MODE);

    const applyTheme = (mode) => {
        const themeName = THEMES[mode] || THEMES[DEFAULT_MODE];
        document.documentElement.setAttribute("data-theme", themeName);
    };

    useEffect(() => {
        if (user) {
            const userMode = user.darkmode ? "dark" : "light";
            setMode(userMode);
            applyTheme(userMode);
        } else {
            const localDark = localStorage.getItem("darkMode") === "true";
            const guestMode = localDark ? "dark" : "light";
            setMode(guestMode);
            applyTheme(guestMode);
        }
    }, [user]);

    // Toggle theme + update backend or localStorage
    const toggleTheme = () => {
        const newMode = mode === "light" ? "dark" : "light";
        setMode(newMode);
        applyTheme(newMode);

        if (user) {
            toggleDarkMode.mutate(newMode === "dark");
        } else {
            localStorage.setItem("darkMode", newMode === "dark");
        }
    };

    return (
        <ThemeContext.Provider
            value={{
                theme: THEMES[mode],
                mode,
                toggleTheme,
                isDark: mode === "dark",
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
